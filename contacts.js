import path from "path";
import fs from "fs/promises";

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactsList);
  } catch (err) {
    console.error(err);
  }
}

export async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    return allContacts.find((contact) => contact.id === String(contactId));
  } catch (err) {
    console.error(err);
  }
}

export async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(
      (contact) => contact.id === String(contactId)
    );
    allContacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts), "utf-8");

    return contactId;
  } catch (err) {
    console.error(err);
  }
}

export async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = { id: String(Date.now()), name, email, phone };
    const newAllContacts = JSON.stringify([...allContacts, newContact]);

    await fs.writeFile(contactsPath, newAllContacts, "utf-8");

    return newContact;
  } catch (err) {
    console.error(err);
  }
}
