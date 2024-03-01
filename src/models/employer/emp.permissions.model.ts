import mongoose from "mongoose";

const { Schema } = mongoose;

var employerpermissions = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const employerPermissions = mongoose.model("employerpermissions", employerpermissions);

export default employerPermissions;
