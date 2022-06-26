
import {h} from "preact"
import {Link} from "preact-router"

const BottomNavigation = (props)=>{
		return (
			<div className="bottom_navigation">
				<ul>
					<li><button className="btn gradient-1"><Link href="/">Home</Link></button></li>
					<li><button className="btn gradient-1"><Link href="/add-post">Add Post</Link></button></li>
					<li><button className="btn gradient-1">Profile</button></li>
					<li><button className="btn gradient-1"><Link href="/add-new-lesson">AddLesson</Link></button></li>
					<li><button className="btn gradient-1"><Link href="/play/1/2">Play</Link></button></li>
				</ul>
			</div>
		)
	
}

export default BottomNavigation