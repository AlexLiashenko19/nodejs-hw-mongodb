import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, updateContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValid } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValid, ctrlWrapper(getContactByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', validateBody(updateContactSchema), isValid, ctrlWrapper(updateContactController));

router.delete('/:contactId', isValid, ctrlWrapper(deleteContactController));

export default router;