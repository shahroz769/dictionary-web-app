function toggleTheme() {
    let element = document.body;
    element.classList.toggle("dark_theme");
}

function changeFont(font) {
    let bodyFont = document.getElementsByTagName('body')[0]
    let inputFont = document.getElementById('inputText')
    let fontName = document.getElementById('fontName')
    console.log(fontName)
    if (font === "sansSerif") {
        bodyFont.style.fontFamily = "Inter, sans-serif"
        inputFont.style.fontFamily = "Inter, sans-serif"
        fontName.style.fontFamily = "Inter, sans-serif"
        fontName.textContent = "Sans-Serif"
    } else if (font === "serif") {
        bodyFont.style.fontFamily = "Lora, serif"
        inputFont.style.fontFamily = "Lora, serif"
        fontName.style.fontFamily = "Lora, serif"
        fontName.textContent = "Serif"
    } else if (font === "mono") {
        bodyFont.style.fontFamily = "Space Mono, mono"
        inputFont.style.fontFamily = "Space Mono, mono"
        fontName.style.fontFamily = "Space Mono, mono"
        fontName.textContent = "Mono"
    }
}

function search() {
    let userInput = document.getElementById('inputText').value
    let wordText = document.getElementById('wordText')
    let phoneticText = document.getElementById('phoneticText')
    let audio = document.getElementById('audio')
    let audioSrc = document.getElementById('audioSrc')
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
        .then(function (response) {
            console.log(response.data);
            wordText.innerHTML = response.data[0].word
            phoneticText.innerHTML = response.data[0].phonetics[0].text
            audio.src = response.data[0].phonetics[0].audio
            if (response.data[0].phonetics[0].audio) {
                audio.src = response.data[0].phonetics[0].audio;
            } else if (response.data[0].phonetics[1] && response.data[0].phonetics[1].audio) {
                audio.src = response.data[0].phonetics[1].audio;
            } else if (response.data[0].phonetics[2] && response.data[0].phonetics[2].audio) {
                audio.src = response.data[0].phonetics[2].audio;
            } else {
                console.log('No audio URLs found in the response data.');
            }
        })
        .catch(function (error) {
            console.log(error.data);
        })
}

function playAudio() {
    let audio = document.getElementById('audio')
    if (audio.paused || audio.ended) {
        audio.play();
    }
}