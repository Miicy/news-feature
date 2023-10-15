import Link from "@mui/material/Link";
import { Breadcrumbs } from "@mui/material";
function BreadcrumbsPage({link}) {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" href="/">
				Home
			</Link>
			<p color="textPrimary">{link}</p>
		</Breadcrumbs>
	);
}

export default BreadcrumbsPage;
