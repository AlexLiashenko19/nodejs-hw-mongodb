import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    isFavourite: {
        type: Boolean,
        required: false,
    },
    contactType: {
        type: String,
        enum: ["personal", "home"],
        required: false,
    },
}, {
    timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;