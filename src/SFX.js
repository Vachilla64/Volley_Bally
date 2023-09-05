

let gmTasksAnimations = new AnimationGraph();
gmTasksAnimations.addAnimationNode(0, 0, () => {
    console.log("started song tasks")
    gameCam.target.active = false;
    world.pauseTime();
});
gmTasksAnimations.addAnimationNode(1.2, 0, function () {
    mainGame.goToPlace(teamManager.godModePlayer.domain)
})
gmTasksAnimations.addAnimationNode(2.5, 0, function () {
    world.resumeTime();
})
gmTasksAnimations.addAnimationNode(3, 0, function () {
    mainGame.showinggodModeEntranceEffects = false
})
gmTasksAnimations.addAnimationNode(12.6, 1, function () {
    world.pauseTime();
    inPs.pause();
    gameCam.zoom = 1.5
    place(gameCam, teamManager.godModePlayer.position)
    // gameCam.limitWithinBox({ x: 0, y: 0, width: preRenderingCanvas.width, height: preRenderingCanvas.height })
})
gmTasksAnimations.addAnimationNode(13, 2, function () {
    place(gameCam, teamManager.godModePlayer.position)
    gameCam.zoom = 2.2
})
gmTasksAnimations.addAnimationNode(13.3, 3, function () {
    if (teamManager.godModePlayer == abby) {
        if (abby.newAlly) {
            place(gameCam, abby.newAlly.position)
            abby.newAlly.status.mainFeeling = "whut"
            // gameCam.limitWithinBox({ x: 0, y: 0, width: preRenderingCanvas.width, height: preRenderingCanvas.height })
        }
    }
    gameCam.zoom = 3.5
})
gmTasksAnimations.addAnimationNode(13.5, 4, function () {
    gameCam.zoom = 5.4
})
gmTasksAnimations.addAnimationNode(13.6, 5, function () {
    world.resumeTime();
    inPs.resume();
    gameCam.zoom = 1;
    place(gameCam, new Point2D(0, 0))
})
gmTasksAnimations.addAnimationNode(51, 6, function () {
    sfxSB.play("woosh", true)
})
gmTasksAnimations.addAnimationNode(52, 7, function () {
    let gm = audioManager.getCurrentGM();
    gm.pause();
    gm.setCurrentTime(0)
    let bg = musicSB.get("bg_music")
    bg.setCurrentTime(2.2)
    bg.play()
    teamManager.leavegodMode(teamManager.godModePlayer)
    mainGame.goToPlace(mainGame.defaultLocation)
    console.log("ended")
}, () => {
    gmTasksAnimations.stop()
})

// gmTasksAnimations.addAnimationNode(53, 0, function(){
// })

var gmPlaybackRate = new AnimationGraph()
gmPlaybackRate.addAnimationNode(0, 1)
gmPlaybackRate.addAnimationNode(49, 1)
gmPlaybackRate.addAnimationNode(51, 1)
gmPlaybackRate.addAnimationNode(51, 0.8)

// with offSB
/* var gmPlaybackRate = new AnimationGraph()
gmPlaybackRate.addAnimationNode(0, 1)
gmPlaybackRate.addAnimationNode(49, 1)
gmPlaybackRate.addAnimationNode(51, 0.8) */

let gmAreaViewRadius = new AnimationGraph();
gmAreaViewRadius.addAnimationNode(0, 0)
gmAreaViewRadius.addAnimationNode(1.2, 0)
gmAreaViewRadius.addAnimationNode(1.2, 10000)
gmAreaViewRadius.addAnimationNode(50, 10000)
gmAreaViewRadius.addAnimationNode(52, 0)

let camZoomAnim = new AnimationGraph();
camZoomAnim.addAnimationNode(0, 1)
camZoomAnim.addAnimationNode(0.75, 2)
camZoomAnim.addAnimationNode(3, 1)

let gmDarkFade = new AnimationGraph();
gmDarkFade.addAnimationNode(0, 0)
gmDarkFade.addAnimationNode(0.75, 0.5)
gmDarkFade.addAnimationNode(1.65, 0.5)
gmDarkFade.addAnimationNode(2.25, 0.8)
gmDarkFade.addAnimationNode(2.625, 0.86)
gmDarkFade.addAnimationNode(3, 0)

let gmSpinAlpha = new AnimationGraph();
gmSpinAlpha.addAnimationNode(0, 0)
gmSpinAlpha.addAnimationNode(0.75, 0.2)
gmSpinAlpha.addAnimationNode(1.65, 0.8)
gmSpinAlpha.addAnimationNode(2.775, 1)
gmSpinAlpha.addAnimationNode(3, 0)

let playerFaceSize = new AnimationGraph();
// playerFaceSize.addAnimationNode(0, 40)
// playerFaceSize.addAnimationNode(0.5, 60)

playerFaceSize.addAnimationNode(0, 0)
playerFaceSize.addAnimationNode(1.65, 0)
playerFaceSize.addAnimationNode(1.875, 60)
playerFaceSize.addAnimationNode(2.025, 70)
playerFaceSize.addAnimationNode(2.25, 60)
playerFaceSize.addAnimationNode(2.625, 60)
playerFaceSize.addAnimationNode(2.775, 80)
playerFaceSize.addAnimationNode(3, 0)

let perEffFontSize = new AnimationGraph();
perEffFontSize.addAnimationNode(0, 0)
perEffFontSize.addAnimationNode(0.4, 0)
perEffFontSize.addAnimationNode(0.9, 160)
perEffFontSize.addAnimationNode(1.1, 140)
perEffFontSize.addAnimationNode(1.9, 160)
perEffFontSize.addAnimationNode(2.1, 0)

let perEffBlackSreen = new AnimationGraph();
perEffBlackSreen.addAnimationNode(0, 0);
perEffBlackSreen.addAnimationNode(0.2, 0);
perEffBlackSreen.addAnimationNode(0.5, 1);
perEffBlackSreen.addAnimationNode(2.0, 1);
perEffBlackSreen.addAnimationNode(2.2, 0);


function questionMarks(player) {
    player.status.feeling = "whut"
    let speed = 400
    let xv = [-speed, speed]
    let yv = [-speed / 2, speed / 5]
    for (let i = 0; i < 5; ++i) {
        setTimeout(() => {
            inPs.particleSource(player.position.x, player.position.y, 200, 200, xv, yv, [[0, 0], [4, 4]], 30, null, 1, 2, function (particle) {
                let alph = 1

                let time = particle.getUnitTime();
                if (time > 0.8) {
                    alph = scaleTo(time, 0.7, 1, 1, 0)
                }
                if (time > 0.1) {
                    if (!particle.playedSFX) {
                        sfxSB.play("harsh", true)
                        particle.playedSFX = true;
                    }
                }
                // console.log(particle.originalState.timer)
                alpha(alph)
                let outlineCol = player.color
                if (colorUtils.sumTotal(colorToRGB(outlineCol)) > 600)
                    outlineCol = stylizedColors["outlines"]
                textOutline(particle.saizu * 0.2,)
                txt("?", particle.x, particle.y, font(particle.saizu), "white", particle.angle)
                textOutline(0)
                alpha(1)
                if (particle.saizu < particle.maxSize) {
                    particle.saizu += 3
                }
            }, "", function (particle) {
                particle.maxSize = 100
                particle.playedSFX = false
                particle.saizu = choose([10, 20])
                particle.maxSize = choose([50, 70, 100, 150])
                // particle.sizeChangeRate = 100
            })
        }, randomNumber(150, 250) * i)
    }
}


function questionSelf(player) {
    player.status.feeling = "whut"
    player.mistakes++
    if(player.mistakes > 3) return;
    let speed = 400
    let phrases1 = player.mistakePhrases1
    let phrases2 = player.mistakePhrases2
    let phrases3 = player.mistakePhrases3


    let delay = 500
    if (player.mistakes == 3) {
        delay = 3000
        player.encourageSelf();
    }

    timeoutTask(function () {
        player.status.feeling = ""
        let xv = [-speed, speed]
        let yv = [-speed / 2, speed / 5]
        let y = player.position.y
        if (player.mistakes == 3) {
            yv = -50
            xv = 200 * (player.position.x > player.lookingPoint.x ? -1 : 1)
            y -= player.radius
        }
        inPs.particleSource(player.position.x, y, 100, 100, xv, yv, [[0, 0], [4, 4]], 30, null, 1, 2, function (particle) {
            let alph = 1

            let time = particle.getUnitTime();
            if (time > 0.8) {
                alph = scaleTo(time, 0.7, 1, 1, 0)
            }
            if (time > 0.1) {
                if (!particle.playedSFX) {

                    let soundID = "pop"
                    if (player.mistakes == 3) soundID = "poup"
                    sfxSB.play(soundID, true)
                    particle.playedSFX = true;
                    
                }
            }
            // console.log(particle.originalState.timer)
            alpha(alph)
            let outlineCol = "white"
            if (colorUtils.sumTotal(colorToRGB(player.color)) > 600) {
                outlineCol = stylizedColors["outlines"]
            }
            textOutline(particle.saizu * 0.2, outlineCol)
            if (player.mistakes == 3) glow(20, "white")
            txt(particle.text, particle.x, particle.y, font(particle.saizu), player.color, particle.angle)
            textOutline(0)
            alpha(1)
            glow(0)
            if (particle.saizu < particle.maxSize) {
                particle.saizu += 3
            }
        }, "", function (particle) {
            // GONNA HAVE TO INIT THE PARTICLE HERE DEPENDING ON HOW MAY OWN GOALS THAT PLAYER HAS SCORED
            // 1) normal.... 
            // 2) BIG 
            // 3) smol and long....cos self prep
            let textArray;

            if (player.mistakes == 1) {
                textArray = phrases1
                particle.saizu = 30
                particle.maxSize = 30
            } else if (player.mistakes == 2) {
                textArray = phrases2
                particle.saizu = 20
                particle.maxSize = 50
            } else if (player.mistakes == 3) {
                textArray = phrases3
                particle.saizu = 20
                particle.maxSize = 30
            } else {
                return
            }
            particle.text = choose(textArray)
            particle.playedSFX = false
            // particle.sizeChangeRate = 100
        })
    }, delay)
    return player.mistakes
}