'use strict'

const youtubeAPIKey = 'AIzaSyBOeJM_9wrehRc1wH9v-gJE-RFsmjbuwps';

function displayNBAPlayerSearchResults(players) {
    $('#searchResults').empty();

    for(let i = 0; i < players.length; i++){
        debugger;
        let pos = players[i].leagues.standard.pos;
        let jersey = players[i].leagues.standard.jersey;

        if(pos === undefined){
            pos = 'FA';
        } 

        if(jersey === undefined) {
            jersey = 'N/A';
        }


        $('#searchResults').append(
            `<li class='resultItem'>
                <h3 class='playerName'>${players[i].firstName} ${players[i].lastName}</h3>
                <p class='position'>${players[i].leagues.standard.pos}</p>
                <p class='jerseyNumber'>${players[i].leagues.standard.jersey}</p>
            </li>`
        );
    }

    $('#searchResultsContainer').removeClass('hidden');
}

function getNBAPlayer(player) {
    
    const fetchNBAPlayer = async () => {
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
                // provide input value once developed
                throw new Error('There are no players in the NBA with the lastname "Hard"; please try again');
            } else {
                displayNBAPlayerSearchResults(nbaPlayers)
                console.log(nbaPlayers);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayer();
}

function getNBAPlayerTeamName(teamID) {
    
    const fetchNBAPlayerTeamName = async () => {
        try {
            const nbaPlayerTeamRes = await fetch(`https://api-nba-v1.p.rapidapi.com/teams/teamId/${teamID}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const nbaPlayerTeamData = await nbaPlayerTeamRes.json();
            debugger;
            const nbaPlayerTeam = nbaPlayerTeamData.api.teams;

            if(nbaPlayerTeam.length === 0){
                // provide input value once developed
                throw new Error(`Error pulling team data`);
            } else {
                return(nbaPlayerTeam[0].fullName);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayerTeamName();
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

            if(nbaTeamData.api.teams.length === 0){
                // provide input value once developed
                throw new Error(`There are no teams in the NBA with the name "${team}"; please try again`);
            } else {
                console.log(nbaTeamData);
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

            if(nbaConferenceData.api.teams.length === 0){
                // provide input value once developed
                throw new Error(`There is no conferencein the NBA by the name "${conference}"; please try again`);
            } else {
                console.log(nbaConferenceData);
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

function watchPlayerForm() {
    $('#nbaPlayerSearch').submit(event => {
        event.preventDefault();

        const playerLastName = $('#playerLastName').val();

        getNBAPlayer(playerLastName);
        getNBANews();
        getNBAVideos();
        getNBASocial();
    })
}

function listeners() {
    watchPlayerForm();
    searchTypeController();
}

$(listeners);