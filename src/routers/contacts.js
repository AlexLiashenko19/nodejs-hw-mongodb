import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, updateContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValid } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { checkRoles } from "../middlewares/checkRoles.js";
import { ROLES } from "../constants/index.js";

const router = Router();

router.use(authenticate);

router.get('/', 
    checkRoles(ROLES.USER),
    ctrlWrapper(getContactsController)
);

router.get('/:contactId', 
    checkRoles(ROLES.USER),
    isValid, 
    ctrlWrapper(getContactByIdController)
);

router.post('/', 
    checkRoles(ROLES.USER),
    validateBody(createContactSchema), 
    ctrlWrapper(createContactController)
);

router.patch('/:contactId', 
    checkRoles(ROLES.USER),
    validateBody(updateContactSchema), 
    isValid, 
    ctrlWrapper(updateContactController)
);

router.delete('/:contactId', 
    checkRoles(ROLES.USER),
    isValid, 
    ctrlWrapper(deleteContactController)
);

export default router;