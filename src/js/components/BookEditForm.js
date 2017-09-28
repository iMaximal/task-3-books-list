import React, {Component} from 'react'
import {connect} from 'react-redux'

@connect(({books}) => ({books}))
export default class BookEditForm extends Component {

    constructor(props) {
        super(props)
        const {author, name} = this.props

        this.state = {
            author: author || '',
            bookName: name || '',
        }
    }

    handleSubmit = (id, author, name, event) => {
        event.preventDefault()

        author = author.trim()
        name = name.trim()

        if(author.length === 0) {
            author = 'Неизвестный автор'
        }
        if(name.length === 0) {
            name = 'Неизвестная книга'
        }

        this.props.onSave(id, author, name, event)
        if (this.props.newBook) {
            this.setState({
                author: '',
                bookName: ''
            })
        }
    }

    handleChange = (event) => {
        const name = event.target.name

        this.setState({
            [name]: event.target.value
        })
    }


    render() {

        const {author, bookName} = this.state
        const {id} = this.props

        return (
            <form>
                <p>
                    <input
                        className="edit-area"
                        type="text"
                        autoFocus="true"
                        name="author"
                        value={this.state.author}
                        placeholder="Введите имя автора"
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input
                        className="edit-area"
                        type="text"
                        autoFocus="true"
                        name="bookName"
                        value={this.state.bookName}
                        placeholder="Название книги"
                        onChange={this.handleChange}
                    />
                </p>
                <div className="controls-container">
                    <a onClick={this.handleSubmit.bind(this, id, author, bookName)}
                       href=""
                       className="controls"
                       title="Edit">
                        Save
                    </a>
                </div>
            </form>
        )
    }
}
