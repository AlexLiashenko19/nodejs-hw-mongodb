import Contact from "../model/contact.model.js";


export async function getAllContacts() {
  const contacts = await Contact.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  return contact;
}