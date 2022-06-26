import  {h} from 'preact';
// import {re} from "preact"


const PreviewMode = (props)=>{

	
	return (
		<div className="">
			<div className="mobile-frame">
				<div className="inner">
					
					<div>
						{ props.children }
					
					</div>
					
				
					
		
				
				</div>
				<div className="bottom_bar"></div>
			</div>
		</div>
	)
}
export default PreviewMode