
function winningSide() {
    if (teamManager.sessionWinner = 0) return 0;
    return teamManager.sessionWinner == 1 ? 1 : -1;
}

function predictPositionWithVelocity(body, steps){
    return vecMath.add(body.position, vecMath.multiply(body.linearVelocity, steps))
}

SceneManager.startScene(loaderScreen)
// SceneManager.startScene(matchOverScene)


let planep1 = new draggable(c.vw * 40, c.vh * 30, 100, 100);
let planep2 = new draggable(c.vw * 80, c.vh * 70, 100, 100);



// Caldro.time.setMaxFPS(20);
function mainLoop() {
    window.requestAnimationFrame(mainLoop)
    // Caldro.time.update();
    if (!Caldro.time.update()) return;
    GameKeys.updateKeys();
    
    // clear()
    SceneManager.update(Caldro.time.deltatime);
    audioManager.update();
    // rect(0, 0, c.w, c.h, CALDGREEN);
    SceneManager.render();
    // updatePointers();
    // Caldro.renderer.setRenderingCanvas(c)
    let body = window.document.body


    /* 
    let planeW = planep2.x-planep1.x;
    let planeH = planep2.y-planep1.y;
    let planeMidX = planep1.x + planeW/2
    let planeMidY = planep1.y + planeH/2
    
    
    
    alpha(0.2)
    rect(planep1.x, planep1.y, planeW, planeH, "white")
    alpha(1)
    stRect(planeMidX, planeMidY, planeW, planeH, stylizedColors["outlines"], 4)
    
    planep1.update();
    planep2.update();
    CaldroSSM.draw("planeButton1", planep1.x, planep1.y, planep1.width, planep1.height, true, -45)
    CaldroSSM.draw("planeButton2", planep2.x, planep2.y, planep2.width, planep2.height, true, )
    // planep2.render();
    // planep1.render();
    //*/

    // cordShow(pointer, "white")
    
}




mainLoop();