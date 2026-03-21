// БЛОК 6: отправка формы в Telegram
const form = document.getElementById("rsvpForm");

// Вставьте сюда свой токен бота и chat_id
// const BOT_TOKEN = "8617286359:AAGHPYO4FZig1TM339IYZvYiSQ1pDTf14VM";
// const CHAT_ID = "934054749";

// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(form);
    
//     let message = `<b>Новая анкета:</b>%0A`;
//     message += `<b>Имя:</b> ${formData.get("name")}%0A`;
//     message += `<b>Присутствие:</b> ${formData.get("attendance")}%0A`;

//     // алкоголь
//     let alcohol = formData.getAll("alcohol").join(", ");
//     if(formData.get("alcohol_custom")) {
//         alcohol += (alcohol ? ", " : "") + formData.get("alcohol_custom");
//     }
//     message += `<b>Предпочтения в алкоголе:</b> ${alcohol}`;

//     // Отправка в Telegram
//     const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&parse_mode=HTML&text=${message}`;

//     try {
//         const res = await fetch(url);
//         if(res.ok){
//             alert("Спасибо! Ваша анкета отправлена.");
//             form.reset();
//         } else {
//             alert("Ошибка отправки. Попробуйте позже.");
//         }
//     } catch(err) {
//         console.error(err);
//         alert("Ошибка сети. Попробуйте позже.");
//     }
// });



// БЛОК 7: таймер обратного отсчета до 18.07.2026
const countdownDate = new Date("July 18, 2026 00:00:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if(distance < 0){
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        clearInterval(timerInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2,'0');
    document.getElementById("hours").textContent = hours.toString().padStart(2,'0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2,'0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2,'0');
}

updateTimer();
const timerInterval = setInterval(updateTimer,1000);