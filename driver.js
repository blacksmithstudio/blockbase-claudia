const Api = require('claudia-api-builder')
const api = new Api()

/**
 * Blockbase Claudia JS driver (app.drivers.claudia)
 * @namespace app.drivers.claudia
 * @memberof app.drivers
 * @author Alexandre Pereira <code@blacksmith.studio>
 * @param {Object} app - Application namespace
 *
 * @returns {Object} driver object containing the api object
 */
module.exports = (app) => {

    if (!app.config.has('claudia'))
        return app.drivers.logger.error('Claudia', 'Cannot init the driver, missing config')

    const config = app.config.get('claudia')

    /**
     * Initialize the routes
     * @memberof app.drivers.claudia
     * @todo add the express builder for twig
     */
    function route() {
        for (let route of config.routes) {
            if (route.type === 'view')
                api[route.method](route.src, () => {
                    // todo : return twig built
                    return `should render : ${app.root}/views/${route.dest}.twig`
                }, route.extra)

            if (route.type === 'controller') {
                let path   = route.dest.split('::')[0],
                    method = route.dest.split('::')[1]

                let controller = require(`${app.root}/controllers/${path.replace('.', '/')}`)(app, api)

                api[route.method](route.src, controller[method], route.extra)
            }
        }
    }

    // auto-routing at launch from claudia.routes in config/{env}.yml and listen
    route()

    return {api}
}
