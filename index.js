function getData() {
    
    const fetchData = async () => {
        try {
            const dataRes = await fetch("https://api-nba-v1.p.rapidapi.com/players/lastName/johnso", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const data = await dataRes.json();

            if(data.api.players.length === 0){
                throw new Error('There are no players in the NBA with the lastname "Hard"; please try again');
            } else {
                console.log(data);
            }
        } catch(e) {
            console.log(e);
        }
    }

    fetchData();
}

function watchForm() {
    $('#nbaPlayerSearch').submit(event => {
        event.preventDefault();

        getData();
    })
}

$(watchForm);