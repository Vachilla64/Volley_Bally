
GameKeys.addKey(-1, 'h', () => {
    mainGame.matchTime.setTime(timeToSeconds(1000, 10))
    SceneManager.startScene(cardScene)
})

GameKeys.addKey(0, "0", function () {
    menuScene.match = new Match(timeToSeconds(0, 10), [may, gustavo], [abby, clare], 40, snowBeach, 0, true, 60, 4)
    SceneManager.startScene(mainGame)
})

GameKeys.addKey(0, "9", function () {
    ENTERGODMODE(abby)
})

GameKeys.addKey(0, "1", function () {
    ENTERGODMODE(gustavo)
})

GameKeys.addKey(0, "2", function () {
    ENTERGODMODE(may)
})

GameKeys.addKey(0, "3", function () {
    ENTERGODMODE(clare)
})

GameKeys.addKey(0, "4", function () {
    ENTERGODMODE(ken)
})

GameKeys.addKey(0, "5", function () {
    ENTERGODMODE(emilo)
})

GameKeys.addKey(0, "6", function () {
    ENTERGODMODE(abby)
})

GameKeys.addKey(0, "f", function () {
    fullscreen();
})

GameKeys.addKey(-1, " ", function () {
    if (!teamManager.controlledPlayer || mainGame.isPaused() || !teamManager.proccessingControls) return;
    jump(teamManager.controlledPlayer)
})


GameKeys.addKey(0, "r", function () {
    SceneManager.reloadCurrentScene()
})


let pausedSfxIDs = new Array();
let pausedMusic = new Array();
GameKeys.addKey(-1, "p", () => {
    if (!SceneManager.currentScene.pauseable) return;
    if (SceneManager.currentScene.pausedByUser) {
        world.resumeTime();
        inPs.resume()
        SceneManager.currentScene.resume();
        SceneManager.currentScene.pausedByUser = false;
        for (let ID of pausedSfxIDs) {
            sfxSB.play(ID);
        }
        musicSB.resumeAll();
        pausedSfxIDs.length = 0;
        pausedMusic.length = 0;
    } else {
        world.pauseTime();
        inPs.pause()
        SceneManager.currentScene.pause();
        SceneManager.currentScene.pausedByUser = true;
        for (let ID in sfxSB.audioBuffers) {
            if (sfxSB.get(ID).isPlaying()) {
                sfxSB.pause(ID);
                pausedSfxIDs.push(ID)
            }
        }
        musicSB.pauseAll();
    }
})

GameKeys.addKey(-1, 'm', () => {
    if(mainGame.pausedByUser){
        GameKeys.hitKey("p")
        SceneManager.reloadCurrentScene();
        SceneManager.startTransitionScreen(waitingSceneToMenuSceneTransition)
    }
})

GameKeys.addKey(-1, 'x', () => {
    skipCutScene()
})

GameKeys.addKey(-1, "b", () => {
    beachBall.godBall(beachBall.isGodBall)
})

GameKeys.addKey(-1, "v", () => {
    SceneManager.startTransitionScreen(enterIGPSTransition)
})



GameKeys.addKey(-1, "s", () => {
    shouldTakeScreenShot = true
})


function updatePointers(){
    let cam = SceneManager.currentScene.camera
    if(isMobileDevice){
        let pointers = new Array();
        let scaledPointer = new Point2D(
            (pointer.x * (pw / c.w)),
            (pointer.y * (ph / c.h))
        )
    } else {
        let scaledPointer = new Point2D(
            (pointer.x * (pw / c.w)),
            (pointer.y * (ph / c.h))
        )
        cam.updatePointer(scaledPointer)
    }
}

function pointerAdjustment(point){
    let paddingElement = window.document.body
	// let paddingElement = event.target
	// if(event.target.padding){
		point.x -= parseFloat(paddingElement.style.paddingLeft)
		point.y -= parseFloat(paddingElement.style.paddingTop)
	// }
    let scaledPointer = new Point2D(
        (point.x * (pw / c.w)),
        (point.y * (ph / c.h))
    )
    SceneManager.currentScene.camera.updatePointer(point)
    SceneManager.currentScene.camera.updatePointer(scaledPointer)
    place(point, SceneManager.currentScene.camera.pointer) 
    // return point;
	// point.x -= pw/2
	// point.y -= ph/2
}

Caldro.screen.pointerAdjustment = pointerAdjustment

function pointStartEvent() {
    let point = SceneManager.currentScene.camera.pointer
    // if (!planep1.check(pointer)) planep2.check(pointer);

    if (SceneManager.currentScene.buttons) {
        for (let button of SceneManager.currentScene.buttons) {
            let check = button.autoListen();
            if (check) {
                let reducW = button.width/5
                let reducH = button.height/5
                button.width -= reducW
                button.height -= reducH
                if(!button.audio) continue;
                if(sfxSB.initialized){
                    let audio = choose(button.audio)
                    sfxSB.stop(audio)
                    sfxSB.play(audio, true, 0, 0)
                }
                break;
            }
        }
    }
}

function pointEndEvent() {
    if (SceneManager.currentScene.buttons) {
        for (let button of SceneManager.currentScene.buttons) {
            let check = button.autoStopListening()
            if(check){
                let reducW = button.width/4
                let reducH = button.height/4
                button.width += reducW
                button.height += reducH
            }
        }
    }
    // planep1.deselect();
    // planep2.deselect();
}






setupDevcamControls(devCam)
GameKeys.addKey(0, "m", NULLFUNCTION, function () {
    devCam.mimicCamera(SceneManager.currentScene.camera)
})
function setupDevcamControls(camera) {
    GameKeys.addKey(0, ",", function () {
        if (currentCam == SceneManager.currentScene.camera) {
            currentCam = camera
        } else {
            currentCam = SceneManager.currentScene.camera
        }
    })

    GameKeys.addKey(0, "u", NULLFUNCTION, function () {
        camera.zoom += camera.zoomSpeed * camera.zoom * Caldro.time.deltatime;
    })

    GameKeys.addKey(0, "o", NULLFUNCTION, function () {
        camera.zoom -= camera.zoomSpeed * camera.zoom * Caldro.time.deltatime;
    })

    GameKeys.addKey(0, "i", NULLFUNCTION, function () {
        camera.y -= camera.speed * (1 / camera.zoom) * Caldro.time.deltatime;
    })

    GameKeys.addKey(0, "j", NULLFUNCTION, function () {
        camera.x -= camera.speed * (1 / camera.zoom) * Caldro.time.deltatime;
    })

    GameKeys.addKey(0, "k", NULLFUNCTION, function () {
        camera.y += camera.speed * (1 / camera.zoom) * Caldro.time.deltatime;
    })

    GameKeys.addKey(0, "l", NULLFUNCTION, function () {
        camera.x += camera.speed * (1 / camera.zoom) * Caldro.time.deltatime;
    })
}

// Caldro.events.forceMapPointerEventToWindow(window)