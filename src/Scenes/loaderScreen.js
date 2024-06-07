
const loaderScreen = new Scene("loaderScreen")
loaderScreen.bgAlpha = 0
loaderScreen.postLoadTime = 0
loaderScreen.showingProgress = false
function defaultButtonDrawing(button, larger) {
    Rect(button.x, button.y, button.width, button.height, button.color)
    stRect(button.x, button.y, button.width, button.height, button.strokeColor, 4)
    txt(button.text, button.x, button.y, font(12), button.textColor)
}
let loadFilesButton = new button(-150, 85, 100, 40, "Load Files", "lime", "white")
loadFilesButton.drawingStyle = 3
loadFilesButton.drawing = function () {
    defaultButtonDrawing(this)
}

loadFilesButton.onclick = () => {
    sfxSB.onInit = () => {
        // SceneManager.startScene(trailerScreen)
        // SceneManager.startScene(tutorialScene)
        // SceneManager.startScene(lab)
        // if(musicSB.initialized){
        //     SceneManager.startScene(menuScene)
        // } else {
        //     musicSB.onInit = () =>{
        //         SceneManager.startScene(menuScene)
        //     }
        // }
        // SceneManager.startScene(mainScreen)

        SceneManager.startTransitionScreen(loadToCaldroTransition)
    }
    loadAudio();
    loaderScreen.showingProgress = true;
}

let PlayPong = new button(150, 85, 100, 40, "Play Pong", "orange", "white")
PlayPong.drawingStyle = 3
PlayPong.drawing = function () {
    defaultButtonDrawing(this)
}
PlayPong.onclick = () => {
    alert("No")
}

let incase = new button(0, 85, 100, 40, "Continue..", "white", stylizedColors['outlines'])
incase.drawingStyle = 3
incase.active = false;
incase.textColor = stylizedColors["outlines"]
incase.drawing = function () {
    let alph = 0;
    let delay = 3
    if(loaderScreen.postLoadTime > delay){
        alph = clip((loaderScreen.postLoadTime-delay)*0.8, 0, 1)
        doTask("setIncaseButton", ()=>{
            incase.active = true;
        })
    } 
    alpha(alph)
    defaultButtonDrawing(this)
    alpha(1)
}
incase.onclick = () => {
    sfxSB.onInit();
}

loaderScreen.buttons = [
    loadFilesButton, PlayPong, incase
]
loaderScreen.onLoad = () =>{
    loaderScreen.postLoadTime = 0
    incase.active = false;
    clearDoTask("setIncaseButton")
}
loaderScreen.update = () => {
    world.step(Caldro.time.deltatime, 10)
}
loaderScreen.render = () => {
    let cnt = Caldro.renderer.context;
    Rect(0, 0, pw * 3, ph * 3, "white")
    Rect(0, 0, pw, ph, stylizedColors["outlines"])
    if (CaldroIH.loaded) {
        loaderScreen.bgAlpha += 1 * Caldro.time.deltatime;
        loaderScreen.bgAlpha = clip(loaderScreen.bgAlpha, 0, 1)
    }
    alpha(loaderScreen.bgAlpha)
    CaldroIH.draw("beach", 0, 0, pw, ph, true)
    alpha(1)
    /* for(let i = 1; i <= 4; ++i){
        let slant = 50
        let width = pw/6
        let x = ((pw/4)*i)-pw/2- width/2
        let x1 = x - slant
        let x2 = x + slant
        
        cnt.beginPath();
        cnt.moveTo(x1-width/2, -ph/2)
        cnt.lineTo(x1+width/2, -ph/2)
        cnt.lineTo(x2+width/2, ph/2)
        cnt.lineTo(x2-width/2, ph/2)
        cnt.closePath();
        fillColor(slantColors[i-1])
        cnt.fill()
    } */
    stRect(0, 0, pw * 0.9, ph * 0.9, "white", 2)

    let fnt = 20;
    let textColor = "white"
    textOutline(5 * loaderScreen.bgAlpha, stylizedColors["ablue"])
    wrapText("Hey there Player! ^^\nThis game needs to download Audio and Image files to play...\nThe games isn't the same without them!\n\nAudio: 9 MB worth of files\nImages: 1 MB worth of files\n\nLoad these files?\nOr you can always just play later when you are ready!", 0, -150, pw * 0.7, fnt, textColor, font(fnt))
    textOutline(0)
    
    txt("*Not availble yet, sorry", 150, 120, font(12), "white")
    /*     for (let i = 0; i < world.amoountOfBodies(); ++i) {
        let body = world.getBody(i)
        if (body.drawing) {
            body.render()
            continue;
        }
    } */

    textOutline(20, gustavo.color)
    txt("Coming soon...", 0, -450, font(90), "white")
    textOutline(0)
    world.renderBodies(true)
    if(sfxSB.getLoadPercenteage() == 100){
        if(musicSB.initialized)
        loaderScreen.postLoadTime+=Caldro.time.deltatime;
    }
    if (loaderScreen.showingProgress) {
        meter(0, 150, 400, 20, (sfxSB.getLoadPercenteage()*0.9 + (musicSB.initialized?10:0)), 0, 90, ["lime"])
    }

/*     let time = counter(0, 4, Caldro.time.elapsedTime)
    if(time < 3){
        alpha(0.2)
        edges(c.min/2, c.min/2, 200, 'black', preRenderingCanvas, loaderScreen.camera)
        alpha(1)
    } */
}