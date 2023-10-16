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
import { useDispatch } from "react-redux";
import {
	displayNotification,
	setDataState,
} from "../store/reducers/notificationSlice";
import { adminLogin } from "../store/reducers/adminSlice";
import CustomButton from "../components/common/CustomButton";
import CustomField from "../components/common/CustomField";
import { useMediaQuery } from "@mui/material";

function AdminLogin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isScreenSmall = useMediaQuery("(max-width: 500px)");

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

			if (username === "admin" && password === "555admin") {
				const userResponse = await axios.post(
					`${SERVER_URL}user/getadminuserdata`,
				);

				dispatch(adminLogin(userResponse.data));

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
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		loginContainer: {
			width: !isMobile && !isScreenSmall ? "60%" :"90%",
			height: !isMobile && !isScreenSmall ? "60%" :"90%",
			backgroundColor: "lightgrey",
			marginBottom: "50px",
			borderRadius: "15px",
			display:"flex",
			justifyContent: "center",
			alignItems: "center",
		},
		button:{
			display: "flex",
		justifyContent: "center",
		alignItems: "center",

		}
	};

	return (
		<div style={adminLoginStyles.container}>
			<div style={adminLoginStyles.loginContainer}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(formik) => (
						<Form>
							<CustomField
								name="email"
								label="Email"
								size={!isMobile && !isScreenSmall ? "big" : "small"}
								error={true}
								margin={!isMobile ? "20px" : "10px"}
								password={false}
							/>
							<CustomField
								name="password"
								label="Password"
								size={!isMobile && !isScreenSmall ? "big" : "small"}
								error={true}
								margin={!isMobile ? "20px" : "10px"}
								password={true}
							/>
							<div  style={adminLoginStyles.button}>
								<CustomButton
									disabled={!formik.values.email || !formik.values.password}
									onClick={formik.handleSubmit}
									buttonText={"Login"}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default AdminLogin;
