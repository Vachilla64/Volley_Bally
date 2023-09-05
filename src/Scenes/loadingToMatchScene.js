

const loadingToMatchScene = new Scene();
loadingToMatchScene.tips = new Array();
loadingToMatchScene.addTip = (tipTitle, tipText) => {
    loadingToMatchScene.tips.push({
        title: tipTitle,
        text: tipText,
        shown: false,
        seen: false,
    })
}
loadingToMatchScene.addTip("First time playing?", "Have you checked out the tutorial yet? It should help you get started and its really good, even though it doesn't exsist yet...heh")
loadingToMatchScene.addTip("Multiplayer!", "You can check out the multiplayer screen to either play with someone on the same PC or check out the clouds and play online!\n*(same device multiplayer for PC users only)")
loadingToMatchScene.addTip("Net guarding", "In certain situations a player may begin guarding the net, usually in a desperate attempt to make it harder for the other team to score. Watch closely for this and try to defend the ground if such player is from your team")
loadingToMatchScene.addTip("Cut Scenes", "Don't fancy cut-scenes much? You can always turn them off in 'Settings'\nOr just press 'X' during a cutscene if you're on PC, 'skip' button for moblie")
loadingToMatchScene.addTip("GodMode", "Sometimes the served ball may become a specail ball just before the serve. While the ball is like this the next player who scores will immidiately enter their 'godMode' state where they do some pretty cool stuff, some may even change the match location entirely!\nScoring against your team won't count though\nTwo players cannot be in GodMode simultaneously.")
loadingToMatchScene.addTip("Confusion!?", "In a match against a team of 2 or more players excluding multiplayer matches, the other team may get confused or stuck trying to stick to their formation, it's quite easy to notice. If you notice this be sure to exploit their confusion before they can adjust themselves!")
loadingToMatchScene.addTip("Fouls", "When a player TOUCHES THE GROUND on the opposite team's area a foul will be issued to that player...usually with force. However players can hang around in the opposite air-space or bypass this foul issue completely in specail conditions..e.g during godMode")
loadingToMatchScene.addTip("Trick shots: Goldilocks", "This is a hit that requires skill but if you hit the ball in the right way it's path could be long enough to land at the end of the other team's area yet low enough to hit the ground just there...it's a usual shot for players to try from time to time, look out for it...and try it out yourself if you can!")
loadingToMatchScene.addTip("Trick shots: Tip Perfect", "Hit the ball almost vertically high in the air...aiming to land on the tip of the next on the other side of the court...\nThat...is Tip Perfect. One works against one player though, teams will usually handle that just fine")
loadingToMatchScene.addTip("Formation", "Formation is simple, players will spread out to leave no area of the ground without a player to guard it...and players are very strict about positions!\nTeams will get confused if they are in the wrong area of their side of the court(will adjust themselves immideately in HARD difficulty)")
loadingToMatchScene.addTip("Locations", "This is...a place.....\nduh")
loadingToMatchScene.addTip("New Characters?", "Hmmm..DLCs? YOU BET!!")
loadingToMatchScene.addTip("Bugs, Sweat and Tears", "This game has taken over a year of headaches, bugs, troubles and triunmphs to make....including a 5 month break due to burnout\nIt's a love project, have fun <3")
loadingToMatchScene.addTip("An imposter!!", "Have you found the Impasta yet??? She is AMOGOS!")
loadingToMatchScene.addTip("Super Jump", "Players can jump much higher than usual when pushing against another player before jumping, will usally send the ball FLYING, if not themselves")
loadingToMatchScene.addTip("It's not a bug...", "its a feature ;)\n     \n")
loadingToMatchScene.addTip("More Tips!!", "Tap anywhere on this screen to skip a tip")
loadingToMatchScene.addTip("What?", "How many tips are there to see in this screen? \n There are a total of " + loadingToMatchScene.tips.length + " tips inculding this one...have you been counting?")
loadingToMatchScene.currentTip = loadingToMatchScene.tips[0]
loadingToMatchScene.currentTip.shown = true;
loadingToMatchScene.totalElapsedTime = 0;
loadingToMatchScene.tipsToShow = new Array()
loadingToMatchScene.waitingTime = randomNumber(5, 10)
let enterGame = new button(280, 150, 500, 500, "Ready!", "transparent")
enterGame.onclick = () => {
    SceneManager.startTransitionScreen(loadToMatchTransition);
}
enterGame.render = () => {
    if (enterGame.active) {
        enterGame.alpha2 += Caldro.time.deltatime
        let speed = 7
        enterGame.width = approach(enterGame.width, 110, speed).value
        enterGame.height = approach(enterGame.height, 40, speed).value
        // if (enterGame.width < 300) {
        enterGame.alpha1 += Caldro.time.deltatime
        // }
        let button = enterGame
        let ctx = Caldro.renderer.context;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(button.x - button.width / 2, button.y - button.height / 2)
        ctx.lineTo(button.x + button.width / 2, button.y - button.height / 2)
        ctx.lineTo(button.x + button.width / 2, button.y + button.height / 2)
        ctx.lineTo(button.x - button.width / 2, button.y + button.height / 2)
        ctx.closePath();
        ctx.clip();
        CaldroSSM.draw('beachball', 280, 120, 70, 70, true, loadingToMatchScene.ballangle)
        // textOutline(10, stylizedColors["sand"])
        txt("Loaded", 280, 175, font(20), "white")
        ctx.restore();
        alpha(enterGame.alpha1)
        curvedRect(button.x, button.y, button.width, button.height, stylizedColors['lighOrange'], 0, 10)
        txt(button.text, button.x, button.y, font(16), "white")
        alpha(enterGame.alpha2)
        stCurvedRect(button.x, button.y, button.width, button.height, "white", 0, 7, 5)
        alpha(1)
    }
}
let skipTip = new button(0, 0, 800, 500, "", "transparent")
skipTip.visible = false
skipTip.onclick = function(){
        loadingToMatchScene.tipShownTime = loadingToMatchScene.tipShowingTime / 1000
}

let backToMenuScene = new button(-300, -150, 45, 45, "Back", stylizedColors["softOrange"])
backToMenuScene.drawingStyle = 3;
backToMenuScene.drawing = () => {
    let button = backToMenuScene;
    let color = button.color
    let color2 = "white"
    curvedRect(button.x, button.y, button.width, button.height, color, 0, 10)
    stCurvedRect(button.x, button.y, button.width, button.height, color2, 0, 10, 5)
    drawArrow(button.x, button.y, button.width * 0.5, color2, -90, 5)
}
backToMenuScene.onclick = () => {
    SceneManager.startTransitionScreen(waitingSceneToMenuSceneTransition)
    setTimeout(function(){
        confirmMatchNo.onclick();
    }, 3500)
}

loadingToMatchScene.buttons = [enterGame, backToMenuScene, skipTip]
loadingToMatchScene.onLoad = () => {
    loadingToMatchScene.tipShownTime = 0;
    loadingToMatchScene.tipShowingTime = 0
    loadingToMatchScene.ballangle = 0;
    enterGame.alpha1 = 0
    enterGame.alpha2 = 0
    enterGame.active = false;
    loadingToMatchScene.tipShownTime = 0;
    enterGame.width = enterGame.height = 500
}
loadingToMatchScene.update = () => {
    loadingToMatchScene.totalElapsedTime += Caldro.time.deltatime
    loadingToMatchScene.tipShownTime += Caldro.time.deltatime
    loadingToMatchScene.tipShowingTime = clip(loadingToMatchScene.currentTip.text.length * 70, 2000, Infinity)

    // if (loadingToMatchScene.totalElapsedTime * 1000 > loadingToMatchScene.tips[0].text.length * 70) {
        
        if (loadingToMatchScene.tipShownTime * 1000 > loadingToMatchScene.tipShowingTime) {

            loadingToMatchScene.tipShownTime = 0;
            loadingToMatchScene.tipsToShow = loadingToMatchScene.tips.filter((tip) => {
                return !tip.shown
            })
            if (loadingToMatchScene.tipsToShow.length == 0) {
                loadingToMatchScene.tips.forEach((tip) => {
                    tip.shown = false
                })
                loadingToMatchScene.tipsToShow = loadingToMatchScene.tips
            }
            loadingToMatchScene.currentTip = choose(loadingToMatchScene.tipsToShow)
            loadingToMatchScene.currentTip.shown = true
            loadingToMatchScene.currentTip.seen = true
        }
    // }
}
loadingToMatchScene.render = () => {
    let color2 = stylizedColors["goodGreen"]
    Rect(0, 0, pw, ph, stylizedColors["outlines"])
    circle(pw / 2, -ph / 2, 100, stylizedColors['sand'])
    circle(-pw / 2, ph / 2, 150, stylizedColors['ablue'])
    let tip = loadingToMatchScene.currentTip
    // textOutline(10, color2)
    let special = false;
    if(tip.title == "Bugs, Sweat and Tears") special == true;
    if(special) glow(5, "white")
    txt(tip.title, 0, -75, font(30), "white")
    // Rect(0, -50, Caldro.renderer.context.measureText(tip.title).width, 5, "white")
    // textOutline(8, color2)
    wrapText(tip.text, 0, -15, 500, 21, "white", font(20))
    // textOutline(0)
    if(special) glow(0)

    if (loadingToMatchScene.elapsedTime < loadingToMatchScene.waitingTime) {
        loadingToMatchScene.ballangle = loadingToMatchScene.elapsedTime * 100
        CaldroSSM.draw('beachball', 280, 120, 70, 70, true, loadingToMatchScene.ballangle)
        // textOutline(10, stylizedColors["sand"])
        txt("Loading...", 285, 175, font(20), "white")
    } else {
        enterGame.active = true;
    }
    // textOutline(0)
}