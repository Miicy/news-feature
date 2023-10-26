import { Tooltip, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import MenuIcon from "@mui/icons-material/Menu";
import ModalMenu from "../common/ModalMenu";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveTheme,
	setThemeMode,
} from "../../store/reducers/userSlice";
import ModeLightIcon from "@mui/icons-material/Brightness4";
import ModeDarkIcon from "@mui/icons-material/Brightness7";
import { selectScreenSize } from "../../store/reducers/layoutSlice";

function Header() {
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	const screenSize = useSelector(selectScreenSize);
	
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prevMenuOpen) => !prevMenuOpen);
	};

	const themeMode = useSelector(selectActiveTheme);

	const headerStyles = {
		nav: {
			position: "relative",
			fontSize: "1.2em",
			background: `${theme.palette.primary.main}`,
			height: "80px",
			width: "100%",
			minWidth: screenSize === "small" || isMobile ? "300px" : "500px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			boxShadow:
				"inset 0px 10px 31px 3px rgba(0,0,0,0.34),0px 5px 21px 0px rgba(0,0,0,0.71)",
			zIndex: 100,
			borderBottom: `1px solid ${theme.palette.opposite.main}`,
		},
		navContainer: {
			width: "85%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		logo: {
			display: "inline-block",
			width: "10%",
			cursor: "pointer",
			color: `${theme.palette.opposite.main}`,
			fontWeight: "700",
			fontSize: "1.5em",
			marginLeft: screenSize === "small" || isMobile ? "30px" : "0",
			display: "flex",
			justifyContent: "center",
			marginLeft: "20px",
		},
		navUl: {
			padding: "0",
			height: "100%",
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "center",
			fontSize: screenSize === "small" || isMobile ? "1em" : "initial",
		},
		navLi: {
			margin: "0 30px",
			cursor: "pointer",
			color:`${theme.palette.opposite.main}`,
			fontWeight: "450",
			width: "100px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		linkActive: {
			transition: "0.5s",
			color: `${theme.palette.red.main}`,
			fontWeight: "500",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100px",
			height: screenSize === "small" || isMobile ? "initial" : "80px",
			borderBottom: screenSize === "small" || isMobile ? "none" : `1px solid ${theme.palette.red.main}`,
		},
		iconContainer: {
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
		},
		icon: {
			marginRight: "5%",
			fontSize: "1.5em",
			color: "white",
			cursor: "pointer",
		},
		modal: {
			height: "100%",
			width: "100%",
			position: "absolute",
			marginTop: "125px",
			zIndex: 1,
		},
		modeContainer: {
			m: "10px",
			"&:hover": {
				color: theme.palette.text.secondary,
			},
		},
		mode: {
			fontSize: "1.5em",
			cursor: "pointer",
			color:`${theme.palette.opposite.main}`
		},
	};

	return (
		<nav style={headerStyles.nav}>
			<div style={headerStyles.navContainer}>
				<p style={headerStyles.logo} onClick={() => navigate("/")}>
					LOGO
				</p>
				{screenSize !== "small" || isMobile ? (
					<ul style={headerStyles.navUl}>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/")}
								style={{
									...(window.location.pathname === "/" &&
										headerStyles.linkActive),
								}}
							>
								Home
							</p>
						</li>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/news")}
								style={{
									...(window.location.pathname === "/news" &&
										headerStyles.linkActive),
								}}
							>
								News
							</p>
						</li>
						<li style={headerStyles.navLi}>
							<p
								className="hover"
								onClick={() => navigate("/contact")}
								style={{
									...(window.location.pathname === "/contact" &&
										headerStyles.linkActive),
								}}
							>
								Contact
							</p>
						</li>
						<li style={headerStyles.navLi}>
							<div style={headerStyles.modeContainer}>
								<Tooltip
									title={themeMode === "light" ? "Dark Mode" : "Light Mode"}
								>
									<div onClick={() => dispatch(setThemeMode())}>
										{themeMode === "light" ? (
											<ModeLightIcon style={headerStyles.mode} />
										) : (
											<ModeDarkIcon style={headerStyles.mode} />
										)}
									</div>
								</Tooltip>
							</div>
						</li>
					</ul>
				) : (
					<div style={headerStyles.iconContainer}>
						<MenuIcon
							className="hover"
							sx={headerStyles.icon}
							onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
						/>
					</div>
				)}
			</div>
			{menuOpen && screenSize === "small" && (
				<div style={headerStyles.modal}>
					<ModalMenu
						headerStyles={headerStyles}
						menuOpen={menuOpen}
						toggleMenu={toggleMenu}
					/>
				</div>
			)}
		</nav>
	);
}

export default Header;
