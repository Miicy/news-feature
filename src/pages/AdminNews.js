import React, { useState } from "react";
import "./pages.css";
import AdminAddNews from "./AdminAddNews";
import AdminPanel from "./AdminPanel";
import { useTheme } from "@emotion/react";
import { Divider } from "@mui/material";
import "../pages/pages.css";

function AdminNews() {
	const theme = useTheme();

	const [adminRoutes, setAdminRoutes] = useState({
		addNews: false,
		adminPanelRender: true,
		other: false,
	});

	const handleOptionClick = (clickedOption) => {
		setAdminRoutes((prevState) => ({
		  ...prevState,
		  addNews: clickedOption === 'addNews',
		  adminPanelRender: clickedOption === 'adminPanelRender',
		  other: clickedOption === 'other',
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
			zIndex:555,
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
          {renderOption('addNews', 'Add News')}
          {renderOption('adminPanelRender', 'All News')}
          <Divider
            sx={{
              ml: 1,
              mr: 1,
            }}
            orientation="horizontal"
            variant="middle"
          />
          {/* {renderOption('other', 'Other')} */}
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
      <div style={{ backgroundColor: theme.palette.secondary.secondary, width: '100%', height: '100%',overflowY: "auto", }}>
        {adminRoutes.addNews && <AdminAddNews />}
        {adminRoutes.adminPanelRender && <AdminPanel />}
        {adminRoutes.other && <div>Other</div>}
      </div>
    </div>
  );
}
export default AdminNews;
