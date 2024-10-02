import { useDispatch } from "react-redux"
import { addBullet } from "./features/bullet/bulletSlice.js"


function AddBulletItem({ parentId }) {

    const dispatch = useDispatch()

    return (
        <>
            {/* Handle the add New Bullet + Button */}
            <button onClick={() => dispatch(addBullet(parentId))} className='px-1 text-xs rounded-full text-slate-800 hover:bg-slate-600 hover:text-slate-100'><i className="fa-regular fa-plus"></i></button>
        </>
    )
}

export default AddBulletItem