import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, maxlength: "20", minlength="4", required= true},
    email: {type: String, maxlength: "64", minlength: "6", required= true},
    password: {type: String, required= true},
    address: {type: String, maxlength="120", minlength="10", required: true}
});

const user = new mongoose.model("user", userSchema);

export default user;