// require('./.dce-output/Main').main()

const { app, BrowserWindow } = require('electron')

const isProduction = process.env.NODE_ENV === "production"

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  if (isProduction) {
    win.loadURL(`file://${__dirname}/build/.dist/index.html`)
  }
  else {
    win.loadURL(`http://localhost:${process.env.WDS_PORT}/index.html`)
    win.webContents.openDevTools()
  } 
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})