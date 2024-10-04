import { createSlice, current, nanoid } from "@reduxjs/toolkit"

const bulletItemsDemoData = {
    bullets: [
        {
            id: nanoid(),
            content: 'First Bullet',
            children: [
                { id: nanoid(), content: 'Click to edit this bullet point', children: [] },
                {
                    id: nanoid(), content: 'Press "+" to add a new bullet point',
                    children: [
                        { id: nanoid(), content: 'Children of > Press "+" to add a new bullet point', children: [] }
                    ]
                },
                { id: nanoid(), content: 'Drag and drop to reorder', children: [] },
            ]
        },
        {
            id: nanoid(),
            content: 'Second Bullet',
            children: [
                { id: nanoid(), content: 'AAAAAAAAAAAAAAAAAAA 111', children: [] },
                { id: nanoid(), content: 'BBBBBBBBBBBB 2222', children: [] },

            ]
        },
        {
            id: nanoid(),
            content: 'Third Bullet',
            children: []
        }
    ],

}


const getLocalBulletItems = JSON.parse(localStorage.getItem("BulletItems"))


const initialState = {
    bullets: getLocalBulletItems ? getLocalBulletItems : bulletItemsDemoData.bullets
}




export const bulletSlice = createSlice({
    name: "bullet",
    initialState,
    reducers: {
        addBullet: (state, action) => {

            // Getting the PrentItem ID from payload
            const parentId = action.payload

            //If parentID is at the root then just append new bullet item at the last of the bullets array
            if (parentId === "root") {
                state.bullets.push({ id: nanoid(), content: "Type here...", children: [] })
            }

            // Getting all the Items from state
            const currentBulletItems = current(state.bullets)

            // TODO: Understand recursive function here in more in depth
            // Maping through all the items to find the parent and add the new bulletItem
            function findParentAndAddItemRecursive(itemsList) {

                return itemsList.map(item => {

                    //Seeing if item in the array matches with the given parentID
                    if (item.id === parentId) {

                        //If matched then send the destructed parentItem with added new child
                        const parentItem = {
                            ...item,
                            children: [...item.children, { id: nanoid(), content: "Type here...", children: [] }]
                        }

                        // Then return the whole parent item with the new bulletitem child
                        console.log("🚀 ~ findParentRecursive ~ parentItem:", parentItem)

                        return parentItem
                    }

                    //If Ids dont match then loop through the children and so on to ultimately find the parent
                    if (item.children) {
                        return { ...item, children: findParentAndAddItemRecursive(item.children) }
                    }

                    return item;
                })
            }

            const bulletItemsWithNewChild = findParentAndAddItemRecursive(currentBulletItems)


            console.log("🚀 ~ parentItem:", bulletItemsWithNewChild)

            state.bullets = bulletItemsWithNewChild;

            localStorage.setItem("BulletItems", JSON.stringify(state.bullets))


        },
        removeBullet: (state, action) => {

            //TODO: implement

            // state.todos = state.todos.filter(todo => todo.id != action.payload)

            // localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateBullet: (state, action) => {

            // Getting the PrentItem ID from payload
            const bulletItemId = action.payload.id


            // Getting the PrentItem ID from payload
            const updatedContent = action.payload.inputValue

            // Getting all the Items from state
            const currentBulletItems = current(state.bullets)

            // Maping through all the items to find the parent and add the UPDATED bulletItem
            function findItemAndUpdateItemRecursive(itemsList) {

                return itemsList.map(item => {

                    if (item.id === bulletItemId) {
                        return { ...item, content: updatedContent };
                    }
                    if (item.children) {
                        return { ...item, children: findItemAndUpdateItemRecursive(item.children) };
                    }
                    return item
                })
            }

            const bulletItemsWithNewChild = findItemAndUpdateItemRecursive(currentBulletItems)

            state.bullets = bulletItemsWithNewChild;

            localStorage.setItem("BulletItems", JSON.stringify(state.bullets))
        },
        getBulletItem: (state, action) => {

            // Getting the Bullet Item ID from payload
            const bulletItemId = action.payload
            // console.log("🚀 ~ bulletItemId:", bulletItemId)

            // Getting all the Items from state
            const currentBulletItems = current(state.bullets)

            // Maping through all the items to find the bullet Item
            function findItem(items, id) {
                for (let item of items) {
                    if (item.id === id) {
                        return item;
                    }
                    if (item.children) {
                        const found = findItem(item.children, id);
                        if (found) return found;
                    }
                }
                return null;
            };

            // Calling the recursive function to go through all child elements as well
            const bulletItemWithAllChildren = findItem(currentBulletItems, bulletItemId)
            console.log("🚀 ~ bulletItemWithAllChildren:", bulletItemWithAllChildren)

            // Returning result as Payload to SingleView Component
            action.payload = [bulletItemWithAllChildren]

        },
        // toggleShowChildrenItems: (state, action) => {
        //     const toggleValue = action.payload
        //     state.showChildrenItems = !toggleValue
        // },
        // toggleIsEditing: (state, action) => {
        //     const toggleValue = action.payload
        //     state.isEditing = !toggleValue
        // },
    }
})

export const { addBullet, removeBullet, updateBullet, getBulletItem } = bulletSlice.actions

export default bulletSlice.reducer