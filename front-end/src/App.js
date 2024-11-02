import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"
import "./App.css"

import Home from "./pages/Home"
import LogIn from "./pages/LogIn"
import SignUp from "./pages/SignUp"
import JournalWrite from "./pages/JournalWrite"
import JournalView from "./pages/JournalView"
import Page404 from "./pages/Page404"
import AllJournals from "./pages/AllJournals"

export default function App() {
  return <div>
    <div className='main-section'>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="journal" element={<JournalWrite />} />
          <Route path="view-journals" element={<AllJournals />} />
          <Route path="view-journals/:id" element={<JournalView />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
    <div className='navbar'>
      <NavBar />
    </div>
  </div>
}
