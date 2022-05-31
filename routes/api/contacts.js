const express = require("express");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(contactSchema), async (req, res, next) => {
  try {
    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log("contactId", contactId);
    const result = await removeContact(contactId);
    console.log("result", result);
    if (!result) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validation(contactSchema), async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
