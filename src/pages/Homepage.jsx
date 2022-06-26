import {h} from "preact"
import AppContext, {connect} from "../context/AppContext";
import React, {useContext, useState} from "preact/compat";
import {Link} from "preact-router"
import AlertPopup from "../components/AlertPopup";
import {deleteLesson} from "../actions";

function HomePage(props){
	const [ context, setContext ] = useState("all") // love
	
	const [ popupData, setPopupData ] = useState({
		status: false,
		data: {}
	}) // love
	
	const [showSections, setShowIds] = React.useState([])
	
	
	const appContext = useContext(AppContext);
	
	function changeItem(){
		setContext(context === "all" ? "love" : "all")
	}
	
	function togglePopup(lesson){
		setPopupData({
			status: true,
			data: lesson
		})
	}
	
	function sections(ids, lesson){
		return (
			<div className="bg-primary-400">
				{ids.indexOf(lesson.label) !== -1 && lesson.items && lesson.items.map(item=>(
					<li className="lesson_link">
						<Link className="" href={`#/play/${lesson.label}/${item.label}`}>{item.label}</Link>
						<div className="action_icons">
							<svg onClick={()=>togglePopup({
								lessonSection: lesson.label,
								id: item.id
							})} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/></svg>
							<Link href={`#/add-new-lesson/${lesson.label}/${item.id}`}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg>
							</Link>
						
						</div>
					</li>
				))}
			</div>
		)
	}
	
	function toggleCollapse(label){
		let updatedShowSections = [...showSections]
		let a=  updatedShowSections.indexOf(label)
		if(a === -1) {
			updatedShowSections.push(label)
		} else {
			updatedShowSections.splice(a, 1)
		}
		setShowIds(updatedShowSections)
	}
	
	function renderAllLesson(){
		return appContext.state.lessons &&  appContext.state.lessons.length > 0 && (
			
			<div>
				{ appContext.state.lessons.map(lesson=>(
					<div className="p-5 my-4">
						<h4 onClick={(e)=>toggleCollapse(lesson.label)} className="font-medium my-1">{lesson.label}</h4>
						<div className="mt-4">
							{sections(showSections, lesson)}
						</div>
					</div>
				
				)) }
			</div>
		)
	}
	
	
	function renderFavoriteLesson(){
		return <div>
			{ appContext.state.favoriteLessons.map(lesson=>(
				<div className="p-5 my-1">
					<li className="lesson_link">
						<Link className="" href={`#/play/favorite/${lesson.label}`}>{lesson.label}</Link>
					</li>
				</div>
			)) }
		</div>
	}
	
	
	function handleAlertChoose(isTrue){
		if(isTrue){
			
			// delete lesson
			const { lessonSection, id} = popupData.data
			let result = deleteLesson(props.state.lessons, lessonSection, id)
			if(result) {
				let updatedLessons = {
					lessons: result,
					favoriteLessons: props.state.favoriteLessons
				}
				
				let isOk = Android.addLesson(JSON.stringify(updatedLessons))
				setPopupData({status: false})
				if(isOk) {
					this.props.setState(updatedLessons)
					Android.showToast("delete successfully...")
					route("/")
				}
			}
		} else {
			setPopupData({status: false})
		}
	}
	
	return(
		<div>
			
			{popupData.status && <AlertPopup message="Are you sure to delete ?" onChange={handleAlertChoose} /> }
			
			<div className="lesson_tabs">
				<div onClick={changeItem} className={["lesson_tabs__item", context === "all" ? "lesson_active": ""].join(" ")}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"/></svg>
					All Lessons
				</div>
				<div onClick={changeItem} className={["lesson_tabs__item", context === "love" ? "lesson_active": ""].join(" ")}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>
					Favorite
				</div>
			</div>
			<div>
				{ context === "all" ? renderAllLesson() : renderFavoriteLesson()  }
			</div>
			
		</div>
	)
}

export default connect(HomePage)