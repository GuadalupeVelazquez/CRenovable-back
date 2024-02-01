const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true, required: true },
    country: String,
    city: String,
    street: String,
    telephone: String,
    password: String,
    image: String,
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;