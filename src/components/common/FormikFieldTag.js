import { useTheme } from "@emotion/react";
import { Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Field } from "formik";
import { useState, useEffect } from "react";

function FormikFieldTag({
	modalOpen,
	setModalOpen,
	initialTags,
	tags: propTags,
	onTagsChange,
	name,
	type,
	sx,
	helperText,
	...rest
}) {
	const theme = useTheme();
	const [tags, setTags] = useState(initialTags || []);
	const [inputTag, setInputTag] = useState("");

	useEffect(() => {
		setTags(initialTags || []);
	}, [initialTags]);

	const handleTagChange = (e) => {
		setInputTag(e.target.value);
	};

	const handleTagAdd = () => {
		if (inputTag.trim() !== "") {
			const newTags = [...new Set([...tags, inputTag.trim(), ...propTags])];
			setTags(newTags);
			onTagsChange(newTags);
			setInputTag("");
		}
	};

	const handleTagRemove = (index) => {
		const newTags = tags.filter((_, i) => i !== index);
		setTags(newTags);
		onTagsChange(newTags); 
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
							setModalOpen(false);
						}}
						value={inputTag}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleTagAdd();
							}
						}}
						{...rest}
					/>
				)}
			</Field>
			{modalOpen && (
				<div
					style={{
						color: "red",
						marginLeft: "20px",
						fontSize: "0.8em",
						marginTop: "5px",
						position:"absolute",
					}}
				>
					Tags required!
				</div>
			)}
			<div
				style={{ minHeight: "30px", height: "fit-content", overflow: "auto" }}
			>
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
