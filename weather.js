const weather = document.querySelector(".js-weather");

const API_KEY = "9b74871bff5eb81b1a849bd0eee02071";

const COORDS = 'coords';
// 날짜 정보 가져오기
function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    // then 위에 메서드가 실행되고 끝나면 실행,
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        // 온도 가져오기
        const temperature = json.main.temp;
        // 지역이름 가져오기
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`; 
    });
}

// 위치 저장하는 메서드
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
// 위치를 허용할 때
function handleGeoSucces(position){
    // 본인의 위도, 경도 가져오기
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // 객체로 만들기, 객체의 변수명과 저장할 변수명이 같으면 생략가능
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
// 위치 허용 거절할 때
function handleGeoError(){

}
// 좌표를 저장해도 되는지 위치 허용을 묻는다.
function askForCoords(){
    // 결과가 true이면 첫번째 실행, false면 두번째 실행
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    // 저장된 위치 정보가 없을경우
    if(loadedCoords === null){
        askForCoords();
    }
    // 저장된 위치 정보가 있을경우
    else {
        // getWeather
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();