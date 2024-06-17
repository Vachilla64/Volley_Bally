

let menuCam = new camera();
const menuScene = new Scene("menuScene")
menuScene.match = null;
menuScene.buttons = new Array();
menuScene.cameraTarget = new Point2D(0, 0)
class camPoint2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.elapsedTime = 0;
    }
}
let mcTargetP1 = new camPoint2D(-800, -450)
let mcTargetP2 = new camPoint2D(0, -450)
let mcTargetP3 = new camPoint2D(800, -450)
let mcTargetP4 = new camPoint2D(-800, 0)
let mcTargetP5 = new camPoint2D(0, 0)
let mcTargetP6 = new camPoint2D(800, 0)
let mcTargetP8 = new camPoint2D(0, 450)
let mcTargetP9 = new camPoint2D(800, 450)
menuScene.targetZoom = 1

let toMatchSetup = new button(mcTargetP9.x, mcTargetP9.y-50, 200, 50, "To Match Setup", "lime")
toMatchSetup.drawingStyle = 3
toMatchSetup.fontSize = 20
toMatchSetup.drawing = () => {
    let button = toMatchSetup;
    let color = button.color
    let color2 = "white"
    if (!button.active) {
        color = "grey"
        color2 = "lightgrey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    txt(button.text, button.x, button.y, font(button.fontSize), button.textColor)
}
toMatchSetup.onclick = () => {
    menuScene.setCamTarget(mcTargetP8)
}

let toMainScreen = new button(mcTargetP9.x, mcTargetP9.y+50, 200, 50, "Back", "orange")
toMainScreen.drawingStyle = 3
toMainScreen.fontSize = 20
toMainScreen.drawing = () => {
    let button = toMainScreen;
    let color = button.color
    let color2 = "white"
    if (!button.active) {
        color = "grey"
        color2 = "lightgrey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    txt(button.text, button.x, button.y, font(button.fontSize), button.textColor)
}
toMainScreen.onclick = () => {
    SceneManager.startTransitionScreen(menuScreenToMainScreen)
}





let previousPlayer = new button(mcTargetP4.x - 115, mcTargetP4.y + 30, 80, 150, "", 'transparent')
previousPlayer.drawingStyle = 3
/* nextPlayer.drawing = () => {
    let button = nextPlayer;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
} */
previousPlayer.onclick = () => {
    menuScene.currentSelectedPlayerIndex--
}
let nextPlayer = new button(mcTargetP4.x + 115, mcTargetP4.y + 30, 80, 150, "", 'transparent')
nextPlayer.drawingStyle = 3
/* nextPlayer.drawing = () => {
    let button = nextPlayer;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
} */
nextPlayer.onclick = () => {
    menuScene.currentSelectedPlayerIndex++
}
let selectPlayer = new button(mcTargetP4.x, mcTargetP4.y + 30, 150, 225, "", 'transparent')
selectPlayer.drawingStyle = 3
selectPlayer.onclick = () => {
    menuScene.selectedPlayer = menuScene.availblePlayers[menuScene.currentSelectedPlayerIndex]
}
let toTeam1 = new button(-910, -110, 50, 40, "", stylizedColors["ablue"])
toTeam1.drawingStyle = 3
toTeam1.drawing = () => {
    let button = toTeam1;
    let color = button.color
    let color2 = "white"
    if (!button.active) {
        color = "grey"
        color2 = "lightgrey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    triangle(button.x, button.y, button.height - 15, color2, -90)
}
toTeam1.callback = () => {
    toTeam1.active = menuScene.team1.length < 3
}
toTeam1.onclick = () => {
    let player = menuScene.availblePlayers[menuScene.currentSelectedPlayerIndex]
    if (player) {
        createPlayerUnselectButton(player, 1)
        menuScene.team1.push(player)
        menuScene.availblePlayers.splice(menuScene.currentSelectedPlayerIndex, 1)
    }
}
let toTeam2 = new button(-690, -110, 50, 40, "", stylizedColors["ablue"])
toTeam2.drawingStyle = 3
toTeam2.drawing = () => {
    let button = toTeam2;
    let color = button.color
    let color2 = "white"
    if (!button.active) {
        color = "grey"
        color2 = "lightgrey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    triangle(button.x, button.y, button.height - 15, color2, 90)
}
toTeam2.callback = () => {
    toTeam2.active = menuScene.team2.length < 3
}
toTeam2.onclick = () => {
    let player = menuScene.availblePlayers[menuScene.currentSelectedPlayerIndex]
    if (player) {
        createPlayerUnselectButton(player, 2)
        menuScene.team2.push(player)
        menuScene.availblePlayers.splice(menuScene.currentSelectedPlayerIndex, 1)
    }
}

let selectedPlayersButton = new button(-800, 180, 80, 40, "Next", "lime")
selectedPlayersButton.drawingStyle = 3;
selectedPlayersButton.drawing = () => {
    let button = selectedPlayersButton;
    let color = button.color
    let color2 = "white"
    if (!button.active) {
        color = "grey"
        color2 = "lightgrey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    txt(button.text, button.x, button.y, font(20), color2)
}
selectedPlayersButton.callback = () => {
    selectedPlayersButton.active = menuScene.team1.length > 0 && menuScene.team2.length > 0
}
selectedPlayersButton.onclick = () => {
    menuScene.setCamTarget(mcTargetP5)
}

let playerSelcetToMatchSetup = new button(-500, -170, 50, 50, "Back", "orange")
playerSelcetToMatchSetup.drawingStyle = 3;
playerSelcetToMatchSetup.drawing = () => {
    let button = playerSelcetToMatchSetup;
    let color = button.color
    let color2 = "white"
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    drawArrow(button.x, button.y, button.width * 0.5, color2, -180, 7)
}
playerSelcetToMatchSetup.onclick = () => {
    menuScene.setCamTarget(mcTargetP8)
}


menuScene.matchTimes = [1, 3, 5, 10, INFINITY]
menuScene.matchTimeIndex = 1;
let matchtimeReduce = new button(-100, mcTargetP8.y - 27, 30, 30, "", stylizedColors["yellow"])
matchtimeReduce.drawingStyle = 3
matchtimeReduce.drawing = () => {
    let button = matchtimeReduce
    let color = "white"
    let color2 = stylizedColors["yellow"]
    if (!button.active) {
        color = "lightgrey"
        color2 = "grey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 5)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 5, 5)
    triangle(button.x, button.y, button.width - 10, color2, -90)
    // stTriangle(button.x, button.y, button.width-10, color2, -90, 5)
}
matchtimeReduce.callback = () => {
    matchtimeReduce.active = menuScene.matchTimeIndex > 0
}
matchtimeReduce.onclick = () => {
    menuScene.matchTimeIndex--;
}
let matchtimeIncrease = new button(100, mcTargetP8.y - 27, 30, 30, "", stylizedColors["yellow"])
matchtimeIncrease.drawingStyle = 3
matchtimeIncrease.drawing = () => {
    let button = matchtimeIncrease
    let color = "white"
    let color2 = stylizedColors["yellow"]
    if (!button.active) {
        color = "lightgrey"
        color2 = "grey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 5)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 5, 5)
    triangle(button.x, button.y, button.width - 10, color2, 90)
    // stTriangle(button.x, button.y, button.width-10, color2, -90, 5)
}
matchtimeIncrease.callback = () => {
    matchtimeIncrease.active = menuScene.matchTimeIndex < menuScene.matchTimes.length - 1
}
matchtimeIncrease.onclick = () => {
    menuScene.matchTimeIndex++;
}

menuScene.matchMaxScores = [3, 7, 15, 24, INFINITY]
menuScene.matchMaxScoreIndex = 1
let matchMaxScoreReduce = new button(-100, mcTargetP8.y + 48, 30, 30, "", stylizedColors["yellow"])
matchMaxScoreReduce.drawingStyle = 3
matchMaxScoreReduce.drawing = () => {
    let button = matchMaxScoreReduce
    let color = "white"
    let color2 = stylizedColors["yellow"]
    if (!button.active) {
        color = "lightgrey"
        color2 = "grey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 5)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 5, 5)
    triangle(button.x, button.y, button.width - 10, color2, -90)
    // stTriangle(button.x, button.y, button.width-10, color2, -90, 5)
}
matchMaxScoreReduce.callback = () => {
    matchMaxScoreReduce.active = menuScene.matchMaxScoreIndex > 0
}
matchMaxScoreReduce.onclick = () => {
    menuScene.matchMaxScoreIndex--;
}
let matchMaxScoreIncrease = new button(100, mcTargetP8.y + 48, 30, 30, "", stylizedColors["yellow"])
matchMaxScoreIncrease.drawingStyle = 3
matchMaxScoreIncrease.drawing = () => {
    let button = matchMaxScoreIncrease
    let color = "white"
    let color2 = stylizedColors["yellow"]
    if (!button.active) {
        color = "lightgrey"
        color2 = "grey"
    }
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 5)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 5, 5)
    triangle(button.x, button.y, button.width - 10, color2, 90)
    // stTriangle(button.x, button.y, button.width-10, color2, -90, 5)
}
matchMaxScoreIncrease.callback = () => {
    matchMaxScoreIncrease.active = menuScene.matchMaxScoreIndex < menuScene.matchMaxScores.length - 1
}
matchMaxScoreIncrease.onclick = () => {
    menuScene.matchMaxScoreIndex++;
}

let goToPlayerSelectScreen = new button(mcTargetP8.x - 150, mcTargetP8.y + 145, 120, 40, "Select Players", "lime")
goToPlayerSelectScreen.drawingStyle = 3;
goToPlayerSelectScreen.drawing = function () {
    let button = goToPlayerSelectScreen;
    let color = this.color
    let color2 = "white"
    if (menuScene.infiniteMatch) {
        color = stylizedColors['outlines'];
    } else {
        color = "lime";
    }
    this.color = color
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
    txt(button.text, button.x, button.y, font(15), color2)
}
goToPlayerSelectScreen.onclick = () => {
    menuScene.setCamTarget(mcTargetP4)
}

let matchSetupToMenu = new button(mcTargetP8.x + 150, mcTargetP8.y + 145, 120, 40, "Back", "orange")
matchSetupToMenu.drawingStyle = 3;
matchSetupToMenu.drawing = () => {
    let button = matchSetupToMenu;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
    txt(button.text, button.x, button.y, font(15), "white")
    // drawArrow(button.x, button.y, w, "white", 90, lw) 
}
matchSetupToMenu.onclick = () => {
    menuScene.setCamTarget(mcTargetP9)
}

let locationSelectToPlyaerSelect = new button(mcTargetP5.x - 50, mcTargetP5.y + 170, 100, 40, "<< Back", "orange")
locationSelectToPlyaerSelect.drawingStyle = 3;
locationSelectToPlyaerSelect.drawing = () => {
    let button = locationSelectToPlyaerSelect;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
    txt(button.text, button.x, button.y, font(15), "white")
    /* let w = button.width * 0.5
    let lw = 5
    drawArrow(button.x, button.y, w, "white", -90, lw) */
}
locationSelectToPlyaerSelect.onclick = () => {
    menuScene.setCamTarget(mcTargetP4)
}

let confirmMatch = new button(mcTargetP5.x + 250, mcTargetP5.y + 170, 100, 40, "Confirm >>", 'lime')
confirmMatch.drawingStyle = 3;
confirmMatch.drawing = () => {
    let button = confirmMatch;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 10, 5)
    txt(button.text, button.x, button.y, font(15), "white")
}

function setupMatch() {
    // teamManager.sessionWinningScore = menuScene.matchInfo.topScore
    // mainGame.defaultLocation = menuScene.matchInfo.location
    // teamManager.players.length = 0;
    // menuScene.team1.forEach((player) => { teamManager.players.push(player); teamManager.setTeam(player, 1) })
    // menuScene.team2.forEach((player) => { teamManager.players.push(player); teamManager.setTeam(player, 2) })
    // teamManager.setControlledPlayer(menuScene.chosenPlayer)
    menuScene.match = new Match(timeToSeconds(0, menuScene.matchInfo.matchTime),
                                menuScene.team1,
                                menuScene.team2, 
                                menuScene.matchInfo.topScore,
                                menuScene.matchInfo.location,
                                menuScene.chosenPlayer,
    )
}

menuScene.matchInfo = {
    topScore: 0,
    location: "",
    matchTime: 0,
}

confirmMatch.onclick = () => {
    musicSB.play("anticipation", false, 0, 0.4)
    setupMatch()
    menuScene.prepareGamePreviewShot();
    menuScene.setCamTarget(mcTargetP2)
}

let previousLocation = new button(290, -23, 40, 40, "", "white")
previousLocation.drawingStyle = 3
previousLocation.drawing = () => {
    let button = previousLocation
    let angle = 75
    let color2 = stylizedColors["sand"]
    curvedRect(button.x, button.y, button.width, button.height, button.color, angle, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, angle, 10, 5)
    triangle(button.x, button.y, button.width / 2, color2, angle)
}
previousLocation.onclick = () => {
    if (!withinRange(lcardPoint.x, 50, 150)) return
    place(lcardPointTarget, castRay(100, 30, 75, 1000))
    setTimeout(() => {
        place(lcardPointTarget, new Point2D(100, 30))
        place(lcardPoint, castRay(100, 30, -105, 1000))
        menuScene.locationIndex++;
        menuScene.locationIndex = limit(menuScene.locationIndex, 0, teamManager.allLocations.length - 1, teamManager.allLocations.length - 1, 0)
    }, 600)
}
let nextLocation = new button(-98, 83.5, 40, 40, "", "white")
nextLocation.drawingStyle = 3
nextLocation.drawing = () => {
    let button = nextLocation
    let angle = -105
    let color2 = stylizedColors["sand"]
    curvedRect(button.x, button.y, button.width, button.height, button.color, angle, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, angle, 10, 5)
    triangle(button.x, button.y, button.width / 2, color2, angle)
}
nextLocation.onclick = () => {
    if (!withinRange(lcardPoint.x, 50, 150)) return
    place(lcardPointTarget, castRay(100, 30, -105, 1000))
    setTimeout(() => {
        place(lcardPointTarget, new Point2D(100, 30))
        place(lcardPoint, castRay(100, 30, 75, 1000))
        menuScene.locationIndex--;
        menuScene.locationIndex = limit(menuScene.locationIndex, 0, teamManager.allLocations.length - 1, teamManager.allLocations.length - 1, 0)
    }, 600)
}

let confirmMatchYes = new button(-100, -400, 100, 40, "Yes!", "lime")
confirmMatchYes.drawingStyle = 3;
confirmMatchYes.drawing = () => {
    let button = confirmMatchYes;
    alpha(menuScene.confirmYesNoAlpha);
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 3)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 3, 5)
    txt(button.text, button.x, button.y, font(15), "white")
    alpha(1);
}
confirmMatchYes.callback = () => {
    confirmMatchYes.active = menuScene.showingConfirmButtons
}
confirmMatchYes.onclick = () => {
    SceneManager.startTransitionScreen(menuToWaitingSceneTransition)
}
let confirmMatchNo = new button(100, -400, 100, 40, "Uhm...", "orange")
confirmMatchNo.drawingStyle = 3;
confirmMatchNo.drawing = () => {
    let button = confirmMatchNo;
    alpha(menuScene.confirmYesNoAlpha)
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 3)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 3, 5)
    txt(button.text, button.x, button.y, font(15), "white")
    alpha(1);
}
confirmMatchNo.callback = () => {
    confirmMatchNo.active = menuScene.showingConfirmButtons
}
confirmMatchNo.onclick = () => {
    menuScene.showingConfirmButtons = false
    setTimeout(() => {
        menuScene.setCamTarget(mcTargetP5)
    }, 300);
}
let askConfirm = new button(280, -290, 100, 50, "Play!", "lime")
askConfirm.drawingStyle = 3;
askConfirm.drawing = () => {
    let button = askConfirm;
    curvedRect(button.x, button.y, button.width, button.height, button.color, 0, 3)
    stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 3, 5)
    txt(button.text, button.x, button.y, font(20), "white")
}
askConfirm.callback = () => {
    let x = askConfirm.x;
    if (menuScene.showingConfirmButtons) {
        x = approach(x, 500, 7).value
    } else {
        x = approach(x, 280, 7).value
    }
    askConfirm.x = x
}
askConfirm.onclick = () => {
    menuScene.showingConfirmButtons = true
}
let backToLocationSelect = new button(-300, -290, 50, 50, "", "orange")
backToLocationSelect.drawingStyle = 3
backToLocationSelect.drawing = () => {
    let button = backToLocationSelect;
    let color = button.color
    let color2 = "white"
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    drawArrow(button.x, button.y, button.width * 0.5, color2, -180, 5)
}
backToLocationSelect.callback = () => {
    let x = backToLocationSelect.x;
    if (menuScene.showingConfirmButtons) {
        x = approach(x, -500, 7).value
    } else {
        x = approach(x, -300, 7).value
    }
    backToLocationSelect.x = x
}
backToLocationSelect.onclick = () => {
    menuScene.setCamTarget(mcTargetP5)
}



menuScene.buttons = [
    toMatchSetup,
    toMainScreen,
    matchSetupToMenu,
    previousPlayer,
    nextPlayer,
    selectPlayer,
    toTeam1,
    toTeam2,
    selectedPlayersButton,
    playerSelcetToMatchSetup,
    matchtimeReduce,
    matchtimeIncrease,
    matchMaxScoreReduce,
    matchMaxScoreIncrease,
    goToPlayerSelectScreen,
    locationSelectToPlyaerSelect,
    confirmMatch,
    previousLocation,
    nextLocation,
    confirmMatchYes,
    confirmMatchNo,
    askConfirm,
    backToLocationSelect,
]

menuScene.onLoad = function () {
    c1 = c2 = c3 = 350
    ct1 = ct2 = ct3 = 350
}
menuScene.followingCamTarget = true
menuScene.setCamTarget = (point) => {
    if (menuScene.cameraTarget) {
        menuScene.cameraTarget.elapsedTime = 0;
    }
    menuScene.cameraTarget = point;
}
menuScene.infiniteMatch = false;
menuScene.preparedGamePreviewShot = false;
menuScene.backdropLocation = 'oceanBeach'
menuScene.confirmDrawingPreRenderCanvas = document.createElement("canvas");
let menuPreviewCam = new camera();
menuScene.prepareGamePreviewShot = () => {
    let team1 = menuScene.team1
    let team2 = menuScene.team2
    let place = menuScene.matchInfo.location.backgroundImage
    let oldCanvas = Caldro.renderer.canvas;
    let canvas = menuScene.confirmDrawingPreRenderCanvas;
    menuPreviewCam.setCanvas(canvas)
    canvas.width = pw; canvas.height = ph;
    let ctx = canvas.getContext("2d")
    // setImageSmoothing(ctx, false)
    Caldro.renderer.setRenderingCanvas(canvas)
    rect()
    menuPreviewCam.update();
    menuPreviewCam.resolve();
    menuPreviewCam.update();
    CaldroIH.draw(place, 0, 0, pw * 3, ph * 3, true)
    net.drawing();
    mainGame.scoreBoard.render()
    let angle = randomNumber(0, 360)
    for (let player of team1) {
        let radius = randomNumber(50, 120)
        let point = castRay(-200, 0, angle, radius)
        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(randomNumber(degToRad(-30, 30)));
        drawMiniPlayerCard2(player, 0, 0, 110, 130)
        ctx.restore();
        angle += randomNumber(60, 120)
    }
    for (let player of team2) {
        let radius = randomNumber(50, 120)
        let point = castRay(200, 0, angle, radius)
        ctx.save();
        ctx.translate(point.x, point.y);
        ctx.rotate(randomNumber(degToRad(-30, 30)));
        drawMiniPlayerCard2(player, 0, 0, 110, 130)
        ctx.restore();
        angle += randomNumber(60, 120)
    }
    menuPreviewCam.resolve();
    Caldro.renderer.setRenderingCanvas(oldCanvas)
    CaldroCIM.setDrawing(canvas, "previewShot", 0, 0, pw, ph)
    menuScene.preparedGamePreviewShot = true
}
/* loadImages();
CaldroIH.onload = () => {
    SceneManager.startScene(menuScene);
    menuScene.setCamTarget(mcTargetP2)
    setTimeout(() => {
        menuScene.prepareGamePreviewShot()
    }, 200);
} */
menuScene.chosenOne = null /// chosen player button
menuScene.chosenPlayer = null
menuScene.showingConfirmButtons = false;
menuScene.confirmYesNoAlpha = 0
menuScene.update = (deltatime) => {
    if (menuScene.elapsedTime > 0.5) {
        // menuScene.prepareGamePreviewShot()
    }
    if (menuScene.chosenOne) {
        menuScene.chosenPlayer = menuScene.chosenOne.player;
    } else {
        menuScene.chosenPlayer = null
    }
    let speed = 7
    if (menuScene.showingConfirmButtons) {
        menuScene.confirmYesNoAlpha = approach(menuScene.confirmYesNoAlpha, 1, speed).value
    } else {
        menuScene.confirmYesNoAlpha = approach(menuScene.confirmYesNoAlpha, 0, speed).value
    }
    menuScene.matchInfo.topScore = menuScene.matchMaxScores[menuScene.matchMaxScoreIndex];
    menuScene.matchInfo.matchTime = menuScene.matchTimes[menuScene.matchTimeIndex];
    menuScene.matchInfo.location = teamManager.allLocations[menuScene.locationIndex]
    menuScene.infiniteMatch = (menuScene.matchTimeIndex == menuScene.matchTimes.length - 1) && (menuScene.matchMaxScoreIndex == menuScene.matchMaxScores.length - 1)
    if(menuScene.followingCamTarget){
        zoomAndMove(menuScene.camera, menuScene.cameraTarget, menuScene.targetZoom, 7)
    }
    menuScene.cameraTarget.elapsedTime += Caldro.time.deltatime
}
menuScene.availblePlayers = arrUtils.copy(teamManager.allPlayers)
menuScene.team1 = new Array();
menuScene.team2 = new Array();
menuScene.currentSelectedPlayerIndex = 0
let lcardPoint = new Lvector2D(100, 30)
let lcardPointTarget = new Lvector2D(100, 30)
// ⋍∞∞∞∞∞∞
function getTeamPlayerButtonCords(team) {
    if (!withinRange(team, 1, 2)) return;
    let x = 0;
    if (team == 1) {
        x = -1050;
    } else {
        x = -550
    }
    return [x, -40 + (90 * (team == 1 ? menuScene.team1.length : menuScene.team2.length))]
}
let toChosePlayerButtons = new Array();

menuScene.chosenOne = null;
function arrangeChosenOnes() {
    let x1 = -300;
    let y1 = -70;
    let x2 = -200;
    let y2 = -70;
    for (let button of toChosePlayerButtons) {
        if (button.team == 1) {
            button.x = x1
            button.y = y1
            y1 += 110
        } else if (button.team == 2) {
            button.x = x2
            button.y = y2
            y2 += 110
        }
    }
}
function createChosePlayerButton(player, team) {
    let select = new button(0, 0, 80, 100, '', player.color)
    select.team = team
    select.player = player;
    select.onclick = () => {
        if (menuScene.chosenOne != select) {
            menuScene.chosenOne = select
        } else {
            menuScene.chosenOne = null
        }
    }
    select.drawingStyle = 3
    select.drawing = () => {
        let button = select
        drawMiniPlayerCard(button.player, button.x, button.y, button.width, button.height)
        if (button == menuScene.chosenOne) {
            let green = "lime"
            alpha(0.05)
            curvedRect(button.x, button.y, button.width, button.height, green, 0, 20)
            alpha(1)
            stCurvedRect(button.x, button.y, button.width, button.height, green, 0, 20, 7)
            textOutline(10, green)
            txt("You", button.x, button.y, font(30), "white")
            textOutline(0)
        }
    }
    menuScene.buttons.push(select)
    toChosePlayerButtons.push(select)
    arrangeChosenOnes()
}
let unselctButtonsArray = new Array();
function createPlayerUnselectButton(player, team) {
    let UnselectButton = new button(
        getTeamPlayerButtonCords(team)[0],
        getTeamPlayerButtonCords(team)[1],
        79, 80, "", "red"
    )
    UnselectButton.team = team
    UnselectButton.player = player
    unselctButtonsArray.push(UnselectButton)
    UnselectButton.onclick = () => {
        let array
        if (UnselectButton.team == 1)
            menuScene.team1 = arrUtils.remove(menuScene.team1, UnselectButton.player)
        if (UnselectButton.team == 2)
            menuScene.team2 = arrUtils.remove(menuScene.team2, UnselectButton.player)

        /// remove the player for beeing selected
        if(menuScene.chosenPlayer == UnselectButton.player) menuScene.chosenOne = null; 

        menuScene.availblePlayers.push(player)
        menuScene.buttons = menuScene.buttons.filter((but) => {
            return but != UnselectButton
        })
        unselctButtonsArray = arrUtils.remove(unselctButtonsArray, UnselectButton)

        toChosePlayerButtons = toChosePlayerButtons.filter((but) => {
            return but.player != UnselectButton.player
        })
        menuScene.buttons = menuScene.buttons.filter((but) => {
            return but.player != UnselectButton.player
        })

        let t1y = -40
        let t2y = -40
        for (let button of unselctButtonsArray) {
            if (button.team == 1) {
                button.y = t1y
                t1y += 90
            } else if (button.team == 2) {
                button.y = t2y
                t2y += 90
            }
        }
        arrangeChosenOnes()
    }
    UnselectButton.drawingStyle = 3
    UnselectButton.drawing = () => {
        drawMiniPlayerCard(UnselectButton.player, UnselectButton.x, UnselectButton.y, UnselectButton.width, UnselectButton.height)
        if (pointIsIn(SceneManager.currentScene.camera.pointer, UnselectButton)) {
            let x = UnselectButton.x
            let y = UnselectButton.y
            let len = UnselectButton.width * 0.9
            alpha(0.9)
            Rect(x, y, len, len * 0.1, "red", 45)
            Rect(x, y, len, len * 0.1, "red", 135)
            alpha(1)
        }
    }
    menuScene.buttons.push(UnselectButton)
    createChosePlayerButton(player, team)
}

menuScene.locationIndex = 1;

function drawLocationCard(location, x, y, width, angle) {
    let img = CaldroIH.getImage(location.backgroundImage)
    let height = width * (9 / 16)
    let zoom = 2.5;
    let invzoom = 1 / zoom;
    drawImagePortion(img, img.width / 2 - (img.width * invzoom) / 2, img.height / 2 - (img.height * invzoom) / 2, img.width * invzoom, img.height * invzoom, x, y, width - 5, height - 5, true, angle)
    CaldroIH.draw("placeMask", x, y, width, height, true, angle)
}

let c1 = 30
let c2 = 30
let c3 = 30
let ct1 = 30
let ct2 = 30
let ct3 = 30
let infMFontS = 0

menuScene.setCamTarget(mcTargetP8)
place(menuScene.camera, mcTargetP8)
menuScene.render = function () {
    menuCam.update()
    CaldroIH.draw(menuScene.backdropLocation, 0, 0, pw * 3, ph * 3, true, 0)
    // checkBoard(-pw*1.5, -pw*1.5, pw*3, pw*3, 50, 50)
    // checkBoard(-pw*1.5, -pw*1.5, pw*3, pw*3, 5, 5, "grey ", "lightgrey")
    let txtColor = "white"
    textOutline(20, stylizedColors["sand"]);
    // txt("Volley Ballz", mcTargetP9.x, mcTargetP9.y - 100, font(80), txtColor)
    stRect(800, 450, pw*0.9, ph*0.9, "white", 2)
    
    
    textOutline(10, stylizedColors["sand"]);
    txt("Match Setup", mcTargetP8.x, mcTargetP8.y - 125, font(40), txtColor)
    txt("Match Time :", mcTargetP8.x - 250, mcTargetP8.y - 25, font(30), txtColor)
    txt("Match Score :", mcTargetP8.x - 250, mcTargetP8.y + 50, font(30), txtColor)

    rect(150, 250, 200, 300, stylizedColors["softOrange"])
    // rect(150, 250, 200, 300, stylizedColors["yellow"])
    strect(150, 250, 200, 300, "white", 7)
    let fnt = 16.5;
    textOutline(0);

    glow(10, "white")
    // wrapText("*Match Time: This is how long a match will last. The match will end once this time has elapsed, regardless of the scoreline.\n\n*Match Score: Once a team reaches this score the match will end, even if the match time hasn't fully been used up!", 176, 276, 150, fnt, "grey", font(fnt), "left", "left")
    wrapText("*Match Time: This is how long a match will last. The match will end once this time has elapsed, regardless of the scoreline.\n\n*Match Score: Once a team reaches this score the match will end, even if the match time hasn't fully been used up!", 175, 275, 150, fnt, "white", font(fnt), "left", "left")
    glow(0)

    textOutline(10, stylizedColors["sand"]);
    // rect(150, 270, 170, 270, stylizedColors["yellow"])

    curvedRect(0, mcTargetP8.y - 27, 100, 40, "white", 0, 10)
    stCurvedRect(0, mcTargetP8.y - 27, 100, 40, stylizedColors["yellow"], 0, 10, 4)

    curvedRect(0, mcTargetP8.y + 48, 100, 40, "white", 0, 10)
    stCurvedRect(0, mcTargetP8.y + 48, 100, 40, stylizedColors["yellow"], 0, 10, 4)

    textOutline(0);
    let matchtime = menuScene.matchTimes[menuScene.matchTimeIndex]
    if (matchtime != INFINITY) matchtime += "mins"
    else matchtime += " ∞"
    txt(matchtime, 0, mcTargetP8.y - 25, font(20), stylizedColors["softOrange"])
    let matchScore = menuScene.matchMaxScores[menuScene.matchMaxScoreIndex]
    if (matchScore != INFINITY) matchScore += "points"
    else matchScore += " ∞"
    txt(matchScore, 0, mcTargetP8.y + 50, font(20), stylizedColors["softOrange"])


    textOutline(20, stylizedColors["outlines"]);
    txt("Infinite", -150, 590, font(infMFontS), "white", -10)
    textOutline(0);
    alpha(infMFontS/100)
    textOutline(10, stylizedColors["outlines"]);
    txt("*This will be an Infinite Match", -150, 570-((infMFontS/10)), font(15), "white")
    textOutline(0);
    alpha(1)
    if (menuScene.infiniteMatch) {
        infMFontS = approach(infMFontS, 100, 7).value;
    } else {
        infMFontS = approach(infMFontS, 0, 10).value;
    }
    textOutline(10, stylizedColors["sand"]);
    // textOutline(10, "white");
    // txtColor = stylizedColors["yellow"]
    // textOutline(10, stylizedColors["outlines"]);
    txt("Select team players", -800, -170, font(40), txtColor)
    txt("Team1", -1050, -110, font(30), txtColor)



    txt("Team2", -550, -110, font(30), txtColor)



    textOutline(10, stylizedColors["sand"]);
    txt("And you", -250, -180, font(40), txtColor)
    txt("are?", -250, -145, font(40), txtColor)

    txt("Select match Location", 100, -160, font(40), "white")
    let angle = -15
    Rect(100, 30, 4000, 225, "white", angle)
    let speed = 5
    lcardPoint.x = approach(lcardPoint.x, lcardPointTarget.x, speed, Caldro.time.deltatime).value
    lcardPoint.y = approach(lcardPoint.y, lcardPointTarget.y, speed, Caldro.time.deltatime).value
    drawLocationCard(teamManager.allLocations[menuScene.locationIndex], lcardPoint.x, lcardPoint.y, 350, angle)

    let placeNameAlph = clip(scaleTo(Math.abs(lcardPoint.x), 100, 500, 1, 0), 0, 1)
    textOutline(5 + (5 * placeNameAlph), stylizedColors["sand"]);
    alpha(placeNameAlph)
    txt(teamManager.allLocations[menuScene.locationIndex].name, 100, 30, font(20 + (20 * placeNameAlph)), "white")
    alpha(1)

    textOutline(7, stylizedColors["ablue"]);

    txt("So if we got this right...", -350, -610, font(30), "white", 0, "left")
    textOutline(0);

    if (menuScene.preparedGamePreviewShot) {
        let size = 450
        let angle = -5
        let x = -70; let y = -455
        CaldroCIM.draw(Caldro.renderer.context, "previewShot", x, y, size, size * (9 / 16), true, angle)
        stCurvedRect(x, y, size, size * (9 / 16), 'white', angle, 10, 10)
        let player = menuScene.chosenPlayer

        let time = counter(0, 1)
        let flash = false
        if (time > 0.5) flash = true
        if (player) {
            textOutline(7, stylizedColors["ablue"]);
            txt("and you are...", 90, -300, font(30), "white", 0, "right")
            textOutline(0);
            drawMiniPlayerCard(player, 150, -300, 90, 110)
        } else {
            textOutline(7, stylizedColors["softOrange"]);
            txt("and you are...", 90, -300, font(30), "white", 0, "right")
            textOutline(0);
            if (flash) {
                // textOutline(5, stylizedColors["softOrange"]);
                textOutline(7, "red");
                glow(20, "red")
                txt("no one?", 100, -300, font(30), "white", 0, "left")
                glow(0)
                textOutline(0);
            }
        }

        let aboutMX = 280;
        let aboutMY = -490;
        // let aboutMY = -510;
        curvedRect(aboutMX, aboutMY, 150, 280, !menuScene.infiniteMatch ? stylizedColors["softOrange"] : stylizedColors["outlines"])
        stCurvedRect(aboutMX, aboutMY, 150, 280, "white", 0, 10, 10)

        // textOutline(5, stylizedColors["outlines"]);
        glow(10, "white")
        txt("Match-Time:", aboutMX, aboutMY - 90, font(20), "white")
        txt(matchtime, aboutMX, aboutMY - 50, font(30), "white")
        txt("Match-Score:", aboutMX, aboutMY + 10, font(20), "white")
        txt(matchScore, aboutMX, aboutMY + 50, font(30), "white")
        glow(0)


        alpha(menuScene.confirmYesNoAlpha * 0.7)
        Rect(0, 0, pw * 3, ph * 3, "black")
        alpha(menuScene.confirmYesNoAlpha)
        textOutline(7, stylizedColors["ablue"]);
        txt("Is this what you want?", 0, -500, font(35), "whtie")
        alpha(1)

    }




    if (menuScene.currentSelectedPlayerIndex < 0) {
        menuScene.currentSelectedPlayerIndex = menuScene.availblePlayers.length - 1
    } else if (menuScene.currentSelectedPlayerIndex > menuScene.availblePlayers.length - 1) {
        menuScene.currentSelectedPlayerIndex = 0
    }
    let Parray = menuScene.availblePlayers;
    let Pindex = menuScene.currentSelectedPlayerIndex;
    let player = null;
    let PrevPlayer = null;
    let NextPlayer = null
    if (Parray.length > 0) {
        player = Parray[Pindex]
    }
    if (Parray.length < 3) {
        if (Parray[Pindex - 1])
            PrevPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, -1)
        if (Parray[Pindex + 1])
            NextPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, 1)
    } else {
        PrevPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, -1)
        NextPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, 1)
    }
    // let PPrevPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, -2)
    // let NNextPlayer = wrapSelect(menuScene.availblePlayers, menuScene.currentSelectedPlayerIndex, 2)
    let etime = mcTargetP4.elapsedTime
    if (etime > 0) {
        ct1 = ct2 = ct3 = 30
        c1 = approach(c1, ct1, 10, Caldro.time.deltatime).value
        c2 = approach(c2, ct2, 6, Caldro.time.deltatime).value
        c3 = approach(c3, ct3, 5, Caldro.time.deltatime).value
    }
    // devCam.mimicCamera(SceneManager.currentScene.camera)
    // devCam.zoom = 0.8

    alpha(0.8)
    if (PrevPlayer)
        drawMiniPlayerCard(PrevPlayer, -900, c2, 100, 150)
    alpha(0.8)
    if (NextPlayer)
        drawMiniPlayerCard(NextPlayer, -700, c3, 100, 150)
    alpha(1)
    if (player)
        drawMiniPlayerCard(player, -800, c1, 150, 225)
    textOutline(0);


    menuCam.resolve()
}

