import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    UserEmail : { type: String, required: true },
    Name : { type: String, required: true, unique: true },
    CreatedDate : { type: Date, default: Date.now()}
},{versionKey: false});
const CategoriesModel = mongoose.model("Categories", DataSchema);
export default CategoriesModel;