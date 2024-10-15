import mongoose from "mongoose";
import Contact from "../model/contact.model.js";
import { getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const allContacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: allContacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);

      if (contact === null) {
        res.status(404).json({
          message: 'Contact not found',
        });
        return;
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal server error',
      });
      console.error(error.message);
    }
};

export const createContactController = async (req, res) => {
	const contact = req.body;

	if (!contact.name || !contact.phoneNumber || !contact.email || !contact.isFavourite || !contact.contactType) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newContact = new Contact(contact);

	try {
		await newContact.save();
		res.status(201).json({ success: true, data: newContact });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;

    const contact = req.body;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({ success: false, message: "Invalid Contact Id" });
    }
    try {
		const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, { new: true });
		res.status(200).json({ success: true, data: updatedContact });
	} catch (error) {
		console.log("error in deleting contact:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteContactController = async (req, res) => {
    const {contactId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(404).json({ success: false, message: "Invalid Contact Id" });
    }
    try {
		await Contact.findByIdAndDelete(contactId);
		res.status(200).json({ success: true, message: "ontact deleted" });
	} catch (error) {
		console.log("error in deleting contact:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
