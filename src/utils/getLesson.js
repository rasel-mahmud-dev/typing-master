// import le from "../lessons.js";
//
// function getLesson(lessonName, sectionName, lessonName, nextIndex = -1) {
//     if(!lessons){
//       lessons = le
//     }
//
//     let lesson = null
//     if (sectionName) {
//         let secIndex = lessons.findIndex(sec => sec.label === sectionName)
//
//         if (nextIndex !== -1) {
//             let nextLesson = lessons[secIndex].items[nextIndex]
//             lesson = {
//                 ...nextLesson,
//                 sectionName: lessons[secIndex].label,
//                 nextLessonIndex: (nextIndex + 1) < lessons[secIndex].items.length ? nextIndex + 1 : 0
//             }
//         } else {
//             let lessonIndex = lessons[secIndex].items.findIndex(lesson => lesson.label === lessonName)
//             lesson = {
//                 ...lessons[secIndex].items[lessonIndex],
//                 sectionName: lessons[secIndex].label,
//                 nextLessonIndex: (lessonIndex + 1) < lessons[secIndex].items.length ? lessonIndex + 1 : 0
//             }
//         }
//
//     } else {
//
//         lessons.map(eachLess => {
//             if (nextIndex !== -1) {
//                 lesson = {
//                     ...eachLess.items[nextIndex],
//                     sectionName: eachLess.label,
//                     nextLessonIndex: (nextIndex + 1) < eachLess.items.length ? nextIndex + 1 : 0
//                 }
//             } else {
//                 let a = eachLess.items.findIndex(lesson => lesson.label === lessonName)
//                 if (a !== -1) {
//                     lesson = {
//                         ...eachLess.items[a],
//                         sectionName: eachLess.label,
//                         nextLessonIndex: (a + 1) < eachLess.items.length ? a + 1 : 0
//                     }
//                 }
//             }
//         })
//     }
//     return lesson
// }

// export default getLesson