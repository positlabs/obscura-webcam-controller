import { app, BrowserWindow } from 'electron'

let mainWindow

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
	})

	mainWindow.loadURL(`file://${__dirname}/index.html`)

	//TODO: based on env var
	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit()
})

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
})

