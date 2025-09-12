import e from "express";
import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    UserEmail : { type: String, required: true },
    Name : { type: String, required: true },
    Address : { type: String, required: true },
    Phone : { type: String, required: true ,unique: true},
    email : { type: String, required: true ,unique: true},
    CreatedDate : { type: Date, default: Date.now()}
},{versionKey: false} );
const CustomerModel = mongoose.model("Customer", DataSchema);
export default CustomerModel;