import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: ['customer', 'admin', 'vendor', 'rider'],
        type: String,
        default: 'customer',
    }
},
    { timestamps: true },
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const encryptionPassword = await bcrypt.hash(this.password, 10);
    this.password = encryptionPassword;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;
