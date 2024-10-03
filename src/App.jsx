
import { Outlet } from "react-router-dom"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"


function App() {


  return (
    // border border-solid border-white
    <div className="flex flex-col items-center justify-between w-full h-screen mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
