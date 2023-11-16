import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Field } from "formik";
import { useState, useEffect } from "react";

function FormikFieldTag({ tags: propTags, onTagsChange, name, type, sx, helperText, ...rest }) {
	const theme = useTheme();
	const [tags, setTags] = useState(propTags || []);
	const [inputTag, setInputTag] = useState("");

	useEffect(() => {
		setTags(propTags || []);
	}, [propTags]);

	const handleTagChange = (e) => {
		setInputTag(e.target.value);
	};

	const handleTagAdd = () => {
		if (inputTag.trim() !== "") {
			const newTags = [...tags, inputTag.trim()];
			setTags(newTags);
			onTagsChange(newTags); // Update parent with new tags
			setInputTag("");
		}
	};

	const handleTagRemove = (index) => {
		const newTags = tags.filter((_, i) => i !== index);
		setTags(newTags);
		onTagsChange(newTags); // Update parent with updated tags
	};

	return (
		<div>
			<Field name={name}>
				{({ field, form }) => (
					<TextField
						{...field}
						type={type}
						sx={{ width: "100%" }}
						variant="outlined"
						color="text"
						size="small"
						onChange={(e) => {
							field.onChange(e);
							handleTagChange(e);
						}}
						value={inputTag}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleTagAdd();
							}
						}}
						{...rest}
					/>
				)}
			</Field>
			<div style={{ minHeight: "30px", height:"fit-content", overflow: "auto",  }}>
				{tags.map((tag, index) => (
					<span key={index} style={{ marginRight: "5px" }}>
						#{tag}
						<Tooltip title={"remove"}>
							<button
								onClick={() => handleTagRemove(index)}
								style={{
									cursor: "pointer",
									marginLeft: "3px",
									backgroundColor: theme.palette.opposite.secondary,
									color: "white",
								}}
							>
								x
							</button>
						</Tooltip>
					</span>
				))}
			</div>
		</div>
	);
}

export default FormikFieldTag;