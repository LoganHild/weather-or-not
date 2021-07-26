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

            //uses values from first API to fetch another
            function uviFetch() {
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +'&lon=' + longitude + '&units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    //adds data to html
                    var weatherDesc = data.current.weather[0].main;
                    $('.weather').text('Weather: ' + weatherDesc);
                    var weatherIcon = data.current.weather[0].icon;
                    $('.weatherIcon').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
                    $('.weatherIcon').attr('alt', 'Weather Icon');
                    var tempValue = data.current.temp;
                    $('.temp').text('Temperature: ' + tempValue + '° F');
                    var humidityValue = data.current.humidity;
                    $('.humidity').text('Humidity: ' + humidityValue + '%');
                    var uvValue = data.current.uvi;
                    $('.uvIndex').text('UV Index: ' + uvValue);
                    var windValue = data.current.wind_speed;
                    $('.wind').text('Wind Speed: ' + windValue + 'mph');
                    var dateValue = data.current.dt;
                    var newDate = moment.unix(dateValue).format('MM/DD/YYYY');
                    $('.date').text(newDate);

                    //changes color of UVI
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
    
    //fetches forecast for 5 days
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + inputValue.val() + '&units=imperial&id=524901&appid=0fe3cfd026afb76b1605f15581136ad8')
        .then(function(response) {
            return response.json();
        })

        //adds data to html
        .then(function(data) {
            //forecast, tomorrow
            var startDate = moment();
            dateOne = startDate.add(1, 'days');
            dateOne = startDate.format('MM/DD/YYYY');
            $('#dateOne').text(dateOne);
            var weatherIcon = data.list[1].weather[0].icon;
            $('#weatherIconOne').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            var tempValue = data.list[1].main.temp;
            $('#tempOne').text('Temperature: ' + tempValue);
            var humidityValue = data.list[1].main.humidity;
            $('#humidityOne').text('Humidity: ' + humidityValue);

            //forecast, second day
            dateTwo = startDate.add(1, 'days');
            dateTwo = startDate.format('MM/DD/YYYY');
            $('#dateTwo').text(dateTwo);
            var weatherIcon = data.list[2].weather[0].icon;
            $('#weatherIconTwo').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            var tempValue = data.list[2].main.temp;
            $('#tempTwo').text('Temperature: ' + tempValue);
            var humidityValue = data.list[2].main.humidity;
            $('#humidityTwo').text('Humidity: ' + humidityValue);

            //forecast, third day
            dateThree = startDate.add(1, 'days');
            dateThree = startDate.format('MM/DD/YYYY');
            $('#dateThree').text(dateThree);
            var weatherIcon = data.list[3].weather[0].icon;
            $('#weatherIconThree').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            var tempValue = data.list[3].main.temp;
            $('#tempThree').text('Temperature: ' + tempValue);
            var humidityValue = data.list[3].main.humidity;
            $('#humidityThree').text('Humidity: ' + humidityValue);

            //forecast, fourth day
            dateFour = startDate.add(1, 'days');
            dateFour = startDate.format('MM/DD/YYYY');
            $('#dateFour').text(dateFour);
            var weatherIcon = data.list[4].weather[0].icon;
            $('#weatherIconFour').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            var tempValue = data.list[4].main.temp;
            $('#tempFour').text('Temperature: ' + tempValue);
            var humidityValue = data.list[4].main.humidity;
            $('#humidityFour').text('Humidity: ' + humidityValue);

            //forecast, fifth day
            dateFive = startDate.add(1, 'days');
            dateFive = startDate.format('MM/DD/YYYY');
            $('#dateFive').text(dateFive);
            var weatherIcon = data.list[5].weather[0].icon;
            $('#weatherIconFive').attr('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
            var tempValue = data.list[5].main.temp;
            $('#tempFive').text('Temperature: ' + tempValue);
            var humidityValue = data.list[5].main.humidity;
            $('#humidityFive').text('Humidity: ' + humidityValue);
        })
}
searchBtn.on("click", fetchWeather)