# Requires
docpad = require('docpad')
path = require('path')
fs = require('fs')
inspect = require('util').inspect
mkdirp = require('mkdirp').sync

# Config
config =
    outNoLayoutsPath: path.join(__dirname, 'dist/page')

# Create required directories
mkdirp(config.outNoLayoutsPath + '/static')

# Create DocPad, and wait for it to load
docpadInstance = docpad.createInstance config, (err) ->
    # Prepare
    throw err  if err
    logger = docpadInstance.logger

    # Generate the website
    docpadInstance.action 'generate', (err) ->
        # Check
        throw err  if err

        # Save all the documents somewhere without their layouts
        docpadInstance.documents.forEach (document) ->
            # Prepare
            contentRenderedWithoutLayouts = document.get('contentRenderedWithoutLayouts')
            outNoLayoutsPath = path.join(config.outNoLayoutsPath, document.get('relativePath')).replace(/\.eco$/, '')

            # Save the file
            result = fs.writeFileSync(outNoLayoutsPath, contentRenderedWithoutLayouts)
            if result instanceof Error
                throw result

        # Done
        logger.log 'info', 'Export OK.'