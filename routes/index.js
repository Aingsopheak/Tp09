const experess = require('express');
var router = experess.Router();
const { login } = require('../services/login');
const { register } = require('../services/register');
const userService = require('../services/users');
const { logout } = require('../services/logout');
const registerSchema = require('../schemas/register');


router.get('/user/:id', async function(req, res, next) {
    const { id } = req.params;

    const result = await userService.findById(id);
    res.json(result);
});

router.get('/me',function(req, res, next){
    if(req.session.jwt){
        res.json({
            success: false,
            error: "You are already signed In"
        })
    }
    var decode = jwt.verify(req.session.jwt,'my-jwt-secret');
    console.log(decode)
    res.send(decode);
});


router.post('/logout', async(req, res) => {
    if(req.session.jwt){
        res.json({
            success: false,
            error: "You are already signed In"
        })
    }
    const { email, password } = req.body;
    const user = await login(email, password);

    res.json(result);
});

router.post('/login',joiValidationMiddleware(signinSchema), async(req, res, next) => {
    console.log(req.session);
    const { email, password } = req.body;
    const user = await login(email, password);
    var token = jwt.sign({email},'my-jwt-secret');
    req.session.jwt = token;
    res.json(user);
});

router.post('/register',joiValidationMiddleware(registerSchema), async(req, res, next) => {
    const createdUser = await register(req.body);
    res.json(createdUser);
});

module.exports = router;