const Users = require("../models/users");

const register = async(param) => {
    try {
        const { username, firstname, lastname, email, password } = param;

        console.log(param);

        const existed = await Users.findOne({ email });
        if (existed) {
            throw "User is already existed~";
        }

        const newUser = {
            email,
            username,
            firstname,
            lastname,
            password
        }

        const createdUser = await Users.create(newUser);
        return createdUser
    } catch (err) {
        return {
            success: false,
            error: err || 'error'
        }
    }
}

module.exports = {
    register
}