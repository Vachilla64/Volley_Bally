const mainScreen = new Scene("mainScreen");
let msCam = mainScreen.camera
mainScreen.background = "mainBeach"
mainScreen.buttons;

mainScreen.render = function(){
    CaldroIH.draw(mainScreen.background, 0, 0, pw * 3, ph * 3, true, 0)

    textOutline(20, "#dc8942")
    txt("Valley", 0, -40, font(70), "white")
    txt("Volley", 0, -110, font(70), "white")
    textOutline(0)
}



let playGame = new button(0, 80, 150, 60, 'Play', "#a8cd57")    
playGame.drawingStyle = 2
playGame.lineWidth = 7
playGame.borderRadius = 5
playGame.onclick = function(){
    SceneManager.startTransitionScreen(mainScreenToMenuScreen);
}
mainScreen.buttons = [
    playGame,
]