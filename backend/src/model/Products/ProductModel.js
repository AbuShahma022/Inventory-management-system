import mongoose from "mongoose";
const DataSchema = mongoose.Schema({
    UserEmail: { type: String, },
    CategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    BrandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brands" },
    Name: { type: String, required: true, unique: true },
    Unit: { type: String },
    Details: { type: String },
    CreatedDate: { type: Date, default: Date.now() }
},{versionKey: false});
const ProductModel = mongoose.model("products", DataSchema);
export default ProductModel;