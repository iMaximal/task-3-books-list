import * as ACTIONS from '../constants/ActionsTypes'

const initialState = [
    {
        id: 0,
        author: 'Илья Кантор',
        name: 'Современный учебник Javascript'
    }
]

export default function books(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.ADD_BOOK: {
            const {author, bookName} = action.payload
            return [
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    author,
                    name: bookName
                },
                ...state
            ]
        }

        case ACTIONS.CHANGE_BOOK: {
            const {id, author, bookName} = action.payload
            return state.map(book => {
                if (book.id === id) {
                    book.author = author
                    book.name = bookName
                }
                return book
            }
            )
        }

        case ACTIONS.DELETE_BOOK: {
            const {id} = action.payload
            return state.filter(book => book.id !== id)
        }

         default:
            return state
    }
}
