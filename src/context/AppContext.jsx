import {createContext} from "preact";
import {Component} from "preact/compat";
import  {h} from 'preact';

const AppContext =  createContext({})

export function provider(HOC){
	return class extends Component{
		state = {
			lessons: [],
			favoriteLessons: [],
			lesson: null,
			isMute: false,
			correctPercent: null,
			congratsSound: true
		}
		
		handleSetState = (value)=>{
			this.setState((prevState)=>{
				return {
					...prevState,
					...value
				}
			})
		};
		
		render(props, state, context) {
			return <AppContext.Provider value={{state: this.state, setState: this.handleSetState}}>
					<HOC {...props} />
			</AppContext.Provider>
		}
	}
}



export function connect(HOC){
	return function (props){
		return (
			<AppContext.Consumer>
				{(value)=> <HOC {...props} {...value} /> }
			</AppContext.Consumer>
		)
	}
}



export default AppContext
