function NewsContainer({ layoutColumn }) {
	const newsContainerStyles = {
		container: {
			width: layoutColumn ? "100%" : "20%",
            height:"200px",
            backgroundColor:"blue",
		},
	};
	return <div style={newsContainerStyles.container}>NewsContainer</div>;
}

export default NewsContainer;
