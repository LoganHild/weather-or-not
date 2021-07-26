//add searches to localStorage for easy searching.
//added underneath searchbar in <aside> to be clicked. Maybe do it how the last assignment was done with assigning it a data-value and using that to getItem
//when stored searches are clicked, same process happens as if it was searched. 
var inputValue = $('.search');
var searchBtn = $('.searchBtn');
var storedSearches = $('.storedSearches')

function saveSearch(event) {
    event.preventDefault();

    if (inputValue !== null) {
        localStorage.setItem("search", inputValue.val());
    }
}
searchBtn.on('click', saveSearch)

//using the input value, gets data from weather API on search button click
function fetchWeather() {
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+ inputValue.val() + '&units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var nameValue = data.name;
            $('.name').text(nameValue);
            
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            function uviFetch() {
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +'&lon=' + longitude + '&units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    var weatherDesc = data.current.weather[0].main;
                    $('.weather').text('Weather: ' + weatherDesc);
                    var weatherIcon = data.current.weather[0].icon;
                    $('.weatherIcon').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
                    $('.weatherIcon').addClass('iconSizing')
                    var tempValue = data.current.temp;
                    $('.temp').text('Temperature: ' + tempValue + '° F');
                    var humidityValue = data.current.humidity;
                    $('.humidity').text('Humidity: ' + humidityValue + "%");
                    var uvValue = data.current.uvi;
                    $('.uvIndex').text('UV Index: ' + uvValue);
                    var windValue = data.current.wind_speed;
                    $('.wind').text('Wind Speed: ' + windValue + "mph");
                    var dateValue = data.current.dt;
                    var newDate = moment.unix(dateValue).format("MM/DD/YYYY");
                    $('.date').text(newDate);

                    function uvColor() {
                        uvIndex = $('.uvIndex');
                        if (uvValue >=0 && uvValue < 3) {
                            uvIndex.addClass('favorable');
                            uvIndex.removeClass('severe');
                            uvIndex.removeClass('moderate')
                        } else if (uvValue >= 3 && uvValue < 6) {
                            uvIndex.addClass('moderate');
                            uvIndex.removeClass('severe');
                            uvIndex.removeClass('favorable');
                        } else if (uvValue >= 6) {
                            uvIndex.addClass('severe');
                            uvIndex.removeClass('moderate');
                            uvIndex.removeClass('favorable');
                        }
                    }
                    uvColor();
                })
            }
            uviFetch();
        })
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.val() + '&units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //date, icon, temp, humidity
            console.log(data);
            var nameValue = data.city.name;
            $('.forecastNameOne').text(nameValue);
            var dateValue = data.list[1].dt;
            //add rest of date
            var weatherIcon = data.list[1].weather[0].icon;
            //add rest of icon
            var tempValue = data.list[1].main.temp;
            var humidityValue = data.list[1].main.humidity;

        })
}
searchBtn.on("click", fetchWeather)