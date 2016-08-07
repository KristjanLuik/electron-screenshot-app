const electron = require('electron');
const {app, BrowserWindow} = electron;
var asi;


app.on('ready', () => {
    let win =  new BrowserWindow({/*width:800, height:600, frame: false, transparent: true*/ center: true});
    win.loadURL(`file://${__dirname}/index.html`);

    //asi = win.webContents;
    asi = win;
    //win.openDevTools();




});

exports.takeScreenShot = () => {
    //console.log(asi);
    //asi.hide();
    let win = new BrowserWindow({width: 200, height: 200, fullscreen: true, skipTaskbar: true, frame: false, transparent: true});
    win.loadURL(`file://${__dirname}/shot.html`);
};