import { useDispatch } from "react-redux"
import { addBullet } from "./features/bullet/bulletSlice.js"


function AddBulletItem({ parentId }) {

    const dispatch = useDispatch()

    function handleAddBulletItem() {

        dispatch(addBullet(parentId))
    }

    return (
        <>
            {/* Handle the add New Bullet + Button */}
            <button onClick={handleAddBulletItem} className='px-1 ml-3 text-xs rounded-full text-slate-800 hover:bg-slate-600 hover:text-slate-100'><i className="fa-regular fa-plus"></i></button>
        </>
    )
}

export default AddBulletItem