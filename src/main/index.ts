import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    console.log('window.open intercepted:', details.url); // 添加调试信息
    // 根据 URL 进行不同的处理
    if (details.url.startsWith('http://localhost:5173')) {
      // 在内部窗口中打开 URL
      const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      newWindow.loadURL(details.url);
      return { action: 'deny' };
    } else {
      // 在外部浏览器中打开 URL
      shell.openExternal(details.url);
      return { action: 'deny' };
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

//当一个新的 webContents 被创建时触发。
app.on('web-contents-created', (event, webContents) => {
  webContents.setWindowOpenHandler((details) => {
    if (details.url) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          title: "安信",
          width: 1400,
          minWidth: 1400,
          minHeight: 800,
          height: 800,
          autoHideMenuBar: true,
          icon: icon, // 确保这里的 icon 是正确的路径或资源
          x: 0,
          y: 0,
          resizable: true,
          webPreferences: {
            preload: join(__dirname, 'preload.js'),
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
          },
        }
      };
    }
    return { action: 'deny' };
  });
});