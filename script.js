// БЛОК 6: отправка формы в Telegram
const form = document.getElementById("rsvpForm");

// Вставьте сюда свой токен бота и chat_id
const BOT_TOKEN = "8617286359:AAGHPYO4FZig1TM339IYZvYiSQ1pDTf14VM";
const CHAT_ID = "934054749";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    
    let message = `<b>Новая анкета:</b>%0A`;
    message += `<b>Имя:</b> ${formData.get("name")}%0A`;
    message += `<b>Присутствие:</b> ${formData.get("attendance")}%0A`;

    // алкоголь
    let alcohol = formData.getAll("alcohol").join(", ");
    if(formData.get("alcohol_custom")) {
        alcohol += (alcohol ? ", " : "") + formData.get("alcohol_custom");
    }
    message += `<b>Предпочтения в алкоголе:</b> ${alcohol}`;

    // Отправка в Telegram
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=HTML&text=${message}`;

    try {
        const res = await fetch(url);
        if(res.ok){
            alert("Спасибо! Ваша анкета отправлена.");
            form.reset();
        } else {
            alert("Ошибка отправки. Попробуйте позже.");
        }
    } catch(err) {
        console.error(err);
        alert("Ошибка сети. Попробуйте позже.");
    }
});



// БЛОК 7: таймер обратного отсчета до 18.07.2026

(function(){

const targetDate = new Date("2026-07-18T00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function pad(n){
return n.toString().padStart(2,"0");
}

function update(){

const now = Date.now();
const diff = targetDate - now;

if(diff <= 0){
daysEl.textContent = "00";
hoursEl.textContent = "00";
minutesEl.textContent = "00";
secondsEl.textContent = "00";
return;
}

const days = Math.floor(diff / (1000*60*60*24));
const hours = Math.floor((diff / (1000*60*60)) % 24);
const minutes = Math.floor((diff / (1000*60)) % 60);
const seconds = Math.floor((diff / 1000) % 60);

daysEl.textContent = pad(days);
hoursEl.textContent = pad(hours);
minutesEl.textContent = pad(minutes);
secondsEl.textContent = pad(seconds);

}

update();
setInterval(update,1000);

})();
