import  {h} from 'preact';
import {useRef, useState} from "preact/compat";

const SelectGroup  = (props)=>{
	const {type="text", children, label, placeholder, options, name, value, onChange} = props
	
	const selectRef = useRef()
	
	const [isFocus, setFocus] = useState(false)
	
	function handleFocus(){
		selectRef.current.click()
		setFocus(true)
		// var evt = event
		selectRef.current.focus();
	}
	
	
	
	return (
		<div className="input-group type_select">
			<label onClick={handleFocus} htmlFor={name}>{label}</label>
			
			<select
				onClick={handleFocus}
				className={[isFocus ? "input-focused" : "input-blur", "input"].join(" ")}
				placeholder={placeholder}
				name={name}
				value={value}
				ref={selectRef}
				onChange={onChange}>
				{ children }
				{ options.map(opt=>(
					<option>{opt.label}</option>
				))}
			</select>
		</div>
	)
}
export default SelectGroup