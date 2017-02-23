import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import firebaseConfig from '../firebase.json'
import Routes from './routes'
import './index.css'

// initialize Firebase
firebase.initializeApp(firebaseConfig.keys[process.env.NODE_ENV])

// Render React DOM
ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
)
