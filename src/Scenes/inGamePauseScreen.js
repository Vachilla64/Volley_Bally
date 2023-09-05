
const inGamePauseScreen = new Scene()
let pauseSceneCam = new camera();
inGamePauseScreen.canvas = document.createElement("canvas")
inGamePauseScreen.canvasContext = inGamePauseScreen.canvas.getContext("2d");
inGamePauseScreen.camera = pauseSceneCam;
inGamePauseScreen.onLoad = () => {
    inGamePauseScreen.oldScene = null
    inGamePauseScreen.cameraTarget = new Point2D(0, 0)
    inGamePauseScreen.targetZoom = 1
    inGamePauseScreen.cameraMoveSpeed = 7
    inGamePauseScreen.oldSceneDrawingZoom = 1
    inGamePauseScreen.glossX = -1000
    inGamePauseScreen.whiteAlpha = 0
}
inGamePauseScreen.update = (deltatime) => {
    zoomAndMove(inGamePauseScreen.camera, inGamePauseScreen.cameraTarget, inGamePauseScreen.targetZoom, inGamePauseScreen.cameraMoveSpeed)
}
inGamePauseScreen.render = () => {
    circle(0, 0, 100, "red")
    let zoom = inGamePauseScreen.oldSceneDrawingZoom
    let width = pw * zoom
    let height = ph * zoom
    let normContext = Caldro.renderer.canvas
    let pcanvas = inGamePauseScreen.canvas
    pcanvas.width = c.w;
    pcanvas.height = c.h

    // Caldro.renderer.setRenderingCanvas(pcanvas)  
    // CaldroCIM.draw(inGamePauseScreen.canvasContext, "lastScreenForIGPSDrawing", 0, 0, pcanvas.width, pcanvas.height, false)
    // Rect(inGamePauseScreen.glossX, -450, width*0.7, height, "white")
    // CaldroCIM.setDrawing(inGamePauseScreen.canvas, "glossedDrawing", 0, 0, pcanvas.width, pcanvas.height);
    // Caldro.renderer.setRenderingCanvas(normContext)

    let x = 0; let y = -450
    let ctx = Caldro.renderer.context;
    curvedRect(0, -450, width + 30, height + 30, "white", 15, 30)
    CaldroCIM.draw(ctx, "lastScreenForIGPSDrawing", 0, -450, width, height, true, 15)
    alpha(0.6)
    Rect(0, -450, width, height, "white", 15)
    alpha(1)
    curvedRect(0, -450, width + 20, height + 20, "white", 0, 10)
    CaldroCIM.draw(ctx, "lastScreenForIGPSDrawing", 0, -450, width, height, true)
    alpha(inGamePauseScreen.whiteAlpha)
    Rect(0, -450, width, height, "white", 0)
    alpha(1)
    ctx.save()
    ctx.beginPath()
    ctx.moveTo((-width / 2) + x, (-height / 2) + y)
    ctx.lineTo((width / 2) + x, (-height / 2) + y)
    ctx.lineTo((width / 2) + x, (height / 2) + y)
    ctx.lineTo((-width / 2) + x, (height / 2) + y)
    ctx.closePath()
    ctx.clip();
    alpha(0.2)
    Rect(inGamePauseScreen.glossX, -450, width * 0.7, height * 3, "white", 15)
    Rect(inGamePauseScreen.glossX, -450, width * 0.3, height * 3, "white", 15)
    alpha(1)
    ctx.restore()
}