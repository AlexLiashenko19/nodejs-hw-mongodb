import createHttpError from "http-errors";
import { ROLES } from "../constants/index.js";
import Contact from "../model/contact.model.js";

export const checkRoles = (...roles) => 
    async (req, res, next) => {
        const {user} = req;
        if (!user) {
            next(createHttpError(401));
            return;
        }

        const {role} = user;

        if(roles.includes(ROLES.USER) && role === ROLES.USER) {
            const {contactId} = req.params;
            if (!contactId) {
               next(createHttpError(403));
               return; 
            }

            const contact = await Contact.findOne({
                _id: contactId,
                parentId: user._id,
            });

            if (contact) {
                next();
                return;
            }
        }

        next(createHttpError(403));
    };
