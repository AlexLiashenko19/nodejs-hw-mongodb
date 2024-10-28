import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, updateContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValid } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get('/', 
    ctrlWrapper(getContactsController)
);

router.get('/:contactId', 
    isValid, 
    ctrlWrapper(getContactByIdController)
);

router.post('/',
    upload.single('photo'),
    validateBody(createContactSchema), 
    ctrlWrapper(createContactController)
);

router.patch('/:contactId', 
    upload.single('photo'),
    validateBody(updateContactSchema), 
    isValid, 
    ctrlWrapper(updateContactController)
);

router.delete('/:contactId', 
    isValid, 
    ctrlWrapper(deleteContactController)
);

export default router;