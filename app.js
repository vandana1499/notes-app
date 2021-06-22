const yargs = require("yargs");
const note = require("./notes.js");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "A note title.",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "A body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.removeNote(argv.title);
  },
});

yargs.command({
  command: "read",
  describe: "Reading a single note",
  builder: {
    title: {
      describe: "title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    note.readNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "Listing the notes",
  handler() {
    note.listNotes();
  },
});

yargs.parse();
