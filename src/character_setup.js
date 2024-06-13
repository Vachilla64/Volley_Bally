


function createPlayer(x, y) {
    let body = physics.createCircleBody(new Lvector2D(x, y), 10, 0.4, 20, false)
}

function createStatusObject() {
    return {
        feeling: "",
        mainFeeling: "",
        slickLine: "NO SLICK LINE AVALIBLE",
        mevementSpreed: 40,
        jumpHeight: 250,
        sweat: false,
        oopsDrawing: "sweat",
        gender: 0, // 0 for male, 1 for female
        controllable: true,
        netGuarding: false,
        encouragingSelf: false,
        confused: false,
        ghost: false,
        avoidingBall: false,
    }
}


function createCharacter(name, color, gender, slickLine, entranceParticles, oopsDrawing, playerDomain, bgSpreadColor) {
    let player = physics.createCircleBody(new Lvector2D(0, 0), 32, 0.4, 20, false);
    player.staticFriction = new Lvector2D(4, 0);

    let status = createStatusObject();
    status.slickLine = slickLine;
    status.entranceParticles = entranceParticles;
    status.oopsDrawing = oopsDrawing;
    status.gender = gender
    status.bgSpreadColor = bgSpreadColor

    player.name = name
    player.color = color;
    player.status = status;
    player.selfUpdatingPositions = true
    player.moveSpeed = 50
    player.operationWidth = 50
    player.timeOffGround = 0
    player.timeOnGround = 0
    player.restingPosition = Lvector2D.zero();
    player.tag = "player";
    player.godModeMusic = "mayGM"
    player.mistakes = 0
    player.domain = playerDomain
    player.lookingPoint = beachBall.position

    player.godModeTargetTeam = 0;
    player.currentTeam = 0;
    player.team = 0;
    player.setTeam = (team, isMain = true) => {
        if (isMain) {
            player.team = team;
            player.godModeTargetTeam = teamManager.getOpposingTeam(team);
        } else {
            player.currentTeam= team;
            player.godModeTargetTeam = teamManager.getOpposingTeam(team);
        }
    }
    player.resetTeamTo = (team = 0)=>{
        player.team = player.currentTeam = team
        player.godModeTargetTeam = teamManager.getOpposingTeam(team)
    }

    player.onEnterGame = NULLFUNCTION;
    player.drawing = function () {
        let flipX = (player.lookingPoint.x > player.position.x)
        if (player.status.gender == 1) {
            flipX = !flipX
        }
        let genderDir = player.status.gender == 1 ? 1 : -1;
        // let ballShineINtensity = clip(scaleTo(vecMath.distance(player.position, beachBall.position), 10, beachBall.radius * 8, 0, 1), 0, 1)
        // let invBallShineIntensity = scaleTo(ballShineINtensity, 0, 1, 1, 0)
        // alpha(invBallShineIntensity)
        // CaldroCIM.draw(pc, "clareShine", this.position.x, this.position.y, this.radius*3, this.radius*3, true)
        // alpha(1)

        drawBodyShadowOnGround(this, 100)
        // let crownAngle = 20
        // crownAngle*= (flipX?1:-1) * genderDir   
        // let crownPos = castRay(this.position.x, this.position.y, crownAngle+this.angle, this.radius*1.7)
        // CaldroSSM.draw("crown", crownPos.x, crownPos.y, this.radius * 2.8, this.radius * 1.5, true, crownAngle+this.angle, flipX)
        CaldroSSM.draw(player.name.toLowerCase() + this.status.feeling, this.position.x, this.position.y, this.radius * 2, this.radius * 2, true, this.rotation, flipX)
        if (mainGame.currentLocation == snowBeach) {
            CaldroSSM.draw("woolCloth", this.position.x, this.position.y, this.radius * 2, this.radius * 2, true, this.rotation, flipX)
        }
        if (teamManager.ballOutOfBounds || status.sweat) {
            let padding = player.radius * 0.6
            CaldroSSM.draw(status.oopsDrawing, this.position.x - (padding * genderDir), this.position.y - padding, this.radius, this.radius, true, this.rotation, flipX)
        }

        if (player.status.confused) {
            player.status.mainFeeling = "whut"
            clearDoTask("resetConfusionReaction" + player.name)
            // textOutline(20, "red")
            // txt("!", player.position.x, player.position.y - 50, font(50), "white", particle.angle)
            // textOutline(0)

            doTask("showConfusion" + player.name, () => {
                player.status.feeling = "whut"
                inPs.particleSource(player.position.x, player.position.y - player.radius * 1.5, player.radius, 10, [-20, 20], [-100, -80], null, 30, null, 1, 0.7, function (particle) {
                    alpha(particle.alpha)
                    textOutline(particle.size * 0.2, player.color)
                    txt(particle.text, particle.x, particle.y, font(particle.size), "white", particle.angle)
                    textOutline(0)
                    alpha(1)
                }, "grow fadeout", function (particle) {
                    particle.text = choose(["!", "?", "!?", "move!"])
                    particle.sizeChangeRate = 100
                })
            }, true, Infinity, choose([700, 900, 1200]))
        } else {
            doTask("resetConfusionReaction" + player.name, () => {
                player.status.mainFeeling = ""
            })
        }
        /*   alpha(invBallShineIntensity)
        CaldroCIM.draw(pc, "clareShine", this.position.x, this.position.y, this.radius * 2.5, this.radius * 2.5, true)
        alpha(1) */
    }

    function choosePlayerEdgePoint(player) {
        let side = player.currentTeam == 1 ? 1 : -1
        let p1 = new Lvector2D(-400 * side, 0);
        let p2 = new Lvector2D(net.position.x * side, 0)
        if (player.currentTeam == 1) {
            return player.restingPosition.x < -200 ? p1 : p2
        }
        else if (player.currentTeam == 2) {
            return player.restingPosition.x < 200 ? p2 : p1
        }
    }

    player.callback = () => {
        // place(player.lookingPoint, beachBall.position)
        if (!player.inCollision) {
            player.timeOffGround += Caldro.time.deltatime
            player.timeOnGround = 0;
        }

        if (teamManager.playingVolleyball) {
            let teamArray = teamManager.getTeam(player.currentTeam);
            // teamArray = [abby, gustavo]
            // let teamArray = teamManager["team"+player.team]
            player.status.confused = false;
            // player.isConfusedWith.length = 0;
            doTask("fjalkff", () => { // what on earth does thiss do
                // console.log(p2)
                choosePlayerEdgePoint(player)
            })
            for (let i = 0; i < teamArray.length; ++i) {
                let body = teamArray[i]
                if (body == player) continue;
                if (player.status.encouragingSelf || body.status.encouragingSelf) break;
                // if (body.confused) continue;

                info.add(player.name + " is confused", player.status.confused)
                if (Math.abs(Math.abs(body.position.y) - Math.abs(player.position.y)) < player.radius * 0.5 && // relatively same y level
                    teamManager.isOnSide(body.position, player.team) && // is on your team
                    (
                        (onSameSide(body.position, choosePlayerEdgePoint(player), player.position)
                            // && (Math.abs())
                        )
                        &&
                        (onSameSide(player.position, choosePlayerEdgePoint(body), body.position))
                        && teamManager.isOnSide(player.position, player.team)
                        && teamManager.isOnSide(body.position, body.team)
                    )
                ) {
                    player.status.confused = true
                    // player.isConfusedWith.push(body)
                    body.status.confused = true

                    if (teamManager.controlledPlayer != player) {
                        if (chance(5)) {
                            let dir = 0;
                            if (chance(70)) {
                                if (player.position.x < body.position.x) {
                                    dir = 1
                                } else dir = 0
                            } else {
                                dir = chance([-1, 1])
                            }

                            movePlayer(player, 300, dir)
                        }
                        if (mainGame.difficulty == "hard") {
                            if (chance(20)) {
                                jump(player)
                            }
                        }
                    }

                }
            }
        }
    }


    player.onCollisionStart = function (body, collision) {
        if (body.tag == "player") {
            if (player.status.ghost) return Collisions.GHOST;
        }
        let rvel = collision.relativeVelocity.magnitude();
        if (body.tag == "ground") {
            // console.log(rvel)
            let volume = clip(scaleTo(rvel, 10, 400, 0, 1), 0, 1)
            if (rvel > 500) {
                sfxSB.play(mainGame.currentLocation.groundWalkingSound[1], true, 0, 0, volume * 2)
            } else {
                sfxSB.play(mainGame.currentLocation.groundWalkingSound[1], true, 0, 0, volume)
            }
            // checking for fouls
            if (teamManager.recordingScores) {
                teamManager.checkFoul(player)
            }
        } else {
        }
        if (body.position.y > this.position.y) {
            this.canJump = true
            if (body != beachBall) {
                this.status.feeling = this.status.mainFeeling
            }
        }
    }


    player.onCollisionContinue = function (body) {
        if (body.tag == "ground") {
            if (player.timeOffGround > 0.2) {
                let stepAud = sfxSB.get(mainGame.currentLocation.groundWalkingSound[1], true)
                stepAud.play()
            }
            player.timeOnGround += Caldro.time.deltatime
            player.timeOffGround = 0
        } else {
            player.timeOnGround = 0;
            player.timeOffGround += Caldro.time.deltatime
        }
        // cheching for confusion
        if (body.tag == "player") {
            if (player.status.ghost) return Collisions.GHOST;
            // perhasp expolde them here?....nah or jst a few particels???
        }
    }

    player.preMatch = function () {
        player.mistakes = 0;
        player.mainFeeling = ""
        player.status.confused = false
        player.status.netGuarding = false
        // player.status.netGuarding = false
    }

    player.encourageSelf = function () {
        let cam = SceneManager.currentScene.camera;
        timeoutTask(() => {
            audioManager.masterFilterFrequency = 500
            cam.target.zoom = 2
            cam.target.active = true;
            cam.target.position = player.position
            cam.target.zoomSpeed = 1
            player.status.mainFeeling = "whut"
            player.status.encouragingSelf = true;
            let task1 = timeoutTask(() => {
                mainGame.playerEncourageTint = approach(mainGame.playerEncourageTint, 0.7, 2).value
                gameCam.limitWithinBox({ x: 0, y: 0, width: preRenderingCanvas.width, height: preRenderingCanvas.height })
            }, 0, false)
            timeoutTask(() => {
                audioManager.masterFilterFrequency = 20000
                deleteTimeoutTask(task1)
                cam.target.position = Lvector2D.zero();
                cam.target.zoomSpeed = 3
                cam.target.zoom = 1
                cam.target.zoomSpeed = 7
                let task2 = timeoutTask(() => {
                    mainGame.playerEncourageTint = approach(mainGame.playerEncourageTint, 0, 6).value
                    gameCam.limitWithinBox({ x: 0, y: 0, width: preRenderingCanvas.width, height: preRenderingCanvas.height })
                }, 0, false)
                player.status.encouragingSelf = false;
                timeoutTask(() => {
                    player.status.feeling = ""
                    player.status.mainFeeling = ""
                }, 1000)
                timeoutTask(() => {
                    cam.target.active = false;
                    deleteTimeoutTask(task2)
                }, 2000)
            }, 3000)
        }, 1000)
    }

    player.nextWalkSound = 0
    player.playGroundSound = function () {
        if (!sfxSB.active) return;
        let walkingSounds = mainGame.currentLocation.groundWalkingSound[0]
        if (player.timeOffGround > 0.3) {
            let stepAud = sfxSB.get(walkingSounds[player.nextWalkSound], true)
            stepAud.setVolume(1)
            stepAud.play()
        } else {
            doTask(this.name + "PlayingWalkingSound", () => {
                let stepAud = sfxSB.get(walkingSounds[player.nextWalkSound], true)
                stepAud.play()
                stepAud.setVolume(randomNumber(0.8, 1))
                stepAud.setPlaybackRate(randomNumber(0.5, 2))
                let task = getDoTask(this.name + "PlayingWalkingSound")
                if (task) {
                    task.frequency = scaleTo(clip(player.linearVelocity.x, 50, 300), 50, 300, 500, 200)
                }
            }, true, Infinity, 300)
        }
        // console.log(player.nextWalkSound)
        player.nextWalkSound = limit(player.nextWalkSound + 1, 0, walkingSounds.length - 1, 0, 0)
        // console.log(player.nextWalkSound)
    }
    player.godMode = {
        onEnter:  ()=>{},
        during:  ()=>{},
        onLeave: ()=>{},
        hostable: true,
    }

    teamManager.allPlayers.push(player)
    return player;
}






function jump(player, velocityX = 0, velocityY = null) {
    let body = player;
    let aabb = ground.getAABB();
    if (!velocityY) {
        velocityY = player.status.jumpHeight
    }
    if (body.canJump && body.position.y > -150) { // WE JUMP HERE
        // sfxSB.play(choose(["jump1", "jump2"]), true)

        sfxSB.play(mainGame.currentLocation.groundWalkingSound[1])
        body.addVelocity(new Lvector2D(velocityX, -Math.abs(velocityY)))
        body.canJump = false;
        body.status.feeling = "Jump"

        if (chance(2)) {
            for (let person of teamManager.players) {
                if (person.team != player && person != player) {
                    timeoutTask(() => {
                        if (teamManager.isOnSide(beachBall.position, player.team)) return;
                        jump(person)
                    }, randomNumber(800, 1500))
                    if (chance(80)) break
                }
            }
        }

        if (Math.abs(aabb.min.y - body.position.y) < body.radius + 10) {
            let yforce = scaleTo(clip(velocityY, 10, 500), 10, 500, 0.2, 1)
            inPs.particleSource(body.position.x, aabb.min.y, body.radius, 10, [-200, 200], [-100 * yforce, 10 * yforce], [0, 0], randomNumber(30, 40), stylizedColors["sand"], (scaleTo(clip(velocityY, 100, 300), 100, 300), 1, 10), 1, function (particle) {
                CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")

        }
    }
}

function ENTERGODMODE(player) {
    if (!teamManager.players.includes(player) || !teamManager.playingGame) return;
    if (teamManager.godModePlayer) return
    // teamManager.enterGodMode(player)
    teamManager.godModePlayer = player
    sfxSB.play("woosh", false, 0.5)
    // sfxSB.setCurrentTime("woosh", 0.5);

    let bgm = musicSB.get("bg_music")
    let entranceParticles = player.status.entranceParticles
    let topParticles, bottomParticles
    if (typeof entranceParticles == "string") {
        topParticles = "cloud1"
        bottomParticles = entranceParticles
    } else if (typeof entranceParticles == "object") {
        topParticles = entranceParticles[0]
        bottomParticles = entranceParticles[1]
    }
    // bgm.playbackRate = 0.5

    let reduc = setInterval(() => {
        inPs.particleSource(0, -400, 1000, 0, [-50, 50], [100, 500], [0, 0], randomNumber(70, 100), stylizedColors["sand"], 1, 2, function (particle) {
            CaldroSSM.draw(topParticles, particle.x, particle.y, particle.size, particle.size, true)
        }, "grow")
        inPs.particleSource(0, 400, 1000, 0, [-50, 50], [-500, -100], [0, 0], randomNumber(70, 100), stylizedColors["sand"], 1, 2, function (particle) {
            CaldroSSM.draw(bottomParticles, particle.x, particle.y, particle.size, particle.size, true)
        }, "grow")
        if (musicSB.initialized) {
            let reduce = 0.05 * Caldro.time.deltatime;
            bgm.setVolume(0.4)
        }
    }, 0.016);

    setTimeout(function () {
        clearInterval(reduc)
        teamManager.enterGodMode(player)
        if (musicSB.initialized) {
            bgm.pause()
        }
        // teamManager.enterGodMode(may)
    }, 1000)
}


function setPlayergodMode(player, onEnter = NULLFUNCTION, during = NULLFUNCTION, onLeave = NULLFUNCTION, hostable = true) {
    player.godMode.onEnter = onEnter;
    player.godMode.during = during;
    player.godMode.onLeave = onLeave;
    player.godMode.hostable = hostable
}


function setMistakePhrases(player, phrases1, phrases2, phrases3) {
    player.mistakePhrases1 = phrases1
    player.mistakePhrases2 = phrases2
    player.mistakePhrases3 = phrases3
}


function movePlayer(player, speed, direction) {
    if (world.paused()) return;
    let run = vecMath.multiply(new Lvector2D(speed * direction, 0), 1)
    player.addVelocity(run)
}

function playVolleyball(body, team = 1) {
    if (world.paused()) return;
    // Player AI
    if (body === teamManager.controlledPlayer || !body.status.controllable) return;
    let side = team === 1 ? 1 : -1;
    let range = 0.5
    // say yes if you're in your range of operai
    /* if (withinRange(body.position.x, body.restingPosition.x - (body.operationWidth * range), body.restingPosition.x + (body.operationWidth * range))) {
        (console.log(body.position.x, body.restingPosition.x - (body.operationWidth * range), body.restingPosition.x + (body.operationWidth * range), body.name))
        doTask(body.name+"shisdlfj", function () {
            inPs.particleSource(body.position.x, body.position.y, 100, 10, [-50, 50], [-300, -100], [0, 0], 40, body.color, 1, 1, function (particle) {
                textOutline(4, stylizedColors["sand"])
                txt("Yes", particle.x, particle.y, font(30), body.color)
                textOutline(0)
            }, "shrink")
        }, true, Infinity, 100)
    } */
    if (!teamManager.isOnSide(body.position, body.team)) { // run to other side if you are about to foul
        let runToRest = new Lvector2D(clip(body.restingPosition.x - body.position.x, -1, 1) * body.moveSpeed * 20 * Caldro.time.deltatime, 0)
        body.addVelocity(runToRest)
    }
    if ((beachBall.position.x * side) < net.position.x) { // ball is on your side
        if (!teamManager.RoundWinner) {
            if (body.status.avoidingBall) {
                if (withinRange(beachBall.position.x, body.position.x - beachBall.radius * 3.5, body.position.x + beachBall.radius * 3.5)) {
                    let runDirection = vecMath.invert(vecMath.normalize(vecMath.subtract(beachBall.position, body.position)))
                    let haste = scaleTo(clip(Math.abs(beachBall.position.x - body.position.x), 0, body.operationWidth / 4), 0, body.operationWidth / 4, 0, 1)
                    let run = new Lvector2D(runDirection.x * body.moveSpeed * haste, 0)
                    body.addVelocity(run)
                }
            } else
                if (withinRange(body.position.x, body.restingPosition.x - (body.operationWidth * range), body.restingPosition.x + (body.operationWidth * range))) {
                    let aimPosition = new Lvector2D(beachBall.position.x - 10 * side, beachBall.position.y)
                    let runDirection = vecMath.normalize(vecMath.subtract(aimPosition, body.position))
                    let run = new Lvector2D(runDirection.x * body.moveSpeed, 0)
                    body.addVelocity(run)
                } else {
                    // if your cant touch it, leave it
                    let runToRest = new Lvector2D(clip(body.restingPosition.x - body.position.x, -1, 1) * body.moveSpeed * 10 * Caldro.time.deltatime, 0)
                    body.addVelocity(runToRest)
                }
            if (vecMath.distance(beachBall.position, body.position) < body.radius + beachBall.radius + 20) {
                jump(body)
            }
        }
    } else {
        if (body.status.netGuaring) {
            if (chance(30)) {
                jump(body, 0, 160)
            }
            if (chance(30)) {
                movePlayer(body, body.status.mevementSpreed, clip(netStick.position.x - body.position.x, -1, 1))
            }
        } else
            // move back to your resting point
            if (chance(40)) {
                let runToRest = new Lvector2D(clip(body.restingPosition.x - body.position.x, -1, 1) * randomNumber(700, 2000) * Caldro.time.deltatime, 0)
                body.addVelocity(runToRest)
            }


    }

    if (!teamManager.RoundWinner) {
        if (body.position.x * side > 0) {
            jump(body)
            body.addVelocity(new Lvector2D(-15 * side, 0))
        }
    }
}


class playerCard {
    constructor(player) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.playerDescription = ""
    }
    render() {
        let x = this.x;
        let y = this.y;
        let width = this.wwidth
        let height = this.height

    }
}

function drawPlayerCard(player, x, y, width, height = width * 1.5) {
    let color2 = "white"
    if (player.color.sumTotal() > 700) {
        color2 = stylizedColors['outlines']
    }
    let faceSize = width * 0.4
    curvedRect(x, y, width, height, colorUtils.addValue(player.color, -10), 0, 20)
    stCurvedRect(x, y, width, height, color2, 0, 20, 0.15 * faceSize)
    alpha(0.9)
    CaldroSSM.draw("shadow", x, y - faceSize * 0.6 + faceSize / 2, faceSize, faceSize / 2, true)
    alpha(1)
    CaldroSSM.draw(player.name.toLowerCase(), x, y - faceSize * 0.6, faceSize, faceSize, true)
    textOutline(faceSize * 0.1, color2)
    txt(player.name, x, y + faceSize * 0.2, font(faceSize * 0.25), player.color)
    textOutline(0)
}
function drawMiniPlayerCard(player, x, y, width, height = width * 1.5) {
    let color2 = "white"
    if (player.color.sumTotal() > 700) {
        color2 = stylizedColors['outlines']
    }
    let faceSize = width * 0.6
    curvedRect(x, y, width, height, colorUtils.addValue(player.color, -10), 0, 20)
    stCurvedRect(x, y, width, height, color2, 0, 20, 0.1 * faceSize)
    alpha(0.9)
    CaldroSSM.draw("shadow", x, y - 1 + (faceSize / 2) - faceSize * 0.2, faceSize, faceSize / 2, true)
    alpha(1)
    CaldroSSM.draw(player.name.toLowerCase(), x, y - faceSize * 0.2, faceSize, faceSize, true)
    textOutline(faceSize * 0.1, color2)
    txt(player.name, x, y + faceSize * 0.6, font(faceSize * 0.3), player.color)
    textOutline(0)
}
function drawMiniPlayerCard2(player, x, y, width, height = width * 1.5) {
    let color2 = "white"
    if (player.color.sumTotal() > 700) {
        color2 = stylizedColors['outlines']
    }
    let faceSize = width * 0.6
    curvedRect(x, y, width, height, colorUtils.addValue(player.color, -10), 0, 20)
    stCurvedRect(x, y, width, height, color2, 0, 20, 0.1 * faceSize)
    alpha(0.9)
    CaldroSSM.draw("shadow", x, y - 1 + (faceSize / 2) - faceSize * 0.05, faceSize, faceSize / 2, true)
    alpha(1)
    CaldroSSM.draw(player.name.toLowerCase(), x, y - faceSize * 0.05, faceSize, faceSize, true)
}
