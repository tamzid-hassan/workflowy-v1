
import { Outlet } from "react-router-dom"
import Footer from "./Footer/Footer"
import Header from "./Header/Header"


function App() {


  return (
    // border border-solid border-white
    <div className="h-screen w-full max-w-[85%] mx-auto flex flex-col items-center justify-start mt-40 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
