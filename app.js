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
function toggleTheme() {
    let element = document.body;
    element.classList.toggle("dark_theme");
}