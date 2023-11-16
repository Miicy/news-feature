import { TextField, IconButton, InputAdornment } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { useTheme } from "@emotion/react";

const LoginField = ({
	label,
	size,
	error,
	password,
	value,
	style,
	placeholder,
	...rest
}) => {
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();
	const errorMessageStyles = {
		color: theme.palette.red.main,
		fontSize: isMobile && screenSize === "small" ? "0.8em" : "1em",
		height: "20px",
		transition: "0.3",
		fontWeight: "500",
	};

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div style={style}>
			<Field
				as={TextField}
				{...rest}
				placeholder={placeholder}
				variant="outlined"
				size={size}
				fullWidth
				color="primary"
				type={password ? (showPassword ? "text" : "password") : "text"}
				value={value}
				InputProps={{
					endAdornment: password && (
						<InputAdornment position="end" sx={{ marginRight: -1 }}>
							<IconButton onClick={handleTogglePassword}>
								{showPassword ? (
									<VisibilityOffIcon
										sx={{ color: theme.palette.secondary.main }}
									/>
								) : (
									<VisibilityIcon
										sx={{ color: theme.palette.secondary.main }}
									/>
								)}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			{!error ? null : (
				<div style={errorMessageStyles}>
					<ErrorMessage name={rest.name} component="div" className="error" />
				</div>
			)}
		</div>
	);
};

export default LoginField;
