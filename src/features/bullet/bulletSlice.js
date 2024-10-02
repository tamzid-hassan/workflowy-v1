import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bullets: [
        {
            id: 1,
            content: 'First Bullet',
            children: [
                { id: 1, content: 'Click to edit this bullet point', children: [] },
                {
                    id: 2, content: 'Press "+" to add a new bullet point',
                    children: [
                        { id: 1, content: 'Children of > Press "+" to add a new bullet point', children: [] }
                    ]
                },
                { id: 3, content: 'Drag and drop to reorder', children: [] },
            ]
        },
        {
            id: 2,
            content: 'Second Bullet',
            children: [
                { id: 1, content: 'AAAAAAAAAAAAAAAAAAA 111', children: [] },
                { id: 2, content: 'BBBBBBBBBBBB 2222', children: [] },

            ]
        },
        {
            id: 3,
            content: 'Third Bullet',
            children: []
        }
    ]
}

export const bulletSlice = createSlice({
    name: "bullet",
    initialState,
    reducers: [{
        addBullet: (state, action) => {
            //TODO: implement

            // const todo = {
            //     id: nanoid(), 
            //     text: action.payload
            // }

            // state.todos.push(todo)

            // localStorage.setItem("todos", JSON.stringify(state.todos))


        },
        removeBullet: (state, action) => {

            //TODO: implement

            // state.todos = state.todos.filter(todo => todo.id != action.payload)

            // localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        updateBullet: (state, action) => {

            //TODO: implement
            // const { id, text } = action.payload
            // const todoToUpdate = state.todos.find(todo => todo.id == id)

            // if (todoToUpdate) {
            //     todoToUpdate.text = text
            // }

            // localStorage.setItem("todos", JSON.stringify(state.todos))
        }
    }]
})

export const { addBullet, removeBullet, updateBullet } = bulletSlice.actions

export default bulletSlice.reducer