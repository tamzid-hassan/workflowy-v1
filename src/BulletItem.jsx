import { useState } from "react"


function BulletItem({ id, content, index, children }) {

    const [showChildrenItems, setShowChildrenItems] = useState(false)

    return (
        <>
            <div className="flex justify-center gap-x-2">
                {children?.length > 0 &&
                    <button
                        onClick={() => setShowChildrenItems(!showChildrenItems)}
                        className=" text-slate-800 hover:text-slate-400">
                        {showChildrenItems ? <i className="fa-solid fa-caret-down"></i> : <i className="fa-solid fa-caret-right"></i>}
                    </button>
                }

                <button className="text-sm rounded-full"><i className=" fa-solid fa-circle hover:text-slate-500"></i></button>
                <p className={`${children?.length > 0 ? " font-bold text-lg text-white" : "text-md"}`}>{content}</p>
            </div>

            {showChildrenItems && (
                <div className="flex flex-col items-start gap-1 ml-8">
                    {children}
                </div>
            )}
        </>
    )
}

export default BulletItem