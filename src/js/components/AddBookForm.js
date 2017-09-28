import React, { Component } from 'react'
import {connect} from 'react-redux'
import BookEditForm from './BookEditForm'
import {
    addBook,
} from '../actions'

@connect(({books}) => ({books}))
export default class AddBookForm extends Component {

    handleSave = (id, author, bookName) => {
        if (author.length !== 0 && bookName.length !== 0) {
            this.props.dispatch(addBook(author, bookName))
        }
    }

    render() {
        return (
            <div className="header">
                <h1>Список книг</h1>
                <BookEditForm  newBook
                               onSave={this.handleSave}
                />
            </div>
        )
    }
}
