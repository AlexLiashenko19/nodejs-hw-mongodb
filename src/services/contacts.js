import { SORT_ORDER } from "../constants/index.js";
import Contact from "../model/contact.model.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async({
  perPage = 10, 
  page = 1,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = Contact.find();
  const contactCount = await Contact.find()
  .merge(contactQuery)
  .countDocuments();
  const contacts = await contactQuery
  .skip(skip)
  .limit(limit)
  .sort({ [sortBy]: sortOrder })
  .exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};

export const deleteContactById = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);

  return contact;
};

export const createContact = async (contactData) => {
  const contact = Contact.create(contactData);

  return contact;
  };

export const updateContact = async (id, payload, options = {}) => {
    const contact = Contact.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  return contact;
};