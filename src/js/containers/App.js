import React, {Component} from 'react'
import AddBookForm from '../components/AddBookForm'
import MainSection from '../components/MainSection'


export default class App extends Component {
    render() {
        return (
            <div>
                <AddBookForm/>
                <MainSection/>
            </div>
        )
    }
}


