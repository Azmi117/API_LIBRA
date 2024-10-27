require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (params) => {
    const{username, email, password, role, photo} = params;
    console.log('Register Params:', params);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: 'regUser',
        photo
    });

    if(!user) throw new Error ('Failed to register');

    return user;
 }

const login = async (params) => {
    const {email, password} = params;
    const user = await User.findOne({
        where:{
            email
        }
    });

    if(!user) throw new Error ('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new Error ('Invalid Credentials');

    const photoUrl = user.photo ? `${process.env.BASE_URL}/${user.photo}` : null;

    const token = jwt.sign({
        id:user.id,
        username:user.username,
        role:user.role,
        photo:photoUrl,
    }, process.env.JWT_SECRET, {expiresIn: '1h'}
    );

    return {token};
}

module.exports = {
    register,
    login,
}