import { useNavigate } from "react-router-dom";
import ModeLightIcon from "@mui/icons-material/Brightness4";
import ModeDarkIcon from "@mui/icons-material/Brightness7";
import {
	selectActiveTheme,
	setThemeMode,
} from "../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Tooltip } from "@mui/material";
import { useTheme } from "@emotion/react";

function ModalMenu({ headerStyles, menuOpen, toggleMenu }) {
	const themeMode = useSelector(selectActiveTheme);
	const dispatch = useDispatch();
	const theme = useTheme();

	const modalMenuStyles = {
		...headerStyles,
		container: {
			marginTop: "18px",
			backgroundColor: `${theme.palette.secondary.main}`,
			height: "85vh",
			width: "100%",
			boxShadow: "inset 0px 5px 31px 3px rgba(0,0,0,0.34)",
			fontWeight: "500",
			display:"flex",
			flexDirection:"column",
			justifyContent:"center",
			
		},
		navUl: {
			...headerStyles.navUl,
			flexDirection: "column",
			justifyContent: "flex-start",
			height: "100%",
		},
		navLi: {
			...headerStyles.navLi,
			margin: "40px 0",
			fontWeight: "400",
		},
		modeContainer:{
			backgroundColor: `${theme.palette.primary.main}`,
			width:"100%",
			display:"flex",
			flexDirection: "column",
			alignItems: "center",
		},
		modeText:{
			color: `${theme.palette.opposite.main}`,
		},
	};

	const navigate = useNavigate();

	return (
		<div style={modalMenuStyles.container}>
			<ul style={modalMenuStyles.navUl}>
				<li style={modalMenuStyles.navLi}>
					<p
						className="hover"
						onClick={() => {
							navigate("/");
							toggleMenu();
						}}
						style={{
							...(window.location.pathname === "/" &&
								headerStyles.linkActive),
						}}
					>
						News
					</p>
				</li>
				<li style={modalMenuStyles.navLi}>
					<p
						className="hover"
						onClick={() => {
							navigate("/admin");
							toggleMenu();
						}}
						style={{
							...(window.location.pathname === "/admin" &&
								headerStyles.linkActive),
						}}
					>
						Contact
					</p>
				</li>
				
			</ul>
		</div>
	);
}

export default ModalMenu;
