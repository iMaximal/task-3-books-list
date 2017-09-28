import React, {Component} from 'react'
import {connect} from 'react-redux'
import BookItem from './BookItem'

@connect(({books}) => ({books}))
export default class MainSection extends Component {

    render() {

        const {books} = this.props

        return (
            <ul className="book-list">
                {books.map(book =>
                    <BookItem key={book.id} book={book} />
                )}
            </ul>
        )
    }
}
