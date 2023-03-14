const express = require("express");
const {
    validation,
    ctrlWrapper,
    isValidId,
    authenticate,
    checkUniqData,
} = require("../../middlewares");
const { joiContactsSchemas } = require("../../models");
const { contactsController } = require("../../controller");

const router = express.Router();

router.get("/", 
authenticate, 
ctrlWrapper(contactsController.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(contactsController.getById));

const test =async (req, res)=>{
    res.json({message:"post"})
}

router.post("/", 
 authenticate,
validation(joiContactsSchemas.contactsSchema),
checkUniqData,
ctrlWrapper(contactsController.add))



router.delete("/:contactId", authenticate, isValidId, ctrlWrapper(contactsController.remove));

router.put(
    "/:contactId",
    authenticate,
    isValidId,
    validation(joiContactsSchemas.contactsSchema),
    checkUniqData,
    ctrlWrapper(contactsController.update)
);

router.patch(
    "/:contactId/favorite",
    authenticate,
    isValidId,
    validation(joiContactsSchemas.favoriteSchema),
    ctrlWrapper(contactsController.patch)
);

module.exports = router;
