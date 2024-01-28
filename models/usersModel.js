import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "Please add the user name"],
        },
        email: {
            type: String,
            require: [true, "Please add the user email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            rewuire: [true, "Please add the user password"],
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model("users", userSchema);

export default Users;