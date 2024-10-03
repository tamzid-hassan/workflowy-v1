import { useEffect, useRef, useState } from "react"
import AddBulletItem from "./AddBulletItem"
import { useDispatch } from "react-redux"
import { updateBullet } from "./features/bullet/bulletSlice"
import { Link } from "react-router-dom"


function BulletItem({ id, content, index, children }) {

    const [showChildrenItems, setShowChildrenItems] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(content)


    // Only for UI purpose
    const inputRef = useRef(null)
    const newBulletRef = useRef(null)

    const dispatch = useDispatch()

    console.log(isEditing)

    function handleUpdate() {
        setIsEditing(!isEditing)

        console.log(id)
        console.log(inputValue)

        dispatch(updateBullet({ id, inputValue }))
    }

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
            inputRef.current.select()
        }


    }, [isEditing])


    return (
        <>
            <div className={` flex w-full gap-x-2 ${children?.length > 0 ? "" : "ml-4"}`}>
                {children?.length > 0 &&
                    <button
                        onClick={() => setShowChildrenItems(!showChildrenItems)}
                        className=" text-slate-800 hover:text-slate-400">
                        {showChildrenItems ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i>}
                    </button>
                }

                <Link to={`../${id}`} className="rounded-full "><i className="text-xs align-middle fa-solid fa-circle hover:text-slate-500"></i></Link>
                {isEditing ?
                    (<input
                        ref={inputRef}
                        className="bg-transparent border-b focus:outline-none focus:border-blue-500"
                        value={inputValue}
                        autoFocus
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleUpdate}
                    />) :
                    (<p ref={newBulletRef} onClick={() => setIsEditing(!isEditing)} className={`${children?.length > 0 ? " font-bold text-lg text-white" : "text-md"}`}>{content}</p>)}

            </div>

            {showChildrenItems && (
                <div className="flex flex-col items-start gap-1 ml-8">
                    {children}
                    <AddBulletItem parentId={id} />
                </div>
            )}


        </>
    )
}

export default BulletItem
