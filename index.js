const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
    });
    
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    win.webContents.openDevTools();

    return win;
}

const onAppReady = () => {
    const win = createWindow();

    ipcMain.on('channel', (ipcEvent, event) => {
        win.webContents.send('channel', { mainRecieved: event });
    });
};

app.on("ready", onAppReady);
app.allowRendererProcessReuse = true;