import {PureComponent} from "preact/compat";
import InputGroup from "../components/InputGroup";
import SelectGroup from "../components/SelectGroup";
import {connect} from "../context/AppContext";
import slugify from "../utils/sligify";
import {getLessonById} from "../actions";
import {h} from "preact"
import {route } from "preact-router"

class AddNewLesson extends PureComponent {
	
	constructor() {
		super();
		this.state = {
			lessonData: {
				text: "",
				label: "",
				lessonSection: ""
			}
		}
		
		this.handleChange = this.handleChange.bind(this)
		this.handleAddLesson = this.handleAddLesson.bind(this)
		this.resetState = this.resetState.bind(this)
	}
	
	
	componentDidMount() {
		this.initialPopulateData()
	}
	
	initialPopulateData(){
		const { lessonSection, id, state } = this.props
		if(state.lessons && lessonSection !== "null" && id !== "null"){
			let lesson = getLessonById(state.lessons,  lessonSection, id)
			
			if(lesson){
				this.setState({
					...this.state,
					lessonData: {
						...this.state.lessonData,
						text: lesson.text,
						label: lesson.label,
						lessonSection: lessonSection
					}
				})
			}
		}
	}
	
	resetState(){
		this.setState({
			lessonData: {
				text: "",
				label: "",
				lessonSection: ""
			}
		})
	}
	
	componentDidUpdate(previousProps, previousState, snapshot) {
		if(previousProps.state.lessons !== this.props.state.lessons){
			this.initialPopulateData()
		}
	}
	
	update(data, state, id){
		
		let lessons = [...state.lessons]
		let sectionIndex = lessons.findIndex(les=>les.label === data.lessonSection)

		if(sectionIndex !== -1){
			let itemIndex = lessons[sectionIndex].items.findIndex(item=>item.id === id)
			let item = lessons[sectionIndex].items[itemIndex]
			item.label = slugify(data.label)
			item.text = data.text
		}
		
		return {
			favoriteLessons: state.favoriteLessons,
			lessons: lessons
		}
	}
	
	newAdd(data, state){
		let newLesson = {
			id: Date.now().toString(),
			label: slugify(data.label),
			text: data.text,
		}
		
		let lessons = [...state.lessons]
		let sectionIndex = lessons.findIndex(les=>les.label === data.lessonSection)
		if(sectionIndex === -1){
			// create a new section
			lessons.push({
				label: data.lessonSection,
				items: [newLesson]
			})
		} else {
			// push existing section
			lessons[sectionIndex].items.push(newLesson)
		}

		return {
			favoriteLessons: state.favoriteLessons,
			lessons: lessons
		}
	}
	
	handleAddLesson(e){
		e.preventDefault();
		
		const { lessonSection, id } = this.props
		
		let message = ""
		const data = this.state.lessonData
		let isComplete = true;
		for (let dataKey in data) {
			if(!data[dataKey]){
				message = "please put value in " + dataKey
				isComplete = false
			}
		}
		if(!isComplete){
			return Android.showToast(message)
		}
		

		let result_message = "new lesson are created..."
		let updatedLessons = []
		
		if(lessonSection !== "null" && id !== "null"){
			updatedLessons = this.update(data, this.props.state, id)
			result_message = "lesson are updated..."
		} else {
			updatedLessons = this.newAdd(data, this.props.state)
		}
		let isOk = Android.addLesson(JSON.stringify(updatedLessons))
		if(isOk){
			this.props.setState(updatedLessons)
			Android.showToast(result_message)
			route("/")
		}
	}
	
	handleChange(e){
		const {name, value, type} = e.target
		this.setState({
			...this.state,
			lessonData:{
				...this.state.lessonData,
				[name]: value
			}
		})
	}
	
	render() {
	
		return (
			<div>
				<h1 className="text-center text-lg text-dark font-medium">Add New Lesson</h1>
				
				<form onSubmit={this.handleAddLesson}>
					<SelectGroup
						options={this.props.state?.lessons ? this.props.state?.lessons : [] }
						onChange={this.handleChange}
						name="lessonSection"
						value={this.state.lessonData.lessonSection}
						label="Select lesson section" >
						<option value="">Select a section</option>
					</SelectGroup>
					
					<div className="mt-8" />
					<InputGroup
						onChange={this.handleChange}
						name="label"
						value={this.state.lessonData.label}
						label="Enter lesson title"
					/>
					
					<div className="mt-8" />
					<InputGroup
						onChange={this.handleChange}
						name="text"
						value={this.state.lessonData.text}
						label="Enter lesson Text"
					/>
					
					<div className="mt-8" />
					<button className="btn btn-primary">Add </button>
				</form>
				
				
			</div>
		);
	}
}


AddNewLesson.propTypes = {};
export default connect(AddNewLesson);