import React, { useEffect, useState } from "react";
import Select from "react-select";

function LocationSelect({ field, form, border }) {
	const [countries, setCountries] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	useEffect(() => {
		fetch(
		  "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
		)
		  .then((response) => response.json())
		  .then((data) => {
			setCountries(data.countries);
			
			// Check if the field value is not set, then set the initial value
			if (!field.value) {
			  setSelectedCountry(data.userSelectValue);
			  form.setFieldValue(field.name, data.userSelectValue.value);
			} else {
			  // If the field value is already set, find the corresponding option
			  const selectedOption = data.countries.find(
				(option) => option.value === field.value
			  );
			  setSelectedCountry(selectedOption);
			}
		  });
	  }, [field.name, field.value, form]);
	  
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
