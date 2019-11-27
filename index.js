function getData() {
    console.log('Getting data...');

    const nbaHeaders = new Headers();
    
    const fetchData = async () => {
        try {
            const dataRes = await fetch("https://api-nba-v1.p.rapidapi.com/players/lastName/harden", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
                    "x-rapidapi-key": "cfc420df64msha7a3397e1f4de3ep182cedjsnca0bd8135c93"
                }
            })
            const data = await dataRes.json();
            console.log(data);
        } catch(e) {
            console.log('Something went wrong...');
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