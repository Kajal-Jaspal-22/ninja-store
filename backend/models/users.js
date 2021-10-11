import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, maxLength: 20, minLength: 4, required: true},
    email: {type: String,  maxLength: 64, minLength: 6, required: true, unique: true},
    password: {type: String, minLength: 6, required: true},
    address: {type: String, maxLength:120, minLength:10, required: true}
});


const user = new mongoose.model("user", userSchema);

export default user;


