const authService = require('../services/authServices');

const register = async (req, res, next) => {
    try {
        let userData = {
            ...req.body,
            photo: req.file ? req.file.path.replace(/\\/g, '/') : null
        };

        const user = await authService.register(userData);

        if (user.photo) {
            user.photo = `${req.protocol}://${req.get('host')}/${user.photo}`;
        }

        res.status(201).json(user);
        
    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try{
        const {token} = await authService.login(req.body);
        res.json({token});
    }catch(error){
        next();
    }
}

module.exports = {
    register,
    login
}