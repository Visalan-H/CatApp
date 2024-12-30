import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter an valid email']
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'Password minimum length is 6']
    }
}, { timestamps: true }
)

userSchema.pre('save', async function (next) {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

userSchema.statics.login=async function (email,password) {
    const user=await this.findOne({email});
    if(user){
        const auth=await bcryptjs.compare(password,user.password);
        if(auth) return user
        else throw Error("Incorrect password");
    }
    else throw Error("Incorrect email");
    
}

export const User = mongoose.model('User', userSchema)

