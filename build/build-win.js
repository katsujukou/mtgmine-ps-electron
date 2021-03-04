const builder = require('electron-builder')

builder.build({
    config: {
        appId: 'katsujukou.mtgmine',
        win: {
            target: {
                target: 'zip',
                arch: ['x64', 'ia32']
            }
        }
    }
})