import { TextField } from "@mui/material";
import { Field } from "formik";

const FormikField = ({ field, form, type, helperText, sx, ...rest }) => {
	const { value, name, onBlur, onChange } = field;
	const { getFieldMeta } = form;
	const { error, touched } = getFieldMeta(name);

	const handleErrorDetection = () => {
		if (error) {
			return error;
		} else {
			return " ";
		}
	};

	const handleHelperText = () => {
		if (helperText) {
			return helperText;
		} else {
			return " ";
		}
	};

	return (
		<Field
			as={TextField}
			{...rest}
			color="opposite"
			sx={sx ? sx : null}
			variant="outlined"
			type={type}
			name={name}
			onChange={onChange}
			value={value ? value : ""}
			error={!!error && touched}
			fullWidth
			helperText={touched ? handleErrorDetection() : handleHelperText()}
			
		/>
	);
};

export default FormikField;
