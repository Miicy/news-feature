import React, { useEffect, useMemo, useState } from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { isMobile } from "react-device-detect";
import CustomField from "../components/common/LoginField";
import { Formik, Form, Field, useFormikContext } from "formik";
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
import ReactQuill from "react-quill";
import FormikField from "../components/common/FormikField";

function AdminAddNews() {
	const screenSize = useSelector(selectScreenSize);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const FORM_FIELDS = {
		TITLE: "title",
		CONTENT: "content",
		DATE: "date",
	};

	const initialValues = useMemo(() => {
		return {
			[FORM_FIELDS.TITLE]: null,
			[FORM_FIELDS.CONTENT]: null,
			[FORM_FIELDS.DATE]: null,
		};
	}, []);

	const validationSchema = Yup.object().shape({
		[FORM_FIELDS.TITLE]: Yup.string().required("Title required!"),
		[FORM_FIELDS.CONTENT]: Yup.string().required("Content required!"),
		[FORM_FIELDS.DATE]: Yup.number().required("Date required!"),
	});

	const onSubmit = async (values, { setErrors }) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			// [FORM_FIELDS.TITLE]: formValues[FORM_FIELDS.TITLE],
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
		titleContainer: {
			display: "flex",
			flexDirection: "column",
			width: "95%",
			alignItems: screenSize === "small" || isMobile ? "center" : "flex-start",
		},
		title: {
			fontSize: screenSize === "small" || isMobile ? "1em" : "2em",
			marginLeft: screenSize === "small" || isMobile ? "2px" : "5px",
			fontWeight: "bold",
		},
		image: {
			backgroundColor: "grey",
			height: screenSize === "small" || isMobile ? "200px" : "400px",
			width: screenSize === "small" || isMobile ? "85%" : "100%",
			borderRadius: "10px",
		},

		content: {
			fontSize: screenSize === "small" || isMobile ? "0.9em" : "1.2em",
			margin: screenSize === "small" || isMobile ? "20px 0" : "35px 0",
			minHeight: screenSize === "small" || isMobile ? "200px" : "200px",
		},
		date: {
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
			marginBottom: "20px",
			fontSize: screenSize === "small" || isMobile ? "0.85em" : "1em",
		},
		quill: {
			minHeight: "fit-content",
			height: "500px",
			width: "100%",
			color: "black",
		},
		button: {
			display: "flex",
			marginTop: "70px",
			cursor: "pointer",
			width: "20%",
		},
		titleDate: {
			display: "flex",
			flexDirection: "row",
			width: "100%",
			marginTop: screenSize === "medium-s"
			? "15px"
			: screenSize === "small"
			? "20px"
			: "10px",
			justifyContent: "space-between",
		},
	};

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["link"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"list",
		"bullet",
		"align",
		"link",
	];

	const [content, setContent] = useState("");

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
			<div style={AdminAddNewsStyles.titleContainer}>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{(values, isValid) => (
						<Form style={AdminAddNewsStyles.form}>
							<div style={AdminAddNewsStyles.titleDate}>
								<Field name={FORM_FIELDS.TITLE}>
									{({ form, ...formik }) => (
                                        <FormikField
                                        form={form}
                                        {...formik}
                                        label="Title"
                                        size={screenSize === "small" || isMobile ? "small" : "big"}
                                    />
									)}
								</Field>

								{/* <CustomField
									name="date"
									label="Date"
									size={
										!isMobile && screenSize !== "small" ? "medium" : "small"
									}
									error={true}
									margin={"0"}
									password={false}
									width={isMobile && screenSize === "small" ? "50%" : "20%"}
								/> */}
							</div>

							{/* <Field name="content">
								<ReactQuill
									{...Field}
									style={AdminAddNewsStyles.quill}
									modules={modules}
									// onChange={(value) => setFieldValue("content", value)}
									formats={formats}
								/>
							</Field> */}
							<div style={AdminAddNewsStyles.button}>
								<CustomLoginButton
									disabled={
										!values.title || values.content
										// || !formik.values.date
									}
									onClick={() => onSubmit(values)}
									buttonText={"Add"}
								/>
							</div>
						</Form>
					)}
				</Formik>
				{/* <div style={AdminAddNewsStyles.image}></div> */}
			</div>
			<div style={AdminAddNewsStyles.date}></div>
		</div>
	);
}

export default AdminAddNews;
