const userService = require('../services/userServices');

const getAllUser = async (req, res, next) => {
    try{
        const { limit, page } = req.query;

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const params = {
            limit: parseInt(limit) || 10,
            offset: (parseInt(page) - 1) * (parseInt(limit) || 10) || 0,
            baseUrl
        };

        const user = await userService.getAllUser(params);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try{
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const user = await userService.getUserById(req.user.id, baseUrl);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const getOneUser = async (req, res, next) => {
    try{
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const user = await userService.getOneUser(req.params.id, baseUrl);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try{
        let photo = req.file ? req.file.path : null;

        if (photo) {
            photo = photo.replace(/\\/g, '/');
        }

        const user = await userService.updateUser({
            id:req.params.id,
            photo:photo,
            ...req.body
        });

        user.photo = `${req.protocol}://${req.get('host')}/${user.photo}`;

        res.status(200).json(user);

    }catch(error){
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
}

module.exports = {
    getAllUser,
    getUserById,
    getOneUser,
    updateUser,
    deleteUser
}