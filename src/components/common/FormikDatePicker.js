import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { ErrorMessage, Field } from "formik";
import { useTheme } from "@emotion/react";

const FormikDatePicker = ({
	name,
	size,
	label,
	today,
	form,
	helperText,
	sx,
	...rest
}) => {
	const theme = useTheme();

	const DatePickerStyles = {
		error: {
			color: theme.palette.red.error,
			display: "flex",
			justifyContent: "flex-start",
			marginLeft: "20px",
			fontSize: "0.8em",
			marginTop: "5px",
			position: "absolute",
		},
		container: {},
	};
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
		  event.preventDefault();
		}
	  };

	  return (
		<Field name={name}>
			{({ form }) => {
				const { error, touched, value } = form.getFieldMeta(name);
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<div style={DatePickerStyles.container}>
							<DesktopDatePicker
								disableFuture
								{...rest}
								sx={sx || null}
								onChange={(newValue) => form.setFieldValue(name, newValue)}
								value={value}
								format="LL"
								shrink="true"
								slotProps={{
									textField: {
										variant: "outlined",
										color: "opposite",
										size: size,
									},
								}}
								error={!!error && touched}
								helperText={touched ? error : helperText}
								onKeyDown={handleKeyDown}
							/>
							<ErrorMessage
								style={DatePickerStyles.error}
								name={name}
								component="div"
								className="error-message"
							/>
						</div>
					</LocalizationProvider>
				);
			}}
		</Field>
	);
};

export default FormikDatePicker;
