// ================= CHARACTERS ==============================
let may = createCharacter("May", mayPink, 1, "Feel the Pressure! UwU", "maySpray", "sweat", oceanBeach)
let gustavo = createCharacter("Gustavo", gustavoYellow, 0, "It's na-cho day! 0_0", "nachoes", "sweat", oceanBeach)
let clare = createCharacter("Clare", clareWhite, 1, "..", "clareSpray", "angerVein", clouds)
let abby = createCharacter("Abby", abbyBrown, 1, "It's called inspiration okay? ^^", "brownHeart", "angerVein", oceanBeach)
let ken = createCharacter("Ken", kenGrey, 0, "Any last words? u_u", "epglot", "angerVein", epoglis, "rgb(0, 0, 2)")
ken.godModeMusic = "kenGM";
ken.punch1 = physics.createCircleBody(new Lvector2D(0, 0), ken.radius / 2, 0.1, 10, false)
ken.punch2 = physics.createCircleBody(new Lvector2D(0, 0), ken.radius / 2, 0.5, 3000, true)

let emilo = createCharacter("Emilo", emiloGreen, 0, "emilo.clone.exe", ["download", "cloud1"], "loading", oceanBeach)



// ====================== CHARACTER OBJECTS ====================
let kenfloor = physics.createPolygonBody(new Lvector2D(0, -400), classicPhysics.createVerticies([
    [0, 0],
    [0.8, 0],
    [1, 1],
    [0, 1]
]), 450, 50, 0.4, 10, false)
kenfloor.preCollision = (body) => {
    if (body == net || body == netStick) {
        return Collisions.GHOST;
    }
}
kenfloor.drawing = () => {
    let body = kenfloor
    drawBodyShadowOnGround(kenfloor)
    // alpha(0.6)
    // CaldroSSM.draw("shadow", kenfloor.position.x+kenfloor.scaleX/2, kenfloor.position.y, -100, 10, true)
    // alpha(1)
    CaldroSSM.draw("kenfloor", kenfloor.position.x, kenfloor.position.y, kenfloor.scaleX, kenfloor.scaleY, true)
}















// ======================= GODMODES =====================

setPlayergodMode(may,
    function () {
        // may.moveSpeed = 80
    },
    function (time, gPlayer) {
        if (!gPlayer) gPlayer = may;
        let side = may.godModeTargetTeam == 1 ? -1 : 1;
        let saabb = ground.getAABB();
        if (time < 3) return


        if (withinRange(time, 3, 13)) {
            doTask(gPlayer.name+"'sA1rrowIndicator", () => {
                inPs.particleSource(200*side, -30, 0, 0, 0, 0, null, 400, null, 1, Infinity, (particle) => {
                    particle.y = Math.sin(Caldro.time.elapsedTime * 3) * 30
                    let alph = scaleTo(particle.y, -30, 30, 0, 0.4)
                    alpha(alph)
                    CaldroSSM.draw("pinkArrow", particle.x, particle.y, particle.size, particle.size, true, 180)
                    alpha(1)
                }, null, (particle) => {
                    particle.callback = function () {
                        if (!teamManager.godModePlayer) {
                            particle.toDelete = true
                            clearDoTask(gPlayer.name+"'sA1rrowIndicator")
                        }
                    }
                })
            })

            doTask(gPlayer.name+"RainShower1", () => {
                let x = 200 * side + randomNumber(-200, 200)
                let y = randomNumber(-400, -300)
                let width = 80;
                let height = 80;

                let sound = choose(["softD", "roughD"])
                sfxSB.play(sound, true, 0, null, 0.3)

                let arrow = physics.createBoxBody(new Lvector2D(x, y), width, height, 0, 1, false)
                arrow.drawing = function () {
                    CaldroSSM.draw("pinkArrow", arrow.position.x, arrow.position.y, arrow.width, arrow.height, true, angleBetweenPoints(ORIGIN, arrow.linearVelocity))
                }
                arrow.onCollisionStart = function (body) {
                    if (body.tag == "ground") {
                        world.removeBody(arrow)
                    } else
                        if (body == beachBall) {
                            beachBall.addVelocity(vecMath.multiply(vecMath.normalize(vecMath.subtract(arrow.position, beachBall.position)), 30))
                            return Collisions.GHOST
                        } else {
                            return Collisions.GHOST
                        }

                }
                arrow.callback = function () {
                    /* if (arrow.position.y + arrow.height / 2 >= randomNumber(saabb.min.y, 100)) {
                        world.removeBody(arrow)
                    } */
                    if (!teamManager.godModePlayer) {
                        world.removeBody(arrow)
                    }
                    let audio = audioManager.getCurrentGM()
                    if (audio) {
                        time = audio.getCurrentTime();
                        if (time > 13.6) world.removeBody(arrow)
                    }
                }
                arrow.onRemove = function () {
                    sfxSB.play("softD", true, 0, null, 0.2)
                    inPs.particleSource(arrow.position.x, arrow.position.y, 10, 10, [-50, 50], [-50, 10], [0, 0], randomNumber(40, 50), "", 5, 0.5, function (particle) {
                        CaldroSSM.draw("maySpray", particle.x, particle.y, particle.size, particle.size, true)
                    }, "grow fadeout")
                }

                world.addBody(arrow)
            }, true, Infinity, 400)


            return
        }

        let slamForce = new Lvector2D(100 * side, 500)
        if (beachBall.position.x * side > netStick.position.x) {
            beachBall.addVelocity(vecMath.multiply(slamForce, 0.1))
        }

        doTask(gPlayer.namea+"RainShower2", () => {
            let sound = choose(["softD", "roughD"])
            sfxSB.play(sound, true, 0, null, 0.3)
            inPs.particleSource(200 * side, -300, 400, 50, slamForce.x, slamForce.y, [0, 0], 80, "null", 1, Infinity, (particle) => {
                CaldroSSM.draw("pinkArrow", particle.x, particle.y, particle.size, particle.size, true, angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv)))
            }, "", (particle) => {
                particle.callback = function () {
                    if (particle.y + particle.size / 2 >= randomNumber(saabb.min.y, 100)) {
                        inPs.removeParticle(particle)
                    }
                    if (!teamManager.godModePlayer) {
                        inPs.removeParticle(particle)
                    }
                }
                particle.onDelete = function () {
                    sfxSB.play("softD", true, 0, null, 0.2)
                    inPs.particleSource(particle.x, particle.y, 10, 10, [-50, 50], [-50, 10], [0, 0], randomNumber(40, 50), "", 5, 0.5, function (particle) {
                        CaldroSSM.draw("maySpray", particle.x, particle.y, particle.size, particle.size, true)
                    }, "grow fadeout")
                }
            })
        }, true, Infinity, 50)
    },
    function () {

    }
)

setPlayergodMode(gustavo,
    function () {

    },
    function (time, gPlayer) {
        if (!gPlayer) gPlayer = gustavo;
        if (teamManager.controlledPlayer != gPlayer) {
            doTask("self-positioning" + gPlayer.name, () => {
                if (gPlayer.position.y > -100) {
                    jump(gPlayer)
                }
            }, true, Infinity, randomNumber(100, 200))
        }
        doTask(gPlayer.name + "&gustavoShootsNachoes--yes----nachoes", () => {
            let pop = sfxSB.get("pop", true)
            pop.setVolume(scaleTo(clip(time, 0, 5), 0, 5, 1, 0.2))
            pop.setPlaybackRate(randomNumber(0.8, 1.2))
            pop.play();
            pop = null;
            // let side = gPlayer.team === 1 ? 1 : -1; // this makes a multiplier we add to the direction of the gmode obstacles, defalut will send it to team 2
            let side = gPlayer.godModeTargetTeam === 1 ? -1 : 1; // this makes a multiplier we add to the direction of the gmode obstacles, defalut will send it to team 2
            let nacho = physics.createBoxBody(new Lvector2D(gPlayer.position.x + (gPlayer.radius + 15) * side, gPlayer.position.y), 35, 35, 0.6, 100, false)
            let throwForse = new Lvector2D(400 * side, randomNumber(-500, 500))
            nacho.drawing = function () {
                drawBodyShadowOnGround(this, 100)
                CaldroSSM.draw("nachoes", this.position.x, this.position.y, this.width, this.height, true, this.rotation)
            }
            nacho.time = 0;
            nacho.lfetime = 1
            nacho.rotate(randomNumber(0, 360))
            nacho.rotationalVelocity = randomNumber(40, 80)
            nacho.addVelocity(throwForse)
            nacho.tag = "nacho"
            nacho.removed = false;

            nacho.callback = () => {
                nacho.time += Caldro.time.deltatime
                if (nacho.time > nacho.lfetime) {
                    inPs.particleSource(nacho.position.x, nacho.position.y, nacho.width, nacho.height, [-300, 300], [-300, 300], [[0, 0], [1, 1]], nacho.width, "nope", 6, 0.5, function (particle) {
                        CaldroSSM.draw("gustavoSpray", particle.x, particle.y, particle.size, particle.size, true, 0)
                    }, "grow fadeout")
                    world.removeBody(nacho)
                }
            }
            nacho.onCollisionContinue = (body) => {
                if (body.hasTag('nacho') || body == gPlayer) return;
                if (body.hasTag("player")) {
                    if (body.currentTeam == gPlayer.currentTeam) {
                        return Collisions.GHOST;
                    }
                } else if (body == beachBall) {
                    beachBall.recoredPlayerTouch(gPlayer)
                    if (beachBall.position.y + beachBall.radius < -225) {
                        beachBall.addVelocity(new Lvector2D(0, 30))
                        return Collisions.GHOST;
                    };
                }
            }
            nacho.onCollisionStart = (body) => {
                if (body.tag === "nacho" || body == gPlayer) return;
                if (body.hasTag("player")) {
                    if (body.currentTeam == gPlayer.currentTeam) {
                        return Collisions.GHOST;
                    }
                } else if (body == beachBall) {
                    beachBall.recoredPlayerTouch(gPlayer)
                    if (beachBall.position.y + beachBall.radius < -225) {
                        return Collisions.GHOST;
                    };
                }
                inPs.particleSource(nacho.position.x, nacho.position.y, nacho.width, nacho.height, [-300, 300], [-300, 300], [[0, 0], [1, 1]], nacho.width, "nope", 6, 0.5, function (particle) {
                    CaldroSSM.draw("gustavoSpray", particle.x, particle.y, particle.size, particle.size, true, 0)
                }, "grow fadeout")
                world.removeBody(nacho)
                nacho.removed = true
            }

            world.addBody(nacho)
            inPs.particleSource(nacho.position.x, nacho.position.y, nacho.width, nacho.height, [-300, 300], [-300, 300], [[0, 0], [1, 1]], nacho.width, "nope", 4, 0.5, function (particle) {
                CaldroSSM.draw("gustavoSpray", particle.x, particle.y, particle.size, particle.size, true, 0)
            }, "shrink")
        }, true, Infinity, 50)
    },
    function (gPlayer) {
        if (!gPlayer) gPlayer = gustavo;
        sfxSB.play("pop", true)
        sfxSB.play("poup", true)
        for (let angle = 0; angle <= 360; angle += 18) {
            let length = gPlayer.radius + 50
            let speed = 500
            let sinA = sine(angle);
            let cosA = -cosine(angle);
            let x = gPlayer.position.x + length * sinA
            let y = gPlayer.position.y + length * cosA
            let throwForce = new Lvector2D(speed * sinA, speed * cosA)

            let nacho = physics.createBoxBody(new Lvector2D(x, y), 25, 25, 0.6, 10, false)
            nacho.drawing = function () {
                drawBodyShadowOnGround(this, 100)
                CaldroSSM.draw("nachoes", this.position.x, this.position.y, this.width, this.height, true, this.rotation)
            }
            nacho.rotate(randomNumber(0, 360))
            nacho.rotationalVelocity = randomNumber(40, 80)
            nacho.addVelocity(throwForce)
            nacho.tag = "nacho"
            nacho.removed = false;
            nacho.time = 0;
            nacho.lfetime = chance(70) ? 20 + randomNumber(0, 1) : randomNumber(15, 18)
            nacho.callback = () => {
                nacho.time += Caldro.time.deltatime
                if (nacho.time > nacho.lfetime) {
                    sfxSB.play("poup", true)
                    inPs.particleSource(nacho.position.x, nacho.position.y, nacho.width, nacho.height, [-300, 300], [-300, 300], [[0, 0], [1, 1]], nacho.width, "nope", 6, 0.5, function (particle) {
                        CaldroSSM.draw("gustavoSpray", particle.x, particle.y, particle.size, particle.size, true, 0)
                    }, "grow fadeout")
                    world.removeBody(nacho)
                }
            }
            nacho.onCollisionStart = (body) => {
                if (body.tag === "nacho" || body == gPlayer) return;
                if (body.hasTag("player")) {
                    if (body.currentTeam != gPlayer.currentTeam) {
                        inPs.particleSource(nacho.position.x, nacho.position.y, nacho.width, nacho.height, [-300, 300], [-300, 300], [[0, 0], [1, 1]], nacho.width, "nope", 6, 0.5, function (particle) {
                            CaldroSSM.draw("gustavoSpray", particle.x, particle.y, particle.size, particle.size, true, 0)
                        }, "grow fadeout")
                        world.removeBody(nacho)
                        nacho.removed = true
                        sfxSB.play("poup", true)
                    } else {
                        return Collisions.GHOST;
                    }
                } else if (body == beachBall) {
                    beachBall.recoredPlayerTouch(gPlayer)
                }
            }
            world.addBody(nacho)
        }
    }
    ,)

setPlayergodMode(clare,
    () => {

    }, (time, gPlayer) => {
        if (!gPlayer) gPlayer = clare;
        if (time < 3) return;
        let saabb = ground.getAABB();
        if (gPlayer.position.y <= beachBall.position.y) {
            gPlayer.status.avoidingBall = true;
            // clare.camJump = false
        } else {
            gPlayer.status.avoidingBall = false;
        }
        let aabb = gPlayer.getAABB();
        inPs.particleSource(gPlayer.position.x, aabb.max.y, gPlayer.radius, 10, [-500, 500], [-150, 10], [0, 0], randomNumber(30, 40), "", 5, 0.4, function (particle) {
            CaldroSSM.draw("cloud1", particle.x, particle.y, particle.size, particle.size, true)
        }, "shrink fadeout")

        let threshold = gPlayer.radius * 2.5
        let side = gPlayer.team == 1 ? 1 : -1;
        if (teamManager.isOnSide(beachBall.position, gPlayer.currentTeam) && teamManager.recordingScores) {
            if (saabb.min.y - (beachBall.position.y) < threshold) {
                // jump away if youre clare is jumping on the ball hersel
                if (teamManager.controlledPlayer != gPlayer) {
                    if (beachBall.position.y > gPlayer.position.y) {
                        // clare.canJump = false
                    }
                    if (gPlayer.position.y < beachBall.position.y - beachBall.radius && withinRange(gPlayer.position.x, beachBall.position.x - beachBall.radius * 4, beachBall.position.x + beachBall.radius * 4)) {
                        movePlayer(gPlayer, gPlayer.moveSpeed * 3, clip((-200 * side) - beachBall.position.x), -1, 1)
                        movePlayer(beachBall, gPlayer.moveSpeed * 3, -clip((-200 * side) - beachBall.position.x), -1, 1)
                        beachBall.addVelocity(new Lvector2D(0, -3000))
                        // clare.canJump = false
                        // clare.status.controllable = false
                        // doTask("don't fail yourself clare", () => {
                        // }, true, INFINITY, 5)
                    }
                }

                // do all the ball saving up stuff
                let aggression = scaleTo(beachBall.position.y + beachBall.radius, saabb.min.y - threshold, saabb.min.y, 0, 1.3)
                beachBall.addVelocity(vecMath.multiply(new Lvector2D(0, -beachBall.linearVelocity.y), aggression))
                // beachBall.addVelocity(vecMath.multiply(vecMath.invert(beachBall.linearVelocity), aggression))
                inPs.particleSource(beachBall.position.x, saabb.min.y, gPlayer.radius, gPlayer.radius, [-200, 200], [-650 * aggression, 10], [0, 0], randomNumber(50, 100), "", 1 + (Math.round(2 * aggression)), 0.5, function (particle) {
                    CaldroSSM.draw(particle.picture, particle.x, particle.y, particle.size, particle.size, true)
                }, "shrink fadeout", (particle) => {
                    particle.picture = chance(20) ? "blueArrow" : "cloud1";
                })

                doTask("snowfall", function () {
                    inPs.particleSource(0, -saabb.min.y, 1000, 50, [-50, 10], [-300 - 1000 * aggression, -150], [[0, -10 * aggression], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 1 + Math.ceil(2 * aggression), 30, function (particle) {
                        // alpha(0.6)
                        CaldroSSM.draw(particle.snowflake, particle.x, particle.y, particle.size, particle.size, true, particle.angle, 0, 1 + 2 * aggression)
                        // alpha(1)
                    }, "", function (particle) {
                        let snowflake = choose(["snowflake1", "snowflake2"]);
                        particle.snowflake = snowflake
                        particle.angle = randomNumber(0, 360)
                        particle.angleSpeed = randomNumber(30, 270)
                        particle.callback = function () {
                            particle.angle += particle.angleSpeed * Caldro.time.deltatime;
                            particle.angle = 0
                            if (particle.y + particle.size / 2 < -250) {
                                inPs.removeParticle(particle)
                            }
                            if (!teamManager.godModePlayer) {
                                inPs.removeParticle(particle)
                            }
                        }
                        particle.onDelete = function () {
                            inPs.particleSource(particle.x, particle.y, 1, 2, [0, 0], [0, 100], [0, 0], randomNumber(30, 40), "", 5, 0.2, function (particle) {
                                CaldroSSM.draw("clareSpray", particle.x, particle.y, particle.size, particle.size, true)
                            }, "shrink fadeout")
                        }
                    })
                }, true, Infinity, 10)
            } else {
                doTask("snowfall", function () {
                    inPs.particleSource(0, -350, 1000, 50, [-50, 10], [250, 300], [[0, 1], [0, 0]], 20, "doesn't matter, same as the value before this, the particle size, since we are costum rendering our particles/clouds xD", 1, 30, function (particle) {
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
                            if (particle.y + particle.size / 2 >= randomNumber(saabb.min.y, 100)) {
                                inPs.removeParticle(particle)
                            }
                            if (!gPlayer.isIngodMode) {
                                inPs.removeParticle(particle)
                            }
                        }
                        particle.onDelete = function () {
                            inPs.particleSource(particle.x, particle.y, 1, 2, [0, 0], [0, 100], [0, 0], randomNumber(30, 40), "", 5, 0.2, function (particle) {
                                CaldroSSM.draw("clareSpray", particle.x, particle.y, particle.size, particle.size, true)
                            }, "shrink fadeout")
                        }
                    })
                }, true, Infinity, 10)
            }
        }



        if (chance(5) && time > 14) {

            let cloud = physics.createBoxBody(new Lvector2D(200 * side + randomNumber(-150, 150), 300), randomNumber(50, 100), randomNumber(25, 50), 0, 1, false)
            cloud.touchedPlayer = false
            cloud.hangTime = 1 // in seconds1
            cloud.gravity = false
            cloud.tag = "floating_cloud"
            // cloud.dynamicFriction = new Lvector2D(1, 0)
            cloud.drawing = () => {
                CaldroSSM.draw("snow1", cloud.position.x, cloud.position.y, cloud.width * 1.1, cloud.height * 1.3, true)
            }
            cloud.callback = () => {
                if (cloud.hangTime <= 0 || cloud.position.y < -220 || cloud.position.y > 400) {
                    world.removeBody(cloud)
                    return;
                }
                if (!cloud.touchedPlayer) {
                    if (cloud.position.y >= -160) {
                        cloud.setVelocity(new Lvector2D(cloud.linearVelocity.x, -100))
                    } else {
                        cloud.hangTime -= Caldro.time.deltatime
                    }

                } else if (cloud.position.y <= -150) {
                    world.removeBody(cloud)
                }
            }
            cloud.onCollisionStart = (body) => {
                if (body == beachBall) {
                    world.removeBody(cloud)
                }
                if (body == beachBall || body == ground || body == net || body == netStick) return Collisions.GHOST;
                if (body.tag != cloud.tag) {
                    cloud.touchedPlayer = true
                }
            }
            cloud.onRemove = () => {
                if (cloud.position.y < -250) return
                inPs.particleSource(cloud.position.x, cloud.position.y, cloud.width, cloud.height, [-500, 500], [-500, 500], [[0, 0], [1, 1]], randomNumber(40, 50), "", 5, 0.5, function (particle) {
                    CaldroSSM.draw("cloud1", particle.x, particle.y, particle.size, particle.size, true)
                }, "grow fadeout")
            }
            world.addBody(cloud)
        }
    },

    (gPlayer) => {
        if (!gPlayer) gPlayer = clare
        gPlayer.status.avoidingBall = false;
    })

setPlayergodMode(ken, function () {

}, function (time) {

},

)

setPlayergodMode(emilo)

setPlayergodMode(abby,
    () => {
        abby.newAlly = null
        // abby.newAllyOldTeam = null
        abby.newAllyOldRestingPosition = null
        let bigHeart = physics.createCircleBody(new Lvector2D(abby.position.x, -120), abby.radius, 1, 1, true)
        bigHeart.inactive = true
        bigHeart.hasBeenOnOtherside = false

        bigHeart.drawing = () => {
            drawBodyShadowOnGround(bigHeart, 100)
            if (bigHeart.inactive) {
                let cnt = Caldro.renderer.context
                CaldroCIM.draw(cnt, "abbyShine", bigHeart.position.x, bigHeart.position.y, bigHeart.radius * 4, bigHeart.radius * 4, true)
                cnt.save()
                drawStarPolygon(bigHeart.position.x, bigHeart.position.y, bigHeart.radius * 4, 0.2, 7, mainGame.elapsedTime * 100, 3)
                CaldroCIM.draw(cnt, "clareShine", bigHeart.position.x, bigHeart.position.y, bigHeart.radius * 4, bigHeart.radius * 4, true)
                cnt.restore();
            } else {
                inPs.particleSource(bigHeart.position.x, bigHeart.position.y, bigHeart.radius, bigHeart.radius, [-200, 200], [-200, 200], [0, 0], bigHeart.radius * randomNumber(0.6, 0.8), "", 1, 0.6, (particle) => {
                    CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
                }, "grow fadeout")
            }
            CaldroSSM.draw("brownHeart", bigHeart.position.x, bigHeart.position.y, bigHeart.radius * 2, bigHeart.radius * 2, true, bigHeart.rotation)
        }
        bigHeart.onRemove = () => {
            console.log("BrownHeart was removed")
            inPs.particleSource(bigHeart.position.x, bigHeart.position.y, bigHeart.radius, bigHeart.radius, [-400, 400], [-400, 400], [0, 0], bigHeart.radius * randomNumber(0.8, 1.3), "", 15, 1, (particle) => {
                CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")
        }
        bigHeart.activeTime = 0
        bigHeart.callback = () => {
            if (!teamManager.godModePlayer) {
                world.removeBody(bigHeart);
                return;
            }
            if (!bigHeart.hasBeenOnOtherside) {
                if (!teamManager.isOnSide(bigHeart.position, abby.team)) { // if the heart is not on the side of abby's team
                    bigHeart.hasBeenOnOtherside = true
                }
            }
            if (!bigHeart.inactive) {
                bigHeart.activeTime += Caldro.time.deltatime;
            } else {
                bigHeart.moveToXY(abby.position.x, -120)
            }
        }
        bigHeart.onCollisionContinue = (body) => {
            if (body.team == abby.team) {
                return Collisions.GHOST
            }
        }
        bigHeart.onCollisionStart = (body) => {
            if (body == abby) {
                if (bigHeart.inactive) { // the first tiem she lauches the heart
                    inPs.particleSource(bigHeart.position.x, bigHeart.position.y, bigHeart.radius, bigHeart.radius, [-200, 200], [-200, 200], [0, 0], bigHeart.radius * randomNumber(0.6, 0.8), "", 5, 1, (particle) => {
                        CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
                    }, "grow fadeout")
                    bigHeart.inactive = false
                    bigHeart.setStatic(false)
                    let throwDirection = vecMath.normalize(vecMath.subtract(new Lvector2D(0, -150), bigHeart.position))
                    bigHeart.setVelocity(vecMath.multiply(throwDirection, 700))
                } else {
                    if (bigHeart.activeTime < 0.5) {
                        return Collisions.GHOST
                    } else {
                        bigHeart.setVelocity(Lvector2D.zero())
                        let throwDirection = vecMath.normalize(vecMath.subtract(new Lvector2D(0, -150), bigHeart.position))
                        bigHeart.setVelocity(vecMath.multiply(throwDirection, clip(Math.abs(bigHeart.position.x) * 4, 500, 700)))
                        return Collisions.GHOST
                    }

                }
            } else if (bigHeart.inactive) { // when its fresh and up in the air and someone but abby touches it
                return Collisions.GHOST
            } else if (body.tag == "player") { // after she has thrown int
                if (body.team != abby.team) {
                    // setting variables for abby's seduction
                    abby.willHostGMode = teamManager.getTeam(body.team).length == 1 && body.godMode.hostable // will make abby the host of the gmode if there is only one player on the otehr team. Gmode will still take place, this just determines if abby will host it
                    abby.newAlly = body; // abby's victiom

                    // abby.newAllyOldTeam = abby.newAlly.team

                    abby.newAllyOldRestingPosition = vecMath.copy(body.restingPosition);

                    // will change player team if abby wont host the mode
                    if (!abby.willHostGMode) {
                        body.setTeam(abby.team, false)
                    } else {
                        body.godModeTargetTeam = body.currentTeam;
                    }

                    if (body.status.gender == 1) { // female
                        body.restingPosition = vecMath.copy(abby.restingPosition)
                    } else {
                        body.restingPosition.x = abby.restingPosition.x > 0 ? 200 : -200
                    }

                    inPs.particleSource(body.position.x, body.position.y, body.radius, body.radius, [-400, 400], [-400, 400], [0, 0], body.radius * randomNumber(1.6, 1.8), "", 15, 1, (particle) => {
                        CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
                    }, "grow fadeout")
                    inPs.particleSource(body.position.x, body.position.y, body.radius, body.radius, 0, -100, [0, 0], 30, "", 1, 3, (particle) => {
                        textOutline(particle.size * 0.2, body.color)
                        txt(particle.chosenTextPhrase, particle.x, particle.y, font(particle.size), 'white')
                        textOutline(0)
                    }, "grow fadeout", (particle) => {
                        particle.chosenTextPhrase = choose([
                            "I'm comming!",
                            "Asked for ny help?!",
                            "I'll be right there!",
                            "Sabotage 101!",
                            "Dinner after this!!!",
                            "Okie, but not for long! >.<",
                        ])
                    })

                    world.removeBody(bigHeart)
                } else {
                    // if its another member of the team
                    bigHeart.setVelocity(Lvector2D.zero())
                    let throwDirection = vecMath.normalize(vecMath.subtract(abby.position, bigHeart.position))
                    bigHeart.setVelocity(vecMath.multiply(throwDirection, 700))
                    return Collisions.GHOST
                }
            }
        }

        timeoutTask(function () {
            bigHeart.moveToXY(abby.position.x, -120)
            inPs.particleSource(bigHeart.position.x, bigHeart.position.y, bigHeart.radius, bigHeart.radius, [-400, 400], [-400, 400], [0, 0], bigHeart.radius * randomNumber(1.6, 1.8), "", 15, 1, (particle) => {
                CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")
            world.addBody(bigHeart)
            abby.brownHeart = bigHeart
        }, 5000)
    },

    (time) => {
        let side = abby.team == 1 ? 1 : -1;
        let ally = abby.newAlly
        let bigHeart = abby.brownHeart
        if (bigHeart) {
            if (teamManager.controlledPlayer != abby && bigHeart.inactive) {
                // movePlayer(abby, abby.moveSpeed, bigHeart.position.x - abby.position.x)
                jump(abby)
            }
        } else {
            if (time <= 5) {
                let scaledTime = scaleTo(time, 0, 5, 1, 4)
                inPs.particleSource(abby.position.x, -120, abby.radius, abby.radius, [-200 * scaledTime, 200 * scaledTime], [-200 * scaledTime, 200 * scaledTime], [0, 0], abby.radius * randomNumber(0.6, 0.8), "", Math.round(scaledTime), 1 / scaledTime * 0.5, (particle) => {
                    CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
                }, "grow fadeout")
            }
        }
        if (time > 13.6) {
            abby.brownHeart = null
            if (ally) {
                // perform the seduced player's gmode, be the vessel if the other player is the only one on ground
                ally.godMode.during(time, abby.willHostGMode ? abby : null)
                doTask("go to ally domain", () => {
                    sfxSB.play("E", true, 0, null, 1)
                    mainGame.goToPlace(ally.domain)
                })
            }
        }
        doTask("show love for abby", () => {
            if (ally) {
                inPs.particleSource(ally.position.x, ally.position.y - ally.radius, ally.radius * 2, ally.radius * 2, [-100, 100], [-300, -100], [0, 0], ally.radius * randomNumber(0.6, 0.8), "", time < 13.6 ? 1 : 3, 0.6, (particle) => {
                    CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
                }, "grow fadeout")
            }
        }, true, INFINITY, 100)
    },

    () => {
        let ally = abby.newAlly;
        if (ally) {
            inPs.particleSource(ally.position.x, ally.position.y, ally.radius * 2, ally.radius * 2, [-400, 400], [-400, -400], [[0, 0], [1, 1]], ally.radius * randomNumber(0.6, 0.8), "", 20, 0.6, (particle) => {
                CaldroSSM.draw("brownHeart", particle.x, particle.y, particle.size, particle.size, true)
            }, "grow fadeout")
            clearDoTask("go to ally domain")
            ally.setTeam(ally.team, false)
            // teamManager.setTeam(abby.newAlly, abby.newAllyOldTeam)
            // console.log(vecMath.copy(ally.restingPosition))
            abby.newAlly.restingPosition.copy(abby.newAllyOldRestingPosition)
            // console.log(vecMath.copy(ally.restingPosition))

            abby.newAlly = null
            // abby.newAllyOldTeam = null
            abby.newAllyOldRestingPosition = null
            abby.brownHeart = null;
        }
    }
)




setMistakePhrases(may,
    [
        "Oops",
        "Nooo!",
        "Oh shoot!",
        "Awww..",
    ],
    [
        "nauurr",
        "Not Again!!",
        "this is fine....",
        "last time!!"
    ],
    [
        "You've got this",
        "calm down",
        "breathe",
        "it's okay"
    ],
)

setMistakePhrases(clare,
    [
        "Oops",
        "yikes!",
        "Oh shoot!",
        "Awww..",
    ],
    [
        "no way",
        "Yikes!!",
        "this is fine....",
        "last time!!"
    ],
    [
        "Clare your mind...",
        "Calm down",
        "Don't rush",
        "it's okay"
    ],
)

setMistakePhrases(gustavo,
    [
        "My bad!",
        "Oof..",
        "Oh shoot!",
        "Ahhhh!",
    ],
    [
        "No way...",
        "Dropped it",
        "FoCuS!",
        "Nauur sauce on my hands!"
    ],
    [
        "Think of nachos...",
        "Nacho supremee!",
        "Sweet nachos!!",
        "I got this!"
    ],
)

setMistakePhrases(abby,
    [
        "Oops!",
        "Oof..",
        "Oh shoot!",
        "why nawww...",
    ],
    [
        "Heartache!!",
        "Whyyyyy!!",
        "wetin be dis!",
        "Omo!!"
    ],
    [
        "Calm down",
        "With a big heart",
        "it's okay",
        "I got this!"
    ],
)

setMistakePhrases(emilo,
    [
        "Noooo",
        "Ughhh",
        "My bad!",
        "Shoot!",
    ],
    [
        "Faulty eyezz!",
        "No!!",
        "Stopp!1",
        "Arrghh!!"
    ],
    [
        "Be calm",
        "Watch me",
        "Slow down",
        "Time to end this"
    ],
)

setMistakePhrases(ken,
    [
        "NO.",
        "ughh!",
        "Whot!!",
        "Arrghh!!",
    ],
    [
        "CuRsES!!!",
        "Imma burst this ball!!",
        "WHUTT!!!",
        "HOW!!"
    ],
    [
        "You're dead.",
        "I'm coming for you...",
        "Don't blink..",
        ":)",
    ],
)

let phrases1 = [ // the usual...WHUT
    "Awww..",
    "nooo...",
    "whut!",
    "bruh..",
    "ughhh!",
    "wow...",
    "HOW!!!",
]
let phrases2 = [ // scared expressions
    "not again!!!",
    "this is fine..",
    "let it goo...",
    "never again!!",
    "last one!!",
]
let phrases3 = [ // players have calm expressins here
    "...",
    "calm down..",
    "you've got this",
    "slow and steady",
    "breathe in..",
    "breathe out..",
    "we're winning this",
    "you've got this..."
]
