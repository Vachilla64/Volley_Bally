"use strict";

function _launchAudioTests() {
    _loadScript("testingAudio.js");
}

let dir = "src/";

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
    // "Characters/may.js",
    // "Characters/gustavo.js",
    // "Characters/clare.js",
    // "Characters/abby.js",
    // "Characters/ken.js",
    // "Characters/emilio.js",
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
];


function onCaldroLoad() {
    loadScriptFiles(Game_files, dir, () => {
        console.log("Game files loaded");
    });
}


