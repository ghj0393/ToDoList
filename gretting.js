const form = document.querySelector(".js-form");
const input = document.querySelector("input");
// h4태그에 해당하는 클래스명
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

// 입력받은 text값을 저장하는 메서드
function saveName(text) {
    // USER_LS변수에 저장된 currentUser라는 이름과 text를 저장한다, 
    // key - value와 같음, java의 해쉬맵? 과 같다고 생각 맞는지 잘 모르겠다 ㅋㅋ
    localStorage.setItem(USER_LS, text);
}

// 저장된 이름이 있을 경우 실행되는 메서드, 파라미터로 이름값 받음
function paintGreeting(text){
    // form의 classList에서 SHOWING_CN을 지워준다, 안지우면 이름읆 묻는 텍스트 출력되기 때문에
    form.classList.remove(SHOWING_CN);
    // h4태그의 classList에 SHOWING_CN클래스 생성.
    greeting.classList.add(SHOWING_CN);
    // h4태그의 텍스트 변경, Hello + 이름
    greeting.innerText = `Hello ${text}`
}

function handleSubmit(event) {
    // 입력하면 사라지는 기본 디폴트 값, 설정안하면 입력했을때 변화없음.
    event.preventDefault();
    // input에 입력한 값 가져오기
    const currentValue = input.value;
    // paintGreeting()메서드 실행시키기
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    // form의 classList에 SHOWING_CN을 추가한다. SHOWING_CN -> "showing" -- > 이 클래스는 css에서 효과적용중
    form.classList.add(SHOWING_CN);
    // form을 submit액션을 취했을때 handleSubmit메서드 실행시키기
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    // localStorage에 저장된 USER_LS에 해당하는 값을 가져온다.
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        // 저장된 이름이 없을 경우 이름을 묻는 askForName(); 메서드 실행
        askForName();
    }else{
        // 저장된 이름이 있을 경우 paintGreeting(); 메서드 실행 인자 값으로 입력되어있는 이름값 보내기
        paintGreeting(currentUser);
    }
}



function init(){
    loadName();
}

init();