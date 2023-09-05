
function zoomAndMove(camera, targetPosition, targetZoom, time, offset) {
    let speed = time
    camera.zoom = approach(camera.zoom, targetZoom, speed, Caldro.time.deltatime).value
    camera.x = approach(camera.x, targetPosition.x, speed, Caldro.time.deltatime).value
    camera.y = approach(camera.y, targetPosition.y, speed, Caldro.time.deltatime).value
    if (offset) {
        camera.actualOffsetX = approach(camera.actualOffsetX, offset.x, speed, Caldro.time.deltatime).value
        camera.actualOffsetY = approach(camera.actualOffsetY, offset.y, speed, Caldro.time.deltatime).value
    }
}


function drawArrow(x, y, length, color, angle, lw) {
    let cc = Caldro.rendering.context
    Caldro.rendering.context.save()
    Caldro.rendering.context.translate(x, y)
    Caldro.rendering.context.rotate(degToRad(angle))
    Caldro.rendering.context.beginPath();
    cc.moveTo(0, -length / 2)
    cc.lineTo(0, length / 2)
    cc.moveTo(0, -length / 2)
    cc.lineTo(-length / 2, 0)
    cc.moveTo(0, -length / 2)
    cc.lineTo(length / 2, 0)
    Caldro.rendering.context.closePath();
    strokeColor(color);
    cc.lineWidth = lw
    Caldro.rendering.context.stroke();
    Caldro.rendering.context.restore()
}

function onSameSide(firstObjectPostiion, secondObjectPosition, midPoint){
    return clip(midPoint.x - firstObjectPostiion.x, -1, 1) == clip(midPoint.x - secondObjectPosition.x, -1, 1)
}

function wrapSelect(array, currentIndex, movement) {
    if (movement < 0) {
        movement = array.length - Math.abs(movement)
    }
    return array[(currentIndex + movement) % array.length]
}


function calculateAspectRatio(width, height, aspectRatio = [1, 1]){
    if(!width && !height) return null;
    if(!width) return height * aspectRatio[0] / aspectRatio[1]
    if(!height) return width * aspectRatio[1] / aspectRatio[0]
}


function drawStarPolygon(x, y, radius, depth, numberOfcurners = 4, angle = 0, angleSpread = 0) {
    let innerRadius = radius * depth
    let iteration = 0
    let length;
    let cc = Caldro.renderer.context
    cc.save();
    cc.translate(x, y);
    cc.rotate(degToRad(angle + 180 / (numberOfcurners * 4)))
    cc.beginPath();
    for (let angle = 0; angle <= 360; angle += 360 / numberOfcurners * 0.25) {
        ++iteration
        length = iteration % 4 > 1 ? radius : innerRadius;
        let sinA;
        let cosA;
        if (length == radius) {
            if (iteration % 4 == 2) {
                sinA = sine(angle - angleSpread);
                cosA = -cosine(angle - angleSpread)
            } else {
                sinA = sine(angle + angleSpread);
                cosA = -cosine(angle + angleSpread)
            }
        } else {
            sinA = sine(angle);
            cosA = -cosine(angle)
        }
        let px1 = sinA * length
        let py1 = cosA * length
        let px2 = sinA * length
        let py2 = cosA * length
        cc.lineTo(px1, py1)
        cc.lineTo(px2, py2)
    }
    cc.closePath();
    // fillColor("black")
    // cc.fill();
    cc.restore();
    cc.clip();
}



function wrapBodies(camBounds) {
    for (let i = 0; i < world.amoountOfBodies(); ++i) {
        let body = world.getBody(i);
        if (body.position.x < camBounds.left) {
            body.moveToXY(camBounds.right, body.position.y)
        } else if (body.position.x > camBounds.right) {
            body.moveToXY(camBounds.left, body.position.y)
        }
        if (body.position.y < camBounds.top) {
            body.moveToXY(body.position.x, camBounds.bottom)
        } else if (body.position.y > camBounds.bottom) {
            body.moveToXY(body.position.x, camBounds.top)
        }
    }
}