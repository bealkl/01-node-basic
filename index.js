const contacts = require('./contacts');
const argv = require('yargs').argv;

// argv(
//   number('id').string('name').string('email').string('phone').argv,
//   function (argv) {
//     invokeAction(argv.action, argv.id, argv.name, argv.email, argv.phone);
//   },
// ).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts();
      break;

    case 'get':
      contacts.getContactById(id);
      break;

    case 'add':
      contacts.addContact(name, email, phone);
      break;

    case 'remove':
      contacts.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
