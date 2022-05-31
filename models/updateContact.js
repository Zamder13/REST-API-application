const fs = require("fs/promises");

const filePAth = require("./filePAth.js");

const updateContact = async (contacts) => {
  await fs.writeFile(filePAth, JSON.stringify(contacts));
};

module.exports = { updateContact };
