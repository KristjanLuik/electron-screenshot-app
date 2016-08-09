const electron = require('electron');
const {app, BrowserWindow} = electron;
const ipcMain = require('electron').ipcMain;
const {dialog} = require('electron');
var fs = require("fs");
var mainWindow;


app.on('ready', () => {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    let mainheight = (height/55);
    let mainwidth = (width/8);
    console.log(`mainwidth> ${mainwidth}  mainheight> ${mainheight}`);
    //let win =  new BrowserWindow({width:mainheight, height: mainheight, center: true, frame: false, title: "Screen S#ot",});
    let win =  new BrowserWindow({width:mainwidth, height:mainwidth, center: true, frame: false, title: "Screen S#ot",});
    win.loadURL(`file://${__dirname}/index.html`);
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
    // Close the drawing window and open main window again.
    mainWindow.getChildWindows()[0].close();
    mainWindow.show();
});

exports.takeScreenShot = () => {
    mainWindow.hide();
    let win = new BrowserWindow({parent: mainWindow,width: 200, height: 200, fullscreen: true, skipTaskbar: true, frame: false, transparent: true});
    win.loadURL(`file://${__dirname}/app/shot/shot.html`);
};