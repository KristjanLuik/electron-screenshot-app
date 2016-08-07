// In the renderer process.
const {desktopCapturer} = require('electron');
const remote = require('electron').remote;
const main = remote.require('./main.js');

var button = document.createElement('button');
button.textContent = 'Take that shot';
button.addEventListener('click', function () {
    main.takeScreenShot();
}, false);
document.body.appendChild(button);