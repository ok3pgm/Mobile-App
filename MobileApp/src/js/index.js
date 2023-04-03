const DOM = {
    selectbox: document.getElementById('selectbox'),
    selectboxList: document.querySelector('.selectbox__list'),
    rooms: document.getElementById('rooms'),
    power: document.querySelector('.power'),
    Temperature: document.querySelector('.first_settings__screen'),
    Lights: document.querySelector('.second_settings__screen'),
    settings: document.querySelector('.settings'),
    settingsTabs: document.querySelector('.settings__tabs'),
    setting__screens: document.querySelector('.setting__screens'),
    option: document.querySelector('.option'),
    infoTemp: document.querySelector('.first_span'),
    TemperatureBtn: document.querySelector('.Temperature-button'),
    Slider: document.querySelector('.slider'),
    sliderInfo: document.querySelector('.slider__info_first'),
    Humidity: document.querySelector('.third_settings__screen'),
}

const rooms = {  //для того, чтобы при выборе комнаты менялось значение текста в вып.списке
    all: 'All Rooms',
    LivingRoom: 'LivingRoom',
    Bedroom: 'Bedroom',
    Kitchen: 'Kitchen',
    Bathroom: 'Bathroom',
    Studio: 'Studio',
    WashingRoom: 'WashingRoom'
}

let activeRoom = 'all';
const roomsData = {
    all: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    },
    LivingRoom: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    },
    Bedroom: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    },
    Kitchen: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    },
    Bathroom: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    },
    Studio: {
       Temperature: 16,
       Lights: 0,
       Humidity: 0 
    },
    WashingRoom: {
        Temperature: 16,
        Lights: 0,
        Humidity: 0
    }
}
//Menu

const MainButton = DOM.selectbox.querySelector('.selectbox__selected');
MainButton.addEventListener("click",  function(e) {
    if(!DOM.selectbox.matches('.open')) {   // selectbox.onclick = function() { 
    DOM.selectbox.classList.add('open');    //     selectbox.classList.toggle('open');
    } else {                                // }                  
    DOM.selectbox.classList.remove('open');
    }
});

document.body.onclick = (event) => { //Проверка родительского элемента
    const {target} = event;
    if ((!target.matches('.selectbox'))&&(!target.parentElement.matches('.selectbox'))&&
    (!target.parentElement.parentElement.matches('.selectbox'))) {
        selectbox.classList.remove('open');
    }
}

DOM.selectboxList.onclick = (e) => {
    const {target} = e;
    if (target.matches('.selectbox__item')) {
        const {room} = target.dataset;
        const ActiveItem = DOM.selectboxList.querySelector('.selected');
        DOM.selectbox.classList.remove('open');
        ActiveItem.classList.remove('selected');
        target.classList.add('selected');
        selectRoom(room);
    }
}

//FN select room

function selectRoom (room) {
    const SelectedRoomItem = DOM.rooms.querySelector('.selected');
    if(SelectedRoomItem) {
        SelectedRoomItem.classList.remove('selected');
    }
    if(room !== 'all') {
        console.log('2');
        const newSelectedRoom=DOM.rooms.querySelector(`[data-room=${room}]`);
        newSelectedRoom.classList.add('selected'); //синхронизация вып.списка(лист) и меню по центру
        activeRoom=room;
        renderscreen(false);
        const temperature = roomsData[activeRoom].Temperature;
        const intensity = roomsData[activeRoom].Lights;
        const humidity = roomsData[activeRoom].Humidity; //переносим значение в псевдо базу данных с комнатами
        DOM.sliderInfo.innerText = intensity; //put value from html
        DOM.infoTemp.innerText = temperature;
        DOM.Humidity.querySelector('.slider__info_first').innerText = humidity;
        renderIntensity(intensity);
        renderTemperature(temperature); 
        renderHumidity(humidity);
        DOM.setting__screens.querySelector(`[data-type=Humidity]`).querySelector('.switch__round').classList.remove('active');
        DOM.setting__screens.querySelector(`[data-type=Lights]`).querySelector('.switch__round').classList.remove('active');
    } else {
        renderscreen(true);
    }
        const SelectSelectedRoom = DOM.selectbox.querySelector('.selectbox__item.selected');
        SelectSelectedRoom.classList.remove('selected');
        const newSelectedItem = DOM.selectbox.querySelector(`[data-room=${room}]`);
        newSelectedItem.classList.add('selected');
        const selectboxSelected = DOM.selectbox.querySelector('.selectbox__selected span');
        selectboxSelected.innerText=rooms[room]; //берём значение из obj выше 
}

//click on elem room(big icon) 
DOM.rooms.querySelectorAll('.room').forEach((room)=>{ //все элементы запихиваем в [], пробегаем
    room.onclick =(event) => { // по нему и вешаем клик на каждый элем
        const value = room.dataset.room;
        selectRoom(value);
    }
})

//отображение нужного экрана при клике на нужную комнату исчезает список комнат
function renderscreen(isRooms) {
setTimeout(() => {
    if (isRooms) {
    DOM.rooms.style.display='grid'; //create  choise rooms
    DOM.settings.style.display='none'; //delete choise settings(temp,light,humidity)
 } else {
    DOM.rooms.style.display='none'; //delete  choise rooms
    DOM.settings.style.display='grid';//create choise settings(temp,light,humidity)
 }
}, 300);
}


DOM.power.onclick = (e) => {
    DOM.infoTemp.innerHTML = '16';
    roundPosition = DOM.Temperature.querySelector('.round').style = 'transform: rotate(-221.5deg);';
    lineActivePosition = DOM.Temperature.querySelector('.line-active').style = 'stroke-dasharray: 67 276;';
}

// fn with click on setting tabs
function selectOption (value) {
    const optionSelected = DOM.settingsTabs.querySelector('.selected');
    if (optionSelected) {
        optionSelected.classList.remove('selected')
        const dataTypeOptionSelected = optionSelected.dataset.type;
        const prevOptionSelected = DOM.setting__screens.querySelector(`[data-type=${dataTypeOptionSelected}]`)
        prevOptionSelected.style = 'display: none';
        const newSelectedOption=DOM.settings.querySelector(`[data-type=${value}]`);
        newSelectedOption.classList.add('selected');
        const newSettingsScreen = DOM.setting__screens.querySelector(`[data-type=${value}]`);
        newSettingsScreen.style = 'display: block';
    } else {
        const newSelectedOption=DOM.settings.querySelector(`[data-type=${value}]`);
        newSelectedOption.classList.add('selected');
        const newSettingsScreen = DOM.setting__screens.querySelector(`[data-type=${value}]`);
        newSettingsScreen.style = 'display: block';
    }
}

DOM.settings.querySelectorAll('.option').forEach((option)=>{ //все элементы запихиваем в [], пробегаем
    option.onclick =(event) => { // по нему и вешаем клик на каждый элем
        const value = option.dataset.type;
        selectOption(value);
    }
})

function renderTemperature(temperature) {
    const minTemperature = 16;
    const maxTemperature = 40;
    const rangeTemperature = maxTemperature-minTemperature;
    const percentTemperature = rangeTemperature/100;
    const linemin = 62;
    const linemax = 276;
    const rangeLine = linemax-linemin;
    const percentLine = rangeLine/100;
    const roundmin = -221.5;
    const roundax = 41;
    const rangeRound = roundax-roundmin; //hundredPercent is percentRound*100(100%)+min value;
    const percentRound = rangeRound/100; //for example: 212(100%) +62=274 full (active line)
    if((temperature>=minTemperature)&&(temperature<=maxTemperature)) {
        const percentRegulateTemperature = Math.round((temperature - minTemperature)/percentTemperature);
        const valueRegulateLineActive =  (percentLine*percentRegulateTemperature+linemin);
        let valueRegulateRound = (percentRound*percentRegulateTemperature+roundmin);
        let countPreTemp = 0.9;
        if((temperature>=28) && (temperature <40)) {
            let newCountPreTemp =countPreTemp*(temperature-27);
            valueRegulateRound = valueRegulateRound+newCountPreTemp;
            DOM.Temperature.querySelector('.line-active').style= `stroke-dasharray: ${valueRegulateLineActive} 276`;
            DOM.Temperature.querySelector('.round').style= `transform: rotate(${valueRegulateRound}deg)`;
            DOM.infoTemp.innerHTML = `${temperature}`;
        } else if (temperature>=40) {
            let newCountPreTemp =countPreTemp*(temperature-27);
            valueRegulateRound = valueRegulateRound+newCountPreTemp;
            DOM.Temperature.querySelector('.line-active').style= `stroke-dasharray: ${valueRegulateLineActive} 276`;
            DOM.Temperature.querySelector('.round').style= `transform: rotate(${41}deg)`;
            DOM.infoTemp.innerHTML = `${temperature}`;
    } else {
        DOM.Temperature.querySelector('.line-active').style= `stroke-dasharray: ${valueRegulateLineActive} 276`;
        DOM.Temperature.querySelector('.round').style= `transform: rotate(${valueRegulateRound}deg)`;
        DOM.infoTemp.innerHTML = `${temperature}`;
    }
}
}

function changeTemperature () {
    let mouseOver = false;
    let mouseDown = false;
    let position = 0;
    let range = 0;
    let ValueChangeTemperature = 0;

    DOM.TemperatureBtn.onmouseover = (e) => {
        mouseOver = true; //навождение на el
    };
    DOM.TemperatureBtn.onmouseleave = (e) => {
        mouseOver = false;
    }; //когда сделали клик
    DOM.TemperatureBtn.onmouseup = (e) => {
        mouseDown = false;
    }; //когда отпустили клик
    DOM.TemperatureBtn.onmousedown = (e) => {
        mouseDown = true;
        position = e.offsetY;
        range = 0;
    }; //нажатие на el
    DOM.TemperatureBtn.onmousemove = (e) => {
        if ((mouseOver ===true) && (mouseDown === true)) {
            range =  e.offsetY - position;
            // console.log(e.offsetY, position);
            const ActualValueChangeTemperature = Math.round(range/-10);
            if (ActualValueChangeTemperature !== ValueChangeTemperature) {
            let temperature = +DOM.infoTemp.innerText;
            if (ActualValueChangeTemperature < ValueChangeTemperature) {
                temperature = temperature - 1; //если уменьшаем
            } else { 
                temperature = temperature + 1; //если увеличиваем
            }
            ValueChangeTemperature = ActualValueChangeTemperature; 
            roomsData[activeRoom].Temperature = temperature;
            renderTemperature(temperature);  // вызываем два раза, чтобы для разных комнат были разные настройки
            }
    }; 
}
}

function changeIntensity() {
    let mouseOver = false;
    let mouseDown = false;
    let position = 0;
    let range = 0;
    let ValueChangeIntensity = 0;

    DOM.Slider.onmouseover = (e) => {
        mouseOver = true; //навождение на el
    };
    DOM.Slider.onmouseleave = (e) => {
        mouseOver = false;
    }; //когда сделали клик
    DOM.Slider.onmouseup = (e) => {
        mouseDown = false;
    }; //когда отпустили клик
    DOM.Slider.onmousedown = (e) => {
        mouseDown = true;
        position = e.offsetY;
        range = 0;
    }; //нажатие на el
    DOM.Slider.onmousemove = (e) => {
        if ((mouseOver ===true) && (mouseDown === true)) {
            range =  e.offsetY - position;
            const ActualValueChangeIntensity = Math.round(range/-3);
            if (ActualValueChangeIntensity !== ValueChangeIntensity) {
            let intensity = +DOM.sliderInfo.innerText;
            if (ActualValueChangeIntensity < ValueChangeIntensity) {
                intensity = intensity - 1; //если уменьшаем
            } else { 
                intensity = intensity + 1; //если увеличиваем
            }
            ValueChangeIntensity = ActualValueChangeIntensity; 
            roomsData[activeRoom].Lights = intensity;
            renderIntensity(intensity);  // вызываем два раза, чтобы для разных комнат были разные настройки
            }
    }; 
}
}

function renderIntensity(intensity) {
    const minIntensity = 0;
    const maxIntensity = 100;
    if (intensity>=minIntensity && intensity<=maxIntensity) {
        DOM.sliderInfo.innerHTML = `${intensity}`;
        DOM.Slider.querySelector('.slider__info').style = `height: ${intensity}%`;
    }
}

function changeHumidity() {
    let mouseOver = false;
    let mouseDown = false;
    let position = 0;
    let range = 0;
    let ValueChangeHumidity = 0;
    DOM.Humidity.onmouseover = (e) => {
        mouseOver = true; //навождение на el
    };
    DOM.Humidity.onmouseleave = (e) => {
        mouseOver = false;
    }; //когда сделали клик
    DOM.Humidity.onmouseup = (e) => {
        mouseDown = false;
    }; //когда отпустили клик
    DOM.Humidity.onmousedown = (e) => {
        mouseDown = true;
        position = e.offsetY;
        range = 0;
    }; //нажатие на el
    DOM.Humidity.onmousemove = (e) => {
        if ((mouseOver ===true) && (mouseDown === true)) {
            range =  e.offsetY - position;
            const ActualValueChangeHumidity = Math.round(range/-3);
            if (ActualValueChangeHumidity !== ValueChangeHumidity) {
            let humidity = +DOM.Humidity.querySelector('.slider__info_first').innerText;
            if (ActualValueChangeHumidity < ValueChangeHumidity) {
                humidity = humidity - 1; //если уменьшаем
            } else { 
                humidity = humidity + 1; //если увеличиваем
            }
            ValueChangeHumidity = ActualValueChangeHumidity; 
            roomsData[activeRoom].Humidity = humidity;
            renderHumidity(humidity);  // вызываем два раза, чтобы для разных комнат были разные настройки
            }
    }; 
}
}

function renderHumidity(humidity) {
    const minHumidity = 0;
    const maxHumidity = 100;
    if (humidity>=minHumidity && humidity<=maxHumidity) {
        DOM.Humidity.querySelector('.slider__info_first').innerHTML = `${humidity}`;
        DOM.Humidity.querySelector('.slider__info').style = `height: ${humidity}%`;
    }
}

function offIntensity (value) {
    const SelectedSwitch = DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').matches('.active');
    if (SelectedSwitch) {
        DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').classList.remove('active');
    } else {
        DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').classList.add('active');
        const intensity = roomsData[activeRoom].Lights = 0;
        renderIntensity(intensity);
    }

}

function offHumidity (value) {
    const SelectedSwitch = DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').matches('.active');
    if (SelectedSwitch) {
        DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').classList.remove('active');
    } else {
        DOM.setting__screens.querySelector(`[data-type=${value}]`).querySelector('.switch__round').classList.add('active');
        const humidity = roomsData[activeRoom].Humidity = 0;
        renderHumidity(humidity);
    }

}

DOM.setting__screens.querySelectorAll('.switch').forEach((item)=>{ //все элементы запихиваем в [], пробегаем
    item.onclick =(event) => { // по нему и вешаем клик на каждый элем
        const value = item.dataset.type; //Humidity or Lights
        if (value === 'Lights') {
            offIntensity(value);
        } else {
            offHumidity(value);
        }
    }
})

window.onload = changeHumidity();
window.onload = changeTemperature();
window.onload = changeIntensity();
