world.setGravity(new Lvector2D(0, (9.81 * 50)))


function drawBodyShadowOnGround(body, shahowMaxHeight = 100) {
    let shadHeight = shahowMaxHeight;
    let groundAABB = ground.getAABB();
    let playerAABB = body.getAABB();
    let shadValue = clip((shadHeight - Math.abs(groundAABB.min.y - playerAABB.max.y)) / shadHeight, 0.4, 1)
    alpha(0.5 * shadValue)
    if (body.shapeType == classicPhysicsWorld.shapeType.circle) {
        CaldroSSM.draw("shadow", body.position.x, groundAABB.min.y, body.radius * 2 * shadValue, body.radius * shadValue, true)
    } else if (body.shapeType == classicPhysicsWorld.shapeType.box) {
        CaldroSSM.draw("shadow", body.position.x, groundAABB.min.y, body.scaleX * shadValue, (body.scaleX / 2) * shadValue, true)
    } else if (body.shapeType == classicPhysicsWorld.shapeType.circle) {
        CaldroSSM.draw("shadow", body.position.x, groundAABB.min.y, body.scaleX * 2 * shadValue, (body.scaleX / 4) * shadValue, true)
    }
    alpha(1)
}


class Place {
    constructor(name, bgImage, fgImage, groundParticles, weather, bgMusic, groundSouds) {
        this.name = name;
        this.backgroundImage = bgImage;
        this.foregroundImage = fgImage;
        this.groundParticles = groundParticles;
        this.weather = weather;
        this.bgMusic = bgMusic
        this.groundWalkingSound = groundSouds;
        teamManager.allLocations.push(this)
    }
    onEnter() { };
    whileHere() { };
    onLeave() { };
}


let beach = new Place("Beach", "beach", null, "sand2", "clouds", "bg_music", [["sandStep1", "sandStep2"], "sandThud"])
let oceanBeach = new Place("OceanBeach", "oceanBeach", null, "sand2", "clouds", "bg_music", [["sandStep1", "sandStep2"], "snowThud"])
let snowBeach = new Place("SnowBeach", "snowBeach", null, "snow1", "snow", "bg_music", [["snowStep1", "snowStep2"], "snowThud"])
let clouds = new Place("Clouds", "clareBeach", null, "cloud1", null, "bg_music", [["cloudStep1", "cloudStep2"], "cloudThud"])
let epoglis = new Place("Epoglis", "kenBeach", null, "darkPurpleSpray", "epglot", "bg_music", [["darkStep1", "darkStep2"], "darkThud"])

{
    let sandCas1 = physics.createBoxBody(new Lvector2D(920, 0), 160, 120, 0.1, 1, true)
    let sandCas2 = physics.createBoxBody(new Lvector2D(1040, 30), 50, 80, 0.1, 1, true)
    let sandCas3 = physics.createBoxBody(new Lvector2D(810, 30), 50, 80, 0.1, 1, true)
    oceanBeach.onEnter = () => {
        world.addBody(sandCas1)
        world.addBody(sandCas2)
        world.addBody(sandCas3)
    }
    oceanBeach.onLeave = () => {
        world.removeBody(sandCas1)
        world.removeBody(sandCas2)
        world.removeBody(sandCas3)
    }

    let snowmanBody1 = physics.createBoxBody(new Lvector2D(910, 10), 50, 120, 1, 1, true)
    // snowmanBody1.forceRestitution(true)
    let snowmanBody2 = physics.createCircleBody(new Lvector2D(910, 50), 50, 0.1, 1, true)
    let snowmanBody3 = physics.createBoxBody(new Lvector2D(910, -25), 80, 10, 0.1, 1, true)
    snowBeach.onEnter = () => {
        world.addBody(snowmanBody1)
        world.addBody(snowmanBody2)
        world.addBody(snowmanBody3)
    }
    snowBeach.onLeave = () => {
        world.removeBody(snowmanBody1)
        world.removeBody(snowmanBody2)
        world.removeBody(snowmanBody3)
    }
}