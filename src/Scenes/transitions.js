let transitionPersistentInfo = {

}

let loadToCaldroTransition = new TransitionScreen(
    null,
    (time) => {
        alpha(time)
        Rect(0, 0, pw, ph, "white")
        alpha(1)
    },
    () => {
        menuScene.match = new Match(timeToSeconds(0, 3), [may], [abby], 10, snowBeach)
        SceneManager.startScene(mainGame) 
        // SceneManager.startScene(caldroScene) 
        // SceneManager.startScene(mainScreen)

        // SceneManager.startScene(menuScene)  
        // SceneManager.startScene(lab)
        // SceneManager.startScene(cardScene)
        // SceneManager.startScene(trailerScreen)
    },
    (time) => {
        // Rect(0, 0, pw, ph, "white")
    },
    null,
    2
)





let toMatchOverTransition2 = new TransitionScreen(
    NULLFUNCTION,
    (time) => {
        alpha(time)
        Rect(0, 0, pw, ph, "black")
        alpha(1)
    },
    () => {
        SceneManager.startScene(matchOverScene)
    }, NULLFUNCTION, 
    (time) => {
        alpha(1 - time)
        Rect(0, 0, pw, ph, "black")
        alpha(1)
    }, 3
)




let menuToWaitingSceneTransition = new TransitionScreen(
    ()=>{
        Caldro.events.handleKeyboardEvents = false;
        Caldro.events.handleMouseEvents = false;
        Caldro.events.handleTouchEvents = false;
    },
    (time) => {
        let cam = SceneManager.currentScene.camera
        let x = interpolate(time, 1000, 0)
        let y = interpolate(time, -1000, 0)
        x+=cam.x;
        y+=cam.y;
        CaldroSSM.draw("beachball", x, y, 1000, 1000, true, Caldro.time.elapsedTime * 70)
        SceneManager.currentScene.camera.shake(time * 7, time * 7)
    },
    () => {
        SceneManager.startScene(loadingToMatchScene);
    },
    (time) => {
        let cam = SceneManager.currentScene.camera
        let x = interpolate(time, 0, -1000)
        let y = interpolate(time, 0, 1000)
        x+=cam.x;
        y+=cam.y;
        time = scaleTo(time, 0, 1, 1, 0);
        CaldroSSM.draw("beachball", x, y, 1000, 1000, true, Caldro.time.elapsedTime * 70)
        SceneManager.currentScene.camera.shake(time * 7, time * 7)
    },
    ()=>{
        Caldro.events.handleKeyboardEvents = true;
        Caldro.events.handleMouseEvents = true;
        Caldro.events.handleTouchEvents = true;
    }, 4
)

let waitingSceneToMenuSceneTransition = new TransitionScreen(
    ()=>{
        Caldro.events.handleKeyboardEvents = false;
        Caldro.events.handleMouseEvents = false;
        Caldro.events.handleTouchEvents = false;
    },
    (time) => {
        let cam = SceneManager.currentScene.camera
        let x = interpolate(time, -1000, 0)
        let y = interpolate(time, 1000, 0)
        x+=cam.x;
        y+=cam.y;
        CaldroSSM.draw("beachball", x, y, 1000, 1000, true, -Caldro.time.elapsedTime * 170)
        SceneManager.currentScene.camera.shake(time * 7, time * 7)
    },
    () => {
        SceneManager.startScene(menuScene);
    },
    (time) => {
        let cam = SceneManager.currentScene.camera
        let x = interpolate(time, 0, 1000)
        let y = interpolate(time, 0, -1000)
        x+=cam.x;
        y+=cam.y;
        CaldroSSM.draw("beachball", x, y, 1000, 1000, true, -Caldro.time.elapsedTime * 170)
        // SceneManager.currentScene.camera.shake(time, time)
    },
    ()=>{
        Caldro.events.handleKeyboardEvents = true;
        Caldro.events.handleMouseEvents = true;
        Caldro.events.handleTouchEvents = true;
    }, 4
)




let menuToGameTransition = new TransitionScreen(
    null,
    (time) => {

    },
    () => {
        SceneManager.startScene(mainGame)
    },
    (time) => {

    },
    null,
    1
)




let loadToMatchTransition = new TransitionScreen(
    NULLFUNCTION,
    (time) => {
        alpha(time)
        Rect(0, 0, pw, ph, "black")
        alpha(1)
    },
    () => {
        SceneManager.startScene(mainGame)
    }, NULLFUNCTION, NULLFUNCTION, 3
)


let enterIGPSTransition = new TransitionScreen(
    () => {
        inGamePauseScreen.oldScene = SceneManager.currentScene;
        CaldroCIM.setDrawing(c, "lastScreenForIGPSDrawing", 0, 0, c.w, c.h);
        SceneManager.startScene(inGamePauseScreen)
        let point1 = new Point2D(0, -450)
        place(pauseSceneCam, point1)
        place(inGamePauseScreen.cameraTarget, point1)
    },
    (time) => {
        if (time > 0.2) {
            inGamePauseScreen.oldSceneDrawingZoom = approach(inGamePauseScreen.oldSceneDrawingZoom, 0.6, 7).value
            inGamePauseScreen.glossX = scaleTo(time, 0.4, 0.6, -509, 500)
            inGamePauseScreen.whiteAlpha = clip(scaleTo(time, 0, 0.5, 0, 0.3), 0, 0.3)
        }
    },
    () => {
        place(inGamePauseScreen.cameraTarget, ORIGIN)
    },
    () => {

    },
    () => {

    },
    1
)

let mainScreenToMenuScreen = new TransitionScreen(
    ()=>{
        // place(menuScene.camera, new Point2D(800, 450 - 100))
        Caldro.events.handleKeyboardEvents = false;
        Caldro.events.handleMouseEvents = false;
        Caldro.events.handleTouchEvents = false;
        menuScene.followingCamTarget = false
    }, 
    (time)=>{
        let cam = mainScreen.camera
        cam.y -= 100 * Caldro.time.deltatime
        alpha(scaleTo(time, 0, 0.7, 0, 1))
        Rect(cam.x, cam.y, 1000, 1000, stylizedColors['deepblue'])
        alpha(1)
    }, 
    ()=>{
        mainScreenToMenuScreen.pause();
        SceneManager.startScene(menuScene);
        setTimeout(() => {
            mainScreenToMenuScreen.resume();
        }, 1000);
    },
    (time)=>{
        let cam = menuScene.camera
        if(cam.y < 450){
            cam.y += 50 * Caldro.time.deltatime
        } else {
            cam.y = 450;
        }
        alpha(clip(scaleTo(time, 0, 0.7, 1, 0), 0, 1))
        Rect(cam.x, cam.y, 1000, 1000, stylizedColors['deepblue'])
        alpha(1)
    }, 
    ()=>{
        menuScene.followingCamTarget = true
        Caldro.events.handleKeyboardEvents = true;
        Caldro.events.handleMouseEvents = true;
        Caldro.events.handleTouchEvents = true;
    }, 2, 1
)

let menuScreenToMainScreen = new TransitionScreen(
    ()=>{
        // place(menuScene.camera, new Point2D(800, 450 - 100))
        Caldro.events.handleKeyboardEvents = false;
        Caldro.events.handleMouseEvents = false;
        Caldro.events.handleTouchEvents = false;
        menuScene.followingCamTarget = false
    }, 
    (time)=>{
        let cam = menuScene.camera
        let xo = -1000
        xo+= (time * 100) * 10
        CaldroSSM.draw("beachball", cam.x + xo, cam.y, 1000, 1000, true, 180*Caldro.time.elapsedTime)
    }, 
    ()=>[
        SceneManager.startScene(mainScreen)
    ],
    (time)=>{
        let cam = mainScreen.camera
        let xo = 0
        xo+= (time * 100) * 10
        CaldroSSM.draw("beachball", cam.x + xo, cam.y, 1000, 1000, true, 180*Caldro.time.elapsedTime)
    }, 
    ()=>{
        menuScene.followingCamTarget = true
        Caldro.events.handleKeyboardEvents = true;
        Caldro.events.handleMouseEvents = true;
        Caldro.events.handleTouchEvents = true;
    }, 4
)

let mainGameToMatchOverTransiiton = new TransitionScreen(
    NULLFUNCTION, NULLFUNCTION, 
    ()=>{
        SceneManager.startScene(matchOverScene)
    },
    (time)=>{
        alpha(1-time)
        Rect(0, 0, 10000, 10000, "black")
    }, ()=>{
        outPs.clearParticles();
    }, 2
)