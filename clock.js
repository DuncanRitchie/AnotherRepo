let clockDigital = document.getElementById("clockDigital");
let clockFace = document.getElementById("clockFace");
let clockHour = document.getElementById("clockHourHandWrap");
let clockMinute = document.getElementById("clockMinuteHandWrap");
let clockSecond = document.getElementById("clockSecondHandWrap");

const updateTime = () => {
    let d = new Date()
    if(clockDigital!==null){
        dateFormatted = ""
        if(d.getHours()<10){
            dateFormatted="0";
        }
        dateFormatted+=`${d.getHours()}`;
        dateFormatted+=":";
        if(d.getMinutes()<10){
            dateFormatted+="0";
        }
        dateFormatted+=`${d.getMinutes()}`;
        dateFormatted+=":";
        if(d.getSeconds()<10){
            dateFormatted+="0";
        }
        dateFormatted+=`${d.getSeconds()}`;
        clockDigital.textContent=dateFormatted;
        // clockDigital.textContent=`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} `
    }
    if(clockFace!==null){
        clockHour.style.transform=`rotate(${d.getHours()*30}deg)`;
        clockMinute.style.transform=`rotate(${d.getMinutes()*6}deg)`;
        clockSecond.style.transform=`rotate(${d.getSeconds()*6}deg)`;
    }
}

let updateTimeInterval = setInterval(updateTime,1);