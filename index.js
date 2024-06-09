function _loadScript(url){
    let scriptFile = document.createElement("script");
    scriptFile.src = url;
    scriptFile.defer = true;
    scriptFile.type = "application/javascript"
    document.body.appendChild(scriptFile);
}

function onCaldroLoad(){
    _launchGame()
    // _lauchAudioTests()
}

_loadScript(
    "../Caldro/Setup_Caldro.js",
)
{
    let path_suffix = "../"
    // _loadScript(`${path_suffix}Caldro/Setup_Caldro.js`);
}


function _launchGame(){
    for (let i = 0; i < Game_files.length; ++i) {
        setTimeout(()=>{
            loadScript(dir + Game_files[i])
        }, i*100)
    };
}

function _lauchAudioTests(){
    loadScript("testingAudio.js")
}


let dir = "src/"

let Game_files = [
    "variables.js",
    "setup.js",
    "createAssets.js",
    "utilities.js",
    "objects.js",
    "teamManager.js",
    "character_setup.js",
    "enviroment.js",
    "characters.js",
    // "Charancters/may.js",
    // "Charancters/gustavo.js",
    // "Charancters/clare.js",
    // "Charancters/abby.js",
    // "Charancters/ken.js",
    // "Charancters/emilo.js",
    "Scene.js",
    "SFX.js",
    "animations.js",
    
    "Scenes/mainGame.js",
    "Scenes/tutorialScene.js",
    "Scenes/loaderScreen.js",
    "Scenes/CaldroScene.js",
    "Scenes/mainScreen.js",
    "Scenes/MenuScene.js",
    "Scenes/cardScene.js",
    "Scenes/loadingToMatchScene.js",
    "Scenes/inGamePauseScreen.js",
    "Scenes/trailerScreen.js",
    "Scenes/caldroTitleScreenGrey.js",
    "Scenes/transitions.js",
    "Scenes/lab.js",
    "Scenes/matchOverScene.js",

    "gameLogic.js",
    "controls.js",
]