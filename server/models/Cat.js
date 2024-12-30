import mongoose from "mongoose";
const catSchema = new mongoose.Schema({
    name: {type:String,required: true},
    description: String,
    email:{type:String,required:true},
    number: Number,
    likes: Number,
    shares: Number,
    image: {type:String,required:true},
    upvotes: Number,
    downvotes: Number,
}, {timestamps: true}); 

export const Cat = mongoose.model('Cat', catSchema);
