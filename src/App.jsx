import {useContext, useEffect} from "preact/compat";
import AppContext, {connect} from "./context/AppContext";
import  {h} from 'preact';
import Router, {Route} from "preact-router";
import HomePage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import AddNewLesson from "./pages/AddNewLesson";
import Play from "./pages/Play";
import TopNavigation from "./components/TopNavigation";
const le = import("./lessons.js")
import {createHashHistory} from "history"
import {getLessonsApi} from "./actions";
import backend from "./api";


const App = ()=>{
	const appContext = useContext(AppContext);
	
	useEffect(async ()=>{
		
		// fetch("http://localhost:8888/.netlify/functions/api/categories")
		fetch(backend + "/categories")
			.then(res=>res.json())
			.then(res=>{
				appContext.setState({categories: res})
		}).catch(ex=>{
			console.log(ex)
		})
		
		let les = await le
		let lessons = les.default

		appContext.setState({lessons: lessons.lessons, favoriteLessons: lessons.favorite})

		
		// console.log(lessons)
	}, [])
	
	
	return (
		<div className="content mt-20">
			
			<div className="circle-3"></div>
			<div className="circle-2"></div>
			<div className="circle-1"></div>
			
			{appContext.state.lesson &&	<div className="lesson-title">({appContext.state.lesson.nextLessonIndex}) {appContext.state.lesson.label}</div> }
		
			<div className="content-glass mt-10 ">
				
				{/*<button className="bg-primary-400 m-10" onClick={handleClick}>Click</button>*/}
				<TopNavigation state={appContext.state} setState={appContext.setState} />
				<Router  history={createHashHistory()}  >
					<Route index={true} path="/" component={HomePage} />
					<Route index={true} path="/about" component={AboutPage} />
					<Route index={true} path="/add-new-lesson/:lessonSection/:id" component={AddNewLesson} />
					<Route index={true} path="/play/:catId/:lessonId" component={Play} />
					{/*<AsyncRoute*/}
					{/*  path="/login"*/}
					{/*  getComponent={() => import('./pages/LoginPage').then(module => module.default).catch(err=>{})}*/}
					{/*  loading={<h1>sad</h1>}*/}
					{/*/>*/}
				</Router>
				
				{/*<BottomNavigation/>*/}
			
			</div>
		</div>
	)
}



export default App