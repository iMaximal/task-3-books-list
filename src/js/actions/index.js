import {
    ADD_BOOK,
    CHANGE_BOOK,
    DELETE_BOOK
} from '../constants/ActionsTypes'

export const addBook = (author, bookName) => {
    return {
        type: ADD_BOOK,
        payload: {
            author,
            bookName
        }
    }
}


export const changeBook = (id, author, bookName) => {
    return {
        type: CHANGE_BOOK,
        payload: {
            id,
            author,
            bookName
        }
    }
}


export const deleteBook = (id) => {
    return {
        type: DELETE_BOOK,
        payload: {
            id
        }
    }
}
