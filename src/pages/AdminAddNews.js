import React, { useEffect, useMemo, useState } from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { isMobile } from "react-device-detect";
import CustomField from "../components/common/LoginField";
import { Formik, Form, Field, useFormikContext, ErrorMessage } from "formik";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../helpers/app.constants";
import * as Yup from "yup";
import {
	displayNotification,
	setDataState,
} from "../store/reducers/notificationSlice";
import { useNavigate } from "react-router-dom";

import CustomLoginButton from "../components/common/CustomButton";

import FormikField from "../components/common/FormikField";
import FormikDatePicker from "../components/common/FormikDatePicker";
import { useTheme } from "@emotion/react";

import dayjs from "dayjs";
import ReactQuillComponent from "../components/common/ReactQuillComponent";

function AdminAddNews() {
	const screenSize = useSelector(selectScreenSize);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const today = dayjs();

	const initialValues = {
		title: "",
		date: today,
		content: "",
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title required!"),
		date: Yup.date()
			.required("Date required!")
			.typeError("Invalid Date!")
			.min(new Date("2023-01-01"), "Date is too early!"),
		content: Yup.string().required("Content required!"),
	});

	const onSubmit = async (values) => {
		try {
			const date = new Date(values.date);
			const formattedDate = `${date.getDate()}/${
				date.getMonth() + 1
			}/${date.getFullYear()}`;

			const updatedValues = {
				...values,
				date: formattedDate,
			};

			console.log("Form Values:", values);
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

	const AdminAddNewsStyles = {
		container: {
			marginTop: "5px",
			width: "95%",
			height: "100%",
			// backgroundColor: "yellow",
			display: "flex",
			flexDirection: "column",
		},
		form: {
			height: "fit-content",
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "space-between",
			justifyContent: "center",
		},
		formCotainer: {
			display: "flex",
			flexDirection: "column",
			width: "95%",
			alignItems: screenSize === "small" || isMobile ? "center" : "flex-start",
		},
		titleDate: {
			display: "flex",
			flexDirection: screenSize === "small" || isMobile ? "column" : "row",
			width: "100%",
			marginTop:
				screenSize === "medium-s"
					? "15px"
					: screenSize === "small"
					? "10px"
					: "20px",
			justifyContent: "space-between",
			height: "60px",
		},

		image: {
			backgroundColor: theme.palette.fifth.main,
			height: screenSize === "small" || isMobile ? "200px" : "400px",
			width: screenSize === "small" || isMobile ? "100%" : "100%",
			borderRadius: "10px",
			margin:
				screenSize === "medium-s"
					? "15px 0px"
					: screenSize === "small"
					? "55px 0 0px 0px"
					: "20px 0px",
		},
		quill: {
			margin:
				screenSize === "small" || isMobile
					? "20px 0px"
					: screenSize === "medium-s"
					? "20px 0px"
					: "15px 0px",
					minHeight: "fit-content",
					height: "400px",
					borderRadius: "5px",
		},
		tags:{

		},
		location:{

		},
		button: {
			display: "flex",
			marginTop: "70px",
			cursor: "pointer",
			width: "20%",
		},
	};

	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage
					second={"Admin"}
					secondUrl={"admin"}
					third={"Admin News"}
					thirdUrl={"admin/admin-panel"}
					link={"Add News"}
				/>
			</div>
			<div style={AdminAddNewsStyles.formCotainer}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isValid, values }) => (
						<Form style={AdminAddNewsStyles.form}>
							<div style={AdminAddNewsStyles.titleDate}>
								<FormikField
									name="title"
									label="Title"
									type="text"
									sx={{
										width: screenSize === "small" || isMobile ? "100%" : "50%",
									}}
									size={screenSize === "small" || isMobile ? "small" : ""}
								/>

								<FormikDatePicker
									name="date"
									label="Date"
									today={today}
									sx={{
										width:
											screenSize === "small" || isMobile
												? "100%"
												: screenSize === "medium"
												? "60%"
												: screenSize === "medium-s"
												? "60%"
												: "40%",
										transition: "0.3s",
									}}
									size={screenSize === "small" || isMobile ? "small" : ""}
								/>
							</div>
							<div style={AdminAddNewsStyles.image}></div>
							<div style={AdminAddNewsStyles.quill}>
								<ReactQuillComponent name="content" />
							</div>
							<div style={AdminAddNewsStyles.tags}>
								
							</div>
							<div style={AdminAddNewsStyles.location}>
								
							</div>

							<div style={AdminAddNewsStyles.button}>
								<CustomLoginButton
									type="submit"
									disabled={!isValid}
									buttonText="Add"
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default AdminAddNews;
