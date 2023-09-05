
let offSb = new DOMaudioManager()
// sb.initialize();
// sb.active = false
// sb.throwErrors = false
// SceneManager.startScene(cardScene)
// SceneManager.startScene(tutorialScene)



const trailerScreen = new Scene();
trailerScreen.camera = new camera();
trailerScreen.playing = false
trailerScreen.showingDetails = false
trailerScreen.askingQuestion = false
trailerScreen.questionAlpha = 0

let tcamtarget = {
    position: new Lvector2D(0, 0),
    zoom: 1,
    speed: 3,
    active: false,
    offset: {
        x: 0,
        y: 0,
    },
    setOffset(x, y) {
        this.offset.x = x;
        this.offset.y = y;
    }
}

let tcam = trailerScreen.camera
tcam.Frame.visible = true
tcam.Frame.visibleFrames = [1, 3]
tcam.Frame.thickness = 20
trailerScreen.questionTime = 16

let startTrailer = new button(0, 0, 200, 200, "sTART", "salmon", "white")
window.onblur = () => {
    offSb.stopAll();
}

startTrailer.onclick = () => {
    offSb.onInit = () => {
        song = offSb.get("trailer")
        qsong = offSb.get("question")
        GameKeys.hitKey("s")
    }
    offSb.add("trailer", "audio/Orchestra_on_the_beach.mp3")
    offSb.add("question", "audio/question_asking.mp3")
    // offSb.add("trailer", "audio/OOTB_stripped.mp3")
    offSb.add("coldwind1", "audio/atmos/mixkit-meadow-wind-light-1166.wav")
    offSb.add("qyes", "audio/question_yes.mp3")
    offSb.initialize();
}
let song;
let qsong;
let trailerAG = new AnimationGraph();
{
    trailerAG.addAnimationNode(0, 1, () => {
        tcamtarget.active = true
        tcamtarget.zoom = 1.4
        tcamtarget.position = may.position
        tcamtarget.setOffset(100, -20)
    })
    trailerAG.addAnimationNode(0.1, 2, () => {
        tcamtarget.position = may.position
    }, () => {
        movePlayer(may, 20, 1)
        SceneManager.currentScene.camera.limitWithinBox({ x: 0, y: 0, width: 2300, height: 1500 })
    })
    trailerAG.addAnimationNode(2, 3, () => {
        may.status.mainFeeling = "Smug"
    }, NULLFUNCTION)
    trailerAG.addAnimationNode(3.3, 4, () => {
        tcamtarget.position = beachBall.position
        tcamtarget.position = new Lvector2D(beachBall.position.x - tcam.actualOffsetX, tcamtarget.position.y - tcam.actualOffsetY)
    }, NULLFUNCTION)
    trailerAG.addAnimationNode(5.26, 5, () => {
        tcamtarget.active = true
        tcamtarget.speed = 2
        tcamtarget.setOffset(-100, -20)
        tcamtarget.position = gustavo.position
    })
    trailerAG.addAnimationNode(6.45, 6, () => {
        movePlayer(gustavo, 150, -1)
    })
    trailerAG.addAnimationNode(6.9, 7, () => {
        movePlayer(gustavo, 160, -1)
    })
    trailerAG.addAnimationNode(7.9, 8, () => {
        may.moveToXY(-150, may.position.y)
    }, () => {
        movePlayer(gustavo, 35, -1)
    })
    trailerAG.addAnimationNode(9, 9, () => {
        gustavo.status.mainFeeling = "Smug"
        tcamtarget.setOffset(0, 0)
        tcamtarget.position = beachBall.position
    })
    trailerAG.addAnimationNode(10.5, 10, () => {
        tcamtarget.position = beachBall.position;
        tcamtarget.zoom = 3
        tcamtarget.speed = 1
    }, () => {
        tcam.shake(2, 2)
        inPs.particleSource(net.position.x, ground.getAABB().min.y, net.width, 10, [-100, 100], [-60, 10], [0, 0], 20, null, 3, 1, (particle) => {
            CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
        }, "grow fadeout")
    })
    trailerAG.addAnimationNode(10.75, 10, () => {
        tcamtarget.position = beachBall.position;
        tcamtarget.zoom = 3
        tcamtarget.speed = 2
        trailerScreen.showingDetails = true

        may.status.mainFeeling = "Jump"
    }, (time) => {
        if (time > 10) {
            tcamtarget.zoom = 2
        }
        tcam.shake(2, 2)
        if (net.position.y > 10) {
            let speed = -1
            net.move(new Lvector2D(0, speed))
            netStick.move(new Lvector2D(0, speed))
            inPs.particleSource(net.position.x, ground.getAABB().min.y, net.width, 10, [-100, 100], [-60, 10], [0, 0], 20, null, 3, 1, (particle) => {
                CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")
        }
    })
    trailerAG.addAnimationNode(12.7, 11, () => {
        tcamtarget.position = Lvector2D.zero();
        tcamtarget.zoom = 1
        tcamtarget.speed = 3
        tcam.shake(15, 15)
        for (let angle = 0; angle <= 360; angle += 18) {
            let length = beachBall.radius
            let speed = 500
            let sinA = sine(angle);
            let cosA = -cosine(angle);
            let x = beachBall.position.x + length * sinA
            let y = beachBall.position.y + length * cosA
            inPs.particleSource(x, y, 10, 10, speed * sinA, speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
                CaldroSSM.draw("outWhiespray", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
            }, "shrink fadeout", function (particle) {
                particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
            })
            inPs.particleSource(x, y, 10, 10, 0.5 * speed * sinA, 0.5 * speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
                CaldroSSM.draw("lineW", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
            }, "shrink fadeout", function (particle) {
                particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
            })
        }
        // tcamtarget.active = false
    }, () => {
        if (net.position.y > 10) {
            let speed = -1
            net.move(new Lvector2D(0, speed))
            netStick.move(new Lvector2D(0, speed))
            inPs.particleSource(net.position.x, ground.getAABB().min.y, net.width, 10, [-100, 100], [-60, 10], [0, 0], 20, null, 3, 1, (particle) => {
                CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")
        }
        let Spspeed = 500
        inPs.particleSource(beachBall.position.x, beachBall.position.y, 10, 10, [-Spspeed, Spspeed], [-Spspeed, Spspeed], [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
            CaldroSSM.draw("outWhiespray", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
        }, "shrink fadeout", function (particle) {
            particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
        })
    })
    trailerAG.addAnimationNode(14.8, 12, () => {
        beachBall.isGodBall = true
        tcam.shake(22, 22)
        inPs.particleSource(beachBall.position.x, beachBall.position.y, 10, 10, [-700, 700], [-700, 700], [[0, 0], [3, 3]], randomNumber(50, 80), "nope", 15, 3, function (particle) {
            glow(20)
            Rect(particle.x, particle.y, particle.size / 2, particle.size, "white", particle.ang)
            Rect(particle.x, particle.y, particle.size / 2, particle.size, "white", particle.ang + 90)
            glow(0)
        }, "shrink fadeout", function (particle) {
            particle.callback = () => {
                particle.ang += particle.angSpeed
            }
            particle.angSpeed = randomNumber(20, 40)
            particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
        })
        for (let angle = 0; angle <= 360; angle += 18) {
            let length = beachBall.radius
            let speed = 500
            let sinA = sine(angle);
            let cosA = -cosine(angle);
            let x = beachBall.position.x + length * sinA
            let y = beachBall.position.y + length * cosA
            inPs.particleSource(x, y, 10, 10, speed * sinA, speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 3, function (particle) {
                CaldroSSM.draw("outWhiespray", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
            }, "shrink fadeout", function (particle) {
                particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
            })
            inPs.particleSource(x, y, 10, 10, 0.5 * speed * sinA, 0.5 * speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 3, function (particle) {
                CaldroSSM.draw("lineW", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
            }, "shrink fadeout", function (particle) {
                particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
            })
        }
    })
    trailerAG.addAnimationNode(14.9, 12, () => {
        // beachBall.isGodBall = true
    }, () => {
        return
        if (chance(10))
            jump(may)
        if (chance(10))
            jump(gustavo)
        let Spspeed = 900
        inPs.particleSource(beachBall.position.x, beachBall.position.y, 10, 10, [-Spspeed, Spspeed], [-Spspeed, Spspeed], [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
            CaldroSSM.draw("outWhiespray", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
        }, "shrink fadeout", function (particle) {
            particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
        })
    })
    trailerAG.addAnimationNode(15.3, 12, () => {
        gustavo.status.mainFeeling = "Jump"
    })
    trailerAG.addAnimationNode(15.7, 12, () => {
        let wsh = sb.get("woosh", true)
        wsh.setPlaybackRate(0.7)
        wsh.play()
    })
    trailerAG.addAnimationNode(17, 12, () => {
        trailerScreen.askingQuestion = true
        timeoutTask(() => {
            trailerScreen.buttons.push(agreeToPlay)
            trailerScreen.buttons.push(disagreeToPlay)
            timeoutTask(() => {
                if (trailerScreen.askingQuestion) {
                    agreeToPlay.alpha += Caldro.time.deltatime
                } else {
                    agreeToPlay.alpha -= Caldro.time.deltatime
                }
                agreeToPlay.alpha = clip(agreeToPlay.alpha, 0, 0.8)
                agreeToPlay.active = agreeToPlay.alpha > 0.7 && trailerScreen.askingQuestion
            }, 0, false)
            timeoutTask(() => {
                if (trailerScreen.askingQuestion) {
                    disagreeToPlay.alpha += Caldro.time.deltatime
                } else {
                    disagreeToPlay.alpha -= Caldro.time.deltatime
                }
                disagreeToPlay.alpha = clip(disagreeToPlay.alpha, 0, 0.8)
                disagreeToPlay.active = disagreeToPlay.alpha > 0.7 && trailerScreen.askingQuestion
            }, 500, false)
        }, 2500)
    })
    trailerAG.addAnimationNode(19.3, 12, () => {
        qsong = offSb.get("question")
        qsong.play();
        song.pause();
        song.currentTime = 23
    })
    trailerAG.addAnimationNode(23.35, 12, () => {
        teamManager.serveBall(3300);
    })
    trailerAG.addAnimationNode(24.25, 12, () => {
        beachBall.isGodBall = false
        teamManager.playingVolleyball = true;
        teamManager.playingGame = true;
        teamManager.recordingScores = true
        rightwall.collidable = leftwall.collidable = true;
    })
    trailerAG.addAnimationNode(24.5, 13, () => {
        tcamtarget.position = beachBall.position
        tcamtarget.speed = 0.5
        tcamtarget.zoom = 1.6
        tcamtarget.active = true
    })
    trailerAG.addAnimationNode(25, 12, NULLFUNCTION, () => {
        movePlayer(may, 60, choose([-1, 1]))
        movePlayer(gustavo, 70, choose([-1, 1]))
        if (chance(1))
            jump(may, 10)
        if (chance(2))
            jump(gustavo, 15)
    })
    trailerAG.addAnimationNode(26.5, 14, () => {
        // tcamtarget.active = false
        tcamtarget.position = Lvector2D.zero();
        tcamtarget.speed = 5
        tcamtarget.zoom = 1
    })
    trailerAG.addAnimationNode(34.6, 15, () => {
        tcamtarget.position = new Lvector2D(0, 100)
        tcamtarget.speed = 0.7
        tcamtarget.zoom = 1
    })
    trailerAG.addAnimationNode(35.3, 15, () => {
        tcamtarget.position = new Lvector2D(0, -450)
        tcamtarget.speed = 1
        tcamtarget.zoom = 1
        timeoutTask(() => {
            sb.play("whistle_lg", true)
            timeoutTask(() => {
                teamManager.serveBall()
            }, 300)
        }, 2100)


        timeoutTask(() => {
            let friends = [
                clare, abby, emilo, ken
            ]
            topWall.collidable = false
            for (let friend of friends) {
                let x = randomNumber(-200, 200)
                let y = -750 - randomNumber(-100, 300)
                world.addBody(friend)
                friend.moveToXY(x, y)
                friend.status.controllable = false

                let walkingDirection = 1
                timeoutTask(() => {
                    friend.callback = () => {
                        doTask(friend.name + "Acting", () => {
                            walkingDirection = choose([-1, 1])
                        }, true, Infinity, randomNumber(200, 500))
                        movePlayer(friend, randomNumber(10, 20), walkingDirection)
                        if (chance(10)) {
                            jump(friend)
                        }
                    }
                }, randomNumber(500, 1000))
                world.addBody(friend)
            }
        }, 200)
    })
    trailerAG.addAnimationNode(38.3, 17, () => {
        SceneManager.startScene(caldroTitleScreenGrey)
    })
}
let questionAG = new AnimationGraph()


let agreeToPlay = new button(-150, 100, 130, 50, "Yeah!!", "lime", "white")
agreeToPlay.drawingStyle = 3
agreeToPlay.alpha = 0
agreeToPlay.drawing = function () {
    alpha(agreeToPlay.alpha)
    curvedRect(this.x, this.y, this.width, this.height, this.color, 0, 10)
    stCurvedRect(this.x, this.y, this.width, this.height, "white", 0, 10, 8)
    txt(this.text, this.x, this.y, font(25), "white")
    alpha(1)
}
agreeToPlay.onclick = () => {
    offSb.play("qyes")
    agreeToPlay.active = disagreeToPlay.active = false
    timeoutTask(() => {
        trailerScreen.askingQuestion = false
        song.play();
    }, 2000)
    timeoutTask(
        () => {
            tcam.Frame.thickness = clip(tcam.Frame.thickness - 10 * Caldro.time.deltatime, 0, INFINITY)
            qsong.volume = clip(qsong.volume - 0.6 * Caldro.time.deltatime, 0, 1)
        }, 0, false
    )
}

let disagreeToPlay = new button(150, 100, 130, 50, "Nope!?", "red", "white")
disagreeToPlay.drawingStyle = 3
disagreeToPlay.alpha = 0
disagreeToPlay.drawing = function () {
    alpha(disagreeToPlay.alpha)
    curvedRect(this.x, this.y, this.width, this.height, this.color, 0, 10)
    stCurvedRect(this.x, this.y, this.width, this.height, "white", 0, 10, 8)
    txt(this.text, this.x, this.y, font(25), "white")
    alpha(1)
}



trailerScreen.buttons = [
    // startTrailer
]
trailerScreen.onLoad = function () {
    GameKeys.addKey(-1, 's', () => {
        if (!offSb.initialized) {
            startTrailer.onclick();
            return
        }
        offSb.stopAll();
        // offSb.play("coldwind1")
        offSb.play("trailer")
        setTimeout(() => {
            // offSb.play("trailer")
        }, 5000)
        trailerScreen.playing - true
        trailerScreen.buttons = arrUtils.remove(trailerScreen.buttons, startTrailer)
    })
    GameKeys.addKey(-1, 't', () => {
        if (song) {
            console.log(song.currentTime)
        }
    })

    let comingC = physics.createCircleBody(new Lvector2D(-268, -460), 40, 0.4, 1, true)
    let comingIdot = physics.createCircleBody(new Lvector2D(-103, -485), 15, 0.4, 1, true)
    let coming = physics.createBoxBody(new Lvector2D(-150, -450), 300, 50, 0.4, 1, true)
    let soon = physics.createBoxBody(new Lvector2D(125, -450), 200, 50, 0.4, 1, true)
    let dots = physics.createBoxBody(new Lvector2D(265, -430), 75, 20, 0.4, 1, true)
    world.addBody(comingC)
    world.addBody(comingIdot)
    world.addBody(coming)
    world.addBody(soon)
    world.addBody(dots)

    mainGame.goToPlace(oceanBeach)
    // mainGame.goToPlace(snowBeach)
    // mainGame.setDefaultLoction(snowBeach)
    // mainGame.setupMatchArea()
    world.addBody(ground)
    // mainGame.screenBlackBarHeight = 0.1
    // teamManager.setControlledPlayer(gustavo)
    // teamManager.setControlledPlayer(may)
    teamManager.addPlayer(may, 1)
    teamManager.addPlayer(gustavo, 2)
    teamManager.initPlayers();
    may.moveToXY(-1150, 0)
    gustavo.moveToXY(844.5, -92)

    // tcamtarget.active = true;
    // tcamtarget.position = gustavo.position
    // tcamtarget.speed = 100

    world.addBody(netStick)
    world.addBody(net)

    netStick.moveToXY(0, 150)
    net.moveToXY(0, net.position.y + 150)

    let ctx = Caldro.rendering.context;
    net.preRender = () => {
        ctx.save();
        clipPolypon([
            // drawPolypon([
            new Point2D(-75, -75),
            new Point2D(75, -75),
            new Point2D(75, 75),
            new Point2D(-75, 75),
        ], "white")
    }
    net.postRender = () => {
        ctx.restore();
    }

    tcam.x = -650
    tcam.y = -450

    world.addBody(beachBall)
    world.addBody(leftwall)
    world.addBody(rightwall)
    world.addBody(topWall)
    rightwall.collidable = leftwall.collidable = false;
}
trailerScreen.onUnload = () => {
    net.preRender = net.postRender = function () { }
}

trailerScreen.update = function (deltatime) {
    updateTimedTasks()
    if (trailerScreen.askingQuestion) {
        trailerScreen.questionAlpha = clip(trailerScreen.questionAlpha + deltatime, 0, 0.5)
    } else {
        trailerScreen.questionAlpha = clip(trailerScreen.questionAlpha - deltatime * 0.7, 0, 0.5)
    }
    /*     doTask("change", ()=>{
            mainGame.setDefaultLoction(choose([
                beach, oceanBeach, snowBeach, epoglis, clouds
            ]))
        }, false, Infinity, 1000) */
    if (tcamtarget.active) {
        zoomAndMove(tcam, tcamtarget.position, tcamtarget.zoom, tcamtarget.speed, tcamtarget.offset)
    }
    if (song) {
        trailerAG.getValueAtTime(song.currentTime, true)
    }
    teamManager.everyUpdate();
    teamManager.updateControlledPlayers();
    teamManager.playersPlay()
    world.step(deltatime, 10)
    mainGame.scoreGazer.update(deltatime)
    mainGame.currentLocation.whileHere();
    beachBall.rotationalVelocity = Math.abs(beachBall.linearVelocity.x) < 18 ? 0 : beachBall.linearVelocity.x;

}
trailerScreen.render = function () {
    if (mainGame.currentLocation.weather == "clouds") {

        // beautiful acritecthure for some beautiful clouds
        doTask("create clouds", function () {
            inPs.particleSource(-1250, -150, 1, 50, [70, 110], [0, 0], [0, 0], 10, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 1, Infinity, function (particle) {
                alpha(0.6)
                CaldroSSM.draw(particle.cloudName, particle.x, particle.y, particle.cloudWidth, particle.cloudHeight, true)
                alpha(1)
            }, "", function (particle) {
                let cloudName = choose(["cloud1", "cloud2"]);
                particle.cloudName = cloudName
                if (cloudName == "cloud1") {
                    particle.cloudWidth = randomNumber(100, 150)
                    particle.cloudHeight = randomNumber(50, 75)
                } else if (cloudName == "cloud2") {
                    particle.cloudWidth = randomNumber(90, 120)
                    particle.cloudHeight = randomNumber(45, 50)
                }
                particle.callback = function () {
                    if (particle.x > particle.cloudWidth + 1250 || mainGame.currentLocation.weather != "clouds") {
                        inPs.removeParticle(particle)
                    }
                }
            })
        }, true, Infinity, 1000)

    } else if (mainGame.currentLocation.weather == "snow") {
        let saabb = ground.getAABB();
        doTask("snowWeather", function () {
            inPs.particleSource(0, -350, 3000, 50, [-50, 10], [250, 300], [[0, 1], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 1, 30, function (particle) {
                // alpha(0.6)
                CaldroSSM.draw(particle.snowflake, particle.x, particle.y, particle.size, particle.size, true, particle.angle)
                // alpha(1)
            }, "", function (particle) {
                let snowflake = choose(["snowflake1", "snowflake2"]);
                particle.snowflake = snowflake
                particle.angle = randomNumber(0, 360)
                particle.angleSpeed = randomNumber(30, 270)
                particle.callback = function () {
                    particle.angle += particle.angleSpeed * Caldro.time.deltatime;
                    if (particle.y + particle.size / 2 >= randomNumber(saabb.min.y, 100) || mainGame.currentLocation.weather != "snow") {
                        inPs.removeParticle(particle)
                    }
                }
                particle.onDelete = function () {
                    if (mainGame.currentLocation.weather != "snow") return;
                    inPs.particleSource(particle.x, particle.y, 1, 2, [0, 0], [0, 100], [0, 0], randomNumber(30, 40), "", 5, 0.2, function (particle) {
                        CaldroSSM.draw("clareSpray", particle.x, particle.y, particle.size, particle.size, true)
                    }, "shrink fadeout")
                }
            })
        }, true, Infinity, 10)
    } else if (mainGame.currentLocation.weather == "epglot") {
        let saabb = ground.getAABB();
        doTask("snowWeather", function () {
            inPs.particleSource(0, -350, 3000, 50, [-50, 10], [250, 300], [[0, 1], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 1, 30, function (particle) {
                // alpha(0.6)
                CaldroSSM.draw(particle.snowflake, particle.x, particle.y, particle.size, particle.size, true, particle.angle)
                // alpha(1)
            }, "", function (particle) {
                let snowflake = "epglot"
                particle.snowflake = snowflake
                particle.angle = randomNumber(0, 360)
                particle.angleSpeed = randomNumber(30, 270)
                particle.callback = function () {
                    particle.angle += particle.angleSpeed * Caldro.time.deltatime;
                    if (particle.y + particle.size / 2 >= randomNumber(saabb.min.y, 100) || mainGame.currentLocation.weather != "epglot") {
                        inPs.removeParticle(particle)
                    }
                }
                particle.onDelete = function () {
                    if (mainGame.currentLocation.weather != "epglot") return;
                    inPs.particleSource(particle.x, particle.y, 1, 2, [0, 0], [0, 100], [0, 0], randomNumber(30, 40), "", 5, 0.2, function (particle) {
                        CaldroSSM.draw("epglot", particle.x, particle.y, particle.size, particle.size, true)
                    }, "shrink fadeout")
                }
            })
        }, true, Infinity, 10)
    }


    let cnt = Caldro.renderer.context
    if (currentCam != devCam) {
        cnt.save();
        Rect(0, 0, 3000, 3000, "black")
        cnt.beginPath();
        cnt.arc(mainGame.blackoutClippingCircle.x, mainGame.blackoutClippingCircle.y, mainGame.blackoutClippingCircle.radius, 0, Math.PI * 2)
        cnt.closePath();
        cnt.clip();
    }




    let camBounds = cam.getBounds();
    CaldroIH.draw(mainGame.defaultLocation.backgroundImage, (-pw / 2) * 3, (-ph / 2) * 3, pw * 3, ph * 3)

    // clip background area and hide godMOdeArea
    cnt.save();
    cnt.beginPath();
    drawStarPolygon(mainGame.specialAreaClippingCircle.x, mainGame.specialAreaClippingCircle.y, mainGame.specialAreaClippingCircle.radius, 0.25, 1, Caldro.time.elapsedTime * 360, 5)
    cnt.closePath();
    CaldroIH.draw(mainGame.currentLocation.backgroundImage, (-pw / 2) * 3, (-ph / 2) * 3, pw * 3, ph * 3)
    cnt.restore();

    // mainGame.scoreGazer.render();

    if (beachBall.isGodBall) {
        mainGame.godBallScreenAlpha = approach(mainGame.godBallScreenAlpha, 0.7, 4).value
    } else {
        mainGame.godBallScreenAlpha = approach(mainGame.godBallScreenAlpha, 0, 1).value
    }

    alpha(mainGame.godBallScreenAlpha)
    Rect(0, 0, pw * 3, ph * 3, "black")
    alpha(1)

    if (trailerScreen.showingDetails) {
        mainGame.scoreBoard.render();
    }
    // CaldroSSM.draw("timeboard", 0, 200, 128, 64, true, 0)


    if (beachBall.position.y < -250 && teamManager.recordingScores) {
        triangle(beachBall.position.x, -200, 20, "white", 180)
        stTriangle(beachBall.position.x, -200, 20, stylizedColors["outlines"], 180)
    }

    let showNaes = true
    if (song) {
        if (song.currentTime > 10)
            showNaes = false
    }
    if (showNaes) {
        let nsize = 100
        textOutline(20, may.color)
        txt("May", -400, 50, font(nsize), "white")
        textOutline(20, gustavo.color)
        txt("Gustavo", 600, -20, font(nsize), "white")
        textOutline(0)

        textOutline(20, gustavo.color)
        txt("BeachGame", -650, -450, font(90), "white")
        textOutline(0)
    }

    if (song) {
        if (song.currentTime > 10) {
            textOutline(20, gustavo.color)
            txt("Coming soon...", 0, -450, font(90), "white")
            textOutline(0)
            if (song.currentTime > 37.3) {
                textOutline(10, gustavo.color)
                txt("probably...", 200, -370, font(40), "white")
                textOutline(0)
            }
        }
    }


    for (let i = 0; i < world.amoountOfBodies(); ++i) {
        let body = world.getBody(i)
        if (body.drawing) {
            body.render()
            continue;
        }
    }

    // world.renderBodies(false, 0.6)
    // textOutline(10, stylizedColors["ablue"])
    // txt("Shall we play? :)", 0, -170, font(50), "white")
    // textOutline(0)

    inPs.updateAndRenderAll(Caldro.time.deltatime);

    if (mainGame.currentLocation.foregroundImage) {
        CaldroIH.draw(mainGame.foregroundImage.backgroundImage, (-pw / 2) * 3, (-ph / 2) * 3, pw * 3, ph * 3)
    }

    alpha(trailerScreen.questionAlpha)
    Rect(0, 0, pw * 2, ph * 2, "black")
    if (song) {
        alpha(clip(trailerScreen.questionAlpha * 2 + clip(((song.currentTime - trailerScreen.questionTime) - 2.5), -1, 0), 0, 1))
    } else {
        alpha(trailerScreen.questionAlpha * 2)
    }
    // stRect(0, 0, pw * 0.9, ph * 0.9, "white", 2)
    textOutline(10, stylizedColors["ablue"])
    wrapText("Would you like to finallly play this beachball game?", 0, -100, pw * 0.8, 60, "white", font(50))
    textOutline(0)
    alpha(1)

    if (currentCam != devCam) {
        cnt.restore();
    }
}