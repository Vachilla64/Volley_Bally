const teamManager = {
    winner: 0,
    RoundWinner: 0,
    team1Score: 0,
    team2Score: 0,
    recordingScores: false,
    playingVolleyball: false,
    playingGame: false,
    soloGame: false,
    currentRoundTime: 0,
    sessionWinningScore: 7,
    sessionWinner: 0,
    ballOutOfBounds: false,
    godModePlayer: false,
    controlledPlayer: null,
    players: new Array(),
    allPlayers: new Array(),
    allLocations: new Array(),
    team1: new Array(),
    team2: new Array(),
    winningTeam: new Array(),
    operationWidth: 400,
    proccessingControls: true,
    activeMatch: null,
    setupMatch(match){
        teamManager.players.length = 0;
        mainGame.matchTime.setTime(match.time)
        match.team1.forEach((player) => { teamManager.addPlayer(player, 1) })
        match.team2.forEach((player) => { teamManager.addPlayer(player, 2) })
        teamManager.sessionWinningScore = match.maxScore
        teamManager.setControlledPlayer(match.controlledPlayer)
        this.activeMatch = match
    },
    endMatch(){
        this.activeMatch = null;
    },
    setAllPlayerFellings(feeling, main = true) {
        let peeps = new Array();
        for (let player of this.players) {
            if (main) {
                player.status.mainFeeling = feeling
            } else {
            }
            player.status.feeling = feeling
            peeps.push(player)
        }
    },
    enterGodMode(player) {
        mainGame.showinggodModeEntranceEffects = true
        mainGame.edgeBlurColor = player.color
        player.isIngodMode = true;
        player.onEntergodMode();
        this.godModePlayer = player
        audioManager.godModePlayerName = player.name
        gmAudio(may)
    },
    leavegodMode(player) {
        mainGame.showinggodModeEntranceEffects = false
        mainGame.edgeBlurColor = null
        player.isIngodMode = false;
        player.onLeavegodMode();
        this.godModePlayer = null;
        audioManager.godModePlayerName = null;
    },
    getTeamsArrays() {
        this.team1 = this.players.filter(function (player) {
            return player.team == 1
        })
        this.team2 = this.players.filter(function (player) {
            return player.team == 2
        })
    },
    onLeftMiss(delay = 0, onJudge = NULLFUNCTION, onServeballStart = NULLFUNCTION, onServeballEnd = NULLFUNCTION) {
        if (!this.recordingScores) return;
        sfxSB.play("whistle_lg")
        onJudge()

        let serveDelay = 2000

        let phantomed = new Array()

        for (let person of this.players) {
            let status = person.status
            if (person.team == 1) {
                status.mainFeeling = status.feeling = "whut";
                if(status.confused){
                    status.ghost = true;
                    phantomed.push(person)
                }
            } else if (person.team == 2) {
                status.mainFeeling = "Smug";
                if (this.currentRoundTime > 10) {
                    timeoutTask(function () {
                        jump(person, 0, -200)
                    }, randomNumber(0, 200))
                }
            }
        }

        timeoutTask(() => {
            for (let person of phantomed) {
                person.status.ghost = false
            }
        }, serveDelay)

        

        ++this.team2Score;
        this.RoundWinner = 2
        this.recordingScores = false;
        if (this.team2Score == this.sessionWinningScore) {
            this.sessionWinner = 2
            this.onSessionWon(2)
        } else {
            let lastPlayerTouch = beachBall.getLastTouchedPlayer();
            if (lastPlayerTouch) {
                if (lastPlayerTouch.team == 1) {
                    let prep = questionSelf(lastPlayerTouch)
                    if (prep == 3) {
                        delay = 5000
                    }
                }
            }
            if (delay > 0) {
                timeoutTask(() => {
                    teamManager.serveBall(serveDelay, () => {
                        onServeballStart()
                    }, () => {
                        sfxSB.play("whistle_sh")
                        onServeballEnd()
                    });
                }, delay);
            } else {
                teamManager.serveBall(serveDelay, () => {
                    onServeballStart()
                }, () => {
                    sfxSB.play("whistle_sh")
                    onServeballEnd()
                });
            }
        }
    },
    onRightMiss(delay = 0, onJudge = NULLFUNCTION, onServeballStart = NULLFUNCTION, onServeballEnd = NULLFUNCTION) {
        if (!this.recordingScores) return;
        sfxSB.play("whistle_lg")
        onJudge();


        let serveDelay = 2000;

        let phantomed = new Array()

        for (let person of this.players) {
            let status = person.status
            if (person.team == 1) {
                status.mainFeeling = "Smug";
                if (this.currentRoundTime > 10) {
                    timeoutTask(function () {
                        jump(person, 0, -200)
                    }, randomNumber(0, 200))
                }
            } else if (person.team == 2) {
                status.mainFeeling = status.feeling = "whut";
                if (status.confused) {
                    status.ghost = true;
                    phantomed.push(person)
                }
            }
        }

        timeoutTask(() => {
            for (let person of phantomed) {
                person.status.ghost = false
            }
        }, serveDelay)

        ++this.team1Score
        this.RoundWinner = 1
        this.recordingScores = false;
        if (this.team1Score == this.sessionWinningScore) {
            this.sessionWinner = 1
            this.onSessionWon(1)
        } else {
            let lastPlayerTouch = beachBall.getLastTouchedPlayer();
            if (lastPlayerTouch) {
                if (lastPlayerTouch.team == 2) {
                    let prep = questionSelf(lastPlayerTouch)
                    if (prep == 3) {
                        delay = 5000
                    }
                }
            }

            if (delay > 0) {
                timeoutTask(() => {
                    teamManager.serveBall(serveDelay, () => {
                        onServeballStart()
                    }, () => {
                        sfxSB.play("whistle_sh")
                        onServeballEnd()
                    });
                }, delay);
            } else {
                teamManager.serveBall(serveDelay, () => {
                    onServeballStart()
                }, () => {
                    sfxSB.play("whistle_sh")
                    onServeballEnd()
                });
            }
        }
    },
    checkFoul(player) {
        let envelope = new AnimationGraph()
        envelope.addAnimationNode(0, 0)
        envelope.addAnimationNode(0.2, 1)
        envelope.addAnimationNode(0.8, 1)
        envelope.addAnimationNode(1, 0)

        let foul = false

        if (player.team == 1) {
            if (player.position.x > netStick.position.x) {
                teamManager.onLeftMiss(0);
                foul = true
            }
        } else if (player.team == 2) {
            if (player.position.x < netStick.position.x) {
                teamManager.onRightMiss(0)
                foul = true
            }
        }

        if (!foul) return;

        // yeet!!!
        let targetpoint = new Lvector2D(0, -150);
        let oldFriction = new Lvector2D(0, 0)
        place(oldFriction, player.staticFriction)
        place(player.staticFriction, Lvector2D.zero())
        jump(player)
        player.setVelocity(vecMath.multiply(vecMath.normalize(vecMath.subtract(targetpoint, player.position)), 700))
        setTimeout(() => {
            place(player.staticFriction, oldFriction)
        }, 800)
        sfxSB.play("whistle_sh", true)

        setTimeout(() => {
            sfxSB.play("whistle_sh", true)
        }, randomNumber(300, 500))

        inPs.particleSource(0, 50, 20, 20, [-100, 100], -200, [[0, 0], [0, 2]], 50, "nope", 1, 1, (particle) => {
            // inPs.particleSource(player.position.x, ground.getAABB().min.y, player.radius, 20, [-100, 100], -100, [[0, 0], [0, 2]], 70, "nope", 1, 1, (particle) => {
            textOutline(particle.size * 0.2, "red")
            txt("Foul !!", particle.x, particle.y, font(particle.size), "white", 0, "center")
            textOutline(0)
        }, (particle, time) => {
            particle.size = envelope.getValueAtTime(time) * 100
        })
    },
    setControlledPlayer(player) {
        this.controlledPlayer = player
    },
    onSessionWon(teamNumber) {
        this.recordingScores = false
        musicSB.pause("mayGM")
        musicSB.pause("kenGM")
        musicSB.pause("bg_music");
        musicSB.play("end_music", false, 0)
        this.playingGame = false;
        mainGame.showingClosingCutScene = true;
        if (teamNumber == 1) {
            this.winningTeam = this.team1;
        } else if (teamNumber == 2) {
            this.winningTeam = this.team2
        } else {
            if (teamNumber == 0) {
                this.sessionWinner = 0;
            }
        }
    },
    serveBall(serveDelay = 2000, onRemoveBall = NULLFUNCTION, onAddBall = NULLFUNCTION) {
        if (!this.playingGame) return;
        let manager = this
        if (teamManager.godModePlayer) {
            serveDelay = 700
        }
        // setTimeout(() => {
        sfxSB.play("pop", true)
        sfxSB.play("ballgo", true)
        manager.RoundWinner = 0
        world.removeBody(beachBall)
        onRemoveBall()
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
        place(beachBall.position, new Lvector2D(0, -150))
        timeoutTask(() => {
            if (world.containsBody(beachBall)) return;
            sfxSB.play("poup", true)
            sfxSB.play("ballcome", true)
            manager.recordingScores = true
            manager.currentRoundTime = 0;
            beachBall.recoredPlayerTouch(null)
            world.addBody(beachBall)
            place(beachBall.position, new Lvector2D(0, -150));
            for (let angle = 0; angle <= 360; angle += 18) {
                let length = beachBall.radius
                let speed = 500
                let sinA = sine(angle);
                let cosA = -cosine(angle);
                let x = beachBall.position.x + length * sinA
                let y = beachBall.position.y + length * cosA
                inPs.particleSource(x, y, 200, 200, speed * sinA, speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
                    CaldroSSM.draw("outWhiespray", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
                }, "shrink fadeout", function (particle) {
                    particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
                })
                inPs.particleSource(x, y, 10, 10, speed * sinA, speed * cosA, [[0, 0], [3, 3]], beachBall.radius * 2, "nope", 1, 1, function (particle) {
                    CaldroSSM.draw("beachball", particle.x, particle.y, particle.size, particle.size, true, particle.ang)
                }, "shrink fadeout", function (particle) {
                    particle.ang = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
                })
            }
            manager.ballOutOfBounds = false;
            let throwForce = new Lvector2D(choose([-100, 100]), 0);
            beachBall.setVelocity(throwForce)
            beachBall.hasHitSand = false
            for (let person of manager.players) {
                person.status.mainFeeling = ""
            }
            onAddBall();
        }, serveDelay)
        // }, 1000);
    },
    onBallLeaveArea() {
        for (let person of this.players) {
            person.status.mainFeeling = "oops"
        }
        this.serveBall();
    },
    everyUpdate() {
        this.currentRoundTime += Caldro.time.deltatime;

        if (this.playingGame) {
            if (beachBall.position.x < -400 || beachBall.position.x > 400 || beachBall.position.y < -1200) {
                if (!this.ballOutOfBounds) {
                    this.onBallLeaveArea();
                    this.ballOutOfBounds = true
                }
            }
        }
        if (this.godModePlayer) {
            let time;
            if (musicSB.initialized) {
                time = audioManager.getCurrentGM().getCurrentTime();
            }

            if (!world.paused() && time > 2.5) {
                this.godModePlayer.duringgodMode(time);
            }
        }
        this.playerRePosition();
    },
    updateControlledPlayers() {
        if (teamManager.controlledPlayer) {
            if (!teamManager.proccessingControls) return;
            let dx = 0;
            let dy = 0;
            let forceMagnitude = teamManager.controlledPlayer.moveSpeed * 50

            if (keyboard.isBeingPressed("left")) { --dx; }
            if (keyboard.isBeingPressed("right")) { ++dx; }
            if (keyboard.isBeingPressed("up")) { --dy; }




            movePlayer(teamManager.controlledPlayer, teamManager.controlledPlayer.moveSpeed, dx)
        }
    },
    playersPlay() {
        if (!this.playingVolleyball) return;
        for (let person of this.players) {
            playVolleyball(person, person.team)
        }
    },
    setTeam(player, team) {
        player.team = team;
    },
    addPlayer(player, team) {
        if(team) player.team = team;
        if (!this.players.includes(player)) {
            this.players.push(player);
        }
    },
    preparePlayers() {
    },
    playerRePosition() {
        this.getTeamsArrays();
        let space = 350
        let team1length = 0
        let team2length = 0
        /*         doTask("sortemPlayers", ()=>{
                    this.players = this.players.sort((player)=>{
                        return player.position.x
                    })
                }, true, INFINITY, 1) */
        let playersONGroud = this.players.filter((player) => {
            let side = player.team == 1 ? 1 : -1;
            return (player.timeOffGround < 0.5) && (player.position.x * side < netStick.position.x)
        })
        for (let player of playersONGroud) {
            if (player.team == 1) {
                team1length++
            } else if (player.team == 2) {
                team2length++
            }
        }

        let lastTeam1X = -((space * 0.5) / (team1length))
        let lastTeam2X = (space * 0.5) / team2length


        for (let player of playersONGroud) {
            // if(!player.selfUpdatingPositions)continue;
            if (player.team == 1) {
                player.restingPosition.x = lastTeam1X
                lastTeam1X -= space / team1length;
                player.operationWidth = space / team1length
            } else if (player.team == 2) {
                player.restingPosition.x = lastTeam2X
                lastTeam2X += space / team2length;
                player.operationWidth = space / team2length
            }
        }
    },
    initPlayers() {
        this.getTeamsArrays()
        if (this.team1.length == 1) {
            this.team1[0].restingPosition = restPoint1
        } else if (this.team1.length == 2) {
            this.team1[0].restingPosition = restPoint3
            this.team1[1].restingPosition = restPoint4
        } else if (this.team1.length == 3) {
            this.team1[0].restingPosition = restPoint3
            this.team1[1].restingPosition = restPoint1
            this.team1[2].restingPosition = restPoint4
        }

        if (this.team2.length == 1) {
            this.team2[0].restingPosition = restPoint2
        } else if (this.team2.length == 2) {
            this.team2[0].restingPosition = restPoint5
            this.team2[1].restingPosition = restPoint6
        } else if (this.team2.length == 3) {
            this.team2[0].restingPosition = restPoint5
            this.team2[1].restingPosition = restPoint2
            this.team2[2].restingPosition = restPoint6
        }

        for (let person of this.players) {
            person.moveTo(person.restingPosition)
            person.setVelocity(new Lvector2D(0, 0))
            person.preMatch();
            this.setTeam(person, person.team)
            world.addBody(person)
            person.onEnterGame();
            if (!this.soloGame) {
                person.operationWidth = 300
                if (person.team == 1) {
                    person.operationWidth /= teamManager.team1.length
                } else if (person.team = 2) {
                    person.operationWidth /= teamManager.team2.length
                }
            } else {
                person.operationWidth = 400
            }
        }
        // this.setAllPlayerFellings("", "")
    },
    removePlayers() {
        for (let person of this.players) {
            world.removeBody(person)
        }
    },
    reset() {
        this.winner = 0;
        this.RoundWinner = 0
        this.team1Score = this.team2Score = 0;
        this.recordingScores = false;
        this.playingVolleyball = false;
        this.playingGame = false;
        this.currentRoundTime = 0
        this.sessionWinner = 0;
        this.godModePlayer = false
    },
    start() {
        this.recordingScores = true;
        this.playingVolleyball = true;
        this.playingGame = true;
        mainGame.matchTime.resume();
    },
    stop() {
        this.recordingScores = false;
        this.playingVolleyball = false;
        this.playingGame = false;
    },
    isOnSide(position, team) {
        let side = team === 1 ? 1 : -1;
        return position.x * side < net.position.x
        // let side = 1;
        // if (position.x > net.psoition.x) side = 2;
        // return side == team
    }
}