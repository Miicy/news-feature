import Link from "@mui/material/Link";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
function BreadcrumbsPage({ second, link }) {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const isScreenMediumSmaller = useMediaQuery("(max-width: 800px)");
	const isScreenMedium = useMediaQuery("(max-width: 1200px)");
	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			sx={{
				fontSize:
					isMobile || isScreenSmall
						? "0.85em"
						: isScreenMedium
						? "0.95em"
						: "1em",
			}}
		>
			<Link color="inherit" href="/">
				Home
			</Link>
			{second && (
				<Link color="inherit" href={`/${second}`}>
					{second}
				</Link>
			)}
			<p color="textPrimary">{link}</p>
		</Breadcrumbs>
	);
}

export default BreadcrumbsPage;
