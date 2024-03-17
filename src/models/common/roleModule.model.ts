
import mongoose, { Schema, Document } from 'mongoose';

// Define the schema for the role document
interface IRole extends Document {
  role_id: string;
  value: string;
  modules: string[];
}
const RoleSchema: Schema = new Schema({
    role_id: { type: String, required: true },
    value: { type: [String], required: true },
    modules: { type: [String], required: true }
  });
  
  // Create the mongoose model for the role document
  const RoleModel = mongoose.model<IRole>('rolemodules', RoleSchema);
  
  export default RoleModel;