import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import { reduxStore } from '../src/Redux/StoreInitialiser'

render(
    <Provider store={reduxStore}>
        <App />
    </Provider>,
    document.getElementById('root')
)
