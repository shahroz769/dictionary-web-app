function changeFont(font) {
    let bodyFont = document.getElementsByTagName('body')[0]
    let inputFont = document.getElementById('inputText')
    if (font === "sansSerif") {
        bodyFont.style.fontFamily = "Inter, sans-serif"
        inputFont.style.fontFamily = "Inter, sans-serif"
    } else if (font === "serif") {
        bodyFont.style.fontFamily = "Lora, serif"
        inputFont.style.fontFamily = "Lora, serif"
    } else if (font === "mono") {
        bodyFont.style.fontFamily = "Inconsolata, mono"
        inputFont.style.fontFamily = "Inconsolata, mono"
    }
}