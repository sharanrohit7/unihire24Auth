import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema({
  title: {
    type: String,
    enum: ['admin', 'employer', 'candidate'],
    required: true,
  },

});

const role = mongoose.model('role', roleSchema);
export default role