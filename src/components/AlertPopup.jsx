import {h} from "preact"
import {useContext, useState} from "preact/compat";



function AlertPopup({onChange, message}) {

	return (
		<div className="alert-box">
			<h4>{message}</h4>
			<div className="buttons">
				<button onClick={()=>onChange(true)}>Yes</button>
				<button onClick={()=>onChange(false)}>No</button>
			</div>
			
		</div>
	)
	
}
export default AlertPopup