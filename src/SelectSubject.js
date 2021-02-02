import React, { Component } from 'react'
import { Formik } from 'formik';

export default class SelectSubject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: [],
            joke: ''
        }
    }

    componentDidMount(){
        fetch('https://api.chucknorris.io/jokes/categories')
        .then(response => response.json())
        .then (data => this.setState({category: data}))
    }

    submit = (values,actions) => {
        console.log(values.category)
        fetch('https://api.chucknorris.io/jokes/random?category=' + values.category)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => this.setState({joke: data.value}))
        actions.resetForm();
    }

    renderJoke(){
        if (this.state.joke !== '') {
            return(
                <p>{this.state.joke}</p>
            )
        }
    }


    render() {
        return(
            <div className="container-fluid p-5 bg-light d-flex flex-column justify-content-center align-items-center">
                <Formik
                 onSubmit={this.submit}
                initialValues={{category: ''}}>
                        {({ values,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="bg-white border p-5 d-flex flex-column">
                                <div className="form-group">
                                    <label>Categorie</label>
                                    <select
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ display: 'block' }}
                                    >
                                        <option value={values.category} label="Select a category" />
                                        {this.state.category.map((c, index) => (
                                            <option key={index} value={c} label={c} />
                                        ))
                                        }
                                    </select>
                                </div>
                                <button type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}>
                                    Valider
                                            </button>
                            </form>
                        )}
                </Formik>
                {this.renderJoke()}
            </div>
        )
    }
}