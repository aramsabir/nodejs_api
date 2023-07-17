var postController = require('../components/posts/postController')
var authController = require('../components/auth/authController')


module.exports = function (app) {

 
    app.post('/login',authController.login)

    app.get('/posts',postController.List)
       .get('/post',postController.One)
       .post('/post',postController.Post)

}
 