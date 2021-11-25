function preload() {
    doodleNAT=ml5.imageClassifier('DoodleNet');
}
function setup() {
    canavas=createCanvas(280,280);
    canavas.center();
    canavas.background("white");
    speechSynth=window.speechSynthesis;
    canavas.mouseReleased(classifyCanvas);
}
function draw() {
    strokeWeight(10);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifyCanvas() {
    doodleNAT.classify(canavas,gotResult);
}
function clearCanvas() {
    canavas.background("white");
}
function gotResult(error,result) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("label").innerHTML=result[0].label;
        document.getElementById("confidence").innerHTML=(result[0].confidence*100).toFixed(2)+"%";
        synthData=new SpeechSynthesisUtterance(result[0].label);
        speechSynth.speak(synthData);
    }
}
