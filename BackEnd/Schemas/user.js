import mongoose from 'mongoose';

const User= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },  
    password:{
        type:String,
        required:true
    },
    Uid:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        enum:['students','staff','faculties'],
    }
});
const userModel = mongoose.model('User',User);
export default userModel;