import { useSelector } from "react-redux"
import BulletItem from "./BulletItem"

function BulletItems() {

    // Getting the bullet Items from Redux Store
    const bulletItems = useSelector(state => state.bullets)
    console.log("🚀 ~ BulletItems ~ bulletItems:", bulletItems)

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
        <div className="flex flex-col items-start gap-1">
            {bulletItems && renderItemsRecursively(bulletItems)}
        </div>
    )
}

export default BulletItems