/**
 * Blockbase test file
 * @author Blacksmith <code@blacksmith.studio>
 */
const should = require('should')
process.env['NODE_CONFIG_DIR'] = __dirname + '/config'

const blockbase = require('blockbase')

const app = blockbase({root: __dirname})
let api = app.drivers.claudia.api;

describe('Claudia driver tests', function () {
    describe('Initialization', function () {
        it('should initialize the app', function () {
            should.exist(app)
        })
    })

    describe('Architecture', function () {
        it('should have drivers', function () {
            should.exist(application.drivers)
            should.exist(application.drivers.claudia)
        })

        it('should have controllers', function () {
            should.exist(application.controllers)
            should.exist(application.controllers.foo)
        })
    })

    describe('API', function () {
        it('should have the api', function () {
            should.exist(api)
        })

        it('should have a valid api object', function () {
            should.exist(api.proxyRouter)
        })
    })
})
