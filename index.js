var electron = require('electron');
var path = require('path');
var app = electron.app, BrowserWindow = electron.BrowserWindow, Menu = electron.Menu, ipcMain = electron.ipcMain;
app.on('ready', function () {
    var mainWindow = new BrowserWindow({
        title: '',
        webPreferences: {
            contextIsolation: true,
            nodeIntigration: false
        }
    });
    mainWindow.on('closed', function () { app.quit(); });
    mainWindow.loadFile(path.join(__dirname, 'public/index.html'));
    mainWindow.setFullScreen(true);
    //Menu.setApplicationMenu(null);
});
