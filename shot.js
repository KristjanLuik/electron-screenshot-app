// Electron
const {desktopCapturer} = require('electron');
var vidobjectstream;
desktopCapturer.getSources({types: ['screen']}, (error, sources) => {
    if (error) throw error;
    for (let i = 0; i < sources.length; ++i) {
        console.log(sources[i].name);
        if (sources[i].name === 'Screen 1') {
            navigator.webkitGetUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: sources[i].id,
                        minWidth: 1280,
                        maxWidth: 2280,
                        minHeight: 720,
                        maxHeight: 1220
                    }
                }
            }, handleStream, handleError);
            return
        }
    }
});

function handleStream(stream) {
    var vid = document.createElement('video');
    vid.src = URL.createObjectURL(stream);
    vidobjectstream = vid;
}

function handleError(e) {
    console.log(e);
}


//Canvas
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


var mouse = {
    x: 0,
    y: 0,
    firstclick: {
        x: 0,
        y: 0,
    },
    secondclick: {
        x: 0,
        y: 0,
    }
};



aa = true;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    link = document.getElementById('nupp');
    if (typeof vidobjectstream != 'undefined') {
        //ctx.drawImage(vidobjectstream, mouse.firstclick.x, mouse.firstclick.y,(mouse.secondclick.x - mouse.firstclick.x), (mouse.secondclick.y - mouse.firstclick.y), 0, 0, 300, 200);

        if (mouse.secondclick.x != 0 && mouse.secondclick.y != 0) {

            var canvas2 = document.createElement('canvas');
            var ctx2 = canvas2.getContext("2d");
            canvas2.width = (mouse.secondclick.x - mouse.firstclick.x); //mouse.secondclick.x;//window.innerWidth;//(mouse.secondclick.x - mouse.firstclick.x);
            canvas2.height = (mouse.secondclick.y - mouse.firstclick.y); //mouse.secondclick.y;//window.innerHeight;//(mouse.secondclick.y - mouse.firstclick.y);
            //ctx2.drawImage(vidobjectstream, mouse.firstclick.x, mouse.firstclick.y,(mouse.secondclick.x - mouse.firstclick.x), (mouse.secondclick.y - mouse.firstclick.y), 0, 0, 3000, 2000);
            //ctx2.drawImage(vidobjectstream, 0, 0,1280, 720,0,0,canvas2.width,canvas2.height);
            //ctx2.drawImage(vidobjectstream,mouse.firstclick.x, mouse.firstclick.y,(mouse.secondclick.x - mouse.firstclick.x), (mouse.secondclick.y - mouse.firstclick.y) ,0,0,canvas2.width,canvas2.height);

            ctx2.drawImage(vidobjectstream,mouse.firstclick.x, mouse.firstclick.y,(mouse.secondclick.x - mouse.firstclick.x), (mouse.secondclick.y - mouse.firstclick.y),0,0, (mouse.secondclick.x - mouse.firstclick.x), (mouse.secondclick.y - mouse.firstclick.y));
           // debugger;
          //  link.innerHTML = 'mega nuppp';
           // link.href = canvas2.toDataURL();
            if (aa) {
                var ipcRenderer = require("electron").ipcRenderer;
                ipcRenderer.send('shot',canvas2.toDataURL("image/png"));
                //window.open(canvas2.toDataURL("image/png"));
                aa = false;
            }
           // link.download = 'mingipilt.png';

        }


    }
    ctx.beginPath();
    ctx.fillText(`mouse x: ${mouse.x}       mouse y: ${mouse.y}`,10,50);
    drawrect();
    //ctx.fillRect(0,0,canvas.width, canvas.height, 100);


  requestAnimationFrame(function () {
     animate();
  });
}




animate();


canvas.addEventListener('mousemove', function(evt) {
    getMousePos(canvas, evt);
}, false);

canvas.addEventListener('mousedown',function (evt) {

    if (mouse.firstclick.y == 0 && mouse.firstclick.x == 0) {
     mouse.firstclick.x = evt.x - canvas.offsetLeft;
     mouse.firstclick.y = evt.y - canvas.offsetTop;
    } else if (mouse.secondclick.x == 0 && mouse.secondclick.y == 0){
        mouse.secondclick.x = evt.x - canvas.offsetLeft;
        mouse.secondclick.y = evt.y - canvas.offsetTop;
    }
    if (evt.which == 3) {
        mouse.firstclick.x = 0;
        mouse.firstclick.y = 0;
        mouse.secondclick.x = 0;
        mouse.secondclick.y = 0;
    }
},false);






///////////////////////////////////////
///////////////////////////////////////
//
// H E L P E R    F U N C T I O N S
//
///////////////////////////////////////
///////////////////////////////////////


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = evt.clientX - rect.left;
    mouse.y = evt.clientY - rect.top;
}

function drawrect() {
    if (mouse.firstclick.y != 0 && mouse.firstclick.x != 0){
        if (mouse.secondclick.x != 0 && mouse.secondclick.y != 0) {
            ctx.rect(mouse.firstclick.x,mouse.firstclick.y,(mouse.secondclick.x - mouse.firstclick.x),(mouse.secondclick.y  - mouse.firstclick.y));
            ctx.stroke();
        }else{
            ctx.rect(mouse.firstclick.x,mouse.firstclick.y,(mouse.x - mouse.firstclick.x),(mouse.y - mouse.firstclick.y));
            ctx.stroke();
        }
    }
}