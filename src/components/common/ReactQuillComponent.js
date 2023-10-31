import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { useTheme } from "@emotion/react";
import { THEME_MODES } from "../../store/reducers/userSlice";

function ReactQuillComponent(name, helperText, ...rest) {
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();
	const ReactQuillComponentStyles = {
		container: {
			color: theme.palette.opposite.main,
		},
		quill: {
			minHeight: "fit-content",
			height: "400px",
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
							className={`quill${form.errors.content ? "-error" : ""}`}
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
