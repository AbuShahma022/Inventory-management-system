import mongoose, { version } from "mongoose";

const DataSchema = mongoose.Schema({
    UserEmail: { type: String, required: true },
    Name : { type: String, required: true, unique: true },
    CreatedDate : { type: Date, default: Date.now()}
},{versionKey: false});

const BrandsModel = mongoose.model("Brands", DataSchema);
export default BrandsModel;