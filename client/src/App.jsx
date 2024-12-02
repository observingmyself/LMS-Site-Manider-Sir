
import Layout from './components/layout/Layout'
import Navbar from './components/user/Navbar'
import About from './pages/About'
import HeroSection from './pages/HeroSection'
import { Routes,Route } from 'react-router-dom'
function App() {

  return (
    <>
      <div>
        {/* <Navbar/> */}
        {/* <HeroSection/> */}
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route path="" element={<HeroSection/>} />
            <Route path="about" element={<About/>} />  
          </Route>
         
        </Routes>
      </div>
    </>
  )
}

export default App
