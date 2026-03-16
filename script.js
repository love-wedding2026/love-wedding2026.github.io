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

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const els = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    if (!els.days || !els.hours || !els.minutes || !els.seconds) return;

    if (distance < 0) {
        Object.values(els).forEach(el => el.textContent = "00");
        clearInterval(timerInterval);
        return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60)).toString().padStart(2, '0');
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60)).toString().padStart(2, '0');
    const seconds = Math.floor((distance % (1000*60)) / 1000).toString().padStart(2, '0');

    // сначала очищаем, потом пишем — убирает мерцание/наложение
    els.days.textContent = '';
    els.hours.textContent = '';
    els.minutes.textContent = '';
    els.seconds.textContent = '';

    els.days.textContent = days;
    els.hours.textContent = hours;
    els.minutes.textContent = minutes;
    els.seconds.textContent = seconds;
}

update();
setInterval(update,1000);

})();
