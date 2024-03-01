import mongoose from "mongoose";

const { Schema } = mongoose;

const employerSchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  industry: String,
  employees: {
    type: Number,
    default: 0,
  },
  gst:String,
  pan: String,
  otherDocType: {
    type: Map,
    of: String,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  website: String,
  logo: String,
  is_premium:{
    type:Boolean,
    default:false
},
});

// Create the Employer model
const Employer = mongoose.model('Employer', employerSchema);

export default Employer;