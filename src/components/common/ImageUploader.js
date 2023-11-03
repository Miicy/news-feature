import React, { useState } from "react";
import { Field } from "formik";

function ImageUploader({ name, field, form, label, ...rest  }) {
	const [image, setImage] = useState(null);

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setImage(selectedImage);
		form.setFieldValue(field.name, selectedImage);
	};
	return (
		<Field name={name}>
			{({ field, form }) => {
                <div></div>
				// <div style={{width:"100%", height:"100%", backgroundColor:"red"}}>
				// 	<input
				// 		type="file"
				// 		accept="image/*"
				// 		onChange={handleImageChange}
				// 		{...field}
				// 		{...rest}
				// 	/>
				// 	{image && <img src={URL.createObjectURL(image)} alt="Preview" />}
				// </div>;
			}}
		</Field>
	);
}

export default ImageUploader;
