const { User } = require('../models');

const getAllUser = async (params) => {

    const {limit, offset, baseUrl} = params;

    const queryOptions = {
        limit: limit || 10,
        offset: offset || 0
    };

    const users = await User.findAndCountAll({
        where:{
            role: "regUser"
        }
    }, queryOptions);

    if(!users) throw new Error ('No user exist');

    const updatedUsers = users.rows.map(user => {
        if (user.photo) {
            user.photo = `${baseUrl}/${user.photo}`;
        }
        return user;
    });

    return {
        totalUser: users.count,
        users: updatedUsers,
        totalPages: Math.ceil(users.count / (limit || 10)),
        currentPages: Math.floor((offset || 0) / (limit || 10)) + 1
    };
}

const getUserById = async (params, baseUrl) => {
    const id = params;
    const user = await User.findOne({
        where:{
            id
        }
    });

    if(!user) throw new Error ('User not found');

    if (user.photo) {
        user.photo = `${baseUrl}/${user.photo}`;
    }

    return user;
}

const getOneUser = async (params, baseUrl) => {
    const id = params;
    const user = await User.findOne({
        where:{
            id
        }
    });

    if(!user) throw new Error ('User not found');

    if (user.photo) {
        user.photo = `${baseUrl}/${user.photo}`;
    }

    return user;
}

const updateUser = async (params) => {
    const{id, username, email, photo} = params;
    const update = await User.update(
        {username, email, photo},
        {
            where: {
                id
            }
        }
    );

    if(!update) throw new Error ('User not found');

    const user = await User.findOne({
        where:{
            id
        }
    });

    return user;
}

const deleteUser = async (params) => {
    const id = params;
    const delet = await User.destroy({
        where:{
            id
        }
    });

    if(!delet) throw new Error ('User not found');

    return{ message: 'Delete success' };
}

module.exports = {
    getAllUser,
    getUserById,
    getOneUser,
    updateUser,
    deleteUser
}