import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./pages/NavBar"
import Home from "./pages/Home"
import People from "./pages/People"
import Page404 from "./pages/Page404"
import LoginPage from "./pages/LoginPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="people" element={<People />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
