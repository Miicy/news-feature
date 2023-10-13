import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { isMobile } from "react-device-detect";

function News() {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const newsPageStyles = {
		container: {
			width: "95%",
		},
		breadcrumbs: {
			width: "100%",
			display: "flex",
			justifyContent: isScreenSmall || isMobile ? "center" : "initial",
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
			</div>
		</div>
	);
}

export default News;
