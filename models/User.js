import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    isadmin:{type:Boolean, required:true, default:false},
    password:{type:String, required:true},
},
{
    timestamps:true,
});

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;