'use strict';
const app = require('app');
const BrowserWindow = require("browser-window");
const Menu = require('menu');
var winSize = {width:1170, height:600};
var mainWindow = null;

var log = function(objToLog){
    console.log(objToLog);
};



app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function(){
    log('ready');
    
    mainWindow = new BrowserWindow(winSize);
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function(){
        mainWindow=null;
    });
});


