const fs = require('fs');
const path = require('path');
const file = 'contacts.json';

const contactsPath = path.join(__dirname, 'db');

// вщзвращает список контактов из json файла
function listContacts() {
  fs.readFile(`${contactsPath}\\${file}`, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(JSON.parse(data));
  });
}

// вщзвращает контакт из списка с необходимым Id
function getContactById(contactId) {
  fs.readFile(`${contactsPath}\\${file}`, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(JSON.parse(data).filter(item => item.id === contactId));
  });
}

// elfkztn контакт из списка с указаным Id
function removeContact(contactId) {
  fs.readFile(`${contactsPath}\\${file}`, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const searchResult = JSON.parse(data).filter(item => item.id !== contactId);
    fs.promises.writeFile(
      `${contactsPath}\\${file}`,
      JSON.stringify(searchResult),
      err => {
        if (err) {
          console.error(err.message);
          return;
        }
      },
    );
    console.log('List: ', searchResult);
  });
}

// добавляет контакт в список с новым максимальным Id
function addContact(name, email, phone) {
  fs.readFile(`${contactsPath}\\${file}`, (err, data) => {
    if (err) {
      console.error(err.message);
      return;
    }
    const newData = JSON.parse(data);
    // console.log('newData ', newData);
    const maxIndex = Math.max(...newData.map(i => i.id));
    // console.log('maxIndex ', maxIndex);
    const id = maxIndex + 1;
    const newDataContact = { id, name, email, phone };
    console.log('Add new contact ', newDataContact);
    newData.push(newDataContact);
    // console.log('newData2 ', newData);
    // console.log(data);
    fs.promises.writeFile(
      `${contactsPath}\\${file}`,
      JSON.stringify(newData),
      err => {
        if (err) {
          console.error(err.message);
          return;
        }
      },
      2,
    );
    // console.log('New list: ', data);
  });
}

module.exports.listContacts = listContacts;
module.exports.getContactById = getContactById;
module.exports.removeContact = removeContact;
module.exports.addContact = addContact;
