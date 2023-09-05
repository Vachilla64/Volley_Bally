let cardScene = new Scene();





let points = [
    [-250, -100],
    [0, -100],
    [250, -100],
    [-250, 100],
    [0, 100],
    [250, 100],
]
cardScene.onLoad = () => {
    cardScene.buttons = new Array();

    let i = 0
    let iw = 960;
    let ih = 540;
    let width = 120
    let height = width * 1.5;

    for (let player of teamManager.allPlayers) {
        let x = points[i][0];
        let y = points[i][1];
        let playerCard = new button(x, y, width, height, "", player.color, player.color)
        playerCard.player = player
        playerCard.drawingStyle = 3
        playerCard.drawing = () => {
            drawPlayerCard(playerCard.player, playerCard.x, playerCard.y, playerCard.width, playerCard.height)
        }
        playerCard.onclick = () => {
            teamManager.setControlledPlayer(playerCard.player)
            SceneManager.startScene(mainGame)
            // SceneManager.startScene(caldroScene)
        }
        cardScene.buttons.push(playerCard)

        i++
    }

    mainGame.specialAreaClippingCircle.radius = 5000
}
cardScene.onUnload = () => {
    teamManager.players = [abby, clare, gustavo, may]
    teamManager.soloGame = false
    teamManager.setTeam(abby, 1)
    teamManager.setTeam(may, 1)
    teamManager.setTeam(clare, 2)
    teamManager.setTeam(gustavo, 2)
}

// cardScene.camera.y = 400

cardScene.render = () => {
    if (!CaldroIH.loaded) return;
    drawImage(CaldroIH.getImage("oceanBeach"), -0, 0, pw * 3, ph * 3, true)
}