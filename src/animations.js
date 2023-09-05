let endSCPicX = new AnimationGraph();
endSCPicX.addAnimationNode(0, 0) 
endSCPicX.addAnimationNode(2.1, 0) 
endSCPicX.addAnimationNode(3, -150) 
endSCPicX.addAnimationNode(100, -150) 

let endSCPicY = new AnimationGraph();
endSCPicY.addAnimationNode(0, 0) 
endSCPicY.addAnimationNode(2.1, 0) 
endSCPicY.addAnimationNode(2.5, 20) 
endSCPicY.addAnimationNode(2.6, 20) 
endSCPicY.addAnimationNode(2.9, -700) 
endSCPicY.addAnimationNode(100, 10) 

let endSCPicA = new AnimationGraph();
endSCPicA.addAnimationNode(0, 5) 
endSCPicA.addAnimationNode(2.1, 5) 
endSCPicA.addAnimationNode(2.7, 5) 
endSCPicA.addAnimationNode(7, 1200) 
endSCPicA.addAnimationNode(100, -7)



let questioningFilterEffectGraph = new AnimationGraph();
questioningFilterEffectGraph.addAnimationNode(0, 1)
questioningFilterEffectGraph.addAnimationNode(0.3, 1)
questioningFilterEffectGraph.addAnimationNode(0.4, 0.1)
questioningFilterEffectGraph.addAnimationNode(0.8, 0.1)
questioningFilterEffectGraph.addAnimationNode(1, 1);