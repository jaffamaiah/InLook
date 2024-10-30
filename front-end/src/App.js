import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import "./App.css"

import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import JournalEntry from "./pages/JournalEntry"
import JournalView from "./pages/JournalView"
import Page404 from "./pages/Page404"

export default function App() {
  return <div>
    <div className='main-section'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="journal" element={<JournalEntry />} />
          <Route path="view-journals" element={<JournalView />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
    <div className='navbar'>
      <NavBar/>
    </div>
  </div>
}
