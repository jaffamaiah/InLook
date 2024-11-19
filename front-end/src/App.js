import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NavBar } from './components'
import { pages } from './utilities'
import './App.css'


export default function App() {
    return <>
        <div className='main-section'>
            <BrowserRouter>
                <Routes>{
                    Object.entries(pages).map(([pageName, pageData]) => (
                        <Route
                            key={pageName}
                            path={pageData.path}
                            element={pageData.component}
                        />
                    ))
                }</Routes>
            </BrowserRouter>
        </div>
        
        <div className='navbar'>
            <NavBar />
        </div>
    </>
}
