import { useSelector } from "react-redux"
import BulletItem from "./BulletItem"
import AddBulletItem from "./AddBulletItem"


function BulletItems() {


    //Getting all the Bullet Items from Redux Store
    const bulletItemsList = useSelector(state => state.bullets)


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
        <>
            <div className="flex flex-col items-start w-full max-w-[85%] gap-1">

                {bulletItemsList && renderItemsRecursively(bulletItemsList)}

                <AddBulletItem parentId={"root"} />
            </div>
        </>
    )
}

export default BulletItems