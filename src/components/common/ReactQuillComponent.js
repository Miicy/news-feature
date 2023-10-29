import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function ReactQuillComponent(name, ...rest) {
	const screenSize = useSelector(selectScreenSize);
	const ReactQuillComponentStyles = {
		container: {
			margin:
				screenSize === "small" || isMobile
					? "70px 0px"
					: screenSize === "medium-s"
					? "30px 0px"
					: "40px 0px",
			minHeight: "fit-content",
			height: "400px",
			borderRadius: "5px",
		},
	};
	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["link", "image", "video"],
		],
	};

	const formats = [
		"header",
		"size",
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
			{({ field, form }) => (
				<ReactQuill
					style={ReactQuillComponentStyles.container}
					value={field.value}
					onChange={(value) => {
						console.log("Value Type:",  value);
					}}
					modules={modules}
					formats={formats}
					placeholder={"Article"}
					{...rest}
				/>
			)}
		</Field>
		
	);
}

export default ReactQuillComponent;
