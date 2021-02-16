const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progressBar")
let timerCounter = progressBar.max;
const interval = setInterval(() => {
    if (timerCounter === 0) {
        window.location.href = "{{ url_for('rest') }}";
        clearInterval(interval);
    }
    timerCounter = timerCounter - 1;
    
    timerElement.innerText = timerCounter + "s";
    progressBar.value = timerCounter;
}, 1000);