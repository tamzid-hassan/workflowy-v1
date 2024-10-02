import BulletItem from "./BulletItem"
import BulletItems from "./BulletItems"


function App() {


  return (
    // border border-solid border-white
    <div className="h-screen w-full max-w-[85%] mx-auto flex flex-col items-center justify-start mt-40 ">
      <h1 className="mb-10">Welcome to workflowy</h1>
      <BulletItems />
    </div>
  )
}

export default App
