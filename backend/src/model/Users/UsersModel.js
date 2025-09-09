import mongoose from 'mongoose';
const dataSchema = mongoose.Schema({
    email : {type : String, required : true, unique : true},
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    mobile : {type : String, required : true},
    password : {type : String, required : true},
    photo : {type : String},
    createdDate : {type : Date, default : Date.now()}

},{versionKey : false});
const UsersModel = mongoose.model("users", dataSchema);
export default UsersModel;