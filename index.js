'use strict'

const youtubeAPIKey = 'AIzaSyBOeJM_9wrehRc1wH9v-gJE-RFsmjbuwps';
const socialAPIKey = '626e71bd528d38b317758d064c6441c7';
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
        const searchId = i;
        const playerId = players[i].playerId;
        const firstName = players[i].firstName;
        const lastName = players[i].lastName;
        let teamId = players[i].teamId;
        let team = players[i].team.fullName;
        let pos;
        let jersey;

        if(players[i].leagues.standard === undefined){
            continue;
        } else {
            pos = players[i].leagues.standard.pos;
            jersey = players[i].leagues.standard.jersey;
        }

        if(teamId === null){
            team = 'Free Agent';
        }

        if(pos === ''){
            pos = 'Unknown';
        } 

        if(jersey === '') {
            jersey = 'N/A';
        }


        $('#searchResults').append(
            `<li class='resultItem player'>
                <p class='searchId hidden'>${searchId}</p>
                <p class='id hidden'>${playerId}</p>
                <h3 class='playerName searchItemTitle'>${firstName} ${lastName}</h3>
                <p class='team seachSubItem'>${team}</p>
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

function convertHeight(height){
    if(height === 0) {
        return height;
    } else {
        let feet;
        let inches;

        inches = height * 39.370;
        feet = Math.abs(0.083333 * inches);
        inches = Math.round(12 * (feet % 1));
        feet = Math.floor(feet);
        height = `${feet}ft ${inches}in`;
        return height;
    }
}

function convertWeight(weight){
    if(weight === 0){
        return weight;
    } else {
        weight = Math.round(weight * 2.20462);
        return weight;
    }
}

function convertDate(date){
    if(date === '' || date === null){
        return date = 'Unknown';
    } else {
        const y = date.slice(0,4);
        const m = date.slice(5,7);
        const d = date.slice(8,10);

        return date = `${m}/${d}/${y}`;
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

function displayPlayer(userSelection) {
    const playerId = $(userSelection).find('.id').text();
    const currentItem = findNBAObject(playerId, currentSearchItems);

    let pNum = currentItem.leagues.standard.jersey;
    let pPos = currentItem.leagues.standard.pos;
    const pFirstName = currentItem.firstName;
    const pLastName = currentItem.lastName;
    const pBirth = convertDate(currentItem.dateOfBirth);
    const pHeightM = currentItem.heightInMeters;
    const pHeight = convertHeight(pHeightM);
    const pWeightK = currentItem.weightInKilograms;
    const pWeight = convertWeight(pWeightK);
    const pCollege = currentItem.collegeName;
    const pDebut = currentItem.startNba;
    const pYears = currentItem.yearsPro;
    let tName = currentItem.team.fullName;
    const tLogo = currentItem.team.logo;

    if(tName === null) {
        tName = 'Free Agent'
    }

    if(pPos === '') {
        pPos = 'Unknown';
    }

    if(pNum === '') {
        pNum = 'N/A';
    }
    
    $('#profile').html(
        `
        <h2 class="sectionTitle">Information</h2>
        <img src=${tLogo} class='teamLogo' alt='${tName} Logo'>
        <h3 class = 'numPos'>#${pNum} | ${pPos}</h3>
        <h2 class = 'firstName'>${pFirstName}</h2>
        <h2 class = 'lastName'>${pLastName}</h1>

        <p class = 'vital'><span class='vitalTitle'>Birth Date: </span>${pBirth}</p>
        <p class = 'vital'><span class='vitalTitle'>Height: </span>${pHeight} / ${pHeightM}m</p>
        <p class = 'vital'><span class='vitalTitle'>Weight: </span>${pWeight}lbs / ${pWeightK}kg</p>
        <p class = 'vital'><span class='vitalTitle'>College: </span>${pCollege}</p>
        <p class = 'vital'><span class='vitalTitle'>NBA Debut: </span>${pDebut}</p>
        <p class = 'vital'><span class='vitalTitle'>Years Pro: </span>${pYears}</p>
        `
    )

    getNBAVideos(pFirstName, pLastName);
    getNBANews(pFirstName, pLastName);

    $('#userSelectionContainer').removeClass('hidden');
    console.log(currentItem);
   

}

function findNBAObject(value, currentSearchItems){
    for(let i = 0; i < currentSearchItems.length; i++) {
        if(currentSearchItems[i].playerId === value) {
            return currentSearchItems[i];
        }
    }
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
            currentSearchItems = playersWithTeam;
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
                        console.log(error);
                    }
                } else {
                    return {
                        ...player,
                        team: { teamName: '' },
                    }
                }
            }),
        )
        return playersWithTeamName;
    } catch(e) {
        console.log(e);
    }
}

const displayRecentVideos = (videos) => {
    console.log(videos);
    const youTubeVideoLink = `https://www.youtube.com/watch?v=`;

    $('#highlights').empty();

    if(videos.items.length !== 0){
        $('#highlights').html(
            `<h2 class='sectionTitle'>Recent Videos</h2>`
        )
        for(let i = 0; i < videos.items.length; i++){
            const vId = videos.items[i].id.videoId;
            const vThumb = videos.items[i].snippet.thumbnails.high.url;
            const vTitle = videos.items[i].snippet.title;
            const vChannel = videos.items[i].snippet.channelTitle;

            $('#highlights').append(
                `
                <div class='video'>
                    <a href='${youTubeVideoLink}${vId}' target='_blank'><img src=${vThumb} alt='${vTitle}' class='videoThumb'></a>
                    <h2 class='thumbTitle'>${vTitle}</h2>
                    <p class='vChannel'>${vChannel}</p>
                </div>
                `
            )
        }
    } else {
        $('#highlights').html(
            `
            <h2 class='noData'>There are no videos to display</h2>
            `
        )
    }
}

const displayRecentNews = (articles) => {
    console.log(articles);

    $('#news').empty();

    if(articles.length !== 0){
        for(let i = 0; i < articles.length; i++){
            const aImg = articles[i].urlToImage;
            const aTitle = articles[i].title;
            const aSource = articles[i].source.name;
            const aDesc = articles[i].description;
            let aAuthor = articles[i].author;
            const aUrl = articles[i].url;
            const aDate = convertDate(articles[i].publishedAt);

            if(aAuthor === null){
                aAuthor = 'Author Unknown';
            }

            $('#news').append(
                `
                <a href='${aUrl}' class='article' target='_blank'>
                    <div>
                        <img src='${aImg}' class='articleImg' alt='${aTitle} article thumbnail'>
                        <h2 class='newsTitle'>${aTitle}</h2>
                        <p class='newsDesc'>${aDesc}</p>
                        <p class='newsSource'>${aSource} | ${aAuthor}</p>
                        <p class='newsPubDate'>${aDate}</p>
                    </div>
                </a>
                `
            )
        }
    } else {
        $('#news').html(
            `
            <h2 class='noData'>There are no articles to display</h2>
            `
        )
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

const getNBANews = async (...nbaItem) => {
    try {
        const nbaNewsRes = await fetch(`https://newsapi.org/v2/everything?q=${nbaItem[0]}-${nbaItem[1]}&sortBy=latest`, {
            "method": "GET",
            "headers": {
                "X-Api-Key": "bbbae998198647ef8f363a9b624282de"
            }
        })
        const nbaNews = await nbaNewsRes.json();

        if(nbaNews.status === 'error'){
            throw new Error(nbaNews.message);
        }
        
        const articles = nbaNews.articles.slice(0,5);
        displayRecentNews(articles);

    } catch(e) {
        console.log(e);
    }
}

const getNBAVideos = async (...nbaItem) => {
    try {
        const nbaVideosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${nbaItem[0]}%20${nbaItem[1]}&safeSearch=strict&key=${youtubeAPIKey}`);

        const nbaVideos = await nbaVideosRes.json();

        if(!nbaVideosRes.ok){
            throw new Error(nbaVideos.error.message);
        }

        displayRecentVideos(nbaVideos);
        return nbaVideos;

    } catch(e) {
        console.log(e);
    }
}

const getSocialFB = async (...nbaItem) => {
    try {
        const nbaSocialFBRes = await fetch(`https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&network=facebook&limit=5&lang=en&key=${socialAPIKey}`, {
            "method": "GET",
            "headers": {
                'Accept':'application/json'
            }
        })
        const nbaSocialFB = await nbaSocialFBRes.json();

        if(!nbaSocialFBRes.ok){
            throw new Error(nbaSocialFB.meta.message);
        }
        
        return {
            facebook: nbaSocialFB.posts,
        };

    } catch(e) {
        console.log(e);
    }
}

const getSocialTW = async (...nbaItem) => {
    try {
        const nbaSocialTWRes = await fetch(`https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&network=twitter&limit=5&lang=en&key=${socialAPIKey}`, {
            "method": "GET",
            "headers": {
                'Accept':'application/json'
            }
        })
        const nbaSocialTW = await nbaSocialTWRes.json();

        if(!nbaSocialTWRes.ok){
            throw new Error(nbaSocialTW.meta.message);
        }
        
        return {
            twitter: nbaSocialTW.posts,
        };

    } catch(e) {
        console.log(e);
    }
}

const getSocialInsta = async (...nbaItem) => {
    try {
        const nbaSocialInstaRes = await fetch(`https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&network=instagram&limit=5&lang=en&key=${socialAPIKey}`, {
            "method": "GET",
            "headers": {
                'Accept':'application/json'
            }
        })
        const nbaSocialInsta = await nbaSocialInstaRes.json();
        const instaPosts = nbaSocialInsta.posts;

        if(!nbaSocialInstaRes.ok){
            throw new Error(nbaSocialInsta.meta.message);
        }
        return instaPosts;

    } catch(e) {
        console.log(e);
    }
}

const socialPosts = async(...nbaItem) => {
    try {
        let instaPosts = await getSocialInsta(nbaItem);
        let fbPosts = await getSocialFB(nbaItem);
        let twPosts = await getSocialTW(nbaItem);
        debugger
        
        return {
            ...instaPosts,
            ...fbPosts,
            ...twPosts
        }
    } catch(e){
        console.log(e);
    }
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
        $(this).addClass('selected');

        if($(this).hasClass('player')){
            displayPlayer(this);
        }
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