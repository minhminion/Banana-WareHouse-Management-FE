import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.defaultConfig = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "bulletedList",
    "numberedList",
    "|",
    "indent",
    "outdent",
    "|",
    "blockQuote",
    "undo",
    "redo",
  ],

  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en",
};

export default Editor;
