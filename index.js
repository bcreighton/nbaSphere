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

function watchForms() {
    $('#nbaPlayerSearch').submit(event => {
        event.preventDefault();

        getNBAPlayer();
    })

    $('#nbaPlayerNewsSearch').submit(event => {
        event.preventDefault();

        getNBAPlayerNews();
    })
}

$(watchForms);