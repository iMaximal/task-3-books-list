import books from './books'
import * as types from '../constants/ActionsTypes'

describe('books reducer', () => {
    it('should handle initial state', () => {
        expect(
            books(undefined, {})
        ).toEqual([
            {
                id: 0,
                author: 'Илья Кантор',
                name: 'Современный учебник Javascript'
            }
        ])
    })

    it('should handle ADD_BOOK', () => {
        expect(
            books([], {
                type: types.ADD_BOOK,
                payload: {
                    author: 'Михаил Афанасьевич Булгаков',
                    bookName: 'Мастер и Маргарита'
                }
            })
        ).toEqual([
            {
                id: 0,
                author: 'Михаил Афанасьевич Булгаков',
                name: 'Мастер и Маргарита'
            }
        ])

        expect(
            books([
                {
                    id: 0,
                    author: 'Илья Кантор',
                    name: 'Современный учебник Javascript'
                }
            ], {
                type: types.ADD_BOOK,
                payload: {
                    author: 'Михаил Афанасьевич Булгаков',
                    bookName: 'Мастер и Маргарита'
                }
            })
        ).toEqual([
            {
                id: 1,
                author: 'Михаил Афанасьевич Булгаков',
                name: 'Мастер и Маргарита'
            },
            {
                id: 0,
                author: 'Илья Кантор',
                name: 'Современный учебник Javascript'
            }
        ])

        expect(
            books([
                {
                    id: 1,
                    author: 'Михаил Афанасьевич Булгаков',
                    name: 'Мастер и Маргарита'
                },
                {
                    id: 0,
                    author: 'Илья Кантор',
                    name: 'Современный учебник Javascript'
                }
            ], {
                type: types.ADD_BOOK,
                payload: {
                    author: 'Максим',
                    bookName: 'Жизнь прекрасна'
                }
            })
        ).toEqual([
            {
                id: 2,
                author: 'Максим',
                name: 'Жизнь прекрасна'
            },
            {
                id: 1,
                author: 'Михаил Афанасьевич Булгаков',
                name: 'Мастер и Маргарита'
            },
            {
                id: 0,
                author: 'Илья Кантор',
                name: 'Современный учебник Javascript'
            }
        ])
    })

    it('should handle DELETE_BOOK', () => {
        expect(
            books([
                {
                    id: 1,
                    author: 'Михаил Афанасьевич Булгаков',
                    name: 'Мастер и Маргарита'
                },
                {
                    id: 0,
                    author: 'Илья Кантор',
                    name: 'Современный учебник Javascript'
                }
            ], {
                type: types.DELETE_BOOK,
                payload: {
                    id: 1
                }
            })
        ).toEqual([
            {
                id: 0,
                author: 'Илья Кантор',
                name: 'Современный учебник Javascript'
            }
        ])
    })

    it('should handle CHANGE_BOOK', () => {
        expect(
            books([
                {
                    id: 1,
                    author: 'Михаил Афанасьевич Булгаков',
                    name: 'Мастер и Маргарита'
                },
                {
                    id: 0,
                    author: 'Илья Кантор',
                    name: 'Современный учебник Javascript'
                }
            ], {
                type: types.CHANGE_BOOK,
                payload: {
                    id: 1,
                    author: 'Александр Сергеевич Пушкин',
                    bookName: 'Евгений Онегин'
                }
            })
        ).toEqual([
            {
                id: 1,
                author: 'Александр Сергеевич Пушкин',
                name: 'Евгений Онегин'
            },
            {
                id: 0,
                author: 'Илья Кантор',
                name: 'Современный учебник Javascript'
            }
        ])
    })

})
