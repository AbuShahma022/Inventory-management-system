import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    UserEmail : { type: String, required: true },
    TypeId : {type : mongoose.Schema.Types.ObjectId, ref: 'ExpenceType' },
    Amount : { type: Number, required: true },
    Note : { type: String },
    CreatedDate : { type: Date, default: Date.now ()}

},{versionKey: false});
const ExpenseModel = mongoose.model("Expense", DataSchema);
export default ExpenseModel;