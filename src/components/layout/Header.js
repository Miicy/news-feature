import { Tooltip, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";

import { selectScreenSize } from "../../store/reducers/layoutSlice";
import "../../pages/pages.css";

function Header() {
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	const screenSize = useSelector(selectScreenSize);
	const headerStyles = {
		nav: {
			position: "relative",
			height: "80px",
			width: "100%",
			minWidth: screenSize === "small" || isMobile ? "300px" : "500px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			boxShadow:
				"inset 0px 10px 31px 3px rgba(0,0,0,0.34),0px 5px 21px 0px rgba(0,0,0,0.71)",
			zIndex: 100,
			borderBottom: `1.5px solid ${theme.palette.forth.main}`,
			fontSize:
				screenSize === "large"
					? "1.2em"
					: screenSize === "medium"
					? "1em"
					: screenSize === "medium-s"
					? "0.9em"
					: "1.2em",
			transition: "0.2s",
		},
		navContainer: {
			width: "90%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		logo: {
			display: "inline-block",
			width: "10%",
			cursor: "pointer",
			color: theme.palette.opposite.main,
			fontWeight: "700",
			fontSize:
				screenSize === "large"
					? "1.9em"
					: screenSize === "medium"
					? "1.7em"
					: screenSize === "medium-s"
					? "1.5em"
					: "1.3em",
			transition: "0.3s",
			marginLeft: screenSize === "small" || isMobile ? "30px" : "0",
			display: "flex",
			justifyContent: "flex-start",
			marginLeft: "20px",
		},
		navUl: {
			padding: "0",
			height: "100%",
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
		},
		navLi: {
			margin:
				screenSize === "large"
					? "0 30px"
					: screenSize === "medium"
					? "0 25px"
					: screenSize === "medium-s"
					? "0"
					: "0",
			cursor: "pointer",
			color: theme.palette.opposite.main,
			fontWeight: "450",
			width: "100px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		linkActive: {
			transition: "0.1s",
			color: theme.palette.red.main,
			fontWeight: "600",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: screenSize === "small" || isMobile ? "fit-content" : "100px",
			height: screenSize === "small" || isMobile ? "initial" : "80px",
			borderBottom: `2.5px solid ${theme.palette.red.main}`,
		},
	};

	return (
		<nav style={headerStyles.nav}>
			<div style={headerStyles.navContainer}>
				<ul style={headerStyles.navUl}>
					<li style={headerStyles.navLi}>
						<p
							className={window.location.pathname === "/" ? "" : "hover"}
							onClick={() => navigate("/")}
							style={{
								...(window.location.pathname === "/" &&
									headerStyles.linkActive),
							}}
						>
							News
						</p>
					</li>
					<li style={headerStyles.navLi}>
						<p
							className={ window.location.pathname.startsWith("/admin") ? "" : "hover"}
							onClick={() => navigate("/admin")}
							style={{
								...(window.location.pathname.startsWith("/admin") &&
									headerStyles.linkActive),
							}}
						>
							Admin
						</p>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
