import { SORT_ORDER } from "../constants/index.js";
import Contact from "../model/contact.model.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  perPage = 10, 
  page = 1,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Створіть новий запит для підрахунку документів
  const contactCount = await Contact.countDocuments({ userId });

  // Тепер створіть запит для отримання контактів
  const contacts = await Contact.find({ userId })
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

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const deleteContactById = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: id, userId });
  return contact;
};

export const createContact = async (contactData, userId) => {
  const contact = new Contact({
    ...contactData,
    userId,
  });
  await contact.save();
  return contact;
  };

export const updateContact = async (id, payload, userId) => {
  const contact = await Contact.findOneAndUpdate({ _id: id, userId }, payload, {
    new: true,
  });
  return contact;
};