import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { isMobile } from "react-device-detect";
import axios from "axios";
import * as Yup from "yup";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../helpers/app.constants";
import { useDispatch, useSelector } from "react-redux";
import {
	displayNotification,
	setDataState,
} from "../store/reducers/notificationSlice";
import { adminLogin } from "../store/reducers/adminSlice";
import CustomButton from "../components/common/CustomButton";
import LoginField from "../components/common/LoginField";
import { selectScreenSize } from "../store/reducers/layoutSlice";

function AdminLogin() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);

	const initialValues = {
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("Username required"),
		password: Yup.string().required("Password required"),
	});

	const handleSubmit = async (values, { setErrors }) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

			const { username, password } = values;

			if (username === "admin" && password === "admin") {
				// const userResponse = await axios.post(
				// 	`${SERVER_URL}user/getadminuserdata`,
				// );

				// dispatch(adminLogin(userResponse.data));

				dispatch(adminLogin(true));

				const notificationPayload = {
					text: "Admin login successful!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(displayNotification(notificationPayload));
				navigate("/admin/admin-panel");
			} else {
				setErrors({
					username: "Invalid username or password",
					password: "Invalid username or password",
				});
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data.error === "Internal server error"
			) {
				const notificationPayload = {
					text: "Server error!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			}
		}
		dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
	};

	const adminLoginStyles = {
		container: {
			width: "100%",
			height: "92vh",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			minWidth: "300px",
			backgroundColor: theme.palette.secondary.secondary,
		},
		form: {
			height: "55%",
			width: isMobile && screenSize == "small" ? "60%" : "30%",
			minWidth: "450px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-evenly",
		},
		button: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
		},
		fieldContainer: {
			width: isMobile && screenSize === "small" ? "90%" : "70%",
			margin: !isMobile && screenSize !== "small" ? "20px" : "10px",
		},
	};

	return (
		<div style={adminLoginStyles.container}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{(formik) => (
					<Form style={adminLoginStyles.form}>
						<h1 style={{ color: "black" }}>Admin Login</h1>
						<LoginField
							name="username"
							label="Username"
							error={true}
							password={false}
							placeholder={"admin"}
							style={adminLoginStyles.fieldContainer}
						/>
						<LoginField
							name="password"
							label="Password"
							error={true}
							password={true}
							placeholder={"admin"}
							style={adminLoginStyles.fieldContainer}
						/>
						<div style={adminLoginStyles.button}>
							<CustomButton
								disabled={!formik.values.username || !formik.values.password}
								onClick={formik.handleSubmit}
								text={"Login"}
								width={"70%"}
								height={isMobile && screenSize == "small" ? "40px" : "50px"}
								borderRadius={2}
								color={theme.palette.red.oppositeDark}
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default AdminLogin;
