import React, {Component} from 'react'
import {withRouter} from "react-router-dom"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../actions"
import Spinner from "../shared/Spinner";


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }

        this.login = this.login.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }


    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value,
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.currentUser) {
    //         this.props.history.push('/')
    //     }
    // }

    login(e) {
        e.preventDefault()
        this.props.login({email: this.state.email, password: this.state.password}, this.props)
    }




    render() {

        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <div>
                <div className="container mt-5 pt-5">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    Please sign in
                                </div>
                                <div className="card-body col-8 mx-auto">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Email address</label>
                                            <input name="email" value={this.state.email}
                                                   type="email" className="form-control"
                                                   id="exampleInputEmail1"
                                                   onChange={this.changeHandler}
                                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Password</label>
                                            <input name="password" value={this.state.password}
                                                   type="password" className="form-control"
                                                   id="exampleInputPassword1" placeholder="Password"
                                                   onChange={this.changeHandler}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary"
                                                onClick={this.login}>
                                            Submit
                                        </button>
                                        <Link className="btn btn-success ml-1" to="/register">
                                            Register
                                        </Link>
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
        login: (user, ownProps) => dispatch(login(user,ownProps)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
