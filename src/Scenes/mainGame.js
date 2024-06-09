
const mainGame = new Scene("mainGame");
mainGame.camera = gameCam;
gameCam.Frame.visible = true
gameCam.Frame.visibleFrames = [1, 3]
gameCam.Frame.thickness = 0

mainGame.showinggodModeEntranceEffects = false;
mainGame.showingPerfectEffects = true;
mainGame.screenBlackBarHeight = 0
mainGame.goToPlace = (place) => {
    mainGame.previousLocation = mainGame.currentLocation
    mainGame.currentLocation.onLeave()
    mainGame.currentLocation = place
    place.onEnter()

    if (mainGame.currentLocation.weather == "clouds" && mainGame.previousLocation.weather != "clouds") {
        // make initial clouds
        inPs.particleSource(0, -150, 2400, 50, [70, 110], [0, 0], [0, 0], 10, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 30, INFINITY, function (particle) {
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
    } else if (mainGame.currentLocation.weather == "snow" && mainGame.previousLocation.weather != "snow") {
        // make initial snow
        inPs.particleSource(0, 0, 2400, 500, [-50, 10], [250, 300], [[0, 1], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 40, 30, function (particle) {
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
                if (particle.y + particle.size / 2 >= randomNumber(ground.getAABB().min.y, 100) || mainGame.currentLocation.weather != "snow") {
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
    } else if (mainGame.currentLocation.weather == "epglot" && mainGame.previousLocation.weather != "epglot") {
        // make initial epglofall
        inPs.particleSource(0, 0, 2400, 500, [-50, 10], [250, 300], [[0, 1], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 40, 30, function (particle) {
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
                if (particle.y + particle.size / 2 >= randomNumber(ground.getAABB().min.y, 100) || mainGame.currentLocation.weather != "epglot") {
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
    }

}

mainGame.setDefaultLoction = (place) => {
    mainGame.currentLocation.onLeave()
    mainGame.defaultLocation = place
    mainGame.currentLocation = mainGame.defaultLocation
}
mainGame.defaultLocation = oceanBeach;
mainGame.currentLocation = mainGame.defaultLocation
mainGame.wind = [-4, 0]
mainGame.specialAreaClippingCircle = {
    x: 0, y: 0, radius: 0,
}
mainGame.blackoutClippingCircle = {
    x: 0, y: 0, radius: 1500, reset: function () { this.radius = 1500; place(this, ORIGIN) }
}
mainGame.scoreBoard = {
    x: 0, y: -200, size: 128,
    render() {
        let size = this.size
        let ty = this.y + 40
        let tny = ty - 20
        CaldroSSM.draw("scoreBoard", this.x, this.y, size, size, true, 0)
        txt("Team 1", this.x - 30, tny, font(size * 0.1), stylizedColors["outlines"])
        txt(teamManager.team1Score, this.x - 30, ty, font(size * 0.2), stylizedColors["outlines"])
        txt("Team 2", this.x + 30, tny, font(size * 0.1), stylizedColors["outlines"])
        txt(teamManager.team2Score, this.x + 30, ty, font(size * 0.2), stylizedColors["outlines"])
    }
}
/*
mainGame.scoreGazer = {
    state: "gazing",
    x: 0,
    y: -210,
    update(deltatime) {
        let targetX = 0
        if (teamManager.team1Score > teamManager.team2Score) {
            targetX = -30
        } else if ((teamManager.team1Score < teamManager.team2Score)) {
            targetX = 30
        }
        this.x = approach(this.x, targetX, 6, deltatime).value
    },
    render() {
        Rect(this.x, this.y, 20, 20, "grey")
        stRect(this.x, this.y, 20, 20, "white", 5)
    }
}
*/
mainGame.closingSceneActor = null
mainGame.blackFadeAlpha = 0;
mainGame.whiteCamFlashAlpha = 0
mainGame.sampledBGcolor = "white"
mainGame.showingOpeningCutScene = false;
mainGame.showingClosingCutScene = false;
mainGame.skippedOpeningScene = mainGame.skippedClosingScene = false

let maingameOpenScreenAlpha = new AnimationGraph()
maingameOpenScreenAlpha.addAnimationNode(0, 1)
maingameOpenScreenAlpha.addAnimationNode(1, 0)

let maingameOpenScreenCamPanDown = new AnimationGraph()
let mmaingameOpenScreenCamPanDownFollowTask = () => {
    gameCam.y = maingameOpenScreenCamPanDown.getValueAtTime(mainGame.elapsedTime)
}
maingameOpenScreenCamPanDown.addAnimationNode(0, -200)
maingameOpenScreenCamPanDown.addAnimationNode(3, -3, 0)
maingameOpenScreenCamPanDown.addAnimationNode(3.5, -10)
maingameOpenScreenCamPanDown.addAnimationNode(4, 0)

let maingameOpenScreenTasks = new AnimationGraph();
maingameOpenScreenTasks.addAnimationNode(0, 0, ()=>{
    beachBall.setStatic(true)
}, mmaingameOpenScreenCamPanDownFollowTask)
maingameOpenScreenTasks.addAnimationNode(4, 1, () => {
    beachBall.setStatic(false)
    beachBall.moveTo(new Lvector2D(-300, -150))
    beachBall.setVelocity(new Lvector2D(-400, 0))
}, () => {
    // mmaingameOpenScreenCamPanDownFollowTask
})
/* maingameOpenScreenTasks.addAnimationNode(4.5, 1, () => {
    mainGame.openSceneActor.status.controllable = false
}) */
maingameOpenScreenTasks.addAnimationNode(8, 2, NULLFUNCTION, () => {
    movePlayer(mainGame.openSceneActor, 10, clip(-mainGame.openSceneActor.position.x, -1, 1))
    if (mainGame.openSceneActor.position.x > -750) {
        gameCam.x = mainGame.openSceneActor.position.x
    }
    if (teamManager.controlledPlayer == mainGame.openSceneActor) {
        teamManager.setControlledPlayer(mainGame.openSceneActor)
    }
})
maingameOpenScreenTasks.addAnimationNode(500, 2, NULLFUNCTION)
mainGame.openSceneActor = null







mainGame.pauseable = true
let maingameClosingScreenTasks = new AnimationGraph();
maingameClosingScreenTasks.addAnimationNode(0, 0, () => { // first pause
    gameCam.target.active = false;
    mainGame.closingSceneActor = choose(teamManager.winningTeam) || choose(teamManager.players)
    world.pauseTime()
    inPs.pause();
    teamManager.stop()
    if (teamManager.godModePlayer) {
        teamManager.leavegodMode(teamManager.godModePlayer)
    }
    gameCam.zoom = 1
    mainGame.showinggodModeEntranceEffects = false
})
maingameClosingScreenTasks.addAnimationNode(1.33, 0, () => { // where da boll at?
    place(gameCam, beachBall.position)
    gameCam.zoom = 2
    mainGame.screenBlackBarHeight = 25
})
maingameClosingScreenTasks.addAnimationNode(2.71, 0, () => { // team 2
    place(gameCam, new Lvector2D(200*(beachBall.position.x >= 0?1:-1), 0))
    gameCam.zoom = 1.5
})
maingameClosingScreenTasks.addAnimationNode(3.4, 0, () => { // team 1
    place(gameCam, new Lvector2D(-200*(beachBall.position.x >= 0?1:-1), 0))
    gameCam.zoom = 1.5
})
maingameClosingScreenTasks.addAnimationNode(4.0, 0, NULLFUNCTION, () => { // resume pain and zooom out
    world.resumeTime();
    inPs.resume();
    place(gameCam, new Lvector2D(0, 0))
    gameCam.zoom = 1
    // zoomAndMove(gameCam, new Point2D(0, 0), 1, 2)
    mainGame.screenBlackBarHeight = approach(mainGame.screenBlackBarHeight, 0, 4, Caldro.time.deltatime).value
})
maingameClosingScreenTasks.addAnimationNode(4.77, 0, () => { //ughhhhhh
    world.resumeTime();
})
maingameClosingScreenTasks.addAnimationNode(5, 1, () => { // zoom in on score board
    // world.explosion(new Lvector2D(0, -175), 150, 1000000)
}, () => {
    zoomAndMove(gameCam, new Point2D(0, -170), 3, 2)
    mainGame.screenBlackBarHeight = approach(mainGame.screenBlackBarHeight, 25, 1, Caldro.time.deltatime).value
    mainGame.specialAreaClippingCircle.radiuse = approach(mainGame.specialAreaClippingCircle, 0, 10, Caldro.time.deltatime)
})
maingameClosingScreenTasks.addAnimationNode(7.2, 0, () => {  // throw ball in time with music
    let camAABB = mainGame.camera.getAABB();
    let ballAABB = beachBall.getAABB();
    if(!Collisions.intersectAANN(camAABB, ballAABB) && ballAABB.min.y > -90) {
        let side = beachBall.position.x < 0 ? 1 : -1;
        beachBall.moveTo(new Lvector2D(-150 * side, -50))
        beachBall.setVelocity(vecMath.multiply(new Lvector2D(1 * side, -1), 320))
    }

    world.removeBody(net)
    world.removeBody(netStick)
})
let questionMarkAlphaEnvelope = new AnimationGraph(
    [[0, 0],
    [0.3, 1],
    [0.6, 1],
    [1, 0],]
    )
    // zoom out of scoreboard / teleport players
maingameClosingScreenTasks.addAnimationNode(9, 1, () => {
    for (let player of teamManager.players) {
        player.moveTo(new Lvector2D(600 + randomNumber(50, 250), 0))
    }
    rightwall.collidable = false;
}, () => {
    zoomAndMove(gameCam, new Point2D(0, 0), 1, 4)
    mainGame.screenBlackBarHeight = approach(mainGame.screenBlackBarHeight, 25, 1, Caldro.time.deltatime).value
})
// question marks / place tripodCam and player
maingameClosingScreenTasks.addAnimationNode(9.7, 1, () => {
    let particlePoints = teamManager.players.map((player) => {
        let point = new Point2D()
        place(point, player.restingPosition)
        point.color = player.color;
        return point;
    })
    for (let point of particlePoints) {
        inPs.particleSource(point.x, point.y, 1, 1, 0, randomNumber(-60, -100), [[0, 0], [0, 0]], gustavo.radius * 3, "of no need", 1, 0.5, (particle) => {
            textOutline(particle.size * 0.2, point.color)
            txt("?", particle.x, particle.y, font(particle.size), "white", 0, "center")
            textOutline(0)
        }, (particle, time) => {
            particle.alpha = questionMarkAlphaEnvelope.getValueAtTime(time);
        })
    }
    
    teamManager.proccessingControls = false
    
    tripodCamera.moveTo(new Lvector2D(550, -500))
    world.addBody(tripodCamera)
    world.addBody(tripdCameraSpaceHogger)
    tripodCamera.setStatic(true)
    tripodCamera.onCollisionStart = (body) => {
        if (body == ground) {
            if (teamManager.proccessingControls == false) teamManager.proccessingControls = true;
            sfxSB.pause('fallingWhistle')
            sfxSB.play("boof", false, 0, null)
            gameCam.shake(5, 5)
            inPs.particleSource(tripodCamera.position.x, ground.getAABB().min.y, tripodCamera.width, 10, [-200, 200], [-100, 10], [0, 0], randomNumber(30, 40), "needn't", randomNumber(10, 20), 1, function (particle) {
                CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")

            setTimeout(() => {
                mainGame.closingSceneActor.addVelocity(new Lvector2D(900, -200))
            }, randomNumber(200, 400))
            //jplace beall beside camera
            if (chance(30)) {
                setTimeout(() => {
                    if (beachBall.position.x < 300) {
                        beachBall.moveToXY(250, beachBall.position.y)
                        beachBall.addVelocity(new Lvector2D(100, 0))
                    }
                }, 1000)
            }
        }
    }

    mainGame.closingSceneActor.setStatic(true)
    mainGame.closingSceneActor.moveTo(new Lvector2D(tripodCamera.position.x + mainGame.closingSceneActor.radius/2 , tripodCamera.position.y - tripodCamera.height))
}, AnimationGraph.SAMEASPREVIOUS)
// move camera to right side of arena
maingameClosingScreenTasks.addAnimationNode(10.3, 1, () => {
    sfxSB.play("fallingWhistle", false, 0)
}, () => {
    zoomAndMove(gameCam, new Point2D(750, 0), 1, 2)
    mainGame.screenBlackBarHeight = approach(mainGame.screenBlackBarHeight, 25, 1, Caldro.time.deltatime).value
})

// bring in tripodCam and happy player
maingameClosingScreenTasks.addAnimationNode(11, 1, () => {
    tripodCamera.setStatic(false)
    mainGame.closingSceneActor.setStatic(false)
}, AnimationGraph.SAMEASPREVIOUS)

maingameClosingScreenTasks.addAnimationNode(15, 1, NULLFUNCTION, () => {
    mainGame.screenBlackBarHeight = approach(mainGame.screenBlackBarHeight, 0, 3, Caldro.time.deltatime).value
})
// take the picture
maingameClosingScreenTasks.addAnimationNode(16.4, 1, () => {
    // shouldTakeScreenShot = true
    // shot();
    let w = preRenderingCanvas.width;
    let h = preRenderingCanvas.height;
    let shotID = "endShot"
    shot(shotID, 225, 90, 500, 281.25);
    place(gameCam.target.position, new Lvector2D())
    
    outPs.particleSource(0, 0, 0, 0, 0, 0, [0, 0], 0.4625, null, 1, 5, (particle)=>{
        // CaldroCIM.draw(Caldro.renderer.context, "shot", particle.x, particle.y, w*particle.sice, h*particle.size, true, particle.angle)
        CaldroCIM.draw(Caldro.renderer.context, particle.shotID, particle.x, particle.y, w*particle.size, h*particle.size, true, particle.angle)
        // console.log(particle)
        stRect(particle.x, particle.y, w*particle.size, h*particle.size, "white", 8, particle.angle)
    }, "", (particle)=>{
        particle.shotID = shotID
        particle.callback = () =>{
            let time = particle.lifeTime
            particle.x = endSCPicX.getValueAtTime(time) + 400
            particle.y = endSCPicY.getValueAtTime(time) + 225
            particle.angle = endSCPicA.getValueAtTime(time)
        }
    })
})


function shot(ID, x, y, w, h){
    if(sfxSB.active){
        sfxSB.setCurrentTime("cam1", 0.8)
        sfxSB.play("cam1");
    }
    // let shotID = psuedoUUID();
    CaldroCIM.setDrawing(preRenderingCanvas, ID, x, y, w, h)
    mainGame.whiteCamFlashAlpha = 1
    // return shotID
}

let maingameBlackoutCircleAnimation = new AnimationGraph();
maingameBlackoutCircleAnimation.addAnimationNode(0, 1500)
maingameBlackoutCircleAnimation.addAnimationNode(18, 1500)
maingameBlackoutCircleAnimation.addAnimationNode(20, 200, NULLFUNCTION, () => {
    mainGame.blackoutClippingCircle.radius = approach(mainGame.blackoutClippingCircle.radius, 100, 10).value
})
maingameBlackoutCircleAnimation.addAnimationNode(21.4, 200, NULLFUNCTION, () => {
    mainGame.blackoutClippingCircle.radius = approach(mainGame.blackoutClippingCircle.radius, 150, 5).value
})
maingameBlackoutCircleAnimation.addAnimationNode(21.68, 200, NULLFUNCTION, () => {
    // mainGame.blackoutClippingCircle.radius = approach(mainGame.blackoutClippingCircle.radius, 0, 12).value*
    mainGame.blackoutClippingCircle.radius = clip(mainGame.blackoutClippingCircle.radius - 500 * Caldro.time.deltatime, 0, Infinity)
})
maingameBlackoutCircleAnimation.addAnimationNode(24, 200, () => {
    musicSB.play("photoPiano")
}, AnimationGraph.SAMEASPREVIOUS)


// IM COMING FOR YOU LATER....PROBABLY IN A MONTH, LMAO
// transitions? done ig
maingameBlackoutCircleAnimation.addAnimationNode(24, 200, () => {
    mainGame.showingClosingCutScene = false
    SceneManager.startTransitionScreen(mainGameToMatchOverTransiiton)
})







mainGame.physicsBodies = [
    // kenfloor,
    ground,
    netStick,
    net,
    beachBall,
    leftwall,
    rightwall,
    topWall,
    playerEnteredTrigger,
]

mainGame.quickImpactPause = (time = 0.45) => {
    setTimeout(() => {
        if (teamManager.sessionWinner) return;
        world.pauseTime();
        inPs.pause();
        mainGame.pause();
        setTimeout(() => {
            if (!mainGame.pausedByUser) {
                world.resumeTime();
                inPs.resume();
                mainGame.resume();
            }
        }, time * 1000)
    }, 10)
}

mainGame.setupMatchArea = function () {
    world.removeAllBodies();
    world.resumeTime();
    inPs.resume();
    mainGame.pausedByUser = false
    sfxSB.stopAll();
    clearDoTask("leaveSpecialAreaIfTooLate")
    teamManager.setAllPlayerFellings("", true)
    teamManager.setAllPlayerFellings("", false)
    mainGame.specialAreaClippingCircle.radius = 0;
    mainGame.setDefaultLoction(mainGame.defaultLocation)
    mainGame.blackoutClippingCircle.reset();
    mainGame.screenBlackBarHeight = 0;
    teamManager.reset();
    mainGame.skippedOpeningScene = mainGame.skippedClosingScene = false
    mainGame.camera.zoom = 1
    place(mainGame.camera, new Point2D(-750, -200))
    leftwall.collidable = rightwall.collidable = true;
    maingameClosingScreenTasks.stop()
    teamManager.removePlayers();
    for (let body of mainGame.physicsBodies) {
        world.addBody(body)
    }
    inPs.clearParticles();
}

class Match{
    constructor(time, team1, team2, maxScore, location, player){
        this.time = time;
        this.team1 = team1;
        this.team2 = team2;
        this.maxScore = maxScore;
        this.location = location;
        this.controlledPlayer = player
    }
}

mainGame.onLoad = function () {

    // resetting stuff
    world.removeAllBodies();
    world.resumeTime();
    inPs.clearParticles();
    inPs.resume();
    sfxSB.stopAll();
    musicSB.stopAll();
    clearDoTask("leaveSpecialAreaIfTooLate")
    

    mainGame.setDefaultLoction(mainGame.defaultLocation)
    mainGame.pausedByUser = false
    mainGame.specialAreaClippingCircle.radius = 0;
    mainGame.blackoutClippingCircle.reset();
    mainGame.screenBlackBarHeight = 0;
    mainGame.skippedOpeningScene = mainGame.skippedClosingScene = false
    mainGame.showingClosingCutScene = false
    mainGame.camera.zoom = 1

    teamManager.reset();
    teamManager.removePlayers();
    
    leftwall.collidable = rightwall.collidable = true;
    
    gmTasksAnimations.stop();
    maingameClosingScreenTasks.stop()
    
    
    
    for (let body of mainGame.physicsBodies) {
        world.addBody(body)
    }

    teamManager.setupMatch(menuScene.match);
    mainGame.setDefaultLoction(teamManager.activeMatch.location)
    // mainGame.matchTime.setTime(timeToSeconds(0, menuScene.matchInfo.matchTime))
    // menuScene.team1.forEach((player) => { teamManager.setTeam(player, 1) })
    // menuScene.team2.forEach((player) => { teamManager.setTeam(player, 2) })
    
    teamManager.initPlayers();
    console.log(teamManager.setAllPlayerFellings("", true))
    teamManager.playingGame = true;


    mainGame.showingOpeningCutScene = true;
    if (mainGame.showingOpeningCutScene) {
        mainGame.openSceneActor = teamManager.team1.find((player) => {
            return player.team == 1
        })
        mainGame.blackFadeAlpha = 1
        beachBall.moveTo(new Lvector2D(0, -150))
        // beachBall.setStatic(true)

        leftwall.collidable = false
        teamManager.playingGame = false;
        teamManager.playingVolleyball = false;
        
        mainGame.openSceneActor.moveTo(new Lvector2D(-1050, ground.getAABB().min.y - mainGame.openSceneActor.radius))
        maingameOpenScreenTasks.stop();
        
        place(mainGame.camera, new Point2D(-750, -200))
    } else {
        mainGame.blackFadeAlpha = 0;
        teamManager.start();
        world.removeBody(playerEnteredTrigger)
    }



}


mainGame.onUnload = function () {
    for (let body of mainGame.physicsBodies) {
        world.removeBody(body)
    }
    teamManager.removePlayers()
}
mainGame.matchTime = {
    time: 0,
    remainingTime: 0,
    paused: true,
    pause() {
        this.paused = true;
    },
    resume() {
        this.paused = false;
    },
    getUnitTime() {
        return this.elapsedTime / this.time;
    },
    setTime(time) {
        this.time = time
        this.remainingTime = time
    },
    setRemainingTime(time) {
        this.remainingTime = time
    },
    update(deltatime = Caldro.time.deltatime) {
        if (this.paused) return;
        if(menuScene.infiniteMatch) return;
        this.remainingTime -= deltatime;
        this.remainingTime = clip(this.remainingTime, 0, this.time)
        if (this.remainingTime <= 0) {
            this.pause();
            this.onTimeExhausted();
        }
    },
    onTimeExhausted() {
        teamManager.onSessionWon();
        console.log("time up")
    },
}
mainGame.update = function (deltatime) {
    updateTimedTasks();
    gameCam.Frame.thickness = mainGame.screenBlackBarHeight
    mainGame.matchTime.update();
    if (mainGame.showingOpeningCutScene) {
        maingameOpenScreenTasks.getValueAtTime(mainGame.elapsedTime, true)
        mainGame.blackFadeAlpha = maingameOpenScreenAlpha.getValueAtTime(mainGame.elapsedTime)
    }
    if (mainGame.showingClosingCutScene) {
        let time = musicSB.get("end_music").getCurrentTime();
        maingameClosingScreenTasks.getValueAtTime(time, true)
        place(mainGame.blackoutClippingCircle, mainGame.closingSceneActor.position)
        maingameBlackoutCircleAnimation.getValueAtTime(time, true)
        if (mainGame.specialAreaClippingCircle.radius < 9000) {
            doTask("leaveSpecialAreaIfTooLate", () => {
                mainGame.setDefaultLoction(mainGame.defaultLocation)
            })
            mainGame.specialAreaClippingCircle.radius = approach(mainGame.specialAreaClippingCircle.radius, 0, 10, Caldro.time.deltatime).value
        }
    } else {
        let rush = audioManager.getCurrentGM();
        if (teamManager.godModePlayer) {
            place(mainGame.specialAreaClippingCircle, teamManager.godModePlayer.position)
        }
        if (rush) {
            let time = rush.getCurrentTime()
            mainGame.specialAreaClippingCircle.radius = gmAreaViewRadius.getValueAtTime(time)
        }
    }


    teamManager.everyUpdate();
    teamManager.updateControlledPlayers();
    teamManager.playersPlay()
    
    // world.step(deltatime, 1)
    world.step(deltatime, 10)
    // mainGame.scoreGazer.update(deltatime)
    mainGame.currentLocation.whileHere();
}

mainGame.godBallScreenAlpha = 0
mainGame.playerEncourageTint = 0

mainGame.render = function () {
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
        mainGame.godBallScreenAlpha = approach(mainGame.godBallScreenAlpha, 0, 5).value
    }

    alpha(mainGame.godBallScreenAlpha)
    Rect(0, 0, pw * 3, ph * 3, "black")
    edges(200, 200, 200, 'white', preRenderingCanvas, SceneManager.currentScene.camera)
    alpha(1)

    alpha(mainGame.playerEncourageTint)
    Rect(0, 0, pw * 3, ph * 3, "black")
    edges(200, 200, 200, 'white', preRenderingCanvas, SceneManager.currentScene.camera)
    alpha(1)

    

    mainGame.scoreBoard.render();
    CaldroSSM.draw("timeboard", 0, 200, 128, 64, true, 0)
    CaldroSSM.draw("clock", -35, 200, 45, 45, true, 0)
    let timeInText = ""
    let matchtime = secondsToTime(mainGame.matchTime.remainingTime, true)
    let mins = matchtime.minutes + ""
    if (mins.length == 1) mins = "0" + mins
    let secs = matchtime.seconds + ""
    if (secs.length == 1) secs = "0" + secs
    timeInText = mins + ":" + secs
    txt("Time", 20, 190, font(20), stylizedColors["outlines"])
    if(menuScene.infiniteMatch){
        txt("Infinite ∞", 20, 210, font(18), stylizedColors["outlines"])
    } else {
        txt(timeInText, 20, 210, font(20), stylizedColors["outlines"])
    }



    if (beachBall.position.y < -250 && teamManager.recordingScores) {
        alpha(Math.abs(Math.sin(Caldro.time.elapsedTime * 4)))
        triangle(beachBall.position.x, -200, 24, "white", 180)
        stTriangle(beachBall.position.x, -200, 24, stylizedColors["outlines"], 180, 3)
    }



    for (let i = 0; i < world.amoountOfBodies(); ++i) {
        let body = world.getBody(i)
        if (body.drawing) {
            body.drawing();
            continue;
        }
    }

    inPs.updateAndRenderAll(Caldro.time.deltatime);

    if (mainGame.currentLocation.foregroundImage) {
        CaldroIH.draw(mainGame.foregroundImage.backgroundImage, (-pw / 2) * 3, (-ph / 2) * 3, pw * 3, ph * 3)
    }


    if (currentCam != devCam) {
        cnt.restore();
    }

    
}

