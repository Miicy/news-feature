import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import "../../pages/pages.css";

function BreadcrumbsPage({ second, secondUrl, third, thirdUrl, link, home }) {
	const screenSize = useSelector(selectScreenSize);

	const BreadcrubmbsStyles = {
		container: {
			fontSize:
				isMobile || screenSize === "small"
					? "0.8em"
					: screenSize === "medium"
					? "0.95em"
					: "1em",
			marginBottom: isMobile && screenSize === "small" ? "10px" : "15px",
			marginTop: "20px",
		},
		p:{
			height:"50px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}
	};
	return (
		<div>
			{home ? (
				<p style={{...BreadcrubmbsStyles.p,  ...BreadcrubmbsStyles.container}}>Home</p>
			) : (
				<Breadcrumbs aria-label="breadcrumb" sx={BreadcrubmbsStyles.container}>
					<Link color="inherit" href="/" className="hover">
						Home
					</Link>
					{second && (
						<Link color="inherit" href={`/${secondUrl}`} className="hover">
							{second}
						</Link>
					)}
					{third && (
						<Link color="inherit" href={`/${thirdUrl}`} className="hover">
							{third}
						</Link>
					)}
					<p color="textPrimary">{link}</p>
				</Breadcrumbs>
			)}
		</div>
	);
}

export default BreadcrumbsPage;
