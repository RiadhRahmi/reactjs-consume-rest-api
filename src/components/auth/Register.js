import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {register} from "../../actions"
import Spinner from "../shared/Spinner";


class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'Register',
            user: {
                name: '',
                email: '',
                password: '',
                c_password: '',
            }
        }

        this.register = this.register.bind(this)
        this.changeHandler = this.changeHandler.bind(this)

    }


    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        })

    }


    register(e) {
        e.preventDefault()
        this.props.register(this.state.user, this.props)
    }



    render() {

        if (this.props.loading) {
            return <Spinner/>
        }


        return (
            <div>

                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    {this.state.pagetitle}
                                </div>
                                <div className="card-body col-10 mx-auto">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input name="name" value={this.state.user.name} type="text"
                                                   className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="name" placeholder="Enter name"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">email</label>
                                            <input name="email" value={this.state.user.email} type="email"
                                                   className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="email" placeholder="Enter email"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password </label>
                                            <input name="password" value={this.state.user.password}
                                                   type="password" className="form-control"
                                                   id="password" placeholder="password"
                                                   onChange={this.changeHandler}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="c_password">Confirm Password </label>
                                            <input name="c_password" value={this.state.user.c_password}
                                                   type="password" className="form-control"
                                                   onChange={this.changeHandler}
                                                   id="c_password" placeholder="Confirm Password"/>
                                        </div>

                                        <button type="submit" className="btn btn-primary"
                                                onClick={this.register}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (user, ownProps) => dispatch(register(user, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))
