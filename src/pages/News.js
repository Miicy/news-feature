import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import NewsContainer from "../components/common/NewsContainer";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import ViewModuleIcon from "@mui/icons-material/ViewModule";


function News() {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const [layoutColumn, setLayoutColumn] = useState(true);

	const toggleLayoutColumn = () => {
		setLayoutColumn(!layoutColumn); 
	  };

	const newsPageStyles = {
		container: {
			width: "95%",
		},
		breadcrumbs: {
			width: "100%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		layout: {
			width: "65px",
			height: "32px",
			display: "flex",
			justifyContent: layoutColumn ? "flex-start" : "flex-end",
			alignItems: "center",
			border: "1px solid grey",
			borderRadius: "20px",
			cursor: "pointer",
		},
		layoutCircle:{
			backgroundColor: "grey",
			borderRadius: "20px",
			display:"flex",
			justifyContent: "center",
			alignItems: "center",

		},
		layoutIcon: {
			marginLeft: layoutColumn ? "10%" : "0",
			marginRight: layoutColumn ? "0" : "10%",
			margin:"5px"
		},
		news: {
			width: "100%",
			minHeight: "80%",
			backgroundColor: "grey",
		},
	};
	return (
		<div style={newsPageStyles.container}>
			<div style={newsPageStyles.breadcrumbs}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" href="/">
						Home
					</Link>
					<p color="textPrimary">News</p>
				</Breadcrumbs>
				<div style={newsPageStyles.layout} onClick={toggleLayoutColumn}>
					{layoutColumn ? (
						<div style={newsPageStyles.layoutCircle}>
						<ViewHeadlineIcon
							sx={newsPageStyles.layoutIcon}
						/>
						</div>
					) : (
						<div style={newsPageStyles.layoutCircle}>
						<ViewModuleIcon
							sx={newsPageStyles.layoutIcon}
						/>
						</div>
					)}
				</div>
			</div>
			<div style={newsPageStyles.news}>
				<NewsContainer layoutColumn={layoutColumn} />
			</div>
		</div>
	);
}

export default News;
