const { ipcRenderer } = require('electron');

window.safeIpc = {};

window.safeIpc.send = (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
};

window.safeIpc.on = (channel, ...args) => {
    ipcRenderer.on(channel, ...args);
};