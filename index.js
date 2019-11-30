const youtubeAPIKey = 'AIzaSyBOeJM_9wrehRc1wH9v-gJE-RFsmjbuwps'

function getNBAPlayer() {
    
    const fetchNBAPlayer = async () => {
        try {
            const nbaPlayerRes = await fetch("https://api-nba-v1.p.rapidapi.com/players/lastName/harden", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const nbaPlayerData = await nbaPlayerRes.json();

            if(nbaPlayerData.api.players.length === 0){
                // provide input value once developed
                throw new Error('There are no players in the NBA with the lastname "Hard"; please try again');
            } else {
                console.log(nbaPlayerData);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayer();
}

function getNBAPlayerNews() {
    const fetchNBAPlayerNews = async () => {
        try {
            const nbaPlayerNewsRes = await fetch("https://newsapi.org/v2/everything?q=james-harden", {
                "method": "GET",
                "headers": {
                    "X-Api-Key": "bbbae998198647ef8f363a9b624282de"
                }
            })
            const nbaPlayerNews = await nbaPlayerNewsRes.json();

            if(nbaPlayerNews.status === 'error'){
                throw new Error(nbaPlayerNews.message);
            }
            
            console.log(nbaPlayerNews);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayerNews();
}

function getNBAPlayerVideos() {
    const fetchNBAPlayerVideos = async () => {
        try {
            const nbaPlayerVideosRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=James%20Harden&safeSearch=strict&key=${youtubeAPIKey}`)

            const nbaPlayerVideos = await nbaPlayerVideosRes.json();

            if(!nbaPlayerVideosRes.ok){
                throw new Error(nbaPlayerVideos.error.message);
            }
            
            console.log(nbaPlayerVideos);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayerVideos();
}

function getNBAPlayerSocial() {
    const fetchNBAPlayerSocial = async () => {
        try {
            const nbaPlayerSocialRes = await fetch("https://api.social-searcher.com/v2/search?q=james%20harden&network=facebook&key=626e71bd528d38b317758d064c6441c7", {
                "method": "GET",
                "headers": {
                    'Accept':'application/json'
                }
            })
            const nbaPlayerSocial = await nbaPlayerSocialRes.json();

            if(!nbaPlayerSocialRes.ok){
                throw new Error(nbaPlayerSocial.meta.message);
            }
            
            console.log(nbaPlayerSocial);

        } catch(e) {
            console.log(e);
        }
    }

    fetchNBAPlayerSocial();
}

function watchForms() {
    $('#nbaPlayerSearch').submit(event => {
        event.preventDefault();

        getNBAPlayer();
    })

    $('#nbaPlayerNewsSearch').submit(event => {
        event.preventDefault();

        getNBAPlayerNews();
    })
    
    $('#nbaPlayerVideoSearch').submit(event => {
        event.preventDefault();

        getNBAPlayerVideos();
    })

    $('#nbaPlayerSocialSearch').submit(event => {
        event.preventDefault();

        getNBAPlayerSocial();
    })
}

$(watchForms);