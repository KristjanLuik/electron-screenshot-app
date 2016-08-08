const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipcMain = require('electron').ipcMain;
const {dialog} = require('electron');
var fs = require("fs");
var mainWindow;


app.on('ready', () => {
    let win =  new BrowserWindow({/*width:800, height:600, frame: false, transparent: true*/ center: true});
    win.loadURL(`file://${__dirname}/index.html`);

    //asi = win.webContents;
    mainWindow = win;
    //win.openDevTools();

});

ipcMain.on('shot', function (event, arg) {
    arg = arg.replace(/^data:image\/\w+;base64,/, "");
    var path = dialog.showSaveDialog({title:'Where to save you S#ot' ,defaultPath: `${Date.now()}-screenshot.png`});
    if (path) {
        fs.writeFile(path, new Buffer(arg,"base64"), function (er) {
            console.log(er);
        });
    }

    mainWindow.show();
});

exports.takeScreenShot = () => {
    mainWindow.hide();
    let win = new BrowserWindow({width: 200, height: 200, fullscreen: true, skipTaskbar: true, frame: false, transparent: true});
    win.loadURL(`file://${__dirname}/shot.html`);
};