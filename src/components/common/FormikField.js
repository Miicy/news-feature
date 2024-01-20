import TextField from "@mui/material/TextField";
import { Field } from "formik";

const FormikField = ({ size, name, label, type, sx, helperText, ...rest }) => {
	return (
		<Field name={name}>
			{({ field, form }) => {
				const handleKeyDown = (event) => {
					if (event.key === "Enter") {
						event.preventDefault();
					}
				};
				const { error, touched } = form.getFieldMeta(name);

				return (
					<TextField
						label={label}
						type={type}
						{...field}
						{...rest}
						sx={sx || null}
						variant="outlined"
						color="text"
						size={size}
						error={!!error && touched}
						helperText={touched ? error : helperText}
						onKeyDown={handleKeyDown}
					/>
				);
			}}
		</Field>
	);
};

export default FormikField;
