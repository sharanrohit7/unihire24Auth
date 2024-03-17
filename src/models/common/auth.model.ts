import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_verified:  { type: Boolean, default: false },
    is_active:   { type: Boolean, default: true },
    is_delete:{type: Boolean, default: false},
    role: { type: Schema.Types.ObjectId, ref: 'role', required: true }
});

const User = mongoose.model('User', userSchema);
export default User