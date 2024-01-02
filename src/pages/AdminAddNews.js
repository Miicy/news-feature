import "../pages/pages.css";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import LocationSelect from "../components/common/LocationSelect";
import FormikFieldTag from "../components/common/FormikFieldTag";

function AdminAddNews() {
	const today = dayjs();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const screenSize = useSelector(selectScreenSize);
	const [coverImage, setCoverImage] = useState(null);
	const [expanded, setExpanded] = useState({
		content: false,
	});
	const [tags, setTags] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const handleTagsChange = (newTags) => {
		setTags(newTags);
	};

	const toggleExpanded = (property) => {
		setExpanded((prevState) => ({
			...prevState,
			[property]: !prevState[property],
		}));
	};
	const handleLocationClick = () => {
		setExpanded((prevState) => ({
			...prevState,
			content: true,
		}));
	};

	const storageRef = getStorage();

	const handleFileChange = (event) => {
		const file = event.currentTarget.files[0];
		const imageRef = ref(STORAGE, `adminNewsImages/${file.name}`);
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		uploadBytes(imageRef, file)
			.then((snapshot) => {
				return getDownloadURL(snapshot.ref);
			})
			.then((downloadURL) => {
				setCoverImage(downloadURL);
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));

				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			})

			.catch((error) => {
				console.error("Error uploading file:", error);
				setCoverImage(null);
				const notificationPayload = {
					text: "!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			});
	};

	const initialValues = {
		title: "",
		date: today,
		content: "",
		coverImage: "",
		location: "",
		allTags: [],
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Title required!"),
		date: Yup.date()
			.required("Date required!")
			.typeError("Invalid Date!")
			.min(new Date("2023-01-01"), "Date is too early!"),
		location: Yup.string().required("Location required!"),
		content: Yup.string().required("Content required!"),
	});

	const onSubmit = async (values) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			// if (!coverImage || !tags.length) {
			if (!tags.length) {
				setModalOpen(true);
			} else {
				const date = new Date(values.date);
				const formattedDate = `${date.getDate()}/${
					date.getMonth() + 1
				}/${date.getFullYear()}`;

				const { tags, ...valuesWithoutTags } = values;
				const updatedValues = {
					...valuesWithoutTags,
					date: formattedDate,
					coverImage: coverImage,
					allTags: tags,
				};
				console.log("Updated Values:", updatedValues);

				const notificationPayload = {
					text: "News Added!",
					type: NOTIFICATION_TYPES.SUCCESS,
				};
				dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				dispatch(displayNotification(notificationPayload));
				dispatch(navigate("/admin/admin-panel"));
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

	const handleModalAccept = async (values) => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			setModalOpen(false);

			const date = new Date(values.date);
			const formattedDate = `${date.getDate()}/${
				date.getMonth() + 1
			}/${date.getFullYear()}`;

			const { tags, ...valuesWithoutTags } = values;
			const updatedValues = {
				...valuesWithoutTags,
				date: formattedDate,
			};
			console.log("Updated Values:", updatedValues);

			const notificationPayload = {
				text: "News Added!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
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
	};

	const handleModalCancel = () => {
		setModalOpen(false);
		const notificationPayload = {
			text: "News Not Added!",
			type: NOTIFICATION_TYPES.ERROR,
		};
		dispatch(displayNotification(notificationPayload));
	};
	const AdminAddNewsStyles = {
		formCotainer: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-between",
			width: "99%",
			border: `1px solid ${theme.palette.fifth.secondary}`,
			backgroundColor: theme.palette.fifth.third,
			minHeight: "100vh",
			height: "fit-content",
			minWidth: "400px",
		},
		form: {
			height: "fit-content",
			minHeight: "90vh",
			width: "100%",
			display: "flex",
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
			backgroundColor: theme.palette.opposite.secondary,
			color: "white",
			cursor: "pointer",
		},
		expandIcon: {
			marginRight: "10px",
		},
		expandedTitle: {
			marginLeft: "10px",
		},
		fieldMargin: {
			marginBottom: screenSize === "medium-s" ? "15px" : "20px",
			width: "98%",
		},
		generalContainer: {
			display: "flex",
			width: "95%",
			flexDirection: "row",
			transition: "0.3s",
		},
		titleDate: {
			display: "flex",
			flexDirection: "column",
			marginBottom: "30px",
			justifyContent: "space-between",
			animation: "expandAnimation 0.2s ease 0s 1 normal forwards",
			height: "fit-content",
			width: "50%",
		},
		generalField: {
			margin: screenSize === "medium-s" ? "10px 0px" : "10px 0px",
		},
		label: {
			display: "flex",
			flexDirection: "column",
		},
		labelp: {
			marginBottom: "3px",
		},
		imageContainer: {
			width: "50%",
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "flex-start",
		},
		image: {
			height: "345px",
			width: "95%",
			marginLeft: "40px",
			marginTop: "50px",
			borderRadius: "10px",
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
			minWidth: "150px",
			height: "80px",
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
			border: `1px solid ${theme.palette.fifth.secondary}`,
			backgroundColor: theme.palette.third.secondary,
			borderRadius: "10px",
			display: "flex",
			flexDirection: "column",
			justifyContent: coverImage ? "center" : "space-evenly",
			alignItems: "center",
			zIndex: 5,
		},
		quill: {
			margin: screenSize === "medium-s" ? "20px 0px" : "15px 0px 50px 0px",
			minHeight: "400px",
			height: "fit-content",
			borderRadius: "5px",
			width: "98%",
			padding:"0px 0px 20px 0px"
		},
		tags: {},
		location: {},

		button: {
			display: "flex",
			justifyContent: "flex-end",

			width: "100%",
			height: "50px",
			backgroundColor: theme.palette.opposite.secondary,
			zIndex: 1000,
		},
		error: {
			color: theme.palette.red.error,
		},
		modalContainer: {
			backgroundColor: theme.palette.primary.opacity40,
			position: "absolute",
			top: 0,
			left: 0,
			height: "100%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 99998,
		},
		modal: {
			position: "absolute",
			backgroundColor: theme.palette.opposite.secondary,
			height: "20vh",
			zIndex: 99999,
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-evenly",
			alignItems: "center",
			boxShadow: "0px 1px 18px 5px rgba(0,0,0,0.65)",
		},
	};

	return (
		<div style={AdminAddNewsStyles.formCotainer}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ isValid, touched, errors }) => (
					<Form style={AdminAddNewsStyles.form}>
						<div style={AdminAddNewsStyles.formFields}>
							<div style={AdminAddNewsStyles.button}>
								<CustomButton
									type="submit"
									disabled={!isValid}
									text="Add News"
									className="hover-button"
									width={"20%"}
									borderRadius={0}
								/>
							</div>

							<div style={AdminAddNewsStyles.generalContainer}>
								<div
									style={{
										...AdminAddNewsStyles.fieldMargin,
										...AdminAddNewsStyles.titleDate,
									}}
								>
									<div style={AdminAddNewsStyles.generalField}>
										<label htmlFor="title" style={AdminAddNewsStyles.label}>
											<p style={AdminAddNewsStyles.labelp}>Title</p>
											<FormikField
												size="small"
												name="title"
												type="text"
												sx={{
													width: "100%",
													height: "40px",
												}}
											/>
										</label>
									</div>
									<div style={AdminAddNewsStyles.generalField}>
										<label htmlFor="date" style={AdminAddNewsStyles.label}>
											<p style={AdminAddNewsStyles.labelp}>Date</p>
											<FormikDatePicker
												size="small"
												name="date"
												today={today}
												sx={{
													width: "100%",
													height: "40px",
												}}
											/>
										</label>
									</div>
									<div
										style={AdminAddNewsStyles.generalField}
										onClick={() => handleLocationClick()}
									>
										<Field name="location" style={AdminAddNewsStyles.location}>
											{({ field, form }) => (
												<div>
													<label
														htmlFor="location"
														style={AdminAddNewsStyles.label}
													>
														<p style={AdminAddNewsStyles.labelp}>Location</p>
														<LocationSelect
															field={field}
															form={form}
															border={
																errors.location
																	? `1px solid ${theme.palette.red.error}`
																	: "1px solid black"
															}
														/>
													</label>
													{errors.location && (
														<div
															style={{
																...AdminAddNewsStyles.error,
																marginLeft: "20px",
																fontSize: "0.8em",
																marginTop: "5px",
																position: "absolute",
															}}
														>
															{errors.location}
														</div>
													)}
												</div>
											)}
										</Field>
									</div>

									<div style={AdminAddNewsStyles.generalField}>
										<label htmlFor="tags" style={AdminAddNewsStyles.label}>
											<p style={AdminAddNewsStyles.labelp}>Tags</p>
											<FormikFieldTag
												onTagsChange={handleTagsChange}
												tags={tags}
												name="tags"
												type="text"
											/>
										</label>
									</div>
								</div>
								<div style={AdminAddNewsStyles.imageContainer}>
									<div style={AdminAddNewsStyles.image}>
										<div style={AdminAddNewsStyles.imageInner}>
											<Field
												type="file"
												name="coverImage"
												id="coverImage"
												label="Cover Image"
												onChange={handleFileChange}
												style={{ display: "none" }}
											/>
											<label
												htmlFor="coverImage"
												style={{ cursor: "pointer" }}
												className="hover"
											>
												{coverImage
													? "Change Cover Image"
													: "Select Cover Image"}
											</label>
										</div>
									</div>
								</div>
							</div>

							<div
								style={AdminAddNewsStyles.expanded}
								onClick={() => toggleExpanded("content")}
								className={"hover-button-darker"}
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
									{errors.content ? "Content Required" : "Content"}
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
					</Form>
				)}
			</Formik>
			{modalOpen && (
				<div style={AdminAddNewsStyles.modalContainer}>
					<div style={AdminAddNewsStyles.modal}>
						<p style={{ color: "white", width: "80%", textAlign: "center" }}>
							You haven't added image or tags. Whould you still like to procced?{" "}
						</p>
						<div
							style={{
								display: "flex",
								justifyContent: "space-evenly",
								width: "80%",
							}}
						>
							<CustomButton
								onClick={handleModalAccept}
								text={"Accept"}
								width={"40%"}
								height={"40px"}
								borderRadius={2}
								color={"black"}
							/>
							<CustomButton
								onClick={handleModalCancel}
								text={"Cancel"}
								width={"40%"}
								height={"40px"}
								borderRadius={2}
								color={"black"}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminAddNews;
