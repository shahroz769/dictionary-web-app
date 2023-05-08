function toggleTheme() {
    let element = document.body;
    element.classList.toggle("dark_theme");
}

function changeFont(font) {
    let bodyFont = document.getElementsByTagName('body')[0]
    let inputFont = document.getElementById('inputText')
    let fontName = document.getElementById('fontName')
    let buttonFont = document.getElementById('button')
    if (font === "sansSerif") {
        bodyFont.style.fontFamily = "Inter, sans-serif"
        inputFont.style.fontFamily = "Inter, sans-serif"
        fontName.style.fontFamily = "Inter, sans-serif"
        buttonFont.style.fontFamily = "Inter, sans-serif"
        fontName.textContent = "Sans-Serif"
    } else if (font === "serif") {
        bodyFont.style.fontFamily = "Lora, serif"
        inputFont.style.fontFamily = "Lora, serif"
        fontName.style.fontFamily = "Lora, serif"
        buttonFont.style.fontFamily = "Lora, serif"
        fontName.textContent = "Serif"
    } else if (font === "mono") {
        bodyFont.style.fontFamily = "Space Mono, mono"
        inputFont.style.fontFamily = "Space Mono, mono"
        fontName.style.fontFamily = "Space Mono, mono"
        buttonFont.style.fontFamily = "Space Mono, mono"
        fontName.textContent = "Mono"
    }
}

function search() {
    let userInput = document.getElementById('inputText').value
    let wordText = document.getElementById('wordText')
    let phoneticText = document.getElementById('phoneticText')
    let audio = document.getElementById('audio')
    let audioSrc = document.getElementById('audioSrc')
    let sourceUrl = document.getElementById('sourceUrl')
    let sourceUrlImg = document.getElementById('sourceUrlImg')
    let definitionOne = document.getElementById('definitionOne')
    let definitionTwo = document.getElementById('definitionTwo')
    let definitionThree = document.getElementById('definitionThree')
    let definitionFour = document.getElementById('definitionFour')
    let example = document.getElementById('example')
    let synonyms = document.getElementById('synonyms')
    let synDiv = document.getElementById('syn-div')
    let verb = document.getElementById('verb')
    let allContent = document.getElementById('allcontent')
    let contentDefault = document.getElementById('default')
    let pandaError = document.getElementById('error')
    let errorMsg = document.getElementById('errormsg')
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
        .then(function (response) {
            console.log(response.data);
            allContent.style.display = "block"
            contentDefault.style.display = "none"
            pandaError.style.display = "none"
            errorMsg.style.display = "none"
            wordText.innerHTML = response.data[0].word
            if (response.data[0].phonetics.length == 0) {
                phoneticText.style.display = "none"
            } else {
                if (response.data[0].phonetics[0].text) {
                    phoneticText.innerHTML = response.data[0].phonetics[0].text
                    phoneticText.style.display = "block"
                } else if (!response.data[0].phonetics[0].text) {
                    phoneticText.style.display = "none"
                } else if (response.data[0].phonetics[1].text) {
                    phoneticText.innerHTML = response.data[0].phonetics[1].text
                    phoneticText.style.display = "block"
                } else {
                    phoneticText.style.display = "none"
                }
            }
            if (response.data[0].phonetics.length == 0) {
                audioImg.style.display = "none"
            } else {
                audio.src = response.data[0].phonetics[0].audio
                audioImg.style.display = "block"
                audio.src = response.data[0].phonetics[0].audio
                if (response.data[0].phonetics[0].audio) {
                    audio.src = response.data[0].phonetics[0].audio;
                } else if (response.data[0].phonetics[1] && response.data[0].phonetics[1].audio) {
                    audio.src = response.data[0].phonetics[1].audio;
                } else if (response.data[0].phonetics[2] && response.data[0].phonetics[2].audio) {
                    audio.src = response.data[0].phonetics[2].audio;
                } else if (response.data[0].phonetics[3] && response.data[0].phonetics[3].audio) {
                    audio.src = response.data[0].phonetics[2].audio;
                } else if (response.data[0].phonetics[4] && response.data[0].phonetics[4].audio) {
                    audio.src = response.data[0].phonetics[2].audio;
                } else if (response.data[0].phonetics[5] && response.data[0].phonetics[5].audio) {
                    audio.src = response.data[0].phonetics[2].audio;
                } else {
                    audioImg.style.display = "none"
                }
            }
            let length = response.data[0].meanings[0].definitions.length
            if (length == 1) {
                definitionOne.style.display = "block"
                definitionTwo.style.display = "none"
                definitionThree.style.display = "none"
                definitionOne.innerHTML = response.data[0].meanings[0].definitions[0].definition
            } else if (length == 2) {
                definitionOne.style.display = "block"
                definitionTwo.style.display = "block"
                definitionThree.style.display = "none"
                definitionOne.innerHTML = response.data[0].meanings[0].definitions[0].definition
                definitionTwo.innerHTML = response.data[0].meanings[0].definitions[1].definition
            } else if (length >= 3) {
                definitionOne.style.display = "block"
                definitionTwo.style.display = "block"
                definitionThree.style.display = "block"
                definitionOne.innerHTML = response.data[0].meanings[0].definitions[0].definition
                definitionTwo.innerHTML = response.data[0].meanings[0].definitions[1].definition
                definitionThree.innerHTML = response.data[0].meanings[0].definitions[2].definition
            }
            if (response.data[0].meanings[0].synonyms.length != 0) {
                let syn = response.data[0].meanings[0].synonyms
                let uppersyn = []
                for (let i = 0; i < syn.length; i++) {
                    let modifiedWord = syn[i][0].toUpperCase() + syn[i].slice(1).toLowerCase();
                    uppersyn.push(modifiedWord);
                }
                synonyms.innerHTML = uppersyn.join(', ')
                synDiv.style.display = "flex"
            } else {
                synDiv.style.display = "none"
            }
            if (response.data[0].meanings[0].partOfSpeech == "verb") {
                if (response.data[0].meanings[0]) {
                    definitionFour.innerHTML = response.data[0].meanings[0].definitions[0].definition
                    verb.style.display = "block"
                } else {
                    verb.style.display = "none"
                }
            } else {
                if (response.data[0].meanings[1]) {
                    definitionFour.innerHTML = response.data[0].meanings[1].definitions[0].definition
                    verb.style.display = "block"
                } else {
                    verb.style.display = "none"
                }
            }
            sourceUrl.innerHTML = response.data[0].sourceUrls[0]
            sourceUrl.href = response.data[0].sourceUrls[0]
            sourceUrlImg.href = response.data[0].sourceUrls[0]
        })
        .catch(function (error) {
            console.log(error.data);
            allContent.style.display = "none"
            contentDefault.style.display = "none"
            pandaError.style.display = "block"
            errorMsg.style.display = "block"
        })
}

function playAudio() {
    let audio = document.getElementById('audio')
    if (audio.paused || audio.ended) {
        audio.play();
    }
}