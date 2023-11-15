import "../pages/pages.css";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";

import dayjs from "dayjs";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import FormikField from "../components/common/FormikField";
import FormikDatePicker from "../components/common/FormikDatePicker";
import ReactQuillComponent from "../components/common/ReactQuillComponent";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CustomButton from "../components/common/CustomButton";
import BreadcrumbsPage from "../components/common/Breadcrumbs";

import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../helpers/app.constants";

import {
	displayNotification,
	setDataState,
} from "../store/reducers/notificationSlice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { STORAGE } from "../firebase";
import Select from "react-select";
import LocationSelect from "../components/common/LocationSelect";

function AdminAddNews() {
	const today = dayjs();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const screenSize = useSelector(selectScreenSize);
	const [image, setImage] = useState(null);
	const [coverImage, setCoverImage] = useState(null);
	const [expanded, setExpanded] = useState({
		title: false,
		coverImage: false,
		content: false,
	});

	const toggleExpanded = (property) => {
		setExpanded((prevState) => ({
			...prevState,
			[property]: !prevState[property],
		}));
	};

	const storageRef = getStorage();

	const handleFileChange = (event) => {
		const file = event.currentTarget.files[0];
		const imageRef = ref(STORAGE, `coverImages/${file.name}`);
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		uploadBytes(imageRef, file)
			.then((snapshot) => {
				return getDownloadURL(snapshot.ref);
			})
			.then((downloadURL) => {
				setImage(downloadURL);
				setCoverImage(downloadURL);
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			})

			.catch((error) => {
				console.error("Error uploading file:", error);
				// Set the image to null in case of an error
				setImage(null);
			});
	};

	const initialValues = {
		title: "",
		date: today,
		content: "",
		image: "",
		location: "",
		tags: [],
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title required!"),
		date: Yup.date()
			.required("Date required!")
			.typeError("Invalid Date!")
			.min(new Date("2023-01-01"), "Date is too early!"),
		location: Yup.string().required("Location required!"),
		content: Yup.string().required("Content required!"),
		image: Yup.mixed().required("Image required!"),
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
				coverImage: coverImage,
			};
			console.log("Form Values:", values);
			console.log("Updated Values:", updatedValues);

			const notificationPayload = {
				text: "News Added!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
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
		formCotainer: {
			display: "flex",
			flexDirection: "column",
			width: "95%",
			borderTopLeftRadius: "15px",
			borderTopRightRadius: "15px",
			border: `1px solid ${theme.palette.fifth.secondary}`,
			backgroundColor: theme.palette.fifth.third,
			marginBottom: "40px",
			minHeight: "75vh",
			overflow: "auto",
		},
		form: {
			height: "fit-content",
			width: "100%",
			display: "flex",
			minHeight: "75vh",
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
		},
		formFields: {
			width: "100%",
			height: "fit-content",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		expanded: {
			width: "100%",
			height: "50px",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
			borderBottom: `1px solid ${theme.palette.fifth.secondary}`,
			backgroundColor: theme.palette.third.secondary,
			cursor: "pointer",
		},
		expandIcon: {
			marginRight: "10px",
		},
		expandedTitle: {
			marginLeft: "10px",
		},
		fieldMargin: {
			marginTop:
				screenSize === "medium-s"
					? "15p"
					: screenSize === "small"
					? "30px"
					: "20px",
			marginBottom:
				screenSize === "medium-s"
					? "15px"
					: screenSize === "small"
					? "10px"
					: "20px",
			width: screenSize === "small" || isMobile ? "90%" : "98%",
		},
		titleDate: {
			display: "flex",
			flexDirection: "column",
			marginBottom:
				screenSize === "medium-s"
					? "15px"
					: screenSize === "small"
					? "30px"
					: "20px",
			justifyContent: "space-between",
			height: "100px",
			animation: "expandAnimation 0.2s ease 0s 1 normal forwards",
			height: "fit-content",
		},
		generalField: {},
		image: {
			height: screenSize === "small" || isMobile ? "200px" : "400px",
			width: screenSize === "small" || isMobile ? "98%" : "98%",
			borderRadius: "10px",
			margin:
				screenSize === "medium-s"
					? "15px 0px"
					: screenSize === "small"
					? "55px 0 0px 0px"
					: "20px 0px",
			animation: "expandAnimation 0.2s ease 0s 1 normal forwards",
			backgroundColor: coverImage ? "none" : theme.palette.forth.secondary,
			backgroundImage: coverImage ? `url(${coverImage})` : "none",
			backgroundSize: "cover",
			backgroundPosition: "center",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 2,
		},
		imageInner: {
			width: "20%",
			minWidth: "200px",
			height: "25%",
			minHeight: "100px",
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
			border: `1px solid ${theme.palette.fifth.secondary}`,
			backgroundColor: theme.palette.third.secondary,
			borderRadius: "10px",
			display: "flex",
			flexDirection: "column",
			justifyContent: image ? "center" : "space-evenly",
			alignItems: "center",
			zIndex: 5,
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
			width: "98%",
		},
		tags: {},
		location: {},

		button: {
			display: "flex",
			marginTop: "70px",
			cursor: "pointer",
			width: "100%",
		},
		error: {
			color: theme.palette.red.error,
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
					{({ isValid, touched, errors }) => (
						<Form style={AdminAddNewsStyles.form}>
							<div style={AdminAddNewsStyles.formFields}>
								<div
									style={{
										...AdminAddNewsStyles.expanded,
										borderTopLeftRadius: "15px",
										borderTopRightRadius: "15px",
									}}
									className={"hover-button"}
									onClick={() => toggleExpanded("title")}
								>
									<div
										style={{
											...AdminAddNewsStyles.expandedTitle,
											color:
												(errors.title || errors.date) &&
												(touched.title || touched.date)
													? theme.palette.red.error
													: "",
										}}
									>
										Title & Date
									</div>
									{expanded.title ? (
										<ExpandMoreIcon sx={AdminAddNewsStyles.expandIcon} />
									) : (
										<ExpandLessIcon sx={AdminAddNewsStyles.expandIcon} />
									)}
								</div>
								{!expanded.title && (
									<div
										style={{
											...AdminAddNewsStyles.fieldMargin,
											...AdminAddNewsStyles.titleDate,
										}}
									>
										<div style={AdminAddNewsStyles.generalField}>
											<FormikField
												name="title"
												label="Title"
												type="text"
												size={screenSize === "small" || isMobile ? "small" : ""}
											/>
										</div>
										<div style={AdminAddNewsStyles.generalField}>
											<FormikDatePicker
												name="date"
												label="Date"
												today={today}
												size={screenSize === "small" || isMobile ? "small" : ""}
											/>
										</div>
										<div style={AdminAddNewsStyles.generalField}>
											<Field
												name="location"
												style={AdminAddNewsStyles.location}
											>
												{({ field, form }) => (
													<LocationSelect field={field} form={form} />
												)}
											</Field>
										</div>
										<div style={AdminAddNewsStyles.generalField}>
											<FormikField
												name="tags"
												label="Tags"
												type="text"
												sx={{
													width:
														screenSize === "small" || isMobile ? "100%" : "27%",
												}}
												size={screenSize === "small" || isMobile ? "small" : ""}
											/>
										</div>
									</div>
								)}

								<div
									style={AdminAddNewsStyles.expanded}
									className={"hover-button"}
									onClick={() => toggleExpanded("coverImage")}
								>
									<div
										style={{
											...AdminAddNewsStyles.expandedTitle,
											color:
												errors.image && touched.image
													? theme.palette.red.error
													: "",
										}}
									>
										Cover Image
									</div>
									{expanded.coverImage ? (
										<ExpandMoreIcon sx={AdminAddNewsStyles.expandIcon} />
									) : (
										<ExpandLessIcon sx={AdminAddNewsStyles.expandIcon} />
									)}
								</div>
								{!expanded.coverImage && (
									<div
										style={{
											...AdminAddNewsStyles.image,
											...AdminAddNewsStyles.fieldMargin,
										}}
									>
										<div style={AdminAddNewsStyles.imageInner}>
											<Field
												type="file"
												name="image"
												id="image"
												label="Cover Image"
												onChange={handleFileChange}
												style={{ display: "none" }}
											/>
											<label htmlFor="image" style={{ cursor: "pointer" }}>
												{image ? "Change Cover Image" : "Select Cover Image"}
											</label>
											{!image && (
												<div style={AdminAddNewsStyles.error}>
													{errors.image}
												</div>
											)}
										</div>
									</div>
								)}
								<div
									style={AdminAddNewsStyles.expanded}
									onClick={() => toggleExpanded("content")}
									className={"hover-button"}
								>
									<div
										style={{
											...AdminAddNewsStyles.expandedTitle,
											color:
												errors.content && touched.content
													? theme.palette.red.error
													: "",
										}}
									>
										Content
									</div>
									{expanded.content ? (
										<ExpandMoreIcon sx={AdminAddNewsStyles.expandIcon} />
									) : (
										<ExpandLessIcon sx={AdminAddNewsStyles.expandIcon} />
									)}
								</div>
								{!expanded.content && (
									<div style={AdminAddNewsStyles.quill}>
										<ReactQuillComponent name="content" />
									</div>
								)}
							</div>
							<div style={AdminAddNewsStyles.button}>
								<CustomButton
									type="submit"
									disabled={!isValid}
									text="Add News"
									className="hover-button"
									width={"100%"}
									borderRadius={0}
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
