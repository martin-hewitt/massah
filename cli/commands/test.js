var glob = require('glob')
  , colours = require('colours')
  , Mocha = require('mocha')
  , helper = require('../../helper')

var run = function(config) {
     var mocha = new Mocha({
        timeout: config.timeout || 60000,
        reporter: 'spec'
    })

    mocha.addFile('./node_modules/massah/index.js')

    mocha.run(function(failures) {
        process.exit(failures || 0)
    })
}

module.exports = function(yargs) {

    var config = null
    try {
        config = require(process.cwd() + '/.massah.js')(yargs)
        console.log('Found a .massah.js config file'.green)
        helper.setOption(config)
    } catch (e) {console.log(e)}

    if (!config) {
        yargs.boolean('headless')
        helper.setOption('headless', yargs.argv.headless)
    }
    return run(config)   
}