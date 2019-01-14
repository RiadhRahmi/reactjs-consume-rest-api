import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom"
import EditUser from "../users/EditUser"
import {getUsers, deleteUsers} from "../../actions"
import {connect} from "react-redux"
import Spinner from "../shared/Spinner"


class ListUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'List Users',
            selectedUser: null,
            allSelected: false,
            checkedItems: [],
            userIds: [],
            roles: [
                {id: 0, name: 'administrator'},
                {id: 1, name: 'editor'}
            ],
        }

        this.deleteUser = this.deleteUser.bind(this)
        this.showUser = this.showUser.bind(this)
        this.selectAll = this.selectAll.bind(this)
        this.unSelectAll = this.unSelectAll.bind(this)
        this.deleteAll = this.deleteAll.bind(this)
        this.changeHandler = this.changeHandler.bind(this)

    }

    componentDidMount() {
        this.props.getUsers()
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.deleted) {
            this.setState({
                allSelected: false,
                userIds: [],
                checkedItems: [],
            })
        }

        if (nextProps.updatedUser) {
            this.setState({
                selectedUser: null
            })
        }
    }


    changeHandler(event) {
        const checked = event.target.checked
        const value = event.target.value

        if (checked) {
            this.setState({
                userIds: [...this.state.userIds, value],
                checkedItems: {
                    ...this.state.checkedItems,
                    [value]: true
                },
            })

        } else {
            this.setState({
                userIds: this.state.userIds.filter(item => item !== value),
                checkedItems: {
                    ...this.state.checkedItems,
                    [value]: false
                },
            })
        }


    }

    selectAll() {

        let userIds = []
        let checkedItems = []

        for (let u in this.props.users) {
            userIds.push(this.props.users[u].id)
            checkedItems[this.props.users[u].id] = true
        }

        this.setState({
            allSelected: true,
            userIds: userIds,
            checkedItems: checkedItems
        })
    }


    unSelectAll() {

        let checkedItems = []

        for (let u in this.props.users) {
            checkedItems[this.props.users[u].id] = false
        }

        this.setState({
            allSelected: false,
            userIds: [],
            checkedItems: checkedItems
        })
    }


    deleteAll(e) {
        e.preventDefault()
        if (window.confirm('are you sure you want to delete these users?')) {
            this.props.deleteUsers({users_id: this.state.userIds}, this.props)
        }
    }


    showUser(e, user) {
        e.preventDefault()

        this.setState({
            selectedUser: user
        })

    }


    deleteUser(e, id) {
        e.preventDefault()
        if (window.confirm('are you sure you want to delete this user?')) {
            this.props.deleteUsers({users_id: [id]}, this.props)
        }
    }


    getCountUsers() {
        let nbreUsers = 0

        if (this.props.users !== undefined && this.props.users.length !== undefined) {
            nbreUsers = this.props.users.length
        }

        return (
            <div className="row">
                <div className="col-12 mt-3 mb-3">
                    <b>Total : {nbreUsers} users </b>
                </div>
            </div>
        )
    }


    getDataUsers() {
        let result
        if (this.props.users === undefined || this.props.users.length === undefined ||
            this.props.users.length === 0) {
            result = (
                <div className="row">
                    <div className="col-12 text-center">
                        <b> Empty Page </b>
                    </div>
                </div>
            )
        } else {
            result = (
                <div className="row">
                    <div className={this.state.selectedUser ?
                        'col-7 animated fadeIndown delay-3s' : 'col-12 animated fadeIndown delay-3s'}>
                        <form>
                            <button type="button" className="btn btn-link"
                                    onClick={this.selectAll}>Select All
                            </button>
                            /
                            <button type="button" className="btn btn-link"
                                    onClick={this.unSelectAll}>Unselect ALL</button>
                            <div className="d-inline-block">
                                <button className="btn btn-primary" onClick={this.deleteAll}>Delete</button>
                            </div>
                            <br/><br/>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th>actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.users.map(user =>

                                    <tr key={user.id}>
                                        <th>
                                            <div className="form-group form-check">
                                                <input className="form-check-input"
                                                       onChange={this.changeHandler} type="checkbox" value={user.id}
                                                       checked={this.state.checkedItems[user.id]}
                                                />
                                            </div>
                                        </th>
                                        <th scope="row">{user.id} </th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{this.state.roles[user.role].name}</td>
                                        <td>
                                            <div className="d-inline-block">
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle"
                                                            type="button" id="dropdownMenuButton"
                                                            data-toggle="dropdown" aria-haspopup="true"
                                                            aria-expanded="false">
                                                        Actions
                                                    </button>
                                                    <div className="dropdown-menu"
                                                         aria-labelledby="dropdownMenuButton">
                                                        <button className="dropdown-item"
                                                                onClick={(e) => this.deleteUser(e, user.id)}>Delete
                                                        </button>
                                                        <button className="dropdown-item"
                                                                onClick={(e) => this.showUser(e, user)}>Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </form>
                    </div>

                    {(this.state.selectedUser) ? this.displayFormUpdate() : ''}

                </div>
            )
        }

        return result
    }

    displayFormUpdate() {
        let result
        if (this.state.selectedUser !== null) {
            result = (
                <div className="col-4 offset-1 mt-5 animated fadeInRight">
                    <EditUser user={this.state.selectedUser}></EditUser>
                </div>
            )
        }
        return result
    }


    render() {

        if (this.props.loading) {
            return <Spinner/>
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}


                                <Link to="/users/add" className="btn btn-primary float-right">
                                    <i className="fas fa-plus"></i> Add User
                                </Link>

                            </h1>
                        </div>
                    </div>
                </div>

                {this.getCountUsers()}
                {this.getDataUsers()}

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
        users: state.user.users,
        updatedUser: state.user.updatedUser,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        deleteUsers: (usersIds, ownProps) => dispatch(deleteUsers(usersIds, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListUser))
