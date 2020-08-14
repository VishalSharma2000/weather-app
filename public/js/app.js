const form = document.querySelector('.getWeather')
const para1 = document.querySelector('.weather1')
const para2 = document.querySelector('.weather2')
const input = document.querySelector('.address')

input.focus();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const address = input.value

    para1.textContent = 'Loading...'
    para2.textContent = ''

    // fetch is a browser api used for fetching data from some url from client system
    fetch("http://localhost:3000/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            if (data.error) para1.textContent = data.error
            else {
                let w = `
                    Longitute: ${data.forecast.coordinate.lon}<br>
                    Latituee: ${data.forecast.coordinate.lat}<br>
                    Location: ${address} , ${data.forecast.country}<br>
                    Forecast: ${data.forecast.forecast}<br>
                    <img src="http://openweathermap.org/img/wn/${data.forecast.icon}@2x.png">
                `
                para1.textContent = data.address
                para2.innerHTML = w
            }
            
            document.querySelector('.address').value = "";
        });
    });

})