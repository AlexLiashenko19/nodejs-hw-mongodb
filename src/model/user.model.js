import { Schema, model } from "mongoose";
import { ROLES } from "../constants/index.js";

const userSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: ROLES.USER
    }
}, { timestamps: true, versionKey: false });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const USER = model('USER', userSchema);
export default USER;
