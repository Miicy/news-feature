import React, { useState } from "react";
import "./pages.css";
import AdminAddNews from "./AdminAddNews";
import AdminPanel from "./AdminPanel";
import { useTheme } from "@emotion/react";
import { Divider } from "@mui/material";
import "../pages/pages.css";
import AdminUpdateNews from "./AdminUpdateNews";

function AdminNews() {
	const theme = useTheme();

	const [adminRoutes, setAdminRoutes] = useState({
		addNews: false,
		adminPanelRender: true,
		updateNews: {
			active: false,
			newsId: null,
			newsObject: null,
		},
	});

	const handleOptionClick = (clickedOption) => {
		setAdminRoutes((prevState) => ({
			...prevState,
			addNews: clickedOption === "addNews",
			adminPanelRender: clickedOption === "adminPanelRender",
			updateNews: clickedOption === "updateNews",
		}));
	};

	const innerPageContainerAdmin = {
		width: "100%",
		height: "100vh",
		display: "flex",
		flexDirection: "row",
	};

	const AdminSidebarStyles = {
		container: {
			height: "100vh",
			width: "15%",
			minWidth: "150px",
			backgroundColor: theme.palette.opposite.main,
			display: "flex",
			flexDirection: "column",
			overflowY: "auto",
			zIndex: 150,
		},
		options: {
			height: "80px",
			color: theme.palette.primary.main,
		},
		optionsInner: {
			zIndex: 50,
			height: "100%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			cursor: "pointer",
		},
		linkActive: {
			color: "#ef5350",
			height: "100%",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			cursor: "pointer",
		},
	};
	const renderOption = (optionName, displayName) => (
		<div
			key={optionName}
			className="hover-red"
			style={{
				...(adminRoutes[optionName]
					? AdminSidebarStyles.linkActive
					: AdminSidebarStyles.optionsInner),
			}}
			onClick={() => handleOptionClick(optionName)}
		>
			{displayName}
		</div>
	);

	return (
		<div style={innerPageContainerAdmin}>
			<div style={AdminSidebarStyles.container}>
				<div style={AdminSidebarStyles.options}>
					{renderOption("adminPanelRender", "All News")}
					{renderOption("addNews", "Add News")}

					<Divider
						sx={{
							ml: 1,
							mr: 1,
						}}
						orientation="horizontal"
						variant="middle"
					/>
					{adminRoutes.updateNews.active && (
						<>
							{renderOption("updateNews", "Update News")}
							<Divider
								sx={{
									ml: 1,
									mr: 1,
								}}
								orientation="horizontal"
								variant="middle"
							/>
						</>
					)}
				</div>
				<Divider
					sx={{
						ml: 1,
						mr: 1,
					}}
					orientation="horizontal"
					variant="middle"
				/>
			</div>
			<div
				style={{
					backgroundColor: theme.palette.secondary.secondary,
					width: "100%",
					height: "100%",
					overflowY: "auto",
				}}
			>
				{adminRoutes.adminPanelRender && (
					<AdminPanel setAdminRoutes={setAdminRoutes} />
				)}
				{adminRoutes.addNews && (
					<AdminAddNews setAdminRoutes={setAdminRoutes} />
				)}
				{adminRoutes.updateNews && (
					<AdminUpdateNews adminRoutes={adminRoutes} setAdminRoutes={setAdminRoutes} />
				)}
			</div>
		</div>
	);
}
export default AdminNews;
