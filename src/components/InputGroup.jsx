import  {h} from 'preact';
import React, {useEffect, useState} from "preact/compat";

const InputGroup  = (props)=>{
	const {type="text", label, placeholder, name, value, onChange} = props
	
	const [isFocus, setFocus] = useState(false)
	
	useEffect(() => {
		if(value) {
			setFocus(true)
		}
	}, [value]);
	
	return (
		<div className="input-group">
			<label onClick={()=>setFocus(true)} htmlFor={name}>{label}</label>
			
			<input
				onClick={()=>setFocus(true)}
				className={[isFocus ? "input-focused" : "input-blur", "input"].join(" ")}
				type={type}
				id={name}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
		</div>
	)
}
export default InputGroup