import mongoose from "mongoose";
// import employerPermissions from "";
import role from "../common/role.model";

const { Schema } = mongoose;

var candidateAuthSchema = new Schema({
  email: {
    type: String,
    // required: true,
  },
  hashPassword: {
    type: String,
    // required: true,
    select: false,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: role,
  },
isEmailVerified:{
    type:Boolean,
    default:false
},
isProfileComplete:{
    type:Boolean,
    default:false
},
is_verified:{
    type:Boolean,
    default:false
},
is_active:{
    type:Boolean,
    default:true
},
is_delete:{
    type:Boolean,
    default:false
},
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
});
const candiAuth = mongoose.model("candiAuth", candidateAuthSchema);

export default candiAuth;
