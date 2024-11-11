import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageScheme : Schema<Message> = new Schema({
        content:{
            type: String,
            required:true
        },
        createdAt:{
            type: Date,
            required: true,
            default: Date.now
        }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified: boolean;
    isAcceptMessage:boolean;
    messages: Message[]
}

const UserSchema : Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique:true
    },
    email:{
        type: String,
        required: [true,"Email is required!"],
        unique: true,
        match:[/.+\@.+\..+/, 'Please use a valid email address']
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode:{
        type: String,
        required:[true, "Verify Code is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required:[true, "Verify code Expiry is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptMessage:{
        type: Boolean,
        default: true
    },
    messages: [MessageScheme]

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel