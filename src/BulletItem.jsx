import { useEffect, useRef, useState } from "react"
import AddBulletItem from "./AddBulletItem"
import { useDispatch } from "react-redux"
import { removeBullet, updateBullet } from "./features/bullet/bulletSlice"
import { Link, useParams } from "react-router-dom"


function BulletItem({ id, content, index, children, singleViewItemId }) {

    // Only for UI purpose
    const inputRef = useRef(null)
    const newBulletRef = useRef(null)


    const [showChildrenItems, setShowChildrenItems] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isHoveringItem, setIsHoveringItem] = useState(false)

    // console.log(content)

    const dispatch = useDispatch()

    // console.log(isEditing)

    function toggleEdit() {
        setIsEditing(!isEditing)
        setInputValue(newBulletRef.current.innerText)
    }

    function handleUpdate() {

        setIsEditing(!isEditing)

        dispatch(updateBullet({ id, inputValue }))
    }

    // function handleKeyboardEvent(e) {
    //     if (e.shiftKey && e.key === "Delete") {
    //         console.log("Deleted")
    //     }

    // }

    function handleDelete() {
        dispatch(removeBullet(id))
    }

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus()
            inputRef.current.select()
        }


    }, [isEditing])

    useEffect(() => {
        setShowChildrenItems(false)

        //Checking if coming from single view and only show children of current Bullet Item
        // If given bulletItem Id matches with Url Params Id
        if (singleViewItemId === id) {
            setShowChildrenItems(true)
        }

    }, [id])


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
                        autoFocus={true}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleUpdate}
                    // onKeyDown={(e) => handleKeyboardEvent(e)}
                    />) :

                    (<div onMouseOver={() => setIsHoveringItem(true)}
                        onMouseLeave={() => setIsHoveringItem(false)}
                        className="flex w-full gap-x-5">
                        <p ref={newBulletRef}
                            onClick={toggleEdit}
                            className={` ${children?.length > 0 ? " font-bold text-lg text-white" : "text-md"}`}>

                            {content}
                        </p>
                        <div>
                            {isHoveringItem && <button onClick={handleDelete}><i className="align-middle text-neutral-700 fa-regular fa-trash-can hover:text-red-700"></i></button>}
                        </div>
                    </div>)

                }

            </div >

            {/* If only showChildrenItems true and really has children Bullet Items then render this */}
            {
                showChildrenItems && children.length !== 0 && (
                    <div className="flex flex-col items-start gap-1 ml-8">
                        {children}
                        <AddBulletItem parentId={id} />
                    </div>
                )
            }

            {/* If only children Bullet Items are present and current SingleItemview is for current Bullet Item
             then render this and give button to add children */}

            {id === singleViewItemId && children.length === 0 && (
                <div className="ml-8">
                    <AddBulletItem parentId={id} />
                </div>
            )}

        </>
    )
}

export default BulletItem
