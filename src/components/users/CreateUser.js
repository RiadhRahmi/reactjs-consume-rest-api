import React, {Component} from 'react'
import UserService from "../../services/userService"
import {withRouter} from "react-router-dom"
import SimpleReactValidator from "simple-react-validator"
import { addUser} from "../../actions"
import {connect} from 'react-redux'
import Spinner from "../shared/Spinner";


class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.validator = new SimpleReactValidator({

            validators: {
                is_unique: {
                    message: 'The :attribute must be unique.',
                    rule: (val, params, validator) => {
                        UserService.uniqueEmail({email: val}).then(res => {
                            return res.data.length === 0
                        })
                    }
                }
            },
            element: (message) =>
                <div className="invalid-feedback"><span>{message}</span></div>
        })

        this.state = {
            pagetitle: 'Add User',
            roles: [
                {id: 0, name: 'administrator'},
                {id: 1, name: 'editor'}
            ],
            user: {
                name: '',
                email: '',
                password: '',
                role: 1,
            },
        }

        this.createUser = this.createUser.bind(this)
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


    createUser(e) {
        e.preventDefault()

        if (this.validator.allValid()) {
            this.props.addUser(this.state.user,this.props)

        } else {
            this.validator.showMessages()
            this.forceUpdate()
        }
    }



    render() {

        const rulesValidation = {
            name: 'required|min:3',
            password: 'required|min:10'
        }

        if (this.props.loading) {
            return <Spinner />
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.createUser}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input value={this.state.user.name} type="text" name="name"
                                       className="form-control"
                                       id="name" placeholder="Enter name"
                                       onChange={this.changeHandler}
                                />


                                {this.validator.message('name', this.state.user.name,
                                    rulesValidation.name)}

                            </div>

                            <div className="form-group">
                                <label htmlFor="email">email</label>
                                <input name="email" value={this.state.user.email} type="email"
                                       className="form-control" id="email" autoComplete="off"
                                       onChange={this.changeHandler}
                                       placeholder="Enter email"/>

                                {this.validator.message('email', this.state.user.email,
                                    'required|email|is_unique:' + this.state.user.email)}

                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password </label>
                                <input name="password" value={this.state.user.password} type="password"
                                       onChange={this.changeHandler}
                                       className="form-control" autoComplete="off"
                                       id="password" placeholder="password"
                                />

                                {this.validator.message('password', this.state.user.password,
                                    rulesValidation.password)}
                            </div>


                            <div className="form-group">
                                <label className="pr-3"> Role </label>
                                {this.state.roles.map(role =>
                                    <div key={role.id} className="custom-control custom-radio custom-control-inline">
                                        <input name="role" className="custom-control-input" id={'role' + role.id}
                                               value={role.id} type="radio" onChange={this.changeHandler}
                                               defaultChecked={this.state.user.role === role.id}
                                        />
                                        <label className="custom-control-label" htmlFor={'role' + role.id}>
                                            {role.name}
                                        </label>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
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
        addUser: (user, ownProps) => dispatch(addUser(user, ownProps)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUser))
