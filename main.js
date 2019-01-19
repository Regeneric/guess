const electron = require("electron");
const path = require("path");
const url = require("url");

const {app, Menu, BrowserWindow, ipcMain} = electron;

let mainWindow = null;
    const main = {
        width: 640,
        height: 480,
        title: "Guess Game",
        show: false,
        resizable: false
    }; const propMain = {
        dir: __dirname,
        file: "index.html",
    };

app.on("ready", function() {
    mainWindow = new BrowserWindow(main);
    mainWindow = loadWindow(mainWindow, propMain);

    mainWindow.once("ready-to-show", function() {
        mainWindow.show();
    });
    mainWindow.once("close", function() {
        mainWindow = null;
        app.quit();
    });

    Menu.setApplicationMenu(null);
});

function loadWindow(oWindow, oProp) {
    this.oWindow = oWindow;
    this.oWindow.loadURL(url.format({
        pathname: path.join(oProp.dir, oProp.file),
        protocol: "file:",
        slashes: true
    }));
    return this.oWindow;
}


ipcMain.on("guess", function(e, data) {
    const propPass = {
        dir: __dirname,
        file: "pass.html"
    }; const propFail = {
        dir: __dirname,
        file: "fail.html"
    };

    if (data == "pass") mainWindow = loadWindow(mainWindow, propPass);
    else mainWindow = loadWindow(mainWindow, propFail);
});

ipcMain.on("resp", function(e, data) {
    if (data == "yes") mainWindow = loadWindow(mainWindow, propMain);
    else mainWindow.close();
});