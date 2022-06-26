import backend from "../api";

export async function getLesson(catLessons, catId, lessonId, nextIndex = -1){
	return new Promise((async (resolve, reject) => {
		try{
			let newState = {
				catLessons: null,
				lesson: {}
			}
			let updatedCatLessons = {...catLessons}
			if(nextIndex !== -1){
				
					if(!catLessons[catId]) {
						let fetchCatLessons = await getLessonsApi(catId)
						if(fetchCatLessons){
							updatedCatLessons[catId] = fetchCatLessons
							newState.catLessons = updatedCatLessons
							
							if(fetchCatLessons.length > nextIndex){
								let lesson = fetchCatLessons[nextIndex + 1]
								if(lesson) {
									newState.lesson = lesson
									newState.lesson.nextLessonIndex = nextIndex + 1
								}
							} else {
								newState.lesson = fetchCatLessons[0]
								newState.lesson.nextLessonIndex = 1
							}
						}
					
						resolve(newState)
					} else {
						if(catLessons.length > nextIndex){
							let lesson = catLessons[nextIndex + 1]
							if(lesson) {
								newState.lesson = lesson
								newState.lesson.nextLessonIndex = nextIndex + 1
							}
						} else {
							newState.lesson = catLessons[0]
							newState.lesson.nextLessonIndex = 1
						}
					}
					resolve(newState)
				
				
			} else {
				
				if(!catLessons[catId]){
					let l = await getLessonsApi(catId)
					if(l){
						updatedCatLessons[catId] = l
						newState.catLessons = updatedCatLessons
					}
					let lessonIndex = l.findIndex(lesson=>lesson._id === lessonId)
					if(lessonIndex !== -1){
						newState.lesson = l[lessonIndex]
						newState.lesson.nextLessonIndex = lessonIndex + 1
					}

				} else {
					let lessonIndex = catLessons[catId].findIndex(lesson=>lesson._id === lessonId)
					if(lessonIndex !== -1){
						newState.lesson = catLessons[catId][lessonIndex]
						newState.lesson.nextLessonIndex = lessonIndex + 1
					}
				}
			}
			resolve(newState)
			
		} catch (ex){
		
		}
	}))
	

	
	// if (lessonSection) {
	// 	let secIndex = lessonsArr.findIndex(sec => sec.label === lessonSection)
	//
	// 	if (nextIndex !== -1) {
	// 		let nextLesson = lessonsArr[secIndex].items[nextIndex]
	// 		lesson = {
	// 			...nextLesson,
	// 			lessonSection: lessonsArr[secIndex].label,
	// 			nextLessonIndex: (nextIndex + 1) < lessonsArr[secIndex].items.length ? nextIndex + 1 : 0
	// 		}
	// 	} else {
	// 		let lessonIndex = lessonsArr[secIndex].items.findIndex(lesson => lesson.label === lessonName)
	// 		lesson = {
	// 			...lessonsArr[secIndex].items[lessonIndex],
	// 			lessonSection: lessonsArr[secIndex].label,
	// 			nextLessonIndex: (lessonIndex + 1) < lessonsArr[secIndex].items.length ? lessonIndex + 1 : 0
	// 		}
	// 	}
	//
	// } else {
	//
	// 	lessonsArr.map(eachLess => {
	// 		if (nextIndex !== -1) {
	// 			lesson = {
	// 				...eachLess.items[nextIndex],
	// 				lessonSection: eachLess.label,
	// 				nextLessonIndex: (nextIndex + 1) < eachLess.items.length ? nextIndex + 1 : 0
	// 			}
	// 		} else {
	// 			let a = eachLess.items.findIndex(lesson => lesson.label === lessonName)
	// 			if (a !== -1) {
	// 				lesson = {
	// 					...eachLess.items[a],
	// 					lessonSection: eachLess.label,
	// 					nextLessonIndex: (a + 1) < eachLess.items.length ? a + 1 : 0
	// 				}
	// 			}
	// 		}
	// 	})
	// }
	return lesson
}

export function getLessonById(lessonsArr, lessonSection, lessonId){
	let lesson = null
	
	let sectionIndex  = lessonsArr.findIndex(les=>les.label === lessonSection)
	if(sectionIndex !== -1){
		let sections = lessonsArr[sectionIndex]
		lesson = sections.items.find(item=>item.id === lessonId)
	}
	return lesson
}


export function getLessonFavorite(lessonsArr,  lessonName, nextIndex = -1){
	let lesson;
	if(lessonsArr) {
		let index=	lessonsArr.findIndex(l => l.label === lessonName)

		if(index !== -1){
			lesson = {
				...lessonsArr[index],
				lessonSection: "favorite",
				nextLessonIndex: index
			}
		}
	}
	return lesson
}


export function toggleAddToFavorite(favoriteLessons, lesson){
	
	if(!lesson.id){
		favoriteLessons.push(lesson)
	} else {
		let index = favoriteLessons.findIndex(fv => fv.id === lesson.id);
		if (index !== -1) {
			favoriteLessons.splice(index, 1)
		} else {
			favoriteLessons.push(lesson)
		}
	}
	return favoriteLessons;
}

export function addToLesson(lessons, lesson) {
	lessons.push(lesson)
	return lessons
}


export function deleteLesson(lessons, lessonSection, lessonId){
	let index = lessons.findIndex(les=>les.label === lessonSection)
	if(index !== -1){
		let sub = lessons[index]
		if(sub){
			lessons[index].items = sub.items.filter(lesson => lesson.id !== lessonId)
			return lessons
		} else {
			return false
		}
	} else {
		return false
	}
}



export function getLessonsApi(catId){
	return new Promise(((resolve, reject) => {
		fetch(backend + "/lessons", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				catId: catId
			}),
		}).then(res=>res.json()).then(res=>{
			resolve(res)
		})
	}))
}