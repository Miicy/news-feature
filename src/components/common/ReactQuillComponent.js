import React from "react";
import { ErrorMessage, Field } from "formik";
import { useTheme } from "@emotion/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function ReactQuillComponent({ name, initialContent, helperText, ...rest }) {
  const theme = useTheme();

  const ReactQuillComponentStyles = {
    container: {
      color: theme.palette.opposite.main,
    },
    quill: {
      height: "500px",
      borderRadius: "5px",
    },
    quillError: {
      color: theme.palette.red.error,
      margin: "3px 50px 0 14px",
    },
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <Field name={name}>
      {({ form }) => (
        <div style={ReactQuillComponentStyles.container}>
          <ReactQuill
            style={ReactQuillComponentStyles.quill}
            onChange={(value) => {
              form.handleChange({
                target: {
                  name: name,
                  value: value,
                },
              });
            }}
            modules={modules}
            formats={formats}
            placeholder={"Article"}
            value={form.values[name] || initialContent}
            {...rest}
          />

          <ErrorMessage
            style={ReactQuillComponentStyles.quillError}
            name={name}
            component="div"
          />
        </div>
      )}
    </Field>
  );
}

export default ReactQuillComponent;
