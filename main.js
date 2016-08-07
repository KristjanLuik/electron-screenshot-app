const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipcMain = require('electron').ipcMain;
const {dialog} = require('electron');
var fs = require("fs");
var asi;


app.on('ready', () => {
    let win =  new BrowserWindow({/*width:800, height:600, frame: false, transparent: true*/ center: true});
    win.loadURL(`file://${__dirname}/index.html`);

    //asi = win.webContents;
    asi = win;
    //win.openDevTools();

});

ipcMain.on('shot', function (event, arg) {
    arg = arg.replace(/^data:image\/\w+;base64,/, "");
    var path = dialog.showSaveDialog({title:'Where to save you S#ot' ,defaultPath: 'asi.png'});
    fs.writeFile(path, new Buffer(arg,"base64"), function (er) {
        console.log(er);
    });
    asi.show();
});

exports.takeScreenShot = () => {
    //console.log(asi);
    asi.hide();
    let win = new BrowserWindow({width: 200, height: 200, fullscreen: true, skipTaskbar: true, frame: false, transparent: true});
    win.loadURL(`file://${__dirname}/shot.html`);
};