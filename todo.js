// 클래스명이 js-toDoForm인 클래스 가져오기
const toDoForm = document.querySelector(".js-toDoForm"),
    // toDoForm의 input가져오기
    toDoInput = toDoForm.querySelector("input"),
    // 클래스명이 js-toDoList인 클래스 가져오기
    toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';
// li를 저장할 배열
let toDos = [];
// localStorage에 li를 담은 배열을 저장하는 메서드

// delBtn 클릭했을 때 실행 메서드
function deleteToDo(event){
    // 클릭한 target을 저장 후
    const btn = event.target;
    // 그 target의 부모가 누구인지 저장
    const li = btn.parentNode;
    // HTML에서 ul의 클래스명toDoList-->li들을 가지고 있는 목록, 에서 클릭한 해당 li삭제
    toDoList.removeChild(li);
    // filter는 array의 모든 아이템을 통해 함수를 실행하고
    // 그리고 ture인 아이템들만 가지고 새로운 array를 만든다.
    // 내가 클릭한 값과 다른 나머지들을 array로 만든다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // 나머지들을 array로 만들었기 때문에 그 값을 toDos배열에 넣어주기.
    toDos = cleanToDos;
    // 배열을 다시 저장하기
    saveToDos();
}

function saveToDos() {
    // JSON === Javascript Object Notation // 데이터를 전달할 때 그걸 다룰 수 있도록 object로 바꿔주는 기능
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// newId오류 방지 // 중복 Id값 방지
let idNumbers = 1;
// 입력한 input값 받아서 메서드 실행
function paintToDo(text){
    // li생성
    const li = document.createElement("li");
    // button생성
    const delBtn = document.createElement("button");
    // span생성
    const span = document.createElement("span");
    // 해당 투두리스트에 번호 매겨주는 변수, index는 0부터 시작이여서 + 1 증가시키기
    const newId = idNumbers;
    idNumbers += 1;
    // button에 이모지넣기
    delBtn.innerHTML = "❌";
    // delBtn을 클릭했을 때 이벤트발생, deleteToDO메서드 실행시키기
    delBtn.addEventListener("click", deleteToDo);
    // span에 input에 입력한 값 넣기
    span.innerText = text;
    // li에 버튼 넣기
    li.appendChild(delBtn);
    // li에 input값 넣기, 그냥 text로 넣으면 적용 불가능, span으로 묶어서 삽입
    li.appendChild(span);
    li.id = newId;
    // toDoList에 li추가하기, toDoList--> ul태그의 클래스명
    toDoList.appendChild(li);
    // 리스트를 하나 만들 때 마다 toDos[] 배열에 저장하기
    // 리스트의 객체 생성
    const toDoObj = {
        // text: 에는 input 데이터값 저장
        text: text,
        // id: 에는 toDos.length + 1;의 값을 저장한 변수 저장
        id: newId
    };
    // toDos[]배열에 toDoObj객체 넣기
    toDos.push(toDoObj);
    // saveToDos()메서드 실행
    saveToDos();
}

function handleSubmit(event){
    // 입력하면 커서 창 초기화
    event.preventDefault();
    // 입력한 input값 저장
    const currentValue = toDoInput.value;
    // paintToDo()메서드 실행, 인자로 입력한 input값 셋팅
    paintToDo(currentValue);
    // 입력했던 input값 초기화
    toDoInput.value = "";
}
// 아직 미작성, localStorage에 저장되있는값 불러오기
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // JSON === Javascript Object Notation // 데이터를 전달할 때 그걸 다룰 수 있도록 object로 바꿔주는 기능
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach는 array함수로 array하나마다 함수를 실행시킨다.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }) 
    }
}
// loadToDos()메서드 실행과 class명이 toDoForm을 sumbit했을때 handleSubmit메서드 실행
function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();