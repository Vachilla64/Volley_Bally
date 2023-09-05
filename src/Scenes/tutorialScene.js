
let tutorialScene = new Scene();
tutorialScene.pauseable = true
tutorialScene.boddies = [
    ground, clare
]
tutorialScene.onLoad = function () {
    teamManager.setControlledPlayer(clare)
    for (let body of tutorialScene.boddies) {
        world.addBody(body)
    }
}
tutorialScene.onUnload = function () {
    for (let body of tutorialScene.boddies) {
        world.removeBody(body)
    }
}
tutorialScene.update = function () {
    if (teamManager.controlledPlayer) {
        let dx = 0;
        let dy = 0;
        let forceMagnitude = teamManager.controlledPlayer.moveSpeed * 50
        if (keyboard.isBeingPressed("left")) { --dx; }
        if (keyboard.isBeingPressed("right")) { ++dx; }
        if (keyboard.isBeingPressed("up")) { --dy; }
        movePlayer(teamManager.controlledPlayer, teamManager.controlledPlayer.moveSpeed, dx)
        let body = ground
    }
    world.step(Caldro.time.deltatime)
    zoomAndMove(tutorialScene.camera, clare.position, tutorialScene.camera.zoom, 3)
    beachBall.rotationalVelocity = Math.abs(beachBall.linearVelocity.x) < 18 ? 0 : beachBall.linearVelocity.x;
}
tutorialScene.render = () => {
    mainGame.render()
    info.add("Clare time off ground: ", clare.timeOffGround)
    info.add("Clare time on ground: ", clare.timeOnGround)
    info.update(); info.render();
    info.clearInfo();
}