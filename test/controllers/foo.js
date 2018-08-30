module.exports = (app, api) => {
    const Logger = app.drivers.logger 

    return {
        bar(request){
            Logger.success('Demo foo::bar', 'Request successfully received !')

            return new api.ApiResponse({ 
                request,
                success : true, 
                message : 'Yeah !',
            }, {'Content-Type': 'application/json'}, 200)
        }
    }
}