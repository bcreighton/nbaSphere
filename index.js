function getData() {
    console.log('Getting data...');

    const nbaHeaders = new Headers();
    
    const fetchData = async () => {
        try {
            const dataRes = await fetch("https://api-nba-v1.p.rapidapi.com/players/lastName/hard", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const data = await dataRes.json();
            debugger;

            if(data.api.players.length === 0){
                throw new Error('There are no players in the NBA with the lastname "Hard"; please try again');
            }
            console.log(data);
        } catch(e) {
            console.log(e);
        }
    }

    fetchData();
}

function watchForm() {
    console.log('Waiting for submission...');

    $('form').submit(event => {
        event.preventDefault();

        getData();
    })
}

$(watchForm);