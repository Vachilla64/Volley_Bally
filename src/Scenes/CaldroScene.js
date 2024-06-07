const caldroScene = new Scene("caldroScene");
let csPs = new particleSystem();
let csCam = new camera();
let midX = -pw
let csTextAlpha = new AnimationGraph([
    [0, 0],
    [0.5, 0],
    [1, 1],
    [3.2, 1],
    [3.5, 0],
])
let csTextAlphaVersion = new AnimationGraph([
    [0, 0],
    [1.7, 0],
    [2, 1],
    [3.2, 1],
    [3.5, 0],
])
let csFaderAlpha = new AnimationGraph([
    [0, 0],
    [3.7, 0],
    [4, 1],
])

caldroScene.onLoad = () => {
    csPs.particleSource(0, 0, pw, ph, 0, 0, [0, 0], randomNumber(1, 2), "null", 600, Infinity, (particle) => {
        glow(particle.glow, "white");
        Rect(particle.x, particle.y, particle.size, particle.size, "white", 45)
        glow(0)
    }, "", (particle) => {
        particle.glow = randomNumber(10, 30)
        particle.callback = () => {
            particle.glow = clip(particle.glow + randomNumber(-5, 5), 10, 30)
        }
    })

    // DRAW STARY SCREEN
}
caldroScene.onUnload = () => {
    csPs.clearParticles()
}
caldroScene.update = (deltatime) => {
    if (caldroScene.elapsedTime >= 4.5) {
        SceneManager.startScene(menuScene)
    }
}
caldroScene.render = () => {
    let c = getCanvasDimensions(preRenderingCanvas)
    let cc = Caldro.renderer.context;
    Rect(0, 0, c.w, c.h, "white");
    csCam.update()
    // csPs.updateAndRenderAll();

    let color1 = "black"
    alpha(csTextAlpha.getValueAtTime(caldroScene.elapsedTime));
    let fnt = 30
    txt("Caldro©", 0, 0, "600 " + (fnt * 3) + "px Arial", color1)
    alpha(csTextAlphaVersion.getValueAtTime(caldroScene.elapsedTime));
    txt("The", 0, 0 - fnt * 2.3, "200 " + (fnt) + "px Arial", color1)
    txt("Game Library", 0, 0 + fnt * 2, "200 " + (fnt) + "px Arial", color1)
    txt("Version " + Caldro.getVersion(), c.w / 2 - 120, c.h / 2 - 50, font(12), color1, 0, "left")
    alpha(1);

    // drawAnimationGraph(csTextAlpha, 200, 0, 200, 150, caldroScene.elapsedTime, "t-alpha")
    csCam.resolve()
    alpha(csFaderAlpha.getValueAtTime(caldroScene.elapsedTime))
    Rect(0, 0, c.w, c.h, "black");
    alpha(1);

}