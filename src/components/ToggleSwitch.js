// Filename: ./components/ToggleSwitch.js

import React from "react";
// import '../styles/ToggleSwitch.css';

const ToggleSwitch = ({ label, isChecked, onChange }) => {
return (
	<div className="togglecontainer">
	<p>{label}</p>
	{/* {label}{" "} */}
	<div className="toggle-switch">
		<input type="checkbox" className="checkbox"
			name={label} id={label} checked={isChecked} onChange={onChange} />
		<label className="label" htmlFor={label}>
		<span className="inner" />
		<span className="switch" />
		</label>
	</div>
	</div>
);
};

export default ToggleSwitch;
