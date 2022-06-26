import { h, render } from 'preact';

import "./styles.scss"
import {provider} from "./context/AppContext";
import App from "./App";

import "./components/navigation.scss";


const A =  provider(App)
const dom = document.getElementById('app');



render( <A/> , dom);
