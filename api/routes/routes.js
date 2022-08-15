var prvivateRoutes = require('./private_routes');
var PublicRoutes = require('./public_routes');


module.exports = function (app) {

    PublicRoutes(app)
    prvivateRoutes(app)

    app.get('/**',(req,res)=>{
        res.json({status:false,message:"Route not found, please call programmer"})
        return 0
    })

}
