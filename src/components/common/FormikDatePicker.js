import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField, DesktopDatePicker } from "@mui/x-date-pickers";

import { ErrorMessage, Field } from "formik";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { isMobile } from "react-device-detect";
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
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();

	const DatePickerStyles = {
		error: {
			color: theme.palette.red.error,
			fontSize: "0.8em",
			display: "flex",
			justifyContent: "flex-start",
			width:
				screenSize === "small" || isMobile
					? "98.5%"
					: screenSize === "medium"
					? "58.5%"
					: screenSize === "medium-s"
					? "58.5%"
					: "38.5%",
		},
		container: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			margin: screenSize === "small" || isMobile ? "20px 0" : "0",
		},
	};

	return (
		<Field name={name}>
			{({ form }) => {
				return (
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<div style={DatePickerStyles.container}>
							<DesktopDatePicker
								disableFuture
								{...rest}
								sx={sx || null}
								onChange={(value) => form.setFieldValue("date", value)}
								value={today}
								format="LL"
								slotProps={{
									textField: { variant: "outlined", color: "opposite", label: "Date", size:size },
								}}
							/>
							<ErrorMessage
								style={DatePickerStyles.error}
								name="date"
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
