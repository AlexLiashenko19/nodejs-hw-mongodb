import mongoose from "mongoose";
import Contact from "../model/contact.model.js";
import { getAllContacts, getContactById } from "../services/contacts.js";
import createHttpError from "http-errors";

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
        throw createHttpError(404, `Contact not found`);
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

	if (!contact.name || !contact.phoneNumber || !contact.contactType) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newContact = new Contact(contact);

	try {
		await newContact.save();
		res.status(201).json({ 
      status: 201,
      message: "Successfully created a contact!",
      data: newContact });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;

    const contact = req.body;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(404, `Contact not found`);
    }

    try {
		const updatedContact = await Contact.findByIdAndUpdate(contactId, contact, { new: true });
		res.status(200).json({ 
      status: 200,
	    message: "Successfully patched a contact!",
	    data: updatedContact});
	} catch (error) {
		console.log("error in deleting contact:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteContactController = async (req, res) => {
    const {contactId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      throw createHttpError(404, `Contact not found`);
    }

    try {
		await Contact.findByIdAndDelete(contactId);
		res.status(204).json({ 
      status: 204,
	    message: "Successfully patched a contact!" });
	} catch (error) {
		console.log("error in deleting contact:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};