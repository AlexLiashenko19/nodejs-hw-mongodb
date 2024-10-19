import Contact from "../model/contact.model.js";

export async function getAllContacts() {
  const contacts = await Contact.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);

  return contact;
}

export async function deleteContactById (id){
  const contact = await Contact.findByIdAndDelete(id);

  return contact;
};

export async function createContact (contactData) {
  const contact = Contact.create(contactData);

  return contact;
  };

export async function updateContact (id, payload, options = {}) {
    const contact = Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return contact;
};