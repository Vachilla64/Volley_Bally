let GameKeys = new keyStateHandler();
Caldro.setKeyStateHandler(GameKeys)
Caldro.time.setSafetyDeltatimeCapAtFPS(10)
let cam = new camera();
let gameCam = new camera();
let devCam = new camera();
devCam.enablePersistence("bbgDevCamInfo")

let currentCam = gameCam;

var sfxSB = new WAAPIAudioManager();
// sfxSB.setMasterVolume(0)
var musicSB = new DOMaudioManager();

var inPs = new particleSystem();
var outPs = new particleSystem();
var colors = new Array();
var outlineColors = new Array();
var info = new infoBox("Trackings", 20, 20, "purple")

var world = new classicPhysicsWorld();
var physics = new classicPhysics();
physics.scale = 20
physics.safeMode = false;


// function pointStartEvent() {
//     loadAudio();
// }

window.onerror = function () {
    mainLoop = NULLFUNCTION
}



function loadAudio() {
    doTask("loadAudio", function () {
        sfxSB.autoLoad = false;
        sfxSB.fileSrcPrefix = "res/audio"
        musicSB.fileSrcPrefix = "res/audio/music"
        
        musicSB.add("anticipation",   "anticipation.mp3");
        musicSB.add("resolution",     "resolution.mp3")
        musicSB.add("bg_music",       "pizz_on_the_beach.mp3", 0.6)
        musicSB.add("end_music",      "pizz_on_the_beach_match_end.mp3", 0.8)
        musicSB.add("mayGM",          "pizz_on_the_beach_mayBurst.mp3", 0.6)
        musicSB.add("kenGM",          "pizz_on_the_beach_susRush.mp3", 0.6)
        musicSB.add("photoPiano",     "EpianoEnd.mp3")
        musicSB.initialize();
        

        sfxSB.add('ballHitGround',    "B.mp3")
        sfxSB.add("E",                "E.mp3")
        sfxSB.add("jump1",            "jump.wav", 0.4)
        sfxSB.add("jump2",            "Jump12.wav", 0.8)
        sfxSB.add("woosh",            "woosh.mp3")
        sfxSB.add("throw1",           "throw1.mp3")
        sfxSB.add("throw2",           "throw2.mp3")
        sfxSB.add("pop",              "pop.mp3")
        sfxSB.add("poup",             "poup.mp3")
        sfxSB.add("ballShiny",        "godBall.mp3")
        sfxSB.add("epglotHit",        "bfxr/softPunch2.wav", 0.6)
        sfxSB.add("softD",            "bfxr/softAttackDash.wav")
        sfxSB.add("roughD",           "bfxr/roughAttackDash.wav")
        sfxSB.add("whistle_sh",       "whistle(short).mp3")
        sfxSB.add("whistle_lg",       "whistle(long).mp3")
        sfxSB.add("boop",             "C.mp3", 0.1)
        sfxSB.add("harsh",            "harshDamage.wav")
        sfxSB.add("boof",             "bomb.mp3")
        sfxSB.add("fallingWhistle",   "fallingBasson.mp3")
        sfxSB.add("sandStep1",        "sandStep1.mp3", 0.2)
        sfxSB.add("sandStep2",        "sandStep2.mp3", 0.2)
        sfxSB.add("sandThud",         "sandThud.mp3", 0.2)
        sfxSB.add("snowStep1",        "snow1.mp3", 0.5)
        sfxSB.add("snowStep2",        "snow2.mp3", 0.5)
        sfxSB.add("snowThud",         'snowHit.mp3', 1)
        sfxSB.add("darkStep1",        "darkStep1.mp3", 0.5)
        sfxSB.add("darkStep2",        "darkStep2.mp3", 0.5)
        sfxSB.add("darkThud",         "darkStep2.mp3", 0.5)
        // sfxSB.add("darkThud",      "darkThud.mp3", 0.5)
        sfxSB.add("cloudStep1",       "snow1.mp3", 0.5)
        sfxSB.add("cloudStep2",       "snow2.mp3", 0.5)
        sfxSB.add("cloudThud",        "snowHit.mp3", 1)
        // sfxSB.add("trailer_music", "OOTB_stripped.mp3")

        // beachBall sounds
        sfxSB.add("hit_air1",         "sfx/BeachBall/plain_hit_airy.wav", 0.4)
        sfxSB.add("hit1",             "sfx/BeachBall/plain_hit1.wav", 0.4)
        sfxSB.add("hit2",             "sfx/BeachBall/plain_hit2.wav", 0.4)
        sfxSB.add("hit_thick1",       "sfx/BeachBall/plain_hit_thick1.wav", 0.4)
        sfxSB.add("hit_hard1",        "sfx/BeachBall/plain_hit_hard1.wav", 0.4)
        sfxSB.add("hit_hard2",        "sfx/BeachBall/plain_hit_hard2.wav", 0.4)
        sfxSB.add("hit_soft1",        "sfx/BeachBall/plain_hit_soft1.wav", 0.4)
        sfxSB.add("hit_impactAir",    "sfx/BeachBall/plain_hit_impactAir.wav", 0.4)
        sfxSB.add("ballcome",         "sfx/BeachBall/ballcome.mp3")
        sfxSB.add("ballgo",           "sfx/BeachBall/ballgo.mp3")

        // effects
        sfxSB.add("cam1",           "sfx/other/camera1.wav")

        // UI
        sfxSB.add("uiWhip", "sfx/UI/whipy.wav")
        sfxSB.fileSrcPrefix = "res/audio/sfx/UI/SFX"
        sfxSB.add("uiAccept1", "accept_1.wav")
        sfxSB.add("uiAccept2", "accept_2.wav")
        sfxSB.add("uiBack1", "back_1.wav")
        sfxSB.add("uiClick1", "click_1.wav")
        sfxSB.add("uiClick2", "click_2.wav")
        sfxSB.add("uiClick2R", "click_2_R.wav")
        sfxSB.add("uiClose1", "close_1.wav")
        sfxSB.add("uiError1", "error_1.wav")
        sfxSB.add("uiOpen1", "open_1.wav")
        sfxSB.add("uiPop1", "pop_1.wav")
        sfxSB.add("uiPop2", "pop_2.wav")
        sfxSB.add("uiPop3", "pop_3.wav")
        sfxSB.add("uiPop4", "pop_4.wav")
        sfxSB.add("uiProg1", "prog_1.wav")
        sfxSB.add("uiProg2", "prog_2.wav")
        sfxSB.add("uiProg3", "prog_3.wav")
        sfxSB.add("uiProg4", "prog_4.wav")
        sfxSB.add("uiSwitch1", "switch_1.wav")
        sfxSB.add("uiSwitch1R", "switch_1_R.wav")
        sfxSB.add("uiSwitch2", "switch_2.wav")
        sfxSB.add("uiSwitch2R", "switch_2_R.wav")
        sfxSB.add("wfuhf", "wfuhf.wav")
        sfxSB.add("wooshR", "woosh_R.wav")
        sfxSB.add("wooshST1", "woosh_st_1.wav")
        sfxSB.add("wooshST1R", "woosh_st_1_R.wav")


        sfxSB.initialize(true);
    })
}

function gmAudio(body) {
    if (musicSB.initialized) {
        let bgm = musicSB.get("bg_music");
        let gmMusic = audioManager.getCurrentGM();
        bgm.pause();
        gmMusic.play();
    }
}

const audioManager = {
    godModePlayerName: null,
    masterFilterFrequency: 20000,
    init() {

    },
    getCurrentGM() {
        // return musicSB.get(this.godModePlayerName + "GM");   
        if (teamManager.godModePlayer) {
            return musicSB.get(teamManager.godModePlayer.godModeMusic);
        }
        // return musicSB.get("mayGM");
    },
    update(){
        if(musicSB.initialized){
            musicSB.masterFilterNode.frequency.value = approach(musicSB.masterFilterNode.frequency.value, this.masterFilterFrequency, 2, Caldro.time.deltatime).value
        }
    }
}




// ===================== IMAGES ===========================


function loadImages() {
    // CaldroIH.addImage("beach", "Game_resources/a_new_game/images/beach24.png", 320, 180)
    CaldroIH.addImage("placeMask",     "res/images/placeMask.png", 960, 540)
    CaldroIH.addImage("mainBeach",     "res/images/mainBeach1.png", 960, 540)
    CaldroIH.addImage("beach",         "res/images/beach.png", 960, 540)
    CaldroIH.addImage("overArea1",     "res/images/overArea.png", 960, 540)
    CaldroIH.addImage("overArea2",     "res/images/overArea2.png", 960, 540)
    CaldroIH.addImage("oceanBeach",    "res/images/beach24.png", 960, 540)
    CaldroIH.addImage("snowBeach",     "res/images/snowBeach.png", 960, 540)
    CaldroIH.addImage("kenBeach",      "res/images/kenBeach.png", 960, 540)
    CaldroIH.addImage("clareBeach",    "res/images/cloudBeach.png", 960, 540)
    CaldroIH.addImage("gustavoBeach",  "res/images/nacholand.png", 960, 540)

    CaldroSSM.initialize("res/images/beach_spritesheet.png", 640, 448)

    CaldroSSM.cutSubImage("beachball", 0, 0, 64, 64)
    CaldroSSM.cutSubImage("net", 64, 0, 32, 64)
    CaldroSSM.cutSubImage("tripodCamera", 96, 8, 32, 56)
    CaldroSSM.cutSubImage("scoreBoard", 64, 128, 64, 64)

    CaldroSSM.cutSubImage("may", 128, 0, 64, 64)
    CaldroSSM.cutSubImage("mayJump", 128, 64, 64, 64)
    CaldroSSM.cutSubImage("maySmug", 128, 128, 64, 64)
    CaldroSSM.cutSubImage("maywhut", 128, 192, 64, 64)
    CaldroSSM.cutSubImage("mayoops", 128, 256, 64, 64)

    CaldroSSM.cutSubImage("gustavo", 192, 0, 64, 64)
    CaldroSSM.cutSubImage("gustavoJump", 192, 64, 64, 64)
    CaldroSSM.cutSubImage("gustavoSmug", 192, 128, 64, 64)
    CaldroSSM.cutSubImage("gustavowhut", 192, 192, 64, 64)
    CaldroSSM.cutSubImage("gustavooops", 192, 256, 64, 64)

    CaldroSSM.cutSubImage("ken", 256, 0, 64, 64)
    CaldroSSM.cutSubImage("kenJump", 256, 64, 64, 64)
    CaldroSSM.cutSubImage("kenSmug", 256, 128, 64, 64)
    CaldroSSM.cutSubImage("kenwhut", 256, 192, 64, 64)
    CaldroSSM.cutSubImage("kenoops", 256, 256, 64, 64)

    CaldroSSM.cutSubImage("clare", 320, 0, 64, 64)
    CaldroSSM.cutSubImage("clareJump", 320, 64, 64, 64)
    CaldroSSM.cutSubImage("clareSmug", 320, 128, 64, 64)
    CaldroSSM.cutSubImage("clarewhut", 320, 192, 64, 64)
    CaldroSSM.cutSubImage("clareoops", 320, 256, 64, 64)

    CaldroSSM.cutSubImage("abby", 448, 0, 64, 64)
    CaldroSSM.cutSubImage("abbyJump", 448, 64, 64, 64)
    CaldroSSM.cutSubImage("abbySmug", 448, 128, 64, 64)
    CaldroSSM.cutSubImage("abbywhut", 448, 192, 64, 64)
    CaldroSSM.cutSubImage("abbyoops", 448, 256, 64, 64)

    CaldroSSM.cutSubImage("emilo", 384, 0, 64, 64)
    CaldroSSM.cutSubImage("emiloJump", 384, 64, 64, 64)
    CaldroSSM.cutSubImage("emiloSmug", 384, 128, 64, 64)
    CaldroSSM.cutSubImage("emilowhut", 384, 192, 64, 64)
    CaldroSSM.cutSubImage("emilooops", 384, 256, 64, 64)

    CaldroSSM.cutSubImage("shadow", 0, 192, 64, 32)
    CaldroSSM.cutSubImage("cloudAnvil", 0, 224, 48, 32)
    CaldroSSM.cutSubImage('sand1', 0, 64, 16, 16)
    CaldroSSM.cutSubImage('sand2', 0, 80, 16, 16)
    CaldroSSM.cutSubImage('snow1', 0, 96, 16, 16)
    CaldroSSM.cutSubImage('snow2', 0, 112, 16, 16)
    CaldroSSM.cutSubImage("outWhiespray", 16, 96, 16, 16)
    CaldroSSM.cutSubImage('cloud1', 64, 64, 64, 32)
    CaldroSSM.cutSubImage('cloud2', 64, 96, 64, 32)

    CaldroSSM.cutSubImage("maySpray", 64, 192, 16, 16)
    CaldroSSM.cutSubImage("gustavoSpray", 64, 208, 16, 16)
    CaldroSSM.cutSubImage("kenSpray", 64, 224, 16, 16)
    CaldroSSM.cutSubImage("clareSpray", 64, 240, 16, 16)
    CaldroSSM.cutSubImage("darkPurpleSpray", 80, 192, 16, 16)
    CaldroSSM.cutSubImage("abbySpray", 80, 208, 16, 16)
    CaldroSSM.cutSubImage("snowflake1", 96, 192, 16, 16)
    CaldroSSM.cutSubImage("snowflake2", 96, 208, 16, 16)

    CaldroSSM.cutSubImage("lineW", 32, 64, 32, 32)
    CaldroSSM.cutSubImage("lineWO", 32, 96, 32, 32)

    CaldroSSM.cutSubImage("sweat", 0, 128, 32, 32)
    CaldroSSM.cutSubImage("angerVein", 32, 128, 32, 32)
    CaldroSSM.cutSubImage("loading", 0, 160, 32, 32)

    CaldroSSM.cutSubImage("nachoes", 64, 256, 32, 32)
    CaldroSSM.cutSubImage("epglot", 96, 256, 32, 32)
    CaldroSSM.cutSubImage("download", 64, 288, 32, 32)
    CaldroSSM.cutSubImage("brownHeart", 96, 288, 32, 32)

    CaldroSSM.cutSubImage("blueArrow", 64, 320, 32, 32)
    CaldroSSM.cutSubImage("planeButton1", 64, 352, 32, 32)
    CaldroSSM.cutSubImage("planeButton2", 96, 352, 32, 32)
    CaldroSSM.cutSubImage("pinkArrow", 96, 320, 32, 32)

    CaldroSSM.cutSubImage("waterCloth", 128, 320, 64, 64)
    CaldroSSM.cutSubImage("woolCloth", 192, 320, 64, 64)


    CaldroSSM.cutSubImage("camera", 256, 320, 64, 64)
    CaldroSSM.cutSubImage("clock", 320, 320, 64, 64)
    CaldroSSM.cutSubImage("timeboard", 0, 256, 64, 32)
    CaldroSSM.cutSubImage("crown", 0, 288, 64, 32)
    CaldroSSM.cutSubImage("kenfloor", 64, 384, 128, 16)
}
loadImages()

let aspectRatio = [16, 9]
let originalCanvas = c
let preRenderingCanvas = document.createElement("canvas")
let prc = preRenderingCanvas;
let pc = preRenderingCanvas.getContext("2d")
pc.lineCap = pc.lineJoin = "round"
// preRenderingCanvas.style.zIndex = "19"
// document.body.appendChild(preRenderingCanvas)

let sfxCanvas = document.createElement("canvas")
let sfxContext = sfxCanvas.getContext("2d")

var stylizedColors = new Array();
stylizedColors["yellow"] = "#cddb8d"
stylizedColors["outlines"] = "#0f141e"
stylizedColors["ablue"] = "#72bfd2"
stylizedColors["deepblue"] = "#436999"
stylizedColors["sand"] = "#cddb8a"
stylizedColors["softOrange"] = "#dc8942"
stylizedColors["lighOrange"] = "#eac06e"
stylizedColors["goodGreen"] = "#73aa44"

cam.setCanvas(preRenderingCanvas)

preRenderingCanvas.width = 800;
preRenderingCanvas.height = 450;
let pw = preRenderingCanvas.width
let ph = preRenderingCanvas.height
let pmin = ph;
let pmax = pw;

adjustCanvas(sfxCanvas, pw, ph)
adjustCanvas();
window.onresize = () => {
    if (Caldro.rendering.canvas = c) {
        if (!SceneManager) return;
        SceneManager.resizeScreen = true
    }
}
/* 
Caldro.renderer.shouldHideCursor(true)
GameKeys.addKey(-1, "o", function(){
    Caldro.renderer.shouldHideCursor(!Caldro.renderer.hidingCursor)
}) */