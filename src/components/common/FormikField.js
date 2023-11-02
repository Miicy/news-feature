
import TextField from "@mui/material/TextField";
import { Field } from "formik";

const FormikField = ({ size, name, label, type, sx, helperText, ...rest }) => {
	return (
		<Field name={name}>
			{({ field, form }) => {
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
					/>
				);
			}}
		</Field>
	);
};

export default FormikField;