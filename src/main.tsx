import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'
import {RecoilRoot} from 'recoil'

const container = document.getElementById('root')
if (container === null) {
    throw new Error('No container found')
}

const root = ReactDOMClient.createRoot(container)

root.render(
    <RecoilRoot>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </RecoilRoot>,
)
