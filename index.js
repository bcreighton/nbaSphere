'use strict'

const youtubeAPIKey = 'AIzaSyBOeJM_9wrehRc1wH9v-gJE-RFsmjbuwps';
let currentSearchItems;

function convertConferenceNames(conference) {
    if(conference === 'West') {
        conference = 'Western';
    } else if(conference === 'East') {
        conference = 'Eastern';
    }

    return conference;
}

function displayNBAPlayerSearchResults(players) {
    $('#searchResults').empty();

    for(let i = 0; i < players.length; i++){
        const playerId = players[i].playerId;
        const firstName = players[i].firstName;
        const lastName = players[i].lastName;
        let teamId = players[i].teamId;
        let pos;
        let jersey;

        if(players[i].leagues.standard === undefined){
            continue;
        } else {
            pos = players[i].leagues.standard.pos;
            jersey = players[i].leagues.standard.jersey;
        }

        if(teamId === null){
            teamId = 'FA'
        }

        if(pos === ''){
            pos = 'Unknown';
        } 

        if(jersey === '') {
            jersey = 'N/A';
        }


        $('#searchResults').append(
            `<li class='resultItem'>
                <p class='id hidden'>${playerId}</p>
                <h3 class='playerName searchItemTitle'>${firstName} ${lastName}</h3>
                <p class='team seachSubItem'>${teamId}</p>
                <p class='position seachSubItem'>Position: ${pos}</p>
                <p class='jerseyNumber seachSubItem'>#${jersey}</p>
            </li>`
        );
    }
    $('#searchResultsContainer').removeClass('hidden');
}

function displayNBATeamSearchResults(teams) {
    $('#searchResults').empty();

    for(let i = 0; i < teams.length; i++){
        const teamId = teams[i].teamId;
        const teamLogo = teams[i].logo;
        const teamName = teams[i].fullName;
        const conference = convertConferenceNames(teams[i].leagues.standard.confName);
        const division = teams[i].leagues.standard.divName;

        $('#searchResults').append(
            `<li class='resultItem'>
                <p class='id hidden'>${teamId}</p>
                <img src='${teamLogo}' alt='${teamName} Logo' class='teamLogo'>
                <h3 class='teamName searchItemTitle'>${teamName}</h3>
                <p class='teamConference seachSubItem'>Conference: ${conference}</p>
                <p class='teamDivision seachSubItem'>Division: ${division}</p>
            </li>`
        );
    }
    $('#searchResultsContainer').removeClass('hidden');
}

function updateConference(conference) {
    if(conference === 'west') {
        $('#searchResults').append(
            `<li class='resultItem'>
                <h3 class='conferenceName searchItemTitle'>Western Conference</h3>
                <p>16 Teams</p>
            </li>`
        )
    } else {
        $('#searchResults').append(
            `<li class='resultItem'>
                <h3 class='conferenceName searchItemTitle'>Eastern Conference</h3>
                <p>16 Teams</p>
            </li>`
        )
    }
}

function displayNBAConferenceSearchResults(conference, conferenceTeams) {
    $('#searchResults').empty();

    updateConference(conference);

    for(let i = 0; i < conferenceTeams.length; i++){
        const conferenceTeamId = conferenceTeams[i].teamId;
        const conferenceTeamLogo = conferenceTeams[i].logo;
        const conferenceTeamName = conferenceTeams[i].fullName;
        const teamConference = convertConferenceNames(conferenceTeams[i].leagues.standard.confName);
        const teamDivision = conferenceTeams[i].leagues.standard.divName;

        $('#searchResults').append(
            `<li class='resultItem'>
                <p class='id hidden'>${conferenceTeamId};
                <img src='${conferenceTeamLogo}' alt='${conferenceTeamName} Logo' class='teamLogo'>
                <h3 class='teamName searchItemTitle'>${conferenceTeamName}</h3>
                <p class='teamConference seachSubItem'>Conference: ${teamConference}</p>
                <p class='teamDivision seachSubItem'>Division: ${teamDivision}</p>
            </li>`
        );
    }
    $('#searchResultsContainer').removeClass('hidden');
}

function displayProfileData(userSelection) {

}

const getNBAPlayer = async (player) => {
    try {
        const nbaPlayerRes = await fetch(`https://api-nba-v1.p.rapidapi.com/players/lastName/${player}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
            }
        })
        const nbaPlayerData = await nbaPlayerRes.json();
        const nbaPlayers = nbaPlayerData.api.players;

        if(nbaPlayers.length === 0){
            throw new Error(`There are no players in the NBA with the lastname "${player}"; please try again`);
        } else {
            const playersWithTeam = await getNBAPlayerTeamName(nbaPlayers);

            displayNBAPlayerSearchResults(playersWithTeam)
            currentSearchItems = nbaPlayers;
            console.log(nbaPlayers);
        }
    } catch(e) {
        console.log(e);
    }
}

const getNBAPlayerTeamName = async (players) => { 
    try {
        const playersWithTeamName = await Promise.all(
            players.map(async (player) => {
                if (player.teamId !== null) {
                    try {
                        const nbaPlayerTeamRes = await fetch(`https://api-nba-v1.p.rapidapi.com/teams/teamId/${player.teamId}`, {
                            "method": "GET",
                            "headers": {
                                "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                                "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                            }
                        })
    
                        const nbaPlayerTeamData = await nbaPlayerTeamRes.json();

                        const nbaPlayerTeam = nbaPlayerTeamData.api.teams;
    
                        if(nbaPlayerTeam.length === 0){
                            throw new Error(`Error pulling team data`);
                        } else {
                            return {
                                ...player,
                                team: nbaPlayerTeam[0],
                            };
                        }
                    } catch(error) {
                        debugger
                    }
                }

                return {
                    ...player,
                    team: { teamName: '' },
                }
            }),
        )

        return playersWithTeamName;
    } catch(e) {
        console.log(e);
    }
}

function getNBATeam(team) {
    
    const fetchNBATeam = async () => {
        try {
            const nbaTeamRes = await fetch(`https://api-nba-v1.p.rapidapi.com/teams/nickName/${team}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const nbaTeamData = await nbaTeamRes.json();
            const nbaTeams = nbaTeamData.api.teams;

            if(nbaTeams.length === 0){

                throw new Error(`There are no teams in the NBA with the name "${team}"; please try again`);
            } else {
                displayNBATeamSearchResults(nbaTeams);
                currentSearchItems = nbaTeams;
                console.log(nbaTeams);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchNBATeam();
}

function getNBAConference(conference) {
    
    const fetchNBAConference = async () => {
        try {
            const nbaConferenceRes = await fetch(`https://api-nba-v1.p.rapidapi.com/teams/confName/${conference}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const nbaConferenceData = await nbaConferenceRes.json();
            const nbaConference = nbaConferenceData.api.teams;

            if(nbaConference.length === 0){

                throw new Error(`There is no conference in the NBA by the name "${conference}"; please try again`);
            } else {
                displayNBAConferenceSearchResults(conference, nbaConference);
                currentSearchItems = nbaConference;
                console.log(nbaConference);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAConference();
}

function getNBANews(nbaItem) {
    const fetchNBANews = async () => {
        try {
            const nbaNewsRes = await fetch(`https://newsapi.org/v2/everything?q=james-harden`, {
                "method": "GET",
                "headers": {
                    "X-Api-Key": "bbbae998198647ef8f363a9b624282de"
                }
            })
            const nbaNews = await nbaNewsRes.json();

            if(nbaNews.status === 'error'){
                throw new Error(nbaNews.message);
            }
            
            console.log(nbaNews);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBANews();
}

function getNBAVideos(nbaItem) {
    const fetchNBAVideos = async () => {
        try {
            const nbaVideosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=James%20Harden&safeSearch=strict&key=${youtubeAPIKey}`)

            const nbaVideos = await nbaVideosRes.json();

            if(!nbaVideosRes.ok){
                throw new Error(nbaVideos.error.message);
            }
            
            console.log(nbaVideos);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAVideos();
}

function getNBASocialFB(nbaItem) {
    const fetchNBASocialFB = async () => {
        try {
            const nbaSocialFBRes = await fetch(`https://api.social-searcher.com/v2/search?q=james%20harden&network=facebook&limit=5&lang=en&key=626e71bd528d38b317758d064c6441c7`, {
                "method": "GET",
                "headers": {
                    'Accept':'application/json'
                }
            })
            const nbaSocialFB = await nbaSocialFBRes.json();

            if(!nbaSocialFBRes.ok){
                throw new Error(nbaSocialFB.meta.message);
            }
            
            console.log(nbaSocialFB);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBASocialFB();
}

function getNBASocialTW(nbaItem) {
    const fetchNBASocialTW = async () => {
        try {
            const nbaSocialTWRes = await fetch(`https://api.social-searcher.com/v2/search?q=james%20harden&network=twitter&limit=5&lang=en&key=626e71bd528d38b317758d064c6441c7`, {
                "method": "GET",
                "headers": {
                    'Accept':'application/json'
                }
            })
            const nbaSocialTW = await nbaSocialTWRes.json();

            if(!nbaSocialTWRes.ok){
                throw new Error(nbaSocialTW.meta.message);
            }
            
            console.log(nbaSocialTW);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBASocialTW();
}

function getNBASocialInsta(nbaItem) {
    const fetchNBASocialInsta = async () => {
        try {
            const nbaSocialInstaRes = await fetch(`https://api.social-searcher.com/v2/search?q=james%20harden&network=instagram&limit=5&lang=en&key=626e71bd528d38b317758d064c6441c7`, {
                "method": "GET",
                "headers": {
                    'Accept':'application/json'
                }
            })
            const nbaSocialInsta = await nbaSocialInstaRes.json();

            if(!nbaSocialInstaRes.ok){
                throw new Error(nbaSocialInsta.meta.message);
            }
            
            console.log(nbaSocialInsta);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBASocialInsta();
}

function getNBASocial(nbaSearchItem) {
    getNBASocialFB(nbaSearchItem);
    getNBASocialTW(nbaSearchItem);
    getNBASocialInsta(nbaSearchItem);
}

function getSupportingData() {
    getNBANews();
    getNBAVideos();
    getNBASocial();
}

function searchTypeController() {
    $('#teamButton').click(function() {
        $(this).addClass('hidden');
        $('#playerButton').removeClass('hidden');
        $('#conferenceButton').removeClass('hidden');

        $('#nbaTeamSearch').removeClass('hidden');
        $('#nbaPlayerSearch').addClass('hidden');
        $('#nbaConferenceSearch').addClass('hidden');
    })

    $('#conferenceButton').click(function() {
        $(this).addClass('hidden');
        $('#playerButton').removeClass('hidden');
        $('#teamButton').removeClass('hidden');

        $('#nbaConferenceSearch').removeClass('hidden');
        $('#nbaPlayerSearch').addClass('hidden');
        $('#nbaTeamSearch').addClass('hidden');
    })

    $('#playerButton').click(function() {
        $(this).addClass('hidden');
        $('#teamButton').removeClass('hidden');
        $('#conferenceButton').removeClass('hidden');

        $('#nbaPlayerSearch').removeClass('hidden');
        $('#nbaConferenceSearch').addClass('hidden');
        $('#nbaTeamSearch').addClass('hidden');
    })
}

function clearData() {
    $(`#profile`).empty();
    $(`#highlights`).empty();
    $(`#news`).empty();
    $(`#social`).empty();
}

function watchPlayerForm() {
    $('#nbaPlayerSearch').submit(event => {
        event.preventDefault();

        clearData();
        $(`#userSelectionContainer`).addClass('hidden');

        const playerLastName = $('#playerLastName').val();

        getNBAPlayer(playerLastName);
    })
}

function watchTeamForm() {
    $('#nbaTeamSearch').submit(event => {
        event.preventDefault();

        clearData();
        $(`#userSelectionContainer`).addClass('hidden');

        const teamName = $('#teamName').val();

        getNBATeam(teamName);
    })
}

function watchConferenceForm() {
    $('#nbaConferenceSearch').submit(event => {
        event.preventDefault();

        clearData();
        $(`#userSelectionContainer`).addClass('hidden');

        let conferenceName = $('#conferenceName').val();

        if(conferenceName === 'western' || conferenceName === 'Western') {
            conferenceName = 'west';
        } else if(conferenceName === 'eastern' || conferenceName === 'Eastern') {
            conferenceName = 'east';
        }

        getNBAConference(conferenceName);
    })
}

function searchResultClickListener() {
    $('#searchResults').on('click', '.resultItem', function() {
        $('#searchResultsContainer').addClass('hidden');

        $(`#userSelectionContainer`).removeClass('hidden');

        $(`#profile`).html(`<h1>new player data</h1>`);

    })
}

function listeners() {
    watchPlayerForm();
    watchTeamForm();
    watchConferenceForm();
    searchTypeController();
    searchResultClickListener();
}

$(listeners);