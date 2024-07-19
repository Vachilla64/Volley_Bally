let matchOverScene = new Scene("matchOverScene");
matchOverScene.hasPhoto = false;
let moc = matchOverScene.camera
moc.target.active - true

let rematchButton = new button(250, -95, 200, 60, "Rematch", "#73aa44", "white")
rematchButton.drawingStyle = 2
rematchButton.lineWidth = 6
rematchButton.fontSize = 25
rematchButton.onclick = function(){
    SceneManager.startTransitionScreen(menuToWaitingSceneTransition);
}

let viewPhotos = new button(250, 0, 200, 60, "View Images", "#73aa44", "white")
viewPhotos.drawingStyle = 2
viewPhotos.lineWidth = 6
viewPhotos.fontSize = 25
viewPhotos.active = false;
viewPhotos.onclick = function(){
    moc.target.position = new Lvector2D(800, 0)
}

let ToMainMenuButton = new button(250, 95, 200, 60, "To Menu", stylizedColors["softOrange"], "white")
ToMainMenuButton.drawingStyle = 2
ToMainMenuButton.lineWidth = 6
ToMainMenuButton.fontSize = 25
ToMainMenuButton.onclick = function(){
    SceneManager.startScene(menuScene)
}



matchOverScene.buttons = [
    rematchButton, 
    ToMainMenuButton, 
    viewPhotos,
]


matchOverScene.onLoad = function(){
    matchOverScene.photo = null;
    inPs.clearParticles();
    // outPs.clearParticles();
}
matchOverScene.onUnload = function(){
    matchOverScene.photo = null;
    inPs.clearParticles();
    outPs.clearParticles();
}
matchOverScene.update = function(dt){
    outPs.updateAndRenderAll(dt, 1, 0);
}
matchOverScene.render = function(){
    
    // moc.update();
    CaldroIH.draw("overArea2", 0, 0, pw*3, ph*3, true)
    
    let picW = 370
    let picH = calculateAspectRatio(picW, null, [16, 9])
    let ang = -7
    if(matchOverScene.photo){
        
    } else {
        let x = -150;
        let y = 10
        CaldroCIM.draw(Caldro.renderer.context, "endShot", x, y, picW, picH, true, ang)
        stRect(x, y, picW, picH, "white", 8, ang)
    }
    
        textOutline(10, stylizedColors["softOrange"])
        txt("Match Over", -170, -135, font(47), "white")
        textOutline(0)

    // inPs.updateAndRenderAll(null, 0, 1)

        // Rect(250+10, 0, 300, ph+10, stylizedColors["softOrange"], 0)
        // stRect(250+10, 0, 300, ph+10, "white", 10, 0)
    // moc.resolve();
}