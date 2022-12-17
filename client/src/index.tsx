import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
//import 'semantic-ui-css/semantic.min.css';
//import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'materialize-css/sass/materialize.scss';
import 'materialize-css/dist/css/materialize.min.css';
import { makeAuthRouting } from './routing';

ReactDOM.render(makeAuthRouting(), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
