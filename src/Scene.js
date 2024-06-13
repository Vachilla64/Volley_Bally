
class Scene {
    constructor(name = "") {
        this.name = name;
        this.paused = false;
        this.camera = new camera();
        this.world = new classicPhysicsWorld();
        this.elapsedTime = 0;
        this.pauseable = false;
        this.pausedByUser = false;
        this.physicsBodies = [];
        this.processInput = true;
    };
    isPaused = () => { return this.paused; }
    onLoad() { };
    update() { };
    render() { };
    onUnload() { };
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
}


/**
 * @param {*function} event1 A function that will run at the very start of the transition
 * @param {*function} leavingTransition A rendering function that takes a 'time' parameter (scaled down to 0-1). This will keep running till the first half of the total transition time is used up and it's time to actually change the scene
 * @param {*function} event2 A function that will run at the very end of the leavingTransition rendering, just before the enteringTransition. This function is expected to be used to actually change the Scene
 * @param {*function} enteringTransition A rendering function that takes a 'time' parameter (scaled down to 0-1). This will keep running till the second half of the total transition time is used up and the transition is finally over, usually will have a similar rendering with the 'leavingTransition'
 * @param {*function} event3 A function that will run at the very end of the transition, after enteringTransition is finished
 * @param {*function} delay delay in seconds before starting the enteringTransition
 */
class TransitionScreen {
    constructor(event1, leavingTransition, event2, enteringTransition, event3, transitionTime = 2, delay = 0) {
        this.firedStartingOfFirstTransitionEvent = this.firedMiddleEvent = this.firedEndingOfSecondTransitionEvent = false
        this.running = false;
        this.resetOnFinish = true;
        this.paused = false;
        this.time = 0;
        this.delay = delay;

        this.transitionTime = transitionTime;
        this.event1 = event1 || NULLFUNCTION;
        this.event2 = event2 || NULLFUNCTION;
        this.event3 = event3 || NULLFUNCTION;
        this.leavingTransition = leavingTransition;
        this.enteringTransition = enteringTransition;
    }
    update(deltatime) {
        if (!this.running) return;

        if (this.time >= this.transitionTime) {
            if (!this.firedEndingOfSecondTransitionEvent) {
                this.event3();
                this.firedEndingOfSecondTransitionEvent = true;
                this.running = false;
                // if (this.resetOnFinish) this.reset(); 
                // causes issues with disablking and enablesing user input durting a transition
            }
        }

        if (!this.paused) this.time += deltatime;
        if (this.time <= this.transitionTime / 2) { // during first transition
            if (!this.firedStartingOfFirstTransitionEvent) {
                this.event1();
                this.firedStartingOfFirstTransitionEvent = true
            }
            // this.leavingTransition(clip(this.time / (this.transitionTime / 2)), 0, 1) // normalized time ( 0 - 1 )
        } else {
            if (!this.firedMiddleEvent) {
                this.event2();
                this.firedMiddleEvent = true
            }
            // this.enteringTransition(clip((this.time - (this.transitionTime / 2)) / (this.transitionTime / 2), 0, 1)) // normalized time ( 0 - 1 )
        }
    }

    render() {
        if (!this.running) return;
        if (this.time < this.transitionTime / 2) { // during first transition
            this.leavingTransition(clip(this.time / (this.transitionTime / 2)), 0, 1) // normalized time ( 0 - 1 )
        } else {
            this.enteringTransition(clip((this.time - (this.transitionTime / 2)) / (this.transitionTime / 2), 0, 1)) // normalized time ( 0 - 1 )
        }
    }

    reset() {
        this.time = 0;
        // this.delay = delay
        this.firedStartingOfFirstTransitionEvent = this.firedMiddleEvent = this.firedEndingOfSecondTransitionEvent = false
    }
    start() {
        this.reset();
        this.running = true;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }

    leavingTransition() { };
    enteringTransition() { };
    event1() { };
    event2() { };
    event3() { };
}



const SceneManager = {
    scenes: new Array(),
    currentCamera: null,
    currentScene: null,
    currentTransitionScreen: null,
    resizeScreen: true,
    renderAlpha: 1,
    updatesPerUpdate: 1,
    update(deltatime) {
        for (let u = 0; u < this.updatesPerUpdate; ++u) {
            if (this.currentScene) {
                if (this.currentScene.isPaused()) return false;
                this.currentScene.elapsedTime += deltatime;
                this.currentScene.update(deltatime);
                return true;
            }
        }
    },
    preRender() { },
    postRender() { },
    render() {
        this.preRender();
        if (this.currentScene) {
            this.currentScene.render();
        }
        this.postRender();
    },
    startScene(targetScene) {
        if (!targetScene) return;
        if (this.currentScene) {
            this.currentScene.onUnload();
            for (let body of this.currentScene.physicsBodies) {
                world.removeBody(body)
            }
        }
        targetScene.elapsedTime = 0
        currentCam = targetScene.camera
        this.currentScene = targetScene;
        for (let body of this.currentScene.physicsBodies) {
            world.addBody(body)
        }
        targetScene.onLoad();
        // SceneManager.preRender();
        // SceneManager.postRender();
    },
    startTransitionScreen(transition) {
        this.currentTransitionScreen = transition;
        transition.start();
    },
    reloadCurrentScene() {
        this.startScene(this.currentScene)
    }
}

var DefaultScene = new Scene("DefaultScene");
SceneManager.startScene(DefaultScene)


SceneManager.maskManager = {
    masks: new Array(),
    visible: false,
    tintAlpha: 0.7,
    tintColor: "black",
    spanW: 99999,
    spanH: 99999,
    addRectMask: (x, y, width, height) => {
        let mask = {
            x: x,
            y: y,
            width: width,
            height: height,
            type: "rect"
        }
        SceneManager.maskManager.masks.push(mask)
        return mask;
    },
    addCircleMask: (x, y, radius) => {
        let mask = {
            x: x,
            y: y,
            radius: radius,
            type: 'circle',
        }
        SceneManager.maskManager.masks.push(mask)
        return mask;
    },
    clearMasks: () => {
        SceneManager.maskManager.masks.length = 0;
    },
    applyMask: () => {
        let maskManager = SceneManager.maskManager
        if (!maskManager.visible) return;

        let masks = maskManager.masks
        let pctx = Caldro.rendering.context
        let canvW = Caldro.rendering.canvas.width;
        let canvH = Caldro.rendering.canvas.height;

        saveRenderingContext()
        pctx.beginPath();
        for (let i = 0; i < masks.length; ++i) {
            let mask = masks[i]
            if (mask.type == "rect") {
                pctx.rect(mask.x, mask.y, mask.width, mask.height)
            } else if (mask.type == "circle") {
                pctx.arc(mask.x, mask.y, mask.radius, 0, Math.PI * 2)
            }
        }
        let spanW = maskManager.spanW
        let spanH = maskManager.spanH
        pctx.rect(-spanW / 2, -spanH / 2, spanW, spanH)
        pctx.closePath();
        pctx.clip("evenodd");
        // pctx.clip("nonzero");

        alpha(maskManager.tintAlpha)
        rect(-spanW / 2, -spanH / 2, spanW, spanH, maskManager.tintColor)
        alpha(1)
        restoreRenderingContext();
    }
}

let focusMask = SceneManager.maskManager.addRectMask(-100, -100, 200, 200)

var Sorientation = ""
let showScreenShot = false
let shouldTakeScreenShot = false
let screenshotCIM = new canvasImageManager();

SceneManager.preRender = function () {
    if (!SceneManager.currentScene) return;
    Caldro.renderer.setRenderingCanvas(preRenderingCanvas)
    Caldro.rendering.context.imageSmoothingEnabled = Caldro.rendering.imageSmoothing;
    rect(0, 0, pw, ph)
    currentCam.setCanvas(preRenderingCanvas)
    pc.lineJoin = pc.lineCap = "round"
    if (SceneManager.currentTransitionScreen) {
        SceneManager.currentTransitionScreen.update(Caldro.time.deltatime)
    }

    currentCam.update();
    // SceneManager.currentScene.camera.limitWithinBox({ x: 0, y: 0, width: 2300, height: 1500 })
}

SceneManager.postRender = function () {
    if (!SceneManager.currentScene) return;
    for (let i = 0; i < world.amoountOfBodies(); ++i) {
        let body = world.getBody(i)
        let color = "red"
        if (!body.collidable) {
            color = "orange"
        } else if (body.isTrigger) {
            if (!body.inCollision) {
                color = "purple"
            } else {
                color = "magenta"
            }
        }

        if (currentCam == devCam) {
            if (body.restingPosition) {
                circle(body.restingPosition.x, body.restingPosition.y, 10, body.color)
            }
            let aabb = body.getAABB();
            alpha(0.2)
            rect(aabb.min.x, aabb.min.y, aabb.max.x - aabb.min.x, aabb.max.y - aabb.min.y, color,)
            alpha(1)
            strect(aabb.min.x, aabb.min.y, aabb.max.x - aabb.min.x, aabb.max.y - aabb.min.y, color, 2)
            line(aabb.min.x, aabb.min.y, aabb.max.x, aabb.max.y, color, 2)
        }
    }
    // Rect(0, 0, 500, 500, "red")
    // circle(0, 0, 200, "lime")
    // arc(0, 0, 200, 180, 0, "red")

    // CaldroCIM.draw(Caldro.renderer.context, "mayDim", 0, 0, gameCam.width*3, gameCam.height*3, true, 0)

    /*  if (!SceneManager.currentScene.isPaused()) {
        inPs.resume()
    } else {
        inPs.pause();
    } */
    alpha(mainGame.blackFadeAlpha)
    Rect(gameCam.x, gameCam.y, gameCam.width * 1.2, gameCam.height * 1.2, "black")
    alpha(1)

    if (SceneManager.currentScene.buttons) {
        for (let button of SceneManager.currentScene.buttons) {
            button.render();
            if (pointIsIn(SceneManager.currentScene.camera.pointer, button, "box")) {
                if (button.active && button.visible) {
                    if (!button.data["noHighlight"]) {
                        alpha(0.2)
                        Rect(button.x, button.y, button.width, button.height, "white")
                        alpha(0.6)
                        stRect(button.x, button.y, button.width + 20, button.height + 20, button.color, 5)
                    }
                }
                alpha(1)
            }
        }
    }

    if (currentCam === devCam) {
        devCam.showCamera(SceneManager.currentScene.camera)
        stCircle(mainGame.blackoutClippingCircle.x, mainGame.blackoutClippingCircle.y, mainGame.blackoutClippingCircle.radius, "black", 10)
        drawGraph(0, 0, 3000, 1300, 10, 5, "black", cam)
        if (keyboard.isBeingPressed("n")) {
            let rtw = devCam.width / 6
            let rth = devCam.height / 6
            let rtc = "white"
            let lw = 4 / devCam.zoom
            Rect(devCam.x - rtw, devCam.y, lw, devCam.height, rtc)
            Rect(devCam.x + rtw, devCam.y, lw, devCam.height, rtc)
            Rect(devCam.x, devCam.y - rth, devCam.width, lw, rtc)
            Rect(devCam.x, devCam.y + rth, devCam.width, lw, rtc)
        }
    }


    if (teamManager.playingGame) { // will need to com back here late to add a way to show if the currentTeam of the player is being manipulated
        let team1x = -330
        let team2x = 330
        let team1y = -160
        let team2y = -160
        for (let player of teamManager.players) {
            let x = player.team == 1 ? team1x : team2x;
            let y = player.team == 1 ? team1y : team2y;
            // let outlineCol = "white"
            // if(colorUtils.sumTotal(colorToRGB(player.color)) > 600)
            // outlineCol = stylizedColors["outlines"]
            let outlineCol = stylizedColors["outlines"]
            alpha(player.team == player.currentTeam?1:0.3)
            shadow(0, stylizedColors["outlines"], 2, 2)
            CaldroSSM.draw(player.name.toLowerCase(), x, y, 40, 40, true, 0, player.gender)
            shadow(0)
            let fnt = 15
            textOutline(fnt * 0.25, outlineCol)
            txt(player.name, x + (22 * (player.team == 2 ? -1 : 1)), y, font(fnt), player.color, 0, player.team == 1 ? "left" : "right")
            textOutline(0)
            alpha(1)
            if (player.team == 1) {
                team1x += 5
                team1y += 25
            } else if (player.team == 2) {
                team2x -= 5
                team2y += 25
            }
        }

    }
    // cordShow(SceneManager.currentScene.camera.pointer, "lime")
    let ctx = Caldro.renderer.context;




    if (SceneManager.currentTransitionScreen) {
        SceneManager.currentTransitionScreen.render();
    }




    if (shouldTakeScreenShot) {
        let planeW = planep2.x - planep1.x;
        let planeH = planep2.y - planep1.y;
        let planeMidX = planep1.x + planeW / 2;
        let planeMidY = planep1.y + planeH / 2;
        screenshotCIM.setDrawing(originalCanvas, "lastScreenShot", planep1.x, planep1.y, planeW, planeH, false)
        shouldTakeScreenShot = false;
        showScreenShot = true;
    }

    // from sceneManager Prerender, before cam.upda
    // saveRenderingContext();


    // Caldro.rendering.context.closePath();
    SceneManager.maskManager.applyMask();

    alpha(mainGame.whiteCamFlashAlpha)
    mainGame.whiteCamFlashAlpha = approach(mainGame.whiteCamFlashAlpha, 0, 1, Caldro.time.deltatime).value
    Rect(gameCam.x, gameCam.y, 1000, 1000, "white")
    alpha(1)
    currentCam.resolve();

    if (SceneManager.currentScene.pauseable) {
        if (SceneManager.currentScene.pausedByUser) {
            // let cam = SceneManager.currentScene.camera;
            // let x = cam.x;
            // let y = cam.y;
            alpha(0.5)
            rect(0, 0, pw, ph, "black")
            // Rect(0, 0, pw, ph, "black")
            alpha(1)
            textOutline(10, stylizedColors["outlines"])
            txt("~Paused~", pw / 2, ph / 2, font(100), "white")
            txt("press 'P' again to unpause", pw / 2, ph / 1.3, font(20), "white")
            textOutline(0)
            // txt("~Paused~", x, y, font(100), "white")
            // txt("press 'P' again to unpause", x, y+(ph*(((ph/1.3)/ph))-0.5), font(20), "white")
            alpha(1)
        }
    }


    let oldZoom = gameCam.zoom;
    let rush = audioManager.getCurrentGM();
    if (rush) {
        let time = rush.getCurrentTime();
        if (time > 0) {
            // console.log(time)

            rush.setPlaybackRate(gmPlaybackRate.getValueAtTime(time))

            gmTasksAnimations.getValueAtTime(time, true)
            // gmTasksAnimations.update("doesn't matter", time);
            // gmTasksAnimations.update(Caldro.time.deltatime, time)
        }
    }


    {
        // CaldroCIM.draw(cc, "orangeSHine", 0, 0, 100, 100, true)
        gameCam.oldZoom = gameCam.zoom
        if (mainGame.showingPerfectEffects) {
            if (mainGame.showingClosingCutScene) {
                // let time = SceneManager.currentScene.elapsedTime
                let time = musicSB.getCurrentTime("end_music");
                if (time > 6.6) {
                    gameCam.zoom = 1;
                    currentCam.update();
                    time = clip(time - 6.6, 0, 3.1)
                    if (time == 3) mainGame.showingPerfectEffects = false;

                    let pText1 = "That was";
                    let pText2 = "woah!";
                    let pText3 = "Perfect!";
                    let mainColor = "gold"

                    let team1Score = teamManager.team1Score
                    let team2Score = teamManager.team2Score
                    let irlPlayer = teamManager.controlledPlayer

                    if (teamManager.sessionWinner == 0) {
                        pText1 = "";
                        pText2 = "";
                        pText3 = "It's a Tie!";
                        mainColor = "yellow"
                    } else {
                        if (team1Score == 0 || team2Score == 0) { // if a team got absolutely owned
                            if (irlPlayer) {
                                if (irlPlayer.team == teamManager.sessionWinner) {
                                    pText1 = "Wow, that was"
                                    pText2 = "...amazing!!"
                                    pText3 = "Perfect!"
                                    mainColor = "gold"
                                } else {
                                    pText1 = "Don't worry!, "
                                    pText2 = "makes perfect, GG"
                                    pText3 = "Practice"
                                    mainColor = "orange"
                                }
                            } else {

                                pText1 = "Perfect Win!!";
                                pText2 = "";
                                for (let i = 0; i < teamManager.winningTeam.length; ++i) {
                                    let person = teamManager.winningTeam[i]
                                    pText2 += person.name
                                    if (teamManager.winningTeam.length > 1) {
                                        if (i == teamManager.winningTeam.length - 1) {
                                            pText1 += "and "
                                        } else {
                                            pText1 += ", "
                                        }
                                    }
                                }
                                pText3 = "Team " + teamManager.sessionWinner;
                                mainColor = "lime"
                            }
                        }
                    }


                    let x = currentCam.x;
                    let y = currentCam.y;

                    alpha(perEffBlackSreen.getValueAtTime(time) * 0.4)
                    Rect(x, y, c.w, c.h, "black")
                    alpha(1)

                    setImageSmoothing(pc, true)
                    alpha(perEffBlackSreen.getValueAtTime(time) * 0.6)
                    CaldroCIM.draw(pc, mainColor + "Shine", x, y, c.max, c.max, true)
                    alpha(1)


                    pc.save();
                    alpha(perEffBlackSreen.getValueAtTime(time) * 0.6)
                    drawStarPolygon(x, y, c.min, 0.10, 10, Caldro.time.elapsedTime * 60, 7)
                    CaldroCIM.draw(pc, mainColor + "Shine", x, y, c.max, c.max, true)
                    alpha(1)
                    pc.restore();

                    glow(20, mainColor)
                    alpha(perEffBlackSreen.getValueAtTime(time))
                    textOutline(20, mainColor)
                    txt(pText3, x, y, font(perEffFontSize.getValueAtTime(time)), "white", -7)
                    textOutline(0)
                    textOutline(5, mainColor)
                    txt(pText1, x - 150, y - 90, font(40), "white", -7)
                    txt(pText2, x = 250, y + 60, font(40), "white", -7, "right")
                    textOutline(0)
                    alpha(1)
                    glow(0)

                    setImageSmoothing(pc, false)
                    currentCam.resolve();
                }
            }
        }
        gameCam.zoom = gameCam.oldZoom

        // gameCam.zoom = gameCam.oldZoom
        if (mainGame.showinggodModeEntranceEffects) {
            let c = getCanvasDimensions(preRenderingCanvas);
            gameCam.zoom = 1;
            currentCam.update();
            if (rush) {
                // let cc = pc
                let time = rush.getCurrentTime()
                let currentShine = teamManager.godModePlayer.name.toLowerCase() + "Shine"
                // console.log(gameCam.zoom)
                gameCam.zoom = camZoomAnim.getValueAtTime(time)

                alpha(gmDarkFade.getValueAtTime(time))
                Rect(0, 0, c.w * 1.2, c.h * 1.2, "black")
                alpha(1)

                pc.save();
                drawStarPolygon(0, 0, c.min, 0.25, 10, Caldro.time.elapsedTime * 60, 7)
                setImageSmoothing(pc, true)
                alpha(gmSpinAlpha.getValueAtTime(time))
                CaldroCIM.draw(pc, currentShine, 0, 0, c.max, c.max, true)
                setImageSmoothing(pc, false)
                alpha(1)
                pc.restore();

                let glowColor = shine;
                if (teamManager.godModePlayer.color.sumTotal() < 200) {
                    glowColor = white
                }
                // glow(20, glowColor)
                // glow(0)
                setImageSmoothing(pc, true)
                alpha(gmSpinAlpha.getValueAtTime(time))
                // CaldroCIM.draw(pc, shine, 0, 0, c.max, c.max, true)
                CaldroCIM.draw(pc, currentShine, 0, 0, c.max, c.max, true)
                alpha(1)
                setImageSmoothing(pc, false)
                glow(0)

                let size = playerFaceSize.getValueAtTime(time)
                CaldroSSM.draw(teamManager.godModePlayer.name.toLowerCase(), 0, 0, c.vmin * size, c.vmin * size, true, 0)
                let lighter = colorUtils.addValue(teamManager.godModePlayer.color, 40)
                alpha(gmSpinAlpha.getValueAtTime(time))
                let txtColor = "white"
                if (lighter.sumTotal() > 700) {
                    lighter = stylizedColors['outlines']
                }
                textOutline(20, lighter)
                txt(teamManager.godModePlayer.name, 0, -130, font(100), txtColor)
                textOutline(6, lighter)
                txt(teamManager.godModePlayer.status.slickLine, 0, 150, font(40), txtColor)
                textOutline(0)
                alpha(1)
            }
            currentCam.resolve();
        }

    }

    outPs.updateAndRenderAll(Caldro.time.deltatime, 1, 1)


    CaldroCIM.setDrawing(preRenderingCanvas, "preRender", 0, 0, pw, ph)



    // CaldroCIM.setDrawing(c, "preRender", 0, 0, c.width, c.height)

    // CaldroCIM.draw(cc, "preRender", 0, 0, c.w, c.h)
    // SceneManager.maskManager.applyMask();
    // CaldroCIM.setDrawing(preRenderingCanvas, "preRender", 0, 0, pw, ph)

    /* 
    Caldro.renderer.setRenderingCanvas(sfxCanvas)
    Caldro.rendering.context.imageSmoothingEnabled = Caldro.rendering.imageSmoothing;
    CaldroCIM.draw(cc, "preRender", 0, 0, c.w, c.h)
    SceneManager.maskManager.applyMask();
    CaldroCIM.setDrawing(sfxCanvas, "preRender", 0, 0, pw, ph) */


    Caldro.renderer.setRenderingCanvas(c)

    if (SceneManager.resizeScreen) {
        let cw, ch;
        {
            let body = window.document.body
            let width = window.innerWidth;
            let height = window.innerHeight;
            body.style.paddingTop = body.style.paddingBottom = "0px"
            body.style.paddingLeft = body.style.paddingRight = "0px"
            Sorientation = ""
            if (width > height) { // landscape
                Sorientation = "landscape"
                cw = height * (aspectRatio[0] / aspectRatio[1])
                ch = height;
                body.style.paddingLeft = body.style.paddingRight = `${(width - cw) / 2}px`
            } else { // potraint
                Sorientation = "potrait"
                cw = width;
                ch = (width * aspectRatio[1]) / aspectRatio[0]
                body.style.paddingTop = body.style.paddingBottom = `${(height - ch) / 2}px`
            }
        }
        cw = Math.floor(cw)
        ch = Math.floor(ch)
        adjustCanvas(c, cw, ch)

        SceneManager.resizeScreen = false
    }

    cam.setCanvas(c)
    // rect()
    Caldro.rendering.context.imageSmoothingEnabled = Caldro.rendering.imageSmoothing;
    if (world.paused()) {
        // setImageSmoothing(cc, true)
    }



    alpha(SceneManager.renderAlpha)
    CaldroCIM.draw(cc, "preRender", 0, 0, c.w, c.h)
    alpha(1)
    setImageSmoothing(cc, false)

    // CaldroCIM.draw(cc, "preRender", 0, 0, pw, ph)
    if (currentCam === devCam) {
        info.add("Current Scene: ", SceneManager.currentScene.name)
        info.add("Game FPS: ", toDecimalPlace(Caldro.time.getAverageFrameRate(), 2))
        info.add("Amount of bodes: ", world.amoountOfBodies())
        info.add("SFX SoundBank initialized: ", sfxSB.initialized)
        info.add("MUSIC SoundBank initialized: ", musicSB.initialized)
        info.add("inScreen particles: ", inPs.amountOfParticles());
        let point = SceneManager.currentScene.camera.pointer
        info.add("pointerX", point.x)
        info.add("pointerY", point.y)
        let gm, bgm
        if (musicSB.initialized) {
            bgm = musicSB.get("bg_music");
            gm = audioManager.getCurrentGM();
            info.add("Bgm time", bgm.getCurrentTime())
            if (gm) {
                info.add("godMusic time", gm.getCurrentTime())
            }
        }
        info.add("test", true)
        info.show();
        info.clearInfo();
        let t = 0;
        if (gm) {
            t = gm.getCurrentTime()
        }
        alpha(0.6)
        drawAnimationGraph(gmDarkFade, c.w - 200, 0, 200, 150, t, "dark")
        drawAnimationGraph(camZoomAnim, c.w - 200, 160, 200, 150, t, "camZ")
        drawAnimationGraph(playerFaceSize, c.w - 200, 320, 200, 150, t, "face")
        drawAnimationGraph(gmSpinAlpha, c.w - 200, 480, 200, 150, t, "Spin Alpha")
        drawAnimationGraph(gmTasksAnimations, c.w - 200, 640, 200, 150, t, "Tasks")
        alpha(1)
    }

    if (Caldro.renderer.hidingCursor) {
        Rect(pointer.x, pointer.y, 5, 5, stylizedColors["outlines"], 45)
        stRect(pointer.x, pointer.y, 15, 15, "white", 3, 0)
        stRect(pointer.x, pointer.y, 20, 20, stylizedColors["outlines"], 3, 45)
    }

    if (currentCam == devCam) {
        if (keyboard.isBeingPressed("c")) {
            if (pointer.x && pointer.y) {
                let text = colorObjectToString(getColor(pointer.x, pointer.y, cc))
                let offset = 30
                txt(text, pointer.x + offset, pointer.y - offset, font(20), "white")
            }
            cordShow(pointer, "lime")
        }
    }
}



function skipCutScene() {
    if (SceneManager.currentScene === mainGame) {
        if (mainGame.showingOpeningCutScene) {
            if (mainGame.skippedOpeningScene) return;
            mainGame.openSceneActor.moveToXY(-250, mainGame.openSceneActor.radius)
            mainGame.skippedOpeningScene = true
        } else if (mainGame.showingClosingCutScene) {
            if (mainGame.skippedClosingScene) return
            let endsong = musicSB.get("end_music")
            let time = endsong.getCurrentTime()
            if (time < 19) {
                endsong.setCurrentTime(19.25)
            }
            mainGame.skippedClosingScene = true
        }
    }
}



