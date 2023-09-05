let lab = new Scene("Testing Grounds");
let lcam = lab.camera;
lcam.Frame.visible = true

let player = abby

sfxSB.setMasterVolume(0)

// lcam.target.position = player.position
lcam.target.zoom = 1
lcam.target.active = true

let camMode = 0
GameKeys.addKey(null, "c", () => {
    if (camMode == 0) {
        lcam.target.setTarget(player.position)
        lcam.target.zoom = 3
        lcam.target.zoomSpeed = 5
        lcam.target.active = true
        camMode = 1
    } else if (camMode == 1) {
        lcam.target.setTarget(player.position)
        lcam.target.zoom = 0.6
        lcam.target.zoomSpeed = 10
        lcam.target.followY = false
        lcam.target.position.y = 0
        lcam.target.active = true
        camMode = 2
    } else if (camMode == 2) {
        lcam.target.position = new Lvector2D(0, 0)
        lcam.target.followY = true
        lcam.target.zoom = 1
        lcam.target.zoomSpeed = 10
        lcam.target.active = true
        camMode = 0
    }
})

player = abby
player.onCollisionEnd = (body) => {
    // sfxSB.play("boop", true) 
}
teamManager.setControlledPlayer(player)

lab.pauseable = true
lab.physicsBodies = [
    ground,
    net,
    netStick,
    beachBall,
    leftwall, rightwall, topWall
]

lab.onLoad = function () {
    doTask("debigging stuff", ()=>{
        GameKeys.addKey(-1, "t", ()=>{
           
        })
        
        GameKeys.addKey(-1, "g", () => {
            questionSelf(player)
            // clare.encourageSelf();
        })
    })
    // SceneManager.startScene(loadingToMatchScene)
    // return; 
    mainGame.matchTime.setTime(timeToSeconds(1000, 10))
    teamManager.addPlayer(player, 1)
    teamManager.addPlayer(clare, 2)
    teamManager.addPlayer(may, 2)
    teamManager.addPlayer(gustavo, 2)
    teamManager.initPlayers();
    teamManager.start();
}

lab.onUnload = function () {
    world.removeBody(player)
    world.removeBody(gustavo)
}


lab.update = function (deltatime) {
    updateTimedTasks();

    mainGame.matchTime.update(Caldro.time.deltatime);
    // mainGame.matchTime.resume();

    teamManager.everyUpdate();
    teamManager.updateControlledPlayers();
    teamManager.playersPlay()
    world.step(deltatime, 10)
    mainGame.currentLocation.whileHere();
}



lab.render = function () {
    mainGame.render();
    for (let i = 0; i < world.contactPointsList.length; ++i) {
        // break
        let contactPoint = world.contactPointsList[i];
        alpha(1)
        Rect(contactPoint.x, contactPoint.y, 10, 10, "black")
        alpha(1)
        stRect(contactPoint.x, contactPoint.y, 10, 10, "white", 0.5)
    }
}


GameKeys.addKey(-1, "e", () => {
    mainGame.showingPerfectEffects = true
    musicSB.setCurrentTime("end_music", 6)
    teamManager.onSessionWon(1)
})

