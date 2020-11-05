const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const createWindow = (number) => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        },
    });
    
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `index-${number}.html`),
            protocol: "file:",
            slashes: true,
        })
    );

    win.webContents.openDevTools();

    return win;
}

const onAppReady = () => {
    const win1 = createWindow(1);
    const win2 = createWindow(2);

    ipcMain.on('main', (ipcEvent, event) => {
        switch(event.to) {
            case 'main':
                console.log('main has recieved', event);
                break;
            case 'win1':
                win1.webContents.send('channel-1', event);
                break;
            case 'win2':
                win2.webContents.send('channel-2', event);
                break;
        }
    });
};

app.on("ready", onAppReady);
app.allowRendererProcessReuse = true;