'use strict';

const youtubeAPIKey = 'AIzaSyAtoOvD77SHUy0WgDx5dYviuQ4STNDIMLI';
const socialAPIKey = '626e71bd528d38b317758d064c6441c7';
let currentSearchItems;

function convertConferenceNames(conference) {
  if (conference === 'West') {
    conference = 'Western';
  } else if (conference === 'East') {
    conference = 'Eastern';
  }

  return conference;
}

function displayNBAPlayerSearchResults(players) {
  $('#searchResults').empty();

  for (let i = 0; i < players.length; i++) {
    const searchId = i;
    const playerId = players[i].playerId;
    const firstName = players[i].firstName;
    const lastName = players[i].lastName;
    let teamId = players[i].teamId;
    let team = players[i].team.fullName;
    let pos;
    let jersey;

    if (players[i].leagues.standard === undefined) {
      continue;
    } else {
      pos = players[i].leagues.standard.pos;
      jersey = players[i].leagues.standard.jersey;
    }

    if (teamId === null) {
      team = 'Free Agent';
    }

    if (pos === '') {
      pos = 'Unknown';
    }

    if (jersey === '') {
      jersey = 'N/A';
    }

    $('#searchResults').append(
      `<li class='resultItem player'>
                <p class='searchId hidden'>${searchId}</p>
                <p class='id hidden'>${playerId}</p>
                <h3 class='playerName searchItemTitle'>${firstName} ${lastName}</h3>
                <p class='team searchSubItem'>${team}</p>
                <p class='position searchSubItem'>Position: ${pos}</p>
                <p class='jerseyNumber searchSubItem'>#${jersey}</p>
            </li>`
    );
  }
  $('#searchResults')
    .find('.loaderSearch')
    .remove();
}

function displayNBATeamPlayers(teamPlayers) {
  $('#connectedItems').empty();

  const team = teamPlayers[0].team.fullName;

  $('#connectedItems').html(
    `
    <h2 class='sectionTitle'>Other ${team} Players</h2>
    <div id='connectedItemsFlex'></div>
    `
  );

  for (let i = 0; i < teamPlayers.length; i++) {
    const playerId = teamPlayers[i].playerId;
    const firstName = teamPlayers[i].firstName;
    const lastName = teamPlayers[i].lastName;
    let pos;
    let jersey;

    if (teamPlayers[i].leagues.standard === undefined) {
      continue;
    } else {
      pos = teamPlayers[i].leagues.standard.pos;
      jersey = teamPlayers[i].leagues.standard.jersey;
    }

    if (pos === '') {
      pos = 'Unknown';
    }

    if (jersey === '') {
      jersey = 'N/A';
    }

    $('#connectedItems')
      .find('#connectedItemsFlex')
      .append(
        `<li class='connectedItem player'>
                <p class='id hidden'>${playerId}</p>
                <h3 class='playerName searchItemTitle'>${firstName} ${lastName}</h3>
                <p class='position searchSubItem'>Position: ${pos}</p>
                <p class='jerseyNumber searchSubItem'>#${jersey}</p>
            </li>`
      );
  }
}

const displayDivisionTeams = (division, divisionTeams) => {
  $('#connectedItems').empty();

  $('#connectedItems').html(
    `
    <h2 class = sectionTitle>${division} Division Teams</h2>
    <div id='connectedItemsFlex'></div>
    `
  );

  for (let i = 0; i < divisionTeams.length; i++) {
    const teamId = divisionTeams[i].teamId;
    const tLogo = divisionTeams[i].logo;
    const tCity = divisionTeams[i].city;
    const tNickname = divisionTeams[i].nickname;

    $('#connectedItems')
      .find('#connectedItemsFlex')
      .append(
        `
            <li class='connectedItem team'>
                <img src='${tLogo}' alt='${tCity} ${tNickname} Logo' class = 'teamLogo'>
                <p class = 'id hidden'>${teamId}</p>
                <h3 class = 'teamCity searchItemTitle'>${tCity}</h3>
                <h3 class = 'teamName searchItemTitle'>${tNickname}</h3>
            </li>
            `
      );
  }
};

function displayNBATeamSearchResults(teams) {
  $('#searchResults').empty();

  for (let i = 0; i < teams.length; i++) {
    const teamId = teams[i].teamId;
    const teamLogo = teams[i].logo;
    const teamName = teams[i].fullName;
    const conference = convertConferenceNames(
      teams[i].leagues.standard.confName
    );
    const division = teams[i].leagues.standard.divName;

    $('#searchResults').append(
      `<li class='resultItem team'>
                <p class='id hidden'>${teamId}</p>
                <img src='${teamLogo}' alt='${teamName} Logo' class='teamLogo'>
                <h3 class='teamName searchItemTitle'>${teamName}</h3>
                <p class='teamConference searchSubItem'>Conference: ${conference}</p>
                <p class='teamDivision searchSubItem'>Division: ${division}</p>
            </li>`
    );
  }
  $('#searchResultsContainer').removeClass('hidden');
}

function updateConference(conference) {
  if (conference === 'west') {
    $('#searchResults').append(
      `<li class='resultItem conference'>
                <h3 class='conferenceName searchItemTitle'>Western Conference</h3>
                <p>15 Teams</p>
            </li>`
    );
  } else {
    $('#searchResults').append(
      `<li class='resultItem conference'>
                <h3 class='conferenceName searchItemTitle'>Eastern Conference</h3>
                <p>15 Teams</p>
            </li>`
    );
  }
}

function convertHeight(height) {
  if (height === 0) {
    return height;
  } else {
    let feet;
    let inches;

    inches = height * 39.37;
    feet = Math.abs(0.083333 * inches);
    inches = Math.round(12 * (feet % 1));
    feet = Math.floor(feet);
    height = `${feet}ft ${inches}in`;
    return height;
  }
}

function convertWeight(weight) {
  if (weight === 0) {
    return weight;
  } else {
    weight = Math.round(weight * 2.20462);
    return weight;
  }
}

function convertDate(date) {
  if (date === '' || date === null) {
    return (date = 'Unknown');
  } else {
    const y = date.slice(0, 4);
    const m = date.slice(5, 7);
    const d = date.slice(8, 10);

    return (date = `${m}/${d}/${y}`);
  }
}

function displayNBAConferenceSearchResults(conference, conferenceTeams) {
  $('#searchResults').empty();

  updateConference(conference);

  for (let i = 0; i < conferenceTeams.length; i++) {
    const conferenceTeamId = conferenceTeams[i].teamId;
    const conferenceTeamLogo = conferenceTeams[i].logo;
    const conferenceTeamName = conferenceTeams[i].fullName;
    const teamConference = convertConferenceNames(
      conferenceTeams[i].leagues.standard.confName
    );
    const teamDivision = conferenceTeams[i].leagues.standard.divName;

    $('#searchResults').append(
      `<li class='resultItem team'>
          <p class='id hidden'>${conferenceTeamId}</p>
          <img src=${conferenceTeamLogo} alt='${conferenceTeamName} Logo' class='teamLogo'>
          <h3 class='teamName searchItemTitle'>${conferenceTeamName}</h3>
          <p class='teamConference searchSubItem'>Conference: ${teamConference}</p>
          <p class='teamDivision searchSubItem'>Division: ${teamDivision}</p>
      </li>`
    );
  }
  $('#searchResultsContainer').removeClass('hidden');
}

const displayConf = userSelection => {
  $('#profile').addClass('confDivProfile');

  if (
    $(userSelection)
      .find('.conferenceName')
      .text() === 'Western Conference'
  ) {
    $('#profile').html(
      `
        <h2 class='sectionTitle'>General Information</h2> 
        <h2 class='confName'>Western Conference</h2>
        <p class='numTeams'><span class='vitalTitle'>Teams: </span>${currentSearchItems.length}</p>
      `
    );

    getNBAVideos('nba%20western', 'conference');
    getNBANews('nba%20western', 'conference');
    getSocialPosts('nba%20western', 'conference');
    getDivisions('Western');
  } else {
    $('#profile').html(
      `
        <h2 class='sectionTitle'>General Information</h2>
        <h2 class='confName'>Eastern Conference</h2>
        <p class='numTeams'><span class='vitalTitle'>Teams: </span>${currentSearchItems.length}</p>
      `
    );

    getNBAVideos('nba%20eastern', 'conference');
    getNBANews('nba%20eastern', 'conference');
    getSocialPosts('nba%20eastern', 'conference');
    getDivisions('Eastern');
  }

  $('#userSelectionContainer').css('display', 'grid');
};

const displayDivision = userSelection => {
  const division = $(userSelection)
    .find('.divisionName')
    .text();

  $('#profile').addClass('confDivProfile');

  $('#profile').html(
    `
      <h2 class='sectionTitle'>General Information</h2>
      <h2 class='divName'>${division}</h2>
      <p class='numTeams'><span class='vitalTitle'>Teams: </span>5</p>
    `
  );

  getNBAVideos('nba', division);
  getNBANews('nba', division);
  getSocialPosts('nba', division);
  getNBADivision(division);
};

const displayTeam = userSelection => {
  const teamId = $(userSelection)
    .find('.id')
    .text();
  let currentItem = {};

  if (currentSearchItems.length > 1) {
    currentItem = findNBATeam(teamId, currentSearchItems);
  } else {
    currentItem = currentSearchItems[0];
  }

  const tLogo = currentItem.logo;
  const tCity = currentItem.city;
  const tName = currentItem.fullName;
  const tNickname = currentItem.nickname;
  const tShortName = currentItem.shortName;
  const tConf = convertConferenceNames(currentItem.leagues.standard.confName);
  const tDiv = currentItem.leagues.standard.divName;

  $('#profile').addClass('teamProfile');

  $('#profile').html(
    `
      <h2 class="sectionTitle">General Information</h2>
      <img src=${tLogo} class='teamLogo' alt='${tName} Logo'>
      <h2 class='teamVital teamCity'>${tCity}</h2>
      <h2 class='teamVital teamNickname'>${tNickname}</h2>
      <p class='teamVital teamConference'><span class='vitalTitle'>Conference:</span> ${tConf}</p>
      <p class='teamVital teamDivision'><span class='vitalTitle'>Division:</span> ${tDiv}</p>
      `
  );

  getNBAVideos(tCity, tNickname);
  getNBANews(tCity, tNickname);
  getSocialPosts(tCity, tNickname);
  getNBATeamPlayers(teamId);

  $('#userSelectionContainer').css('display', 'grid');
};

function displayPlayer(userSelection) {
  const playerId = $(userSelection)
    .find('.id')
    .text();
  const currentItem = findNBAPlayer(playerId, currentSearchItems);

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
  const teamId = currentItem.teamId;

  if (tName === null) {
    tName = 'Free Agent';
  }

  if (pPos === '') {
    pPos = 'Unknown';
  }

  if (pNum === '') {
    pNum = 'N/A';
  }

  $('#profile').html(
    `
        <h2 class="sectionTitle">General Information</h2>
        <p class='id hidden'>${teamId}</p>
        <img src=${tLogo} class='teamLogo' alt='${tName} Logo'>
        <div class='basicDetails'>
            <h3 class = 'numPos'>#${pNum} | ${pPos}</h3>
            <div class='name'>
                <h2 class = 'firstName'>${pFirstName}</h2>
                <h2 class = 'lastName'>${pLastName}</h1>
            </div>
        </div>

        <p class = 'vital'><span class='vitalTitle'>Birth Date: </span>${pBirth}</p>
        <p class = 'vital'><span class='vitalTitle'>Height: </span>${pHeight} / ${pHeightM}m</p>
        <p class = 'vital'><span class='vitalTitle'>Weight: </span>${pWeight}lbs / ${pWeightK}kg</p>
        <p class = 'vital'><span class='vitalTitle'>College: </span>${pCollege}</p>
        <p class = 'vital'><span class='vitalTitle'>NBA Debut: </span>${pDebut}</p>
        <p class = 'vital'><span class='vitalTitle'>Years Pro: </span>${pYears}</p>
        `
  );

  getNBAVideos(pFirstName, pLastName);
  getNBANews(pFirstName, pLastName);
  getSocialPosts(pFirstName, pLastName);
  getNBATeamPlayers(teamId, playerId);

  $('#userSelectionContainer').css('display', 'grid');
}

function findNBAPlayer(player, currentSearchItems) {
  for (let i = 0; i < currentSearchItems.length; i++) {
    if (currentSearchItems[i].playerId === player) {
      return currentSearchItems[i];
    }
  }
}

function findNBATeam(team, currentSearchItems) {
  for (let i = 0; i < currentSearchItems.length; i++) {
    if (currentSearchItems[i].teamId === team) {
      return currentSearchItems[i];
    }
  }
}

const getNBAPlayer = async player => {
  try {
    const nbaPlayerRes = await fetch(
      `https://api-nba-v1.p.rapidapi.com/players/lastName/${player}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': 'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
        }
      }
    );
    const nbaPlayerData = await nbaPlayerRes.json();
    const nbaPlayers = nbaPlayerData.api.players;

    if (nbaPlayers.length === 0) {
      throw new Error(
        `There are no players in the NBA with the lastname "${player}"; please try again`
      );
    } else {
      $('#searchResultsContainer')
        .find('.error')
        .remove();
      const playersWithTeam = await getNBAPlayerTeamName(nbaPlayers);

      displayNBAPlayerSearchResults(playersWithTeam);
      currentSearchItems = playersWithTeam;
    }
  } catch (e) {
    $('.loaderSearch').remove();
    $('#searchResultsContainer').prepend(
      `
      <h2 class='error'>${e}</h2>
      `
    );
  }
};

const getNBATeamPlayers = async (...nbaItem) => {
  try {
    const nbaTeamPlayersRes = await fetch(
      `https://api-nba-v1.p.rapidapi.com/players/teamId/${nbaItem[0]}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': 'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
        }
      }
    );
    const nbaTeamPlayersData = await nbaTeamPlayersRes.json();
    const nbaTeamPlayers = nbaTeamPlayersData.api.players;

    if (nbaTeamPlayers.length === 0) {
      throw new Error(`There are no players for this team; please try again`);
    } else {
      const teamPlayers = await getNBAPlayerTeamName(nbaTeamPlayers);

      if (nbaItem.length > 1) {
        for (let i = 0; i < teamPlayers.length; i++) {
          if (teamPlayers[i].playerId === nbaItem[1]) {
            teamPlayers.splice([i], 1);
            break;
          }
        }
      }

      const newTeamPlayers = Array.from(new Set(teamPlayers));

      $('#connectedItems')
        .find('.error')
        .remove();
      displayNBATeamPlayers(newTeamPlayers);
      currentSearchItems = newTeamPlayers;
    }
  } catch (e) {
    $('#connectedItems').prepend(
      `
      <h2 class='error'>${e}</h2>
      `
    );
  }
};

const getNBAPlayerTeamName = async players => {
  try {
    const playersWithTeamName = await Promise.all(
      players.map(async player => {
        if (player.teamId !== null) {
          try {
            const nbaPlayerTeamRes = await fetch(
              `https://api-nba-v1.p.rapidapi.com/teams/teamId/${player.teamId}`,
              {
                method: 'GET',
                headers: {
                  'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                  'x-rapidapi-key':
                    'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
                }
              }
            );

            const nbaPlayerTeamData = await nbaPlayerTeamRes.json();

            const nbaPlayerTeam = nbaPlayerTeamData.api.teams;

            if (nbaPlayerTeam.length === 0) {
              throw new Error(`Error pulling team data`);
            } else {
              return {
                ...player,
                team: nbaPlayerTeam[0]
              };
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          return {
            ...player,
            team: { teamName: '' }
          };
        }
      })
    );
    return playersWithTeamName;
  } catch (e) {
    console.log(e);
  }
};

const getDivisions = conference => {
  $('#connectedItems').html(
    `
    <h2 class='divisionsTitle sectionTitle'>Divisions</h2>
    <div id='connectedItemsFlex'></div>
    `
  );

  if (conference === 'Western') {
    $('#connectedItems')
      .find('#connectedItemsFlex')
      .html(
        `
        <li class='connectedItem division'>
            <h3 class='divisionName'>Northwest</h3>
            <p>5 Teams</p>
        </li>
        <li class='connectedItem division'>
            <h3 class='divisionName'>Pacific</h3>
            <p>5 Teams</p>
        </li>
        <li class='connectedItem division'>
            <h3 class='divisionName'>Southwest</h3>
            <p>5 Teams</p>
        </li>
        `
      );
  } else {
    $('#connectedItems')
      .find('#connectedItemsFlex')
      .html(
        `
        <li class='connectedItem division'>
            <h3 class='divisionName'>Atlantic</h3>
            <p>5 Teams</p>
        </li>
        <li class='connectedItem division'>
            <h3 class='divisionName'>Central</h3>
            <p>5 Teams</p>
        </li>
        <li class='connectedItem division'>
            <h3 class='divisionName'>Southeast</h3>
            <p>5 Teams</p>
        </li>
        `
      );
  }
};

const displayRecentVideos = videos => {
  const youTubeVideoLink = `https://www.youtube.com/watch?v=`;

  $('#highlights').empty();

  if (videos.items.length !== 0) {
    $('#highlights').html(`<h2 class='sectionTitle'>Recent Videos</h2>`);
    for (let i = 0; i < videos.items.length; i++) {
      const vId = videos.items[i].id.videoId;
      const vThumb = videos.items[i].snippet.thumbnails.high.url;
      const vTitle = truncateVideoTitle(videos.items[i].snippet.title);
      const vChannel = videos.items[i].snippet.channelTitle;

      if (i === 0) {
        $('#highlights').append(
          `
          <div class='video'>
              <a href='${youTubeVideoLink}${vId}' target='_blank'><img src=${vThumb} alt='${vTitle}' class='videoThumb'>
                <div class='vDetails'>
                  <h2 class='thumbTitle'>${vTitle}</h2>
                  <p class='vChannel'>${vChannel}</p>
                </div>
              </a>
          </div>
          `
        );
      } else {
        $('#highlights').append(
          `
          <div class='video hover'>
              <a href='${youTubeVideoLink}${vId}' target='_blank'><img src=${vThumb} alt='${vTitle}' class='videoThumb'>
                <div class='vDetails'>
                  <h2 class='thumbTitle'>${vTitle}</h2>
                  <p class='vChannel'>${vChannel}</p>
                </div>
              </a>
          </div>
          `
        );
      }
    }

    $('#highlightsMobile').html(
      `
      <h2 class='sectionTitle'>Recent Videos</h2>
      <div id='videoFlex' class='scroll'></div>
      `
    );

    for (let i = 0; i < videos.items.length; i++) {
      const vId = videos.items[i].id.videoId;
      const vThumb = videos.items[i].snippet.thumbnails.high.url;
      const vTitle = truncateVideoTitle(videos.items[i].snippet.title);
      const vChannel = videos.items[i].snippet.channelTitle;

      $('#highlightsMobile')
        .find('#videoFlex')
        .append(
          `
          <div class='videoMobile'>
              <a href='${youTubeVideoLink}${vId}' target='_blank'><img src=${vThumb} alt='${vTitle}' class='videoThumbMobile'>
                <div class='vDetailsMobile'>
                  <h2 class='thumbTitleMobile'>${vTitle}</h2>
                  <p class='vChannelMobile'>${vChannel}</p>
                </div>
              </a>
          </div>
        `
        );
    }
  } else {
    $('#highlights').html(
      `
      <h2 class='noData'>There are no videos to display</h2>
      `
    );
  }
};

const truncateVideoTitle = videoTitle => {
  videoTitle = videoTitle.slice(0, 60);
  return `${videoTitle}...`;
};

const truncateTitle = title => {
  title = title.slice(0, 24);
  return `${title}...`;
};

const truncateContent = content => {
  content = content.slice(0, 46);
  return `${content}...`;
};

const truncateAuthor = author => {
  if (author === null) {
    return author;
  } else if (author.length > 15 && /\s/.test(author) === false) {
    author = author.slice(0, 15);
    return author;
  }
};

const displayRecentNews = articles => {
  $('#news').empty();

  if (articles.length !== 0) {
    $('#news').html(`<h2 class='sectionTitle'>Popular News</h2>`);
    for (let i = 0; i < articles.length; i++) {
      const aImg = articles[i].urlToImage;
      const aTitle = truncateTitle(articles[i].title);
      const aSource = articles[i].source.name;
      const aDesc = truncateContent(articles[i].description);
      let aAuthor = truncateAuthor(articles[i].author);
      const aUrl = articles[i].url;
      const aDate = convertDate(articles[i].publishedAt);

      if (aAuthor === null) {
        aAuthor = 'Author Unknown';
      }

      $('#news').append(
        `
        <a href='${aUrl}' class='article' target='_blank'>
            <div class='articleContainer'>
                <img src='${aImg}' class='articleImg' alt='${aTitle} article thumbnail'>
                <div class='newsText'>
                    <h2 class='newsTitle'>${aTitle}</h2>
                    <p class='newsDesc'>${aDesc}</p>
                    <p class='newsSource'>${aSource} | ${aAuthor}</p>
                    <p class='newsPubDate'>${aDate}</p>
                </div>
            </div>
        </a>
        `
      );
    }
  } else {
    $('#news').html(
      `
      <h2 class='noData'>There are no articles to display</h2>
      `
    );
  }
};

const displayRecentSocial = posts => {
  // $('#social').empty();

  if (posts !== 0) {
    $('#social').html(`<h2 class='sectionTitle'>Recent Social Media</h2>`);

    for (let i = 0; i < posts.length; i++) {
      const postNetwork = posts[i].network;
      const postImg = posts[i].image;
      const postContent = truncateContent(posts[i].text);
      const postUrl = posts[i].url;
      const postDate = convertDate(posts[i].posted);

      if (postImg === undefined) {
        $('#social').append(
          `
          <a href=${postUrl} class='post' target='_blank'>
              <div>
                  <p class = 'postContent'>${postContent}</p>
                  <p class = 'postDate'>${postDate}</p>
                  <p class = 'network'>${postNetwork}</p>
              </div>
          </a>
          `
        );
      } else {
        $('#social').append(
          `
          <a href=${postUrl} class='post' target='_blank'>
              <div>
                  <img src=${postImg} class = 'postImg' alt = '${postNetwork} Post'>
                  <p class = 'postContent'>${postContent}</p>
                  <p class = 'postDate'>${postDate}</p>
                  <p class = 'network'>${postNetwork}</p>
              </div>
          </a>
          `
        );
      }
    }
  }
};

function getNBATeam(team) {
  const fetchNBATeam = async () => {
    try {
      const nbaTeamRes = await fetch(
        `https://api-nba-v1.p.rapidapi.com/teams/nickName/${team}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key':
              'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
          }
        }
      );
      const nbaTeamData = await nbaTeamRes.json();
      const nbaTeams = nbaTeamData.api.teams;

      if (nbaTeams.length === 0) {
        throw new Error(
          `There are no teams in the NBA with the name "${team}"; please try again`
        );
      } else {
        $('#searchResultsContainer')
          .find('.error')
          .remove();
        displayNBATeamSearchResults(nbaTeams);
        currentSearchItems = nbaTeams;
      }
    } catch (e) {
      $('.loaderSearch').remove();
      $('#searchResultsContainer').prepend(
        `
        <h2 class='error'>${e}</h2>
        `
      );
    }
  };

  fetchNBATeam();
}

const getNBAConference = async conference => {
  try {
    const nbaConferenceRes = await fetch(
      `https://api-nba-v1.p.rapidapi.com/teams/confName/${conference}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': 'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
        }
      }
    );
    const nbaConferenceData = await nbaConferenceRes.json();
    const nbaConference = nbaConferenceData.api.teams;

    if (nbaConference.length === 0) {
      throw new Error(
        `There is no conference in the NBA by the name "${conference}"; please try again`
      );
    } else {
      for (let i = 0; i < nbaConference.length; ) {
        if (nbaConference[i].allStar === '1') {
          nbaConference.splice([i], 1);
        } else {
          i++;
        }
      }

      $('#searchResultsContainer')
        .find('.error')
        .remove();

      displayNBAConferenceSearchResults(conference, nbaConference);
      currentSearchItems = nbaConference;
    }
  } catch (e) {
    $('.loaderSearch').remove();
    $('#searchResultsContainer').prepend(
      `
      <h2 class='error'>${e}</h2>
      `
    );
  }
};

const getNBADivision = async division => {
  try {
    const nbaDivisionRes = await fetch(
      `https://api-nba-v1.p.rapidapi.com/teams/divName/${division}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': 'cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93'
        }
      }
    );

    const nbaDivisionData = await nbaDivisionRes.json();
    const nbaDivisionTeams = nbaDivisionData.api.teams;

    if (nbaDivisionTeams.length === 0) {
      throw new Error(
        `There is no division in the NBA by the name "${division}"; please try again`
      );
    } else {
      displayDivisionTeams(division, nbaDivisionTeams);
      currentSearchItems = nbaDivisionTeams;
    }
  } catch (e) {
    $('#searchResultsContainer').prepend(
      `
      <h2 class='error'>${e}</h2>
      `
    );
  }
};

const getNBANews = async (...nbaItem) => {
  try {
    const nbaNewsRes = await fetch(
      `https://newsapi.org/v2/everything?q=${nbaItem[0]}-${nbaItem[1]}&sortBy=latest`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': 'bbbae998198647ef8f363a9b624282de'
        }
      }
    );
    const nbaNews = await nbaNewsRes.json();

    if (nbaNews.status === 'error') {
      throw new Error(nbaNews.message);
    }

    const articles = nbaNews.articles.slice(0, 5);
    displayRecentNews(articles);
  } catch (e) {
    console.log(e);
  }
};

const getNBAVideos = async (...nbaItem) => {
  try {
    const nbaVideosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${nbaItem[0]}%20${nbaItem[1]}&safeSearch=strict&key=${youtubeAPIKey}`
    );

    const nbaVideos = await nbaVideosRes.json();

    if (!nbaVideosRes.ok) {
      throw new Error(nbaVideos.error.message);
    }

    displayRecentVideos(nbaVideos);
    return nbaVideos;
  } catch (e) {
    console.log(e);
  }
};

const getSocialFB = async nbaItem => {
  try {
    const nbaSocialFBRes = await fetch(
      `https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&network=facebook&lang=en&type=video,photo,status&key=${socialAPIKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    );
    const nbaSocialFB = await nbaSocialFBRes.json();
    const facebookPosts = nbaSocialFB.posts;

    if (!nbaSocialFBRes.ok) {
      throw new Error(nbaSocialFB.meta.message);
    }

    return facebookPosts;
  } catch (e) {
    console.log(e);
  }
};

const getSocialTW = async nbaItem => {
  try {
    const nbaSocialTWRes = await fetch(
      `https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&lang=en&network=twitter&type=video,photo,status&key=${socialAPIKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    );
    const nbaSocialTW = await nbaSocialTWRes.json();
    const twitterPosts = nbaSocialTW.posts;

    if (!nbaSocialTWRes.ok) {
      throw new Error(nbaSocialTW.meta.message);
    }

    return twitterPosts;
  } catch (e) {
    console.log(e);
  }
};

const getSocialInsta = async nbaItem => {
  try {
    const nbaSocialInstaRes = await fetch(
      `https://api.social-searcher.com/v2/search?q=${nbaItem[0]}%20${nbaItem[1]}&network=instagram&lang=en&type=video,photo,status&key=${socialAPIKey}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }
    );
    const nbaSocialInsta = await nbaSocialInstaRes.json();
    const instaPosts = nbaSocialInsta.posts;

    if (!nbaSocialInstaRes.ok) {
      throw new Error(nbaSocialInsta.meta.message);
    }
    return instaPosts;
  } catch (e) {
    console.log(e);
  }
};

const getSocialPosts = async (...nbaItem) => {
  try {
    let instaPosts = await getSocialInsta(nbaItem);
    let fbPosts = await getSocialFB(nbaItem);
    let twPosts = await getSocialTW(nbaItem);

    const posts = [...instaPosts, ...fbPosts, ...twPosts];

    for (let i = 0; i < posts.length; ) {
      if (posts[i].type === 'link' || posts[i].lang !== 'en') {
        posts.splice([i], 1);
      } else {
        i++;
      }
    }

    let randomPosts = shuffle(posts);
    const postDiff = randomPosts.length - 6;
    if (postDiff > 0) {
      randomPosts = randomPosts.splice(randomPosts.length - postDiff);
    }
    displayRecentSocial(posts);
  } catch (e) {
    console.log(e);
  }
};

const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let a = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[a]] = [arr[a], arr[i]];
  }

  return arr;
};

function getSupportingData() {
  getNBANews();
  getNBAVideos();
  getNBASocial();
}

const searchLoader = () => {
  $('#searchResults').append(
    `
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    
    <div class='loaderSearch'>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
      <div class='load loaderSearchText'></div>
    </div>
    `
  );
};

const socialLoader = () => {
  $('#social').html(
    `
    <h2 class='sectionTitle'>Recent Social Media</h2>
    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>

    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>

    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>

    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>

    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>

    <div class='loaderPost'>
        <div class='load loaderImg'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
        <div class='load loaderText'></div>
    </div>
    `
  );
};

const connectedItemLoader = () => {
  $('#connectedItems').html(
    `
      <h2 class='sectionTitle'>Connected Items</h2>

      <div id='loaderGrid'>
        <div class='loaderConnectedItem'>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
        </div>
        <div class='loaderConnectedItem'>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
        </div>
        <div class='loaderConnectedItem'>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
          <div class='load loaderSearchText'></div>
        </div>
      </div>
    `
  );
};

function searchTypeController() {
  $('#teamButton').click(function() {
    $(this).addClass('hidden');
    $('#playerButton').removeClass('hidden');
    $('#conferenceButton').removeClass('hidden');

    $('#nbaTeamSearch').removeClass('hidden');
    $('#nbaPlayerSearch').addClass('hidden');
    $('#nbaConferenceSearch').addClass('hidden');
  });

  $('#conferenceButton').click(function() {
    $(this).addClass('hidden');
    $('#playerButton').removeClass('hidden');
    $('#teamButton').removeClass('hidden');

    $('#nbaConferenceSearch').removeClass('hidden');
    $('#nbaPlayerSearch').addClass('hidden');
    $('#nbaTeamSearch').addClass('hidden');
  });

  $('#playerButton').click(function() {
    $(this).addClass('hidden');
    $('#teamButton').removeClass('hidden');
    $('#conferenceButton').removeClass('hidden');

    $('#nbaPlayerSearch').removeClass('hidden');
    $('#nbaConferenceSearch').addClass('hidden');
    $('#nbaTeamSearch').addClass('hidden');
  });
}

function clearData() {
  $(`#profile`).empty();
  $(`#highlights`).empty();
  $(`#news`).empty();
  $(`#social`).empty();
  $(`#connectedItems`).empty();
}

function watchPlayerForm() {
  $('#nbaPlayerSearch').submit(event => {
    event.preventDefault();
    $('#searchResults').empty();

    $('#mainSearch').css('top', '15%');

    clearData();
    $(`#userSelectionContainer`).css('display', 'none');

    const playerLastName = $('#playerLastName').val();

    $('#searchResultsContainer').removeClass('hidden');
    searchLoader();

    getNBAPlayer(playerLastName);
  });
}

function watchTeamForm() {
  $('#nbaTeamSearch').submit(event => {
    event.preventDefault();
    $('#searchResults').empty();

    $('#mainSearch').css('top', '15%');

    clearData();
    $(`#userSelectionContainer`).css('display', 'none');

    const teamName = $('#teamName').val();

    $('#searchResultsContainer').removeClass('hidden');
    searchLoader();

    getNBATeam(teamName);
  });
}

function watchConferenceForm() {
  $('#nbaConferenceSearch').submit(event => {
    event.preventDefault();
    $('#searchResults').empty();

    $('#mainSearch').css('top', '15%');

    clearData();
    $(`#userSelectionContainer`).css('display', 'none');

    let conferenceName = $('#conferenceName').val();

    if (conferenceName === 'western' || conferenceName === 'Western') {
      conferenceName = 'west';
    } else if (conferenceName === 'eastern' || conferenceName === 'Eastern') {
      conferenceName = 'east';
    }

    $('#searchResultsContainer').removeClass('hidden');
    searchLoader();

    getNBAConference(conferenceName);
  });
}

function searchResultClickListener() {
  $('#searchResults').on('click', '.resultItem', function() {
    $('#searchResultsContainer').addClass('hidden');
    $(this).addClass('selected');

    if ($(this).hasClass('player')) {
      const team = $(this)
        .find('.team')
        .text();
      socialLoader();
      connectedItemLoader();

      displayPlayer(this);
    } else if ($(this).hasClass('team')) {
      const team = $(this)
        .find('.teamName')
        .text();

      socialLoader();
      connectedItemLoader();

      displayTeam(this);
    } else if ($(this).hasClass('conference')) {
      socialLoader();
      displayConf(this);
    }
  });
}

const connectedItemCLickListener = () => {
  $('#connectedItems').on('click', '.connectedItem', function() {
    clearData();
    $(this).addClass('selected');

    if ($(this).hasClass('player')) {
      socialLoader();
      connectedItemLoader();

      displayPlayer(this);
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    } else if ($(this).hasClass('division')) {
      socialLoader();
      connectedItemLoader();

      displayDivision(this);
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    } else if ($(this).hasClass('team')) {
      socialLoader();
      connectedItemLoader();

      displayTeam(this);
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
};

function listeners() {
  watchPlayerForm();
  watchTeamForm();
  watchConferenceForm();
  searchTypeController();
  searchResultClickListener();
  connectedItemCLickListener();
}

$(listeners);
