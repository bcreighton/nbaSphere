function getData() {
    console.log('Getting data...');

    const nbaHeaders = new Headers();
    
    const fetchData = async () => {
        try {
            const dataRes = await fetch('https://api.social-searcher.com/v2/users?q=barak%20obama&key=626e71bd528d38b317758d064c6441c7&network=facebook');
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