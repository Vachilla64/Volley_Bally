const caldroTitleScreenGrey = new Scene()
let ccam = caldroTitleScreenGrey.camera
ccam.Frame.visible = true
ccam.Frame.visibleFrames = [1, 3]
ccam.Frame.thickness = 20
ccam.Frame.type = ""
let camAlpha = 1
ccam.Frame.costumFrame = (x, y, w, h) => {
    let val = 0.9
    glow(10, "white")
    stRect(w / 2, h / 2, w * val, h * val, "white", 2)
    circle(0, 0, 140, "white")
    circle(w, h, 210, "white")
    glow(0)
    alpha(camAlpha)
    rect(x, y, w, h, "black")
    alpha(1)
}

caldroTitleScreenGrey.update = (deltatime) => {
    if (caldroTitleScreenGrey.elapsedTime > 3) {
        camAlpha -= deltatime
        camAlpha = clip(camAlpha, 0, 1)
    }
}
caldroTitleScreenGrey.render = () => {
    Rect(0, 0, pw, ph, CALDGRAY)
    // Rect(0, 0, pw, ph, "black")
    let color1 = "white"
    // alpha(csTextAlpha.getValueAtTime(caldroScene.elapsedTime));
    let fnt = 20
    glow(20, "white")
    txt("Caldro©", 0, 0, "600 " + (fnt * 3) + "px Arial", color1)
    // alpha(csTextAlphaVersion.getValueAtTime(caldroScene.elapsedTime));
    txt("The", 0, 0 - fnt * 2.3, "200 " + (fnt) + "px Arial", color1)
    txt("Game Library", 0, 0 + fnt * 2, "200 " + (fnt) + "px Arial", color1)
    // txt("Version " + Caldro.getVersion(), c.w / 2 - 150, c.h / 2 - 50, font(8), color1, 0, "left")
    // alpha(1);
    glow(0)
}