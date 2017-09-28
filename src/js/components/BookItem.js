import React, {Component} from 'react'
import {connect} from 'react-redux'
import BookEditForm from './BookEditForm'
import {
    changeBook,
    deleteBook
} from '../actions'

@connect(({books}) => ({books}))
export default class BookItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editing: false
        }
    }

    bookSave = (id, author, bookName) => {

        this.props.dispatch(changeBook(id, author, bookName))

        this.setState({
            editing: false
        })
    }


    toggleBookEditing = (event) => {
        event.preventDefault()
        this.setState({editing: true})
    }


    BookRemoveHandler = (id, event) => {
        event.preventDefault()
        this.props.dispatch(deleteBook(id))
    }


    render() {

        const {id, author, name} = this.props.book

        const controlButtons = (
            <div className="controls-container">
                <a onClick={this.toggleBookEditing}
                   href=""
                   className="controls"
                   title="Edit">Edit</a>&nbsp;
                <a onClick={this.BookRemoveHandler.bind(this, id)}
                   href=""
                   className="controls"
                   title="Remove">Remove</a>
            </div>
        )

        let element
        if (this.state.editing) {
            element = (
                <BookEditForm
                    id={id}
                    author={author}
                    name={name}
                    editing={this.state.editing}
                    onSave={(id, author, name) => this.bookSave(id, author, name)}
                />
            )
        } else {
            element = (
                <div itemScope itemType="http://schema.org/Book">
                    <p className="authors">
                        <span itemProp="author">
                        {author}
                        </span>
                    </p>
                    <p className="books">
                        <span itemProp="name">
                        {name}
                        </span>
                    </p>
                    {controlButtons}
                </div>
            )
        }

        return (
            <li
                key={id}
            >
                {element}
            </li>
        )
    }
}
