
import mongoose from "mongoose";

const { Schema } = mongoose;

var employerPlansSchema = new Schema({
title: String,
value:  Number,
description:{
    type :[JSON]
}
})
const employerPlans = mongoose.model('employerPlansSchema', employerPlansSchema);

export default employerPlans;