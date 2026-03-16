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

const countdownDate = new Date("July 18, 2026 00:00:00").getTime();

function setNumber(id, value){
    const el = document.getElementById(id);

    // если значение не изменилось — ничего не делаем
    if(el.textContent === value) return;

    // принудительная перерисовка (фикс Safari)
    el.style.visibility = "hidden";
    el.offsetHeight;
    el.textContent = value;
    el.style.visibility = "visible";
}

function updateTimer(){

    const now = Date.now();
    const distance = countdownDate - now;

    if(distance <= 0){
        setNumber("days","00");
        setNumber("hours","00");
        setNumber("minutes","00");
        setNumber("seconds","00");
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    setNumber("days", String(days).padStart(2,"0"));
    setNumber("hours", String(hours).padStart(2,"0"));
    setNumber("minutes", String(minutes).padStart(2,"0"));
    setNumber("seconds", String(seconds).padStart(2,"0"));
}

updateTimer();
const timerInterval = setInterval(updateTimer,1000);
