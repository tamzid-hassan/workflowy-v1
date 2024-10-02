import { useEffect, useRef, useState } from "react"
import AddBulletItem from "./AddBulletItem"
import { useDispatch } from "react-redux"
import { updateBullet } from "./features/bullet/bulletSlice"


function BulletItem({ id, content, index, children }) {

    const [showChildrenItems, setShowChildrenItems] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState(content)

    const inputRef = useRef(null)

    const dispatch = useDispatch()

    console.log(isEditing)

    function handleUpdate() {
        setIsEditing(!isEditing)

        dispatch(updateBullet({ id, inputValue }))
    }

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
        }
    }, [isEditing])

    return (
        <>
            <div className={`flex justify-center gap-x-2 ${children?.length > 0 ? "" : "ml-4"}`}>
                {children?.length > 0 &&
                    <button
                        onClick={() => setShowChildrenItems(!showChildrenItems)}
                        className=" text-slate-800 hover:text-slate-400">
                        {showChildrenItems ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i>}
                    </button>
                }

                <button className="text-sm rounded-full"><i className=" fa-solid fa-circle hover:text-slate-500"></i></button>
                {isEditing ?
                    (<input
                        ref={inputRef}
                        className="flex-grow border-b bg-slate-900 focus:outline-none focus:border-blue-500"
                        value={inputValue}
                        autoFocus
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleUpdate}
                    />) :
                    (<p onClick={() => setIsEditing(!isEditing)} className={`${children?.length > 0 ? " font-bold text-lg text-white" : "text-md"}`}>{content}</p>)}

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
