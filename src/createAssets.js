let shine = new colorObject(200, 250, 100, 1)
let mayPink = new colorObject(226, 131, 162, 1)
let gustavoYellow = new colorObject(222, 158, 65, 1)
let kenGrey = new colorObject(86, 114, 117, 1)
let clareWhite = new colorObject(255, 255, 255, 1)
let emiloGreen = new colorObject(24, 63, 41, 1)
let abbyBrown = new colorObject(191, 148, 114, 1)
let white = new colorObject(255, 255, 255, 1)
let gold = new colorObject("gold")
let brown = new colorObject("brown")
let orange = new colorObject("orange")
let yellow = new colorObject("yellow")
let lime = new colorObject(0, 255, 0)
let outlines = new colorObject(stylizedColors["outlines"])

function createShine(color, shineName){
    clear()
    for (let x = 0; x < c.width; ++x) {
        for (let y = 0; y < c.height; ++y) {
            let distance = dist2D(new Point2D(x, y), c.center)
            let transparency = scaleTo(distance, 0, c.hw, 1, 0)
            color.a = transparency
            rect(x, y, 1, 1, colorObjectToString(color))
        }
    }
    color.a = 1
    CaldroCIM.addDrawing(c, shineName, 0, 0, c.w, c.h, true)
}

adjustCanvas(c, 64, 64);

createShine(shine, "shine")
createShine(gold, "goldShine")
createShine(outlines, "outlinesShine")
createShine(gustavoYellow, "gustavoShine")
createShine(mayPink, "mayShine")
createShine(clareWhite, "clareShine")
createShine(kenGrey, "kenShine")
createShine(shine, "emiloShine")
createShine(abbyBrown, "abbyShine")
createShine(brown, "brownShine")
createShine(lime, "limeShine")
createShine(orange, "orangeShine")
createShine(yellow, "yellowShine")

clear();
adjustCanvas(c)