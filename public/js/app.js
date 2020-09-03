const form = document.querySelector('.getWeather')
const para1 = document.querySelector('.weather1')
const para2 = document.querySelector('.weather2')
const input = document.querySelector('.address')

const place = [];

input.focus();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = input.value

    para1.textContent = 'Loading...'
    para2.textContent = ''

    // fetch is a browser api used for fetching data from some url from client system
    fetch("/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            if (data.error) para1.textContent = data.error
            else {
                console.log('app.js', data);
                const address = data.address;
                let add = "";
                if(address.station) add += address.station + " ,";
                if(address.city) add += address.city + " ,";
                if(address.state) add += address.state + " ,";
                if(address.country) add += address.country;

                let w = `
                <div class="weather-detail">
                    Longitute: ${data.forecast.coordinate.lng}<br>
                    Latitude: ${data.forecast.coordinate.lat}<br>
                    Location: ${add}<br>
                    Description: ${data.forecast.desc}>br>
                    Temperature: ${data.forecast.temp}<br>
                    <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.forecast.icon}@2x.png">
                </div>
                `
                para1.textContent = data.address
                para2.innerHTML = w
            }
            
            document.querySelector('.address').value = "";
        });
    });

})