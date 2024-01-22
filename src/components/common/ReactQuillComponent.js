import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import React from "react";
import { ErrorMessage, Field } from "formik";
import { useTheme } from "@emotion/react";

function ReactQuillComponent(name, helperText, ...rest) {
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
			// [{ size: [] }],
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["link", "image", "video"],
		],
	};

	const formats = [
		"header",
		// "size",
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
			{({ form }) => {
				return (
					<div style={ReactQuillComponentStyles.container}>
						<ReactQuill
							style={ReactQuillComponentStyles.quill}
							onChange={(value) => {
								form.setFieldValue("content", value);
							}}
							modules={modules}
							formats={formats}
							placeholder={"Article"}
							{...rest}
						/>

						<ErrorMessage
							style={ReactQuillComponentStyles.quillError}
							name="content"
							component="div"
						/>
					</div>
				);
			}}
		</Field>
	);
}

export default ReactQuillComponent;
