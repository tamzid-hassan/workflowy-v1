import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getBulletItem } from "./features/bullet/bulletSlice";
import BulletItem from "./BulletItem";

function SingleView() {

    const dispatch = useDispatch()

    // state for managing filtered bullet Item list
    const [itemsList, setItemsList] = useState([]);


    // Checking parrams of bullet Item Id 
    const { bulletItemId } = useParams()
    console.log("🚀 ~ bulletItemId ~ Singleview:", bulletItemId)


    useEffect(() => {

        if (bulletItemId && bulletItemId.length > 0) {

            // Getting the filtered Bullet Item from Redux Slice
            const { payload } = dispatch(getBulletItem(bulletItemId))
            // console.log(payload)

            setItemsList(payload)
        }

    }, [bulletItemId, dispatch])

    console.log(itemsList)


    // Recursively looping through each bullet items and passing them into <BulletItem/> component
    function renderItemsRecursively(items) {

        return items.map((item, index) => (
            <BulletItem
                key={index}
                id={item.id}
                content={item.content}
                index={index}
            >
                {/* If such Item has children then we will call the recursive function with its children items */}
                {item.children && renderItemsRecursively(item.children)}

            </BulletItem>
        ))

    }

    return (
        <div className="flex flex-col items-start w-full gap-1">

            {itemsList && renderItemsRecursively(itemsList)}

            {/* <AddBulletItem parentId={"root"} /> */}
        </div>
    )
}

export default SingleView