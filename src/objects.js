let ground = physics.createBoxBody(new Lvector2D(0, 300), 2400, 450, 0.8, 1, true)
ground.tag = "ground"
ground.onCollisionStart = function (body) {

}
ground.onCollisionContinue = function (body) {
    let aabb = this.getAABB();
    if (body.linearVelocity.y > 50) {
        let yforce = scaleTo(clip(body.linearVelocity.y, 10, 500), 10, 500, 0.2, 1)
        inPs.particleSource(body.position.x, aabb.min.y, body.radius, 10, [-100, 100], [-100 * yforce, 10 * yforce], [0, 0], randomNumber(10, 20), stylizedColors["sand"], Math.ceil(scaleTo(clip(body.linearVelocity.y, 100, 300), 100, 300), 10, 20), 0.5, function (particle) {
            CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
        }, "grow fadeout")
    }
    if (Math.abs(body.linearVelocity.x) > 50 && aabb.min.y - body.position.y <= body.radius + 1) {
        if (body.tag == "player") {
            body.playGroundSound();
        }
        let yforce = scaleTo(clip(Math.abs(body.linearVelocity.x), 10, 500), 10, 500, 0.2, 1)
        inPs.particleSource(body.position.x + clip(body.linearVelocity.x, -body.radius, body.radius), aabb.min.y, body.radius, 10, [-100, 100], [-100 * yforce, 10 * yforce], [0, 0], randomNumber(10, 20), stylizedColors["sand"], chance(10), 0.5, function (particle) {
            // CaldroSSM.draw("player1", particle.x, particle.y, particle.size, particle.size, true)
            CaldroSSM.draw(mainGame.currentLocation.groundParticles, particle.x, particle.y, particle.size, particle.size, true)
        })
    }
}



let topWall = physics.createBoxBody(new Lvector2D(0, -600), 800, 100, 0.5, 1, true)
topWall.preCollision = (body) => {
    if (body == beachBall) {
        return Collisions.GHOST
    }
}
let leftwall = physics.createBoxBody(new Lvector2D(-450, -150), 100, 1000, 0.5, 1, true)
let rightwall = physics.createBoxBody(new Lvector2D(450, -150), 100, 1000, 0.5, 1, true)
leftwall.dynamicFriction = rightwall.dynamicFriction = new Lvector2D(0, 100)

let tripodCamera = physics.createBoxBody(new Lvector2D(0, 20), 64, 128, 0.1, 10, false)
tripodCamera.lockedAngle = true;
tripodCamera.drawing = function () {
    drawBodyShadowOnGround(this, 300)
    CaldroSSM.draw("tripodCamera", tripodCamera.position.x, tripodCamera.position.y, tripodCamera.width, tripodCamera.height, true, netStick.rotation)
}
tripodCamera.staticFriction = new Lvector2D(2, 0)

let tripdCameraSpaceHogger = physics.createBoxBody(new Lvector2D(550, 37.5), 70, 75, 0.2, 1, true)
tripdCameraSpaceHogger.onCollisionStart = (body) => {
    if(body == tripodCamera){
        world.removeBody(tripdCameraSpaceHogger)
    }
}

let netStick = physics.createBoxBody(new Lvector2D(0, 20), 13, 140, 0.7, 1, true)
let net = physics.createBoxBody(new Lvector2D(0, -10), 22, 60, 0.2, 1, true)
net.drawing = function () {
    drawBodyShadowOnGround(this, 1000)
    CaldroSSM.draw("net", netStick.position.x, netStick.position.y, netStick.height / 2, netStick.height, true, netStick.rotation, this.position.x < beachBall.position.x)
}
netStick.callback = function () {
    // this.position.x = net.position.x
    // this.position.y = net.position.y
}
// colors.push("green");


let beachBall = physics.createCircleBody(new Lvector2D(0, -150), 36, 0.9, 0.01, false)
beachBall.staticFriction = new Lvector2D(0.5, 0)
beachBall.dynamicFriction = new Lvector2D(0.1, 0.1)
beachBall.touchedPlayers = new Array();
beachBall.isGodBall = false;
beachBall.tag = "beachball"
beachBall.getLastTouchedPlayer = () => {
    return beachBall.touchedPlayers[beachBall.touchedPlayers.length - 1]
}
beachBall.drawing = function () {
    drawBodyShadowOnGround(this, 100)
    beachBall.angularVelocity = beachBall.linearVelocity.x;
    // beachBall.angularVelocity = Math.abs(beachBall.linearVelocity.x) < 18 ? 0 : beachBall.linearVelocity.x;
    let ctx = Caldro.renderer.context;
    if (beachBall.isGodBall) {
        let x = beachBall.position.x;
        let y = beachBall.position.y;
        let radius = beachBall.radius * 2 * clip(scaleTo(beachBall.lifetime, 0, 1, 0, 1), 0, 1);
        let ballShine = "clareShine";
        if (beachBall.getLastTouchedPlayer()) {
            ballShine = beachBall.getLastTouchedPlayer().name.toLowerCase() + "Shine";
        }
        inPs.particleSource(beachBall.position.x, beachBall.position.y, beachBall.radius * 2, beachBall.radius * 2, [-100, 100], [-100, 100], [0, 0], randomNumber(beachBall.radius, beachBall.radius * 1.5), "", 1, 0.5, (particle) => {
            CaldroSSM.draw(particle.image, particle.x, particle.y, particle.size, particle.size, true)
        }, 'grow fadeout', (particle) => {
            particle.image = "clareSpray"
            particle.callback = () => {
                if (beachBall.getLastTouchedPlayer()) {
                    particle.image = beachBall.getLastTouchedPlayer().name.toLowerCase() + "Spray";
                }
            }
        })
        setImageSmoothing(ctx, true)
        alpha(0.5)
        CaldroCIM.draw(ctx, ballShine, x, y, 600, 600, true)
        alpha(0.3)
        CaldroCIM.draw(ctx, "clareShine", x, y, radius * 2, radius * 2, true)
        alpha(1)
        ctx.save();
        glow(20)
        drawStarPolygon(x, y, radius * 4, 0.05, 7, beachBall.lifetime * 50, 5)
        CaldroCIM.draw(ctx, 'clareShine', x, y, radius * 3, radius * 3, true)
        glow(0)
        ctx.restore();
        alpha(0.5)
        CaldroSSM.draw("beachball", this.position.x, this.position.y, this.radius * 2, this.radius * 2, true, this.angle)
        alpha(0.7)
        CaldroCIM.draw(ctx, "clareShine", x, y, beachBall.radius * 4, beachBall.radius * 4, true)
        alpha(1)
        glow(20)
        setImageSmoothing(ctx, false)
        glow(0)
    } else {
        CaldroSSM.draw("beachball", this.position.x, this.position.y, this.radius * 2, this.radius * 2, true, this.angle)
    }
    
    
}
beachBall.onCollisionStart = function (body, collision) {
    let rvel = collision.relativeVelocity.magnitude()
    // console.log(rvel)
    let volume = clip(scaleTo(rvel, 0, 600, 0.3, 1), 0, Infinity)*2
    if(rvel > 800){
    }
    if(rvel > 700){
        sfxSB.play(choose(["hit_hard1", "hit_hard2"]), true, 0, 0, volume)
    } else {
        sfxSB.play(choose(["hit1", "hit2"]), true, 0, 0, volume)
    }
    
    // sfxSB.play("boop")
    // console.log(collision)
    if (!teamManager.playingGame || !teamManager.recordingScores) return;
    if (body.tag == "ground") {
        let aabb = body.getAABB();
        sfxSB.play("E", true)
        sfxSB.play("ballHitGround", true)
        sfxSB.play("hit_impactAir", true, 0, 0, volume * 3)
        mainGame.quickImpactPause();
        setTimeout(() => {
            sfxSB.play("whistle_lg", true)
        }, randomNumber(100, 150))
        if (this.position.x < net.position.x) {
            teamManager.onLeftMiss(1000);
        } else {
            teamManager.onRightMiss(1000);
        }
        // let color = stylizedColors["sand"]
        let color = "transparent"
        let lasttouchedPlayer = beachBall.touchedPlayers[beachBall.touchedPlayers.length - 1]
        if (lasttouchedPlayer) {
            color = lasttouchedPlayer.color
            if (color.sumTotal() > 700) {
                color = stylizedColors["outlines"]
            }
        }
        // inPs.particleSource(beachBall.position.x, aabb.min.y, this.radius * 2, 10, [-50, 50], [-10, -50], [0, 0], 100, "white", 20, 1, "line", "fadeout shrink")
        // inPs.particleSource(beachBall.position.x, aabb.min.y, this.radius * 2, 10, [-50, 50], [-10, -50], [0, 0], 100, stylizedColors[choose(["ablue", "sand"])], 20, 1, function (particle) {
        inPs.particleSource(beachBall.position.x, aabb.min.y, this.radius * 2, 10, [-500, 500], [-250, -10], [[0, 0], [2, 2]], 100, stylizedColors[choose(["ablue", "sand"])], 5, 1, function (particle) {
            textOutline(particle.size * 0.2, color)
            txt("+1", particle.x, particle.y, font(particle.size), "white", 0, "center")
            textOutline(0)
            // triangle(particle.x, particle.y, particle.size, "red", particle.drawingAngle)
        }, "shrink", function (particle) {
            particle.drawingAngle = angleBetweenPoints(ORIGIN, new Point2D(particle.xv, particle.yv))
        })
    } else {
        if (body.tag == 'player') {
            beachBall.recoredPlayerTouch(body)
            if(chance(80))
            // sfxSB.play("hit_air1", true, 0, 0, (1))
            if(chance(80) & rvel > 500 && beachBall.position.y < -100){
                // idk
            }
        }
        if(body == netStick  && rvel > 159) {
            sfxSB.play("hit_thick1", true, 0, 0, volume)
        }
        if(body == net) {
            sfxSB.play(choose(["hit_soft1", "hit_air1"]), true, 0, 0, volume*3)
        }
    }
}
beachBall.recoredPlayerTouch = (player) => {
    let body = player;
    let lastBody = beachBall.touchedPlayers[beachBall.touchedPlayers.length - 1]
    if (lastBody) {
        if (body != lastBody) {
            beachBall.touchedPlayers.push(body)
            if (beachBall.touchedPlayers.length > 4) {
                beachBall.touchedPlayers.shift();
            }
        }
    } else {
        beachBall.touchedPlayers.push(body)
    }
}



let playerEnteredTrigger = physics.createBoxBody(new Lvector2D(-250, -100), 100, 350, 1, 1, true)
playerEnteredTrigger.isTrigger = true;
playerEnteredTrigger.onCollisionStart = (body) => {
    if (body == mainGame.openSceneActor) {
        if (sfxSB.initialized) {
            sfxSB.play("throw1")
            sfxSB.play("throw2")
            let woosh = sfxSB.get("woosh", true)
            woosh.setCurrentTime(1)
            woosh.setPlaybackRate(2.2)
            woosh.play();

            let bgm = musicSB.get("bg_music")
            bgm.setLoop(true)
            bgm.setCurrentTime(2.2)
            bgm.play()
        }
        teamManager.start();
        beachBall.setStatic(false)
        teamManager.serveBall()
        leftwall.collidable = true;
        mainGame.blackFadeAlpha = 0;
        mainGame.showingOpeningCutScene = false;
        world.removeBody(playerEnteredTrigger)
        // place(gameCam, ORIGIN)
        gameCam.callback = () => {
            gameCam.x = approach(gameCam.x, 0, 6, Caldro.time.deltatime).value
            gameCam.y = approach(gameCam.y, 0, 6, Caldro.time.deltatime).value
        }
        setTimeout(() => {
            gameCam.callback = NULLFUNCTION
        }, 1000);
    }
}