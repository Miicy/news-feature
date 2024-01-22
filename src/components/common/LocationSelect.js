import React, { useEffect, useState } from "react";
import Select from "react-select";

function LocationSelect({ field, form, border }) {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	useEffect(() => {
		fetch(
			"https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code",
		)
			.then((response) => response.json())
			.then((data) => {
				setCountries(data.countries);
				setSelectedCountry(data.userSelectValue);
			});
	}, []);

	const customStyles = {
		control: (provided) => ({
			...provided,
			borderRadius: "10px",
			minHeight: "40px",
			boxShadow: "none",
			border: border,
			"&:hover": {
				border: "1px solid black",
			},
			backgroundColor: "#f5f5f5",
			height: "40px",
		}),
		option: (provided, state) => ({
			...provided,
			color: "black",
			zIndex: 50,
		}),
		menu: (provided) => ({
			...provided,
			zIndex: 50,
		}),
	};

	const handleCountryChange = (selectedOption) => {
		setSelectedCountry(selectedOption);
		form.setFieldValue(field.name, selectedOption.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
		  event.preventDefault();
		}
	  };
	

	return (
		<Select
			options={countries}
			value={selectedCountry}
			onChange={handleCountryChange}
			styles={customStyles}
			onKeyDown={handleKeyDown}
		/>
	);
}

export default LocationSelect;
