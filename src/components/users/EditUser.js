import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {updateUser} from "../../actions";
import {connect} from "react-redux";

class EditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPassword: true,
            roles: [
                {id: 0, name: 'administrator'},
                {id: 1, name: 'editor'}
            ],
            user: {
                name: '',
                email: '',
                password: '',
                role: null,
                id: null
            },
        };


        this.updateUser = this.updateUser.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.togglePassword = this.togglePassword.bind(this)


    }

    componentDidMount() {
        this.setState({
            user: {
                ...this.state.user,
                name: this.props.user.name,
                email: this.props.user.email,
                password: this.props.user.password,
                role: this.props.user.role,
                id: this.props.user.id,
            },
        })
    }





    updateUser(e) {
        e.preventDefault()
        this.props.updateUser(this.state.user.id, this.state.user, this.props)
    }


    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            user: {
                ...this.state.user,
                [name]: value,
            }
        });
    }

    togglePassword(e) {
        e.preventDefault()
        this.setState({
            isPassword: !this.state.isPassword
        })
    }


    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control"
                               id="name" placeholder="Enter name"
                               onChange={this.changeHandler}
                               value={this.state.user.name} name="name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input name="email" className="form-control"
                               id="email" placeholder="Enter email"
                               onChange={this.changeHandler}
                               value={this.state.user.email}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <div className="input-group">
                            <input type={this.state.isPassword ? 'password' : 'text'} className="form-control"
                                   placeholder="password" aria-label="Input group example"
                                   aria-describedby="btnGroupAddon" name="password" id="password"
                                   value={this.state.user.password} onChange={this.changeHandler}/>

                            <button className="input-group-text"
                                    onClick={this.togglePassword}>
                                <i className="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="pr-3"> Role </label>
                        {this.state.roles.map(role =>
                            <div key={role.id} className="custom-control custom-radio custom-control-inline">
                                <input name="role" className="custom-control-input" id={'role' + role.id}
                                       value={role.id} type="radio" onChange={this.changeHandler}
                                       defaultChecked={ role.id === this.props.user.role}
                                />
                                <label className="custom-control-label" htmlFor={'role' + role.id}>
                                    {role.name}
                                </label>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary" onClick={this.updateUser}>
                        Submit
                    </button>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (id, user, ownProps) => dispatch(updateUser(id, user, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUser))
