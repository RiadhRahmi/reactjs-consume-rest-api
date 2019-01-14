import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import i18n from '../../i18n'
import {withNamespaces} from 'react-i18next'
import {logout} from "../../actions"
import connect from "react-redux/es/connect/connect";


class Header extends Component {

    constructor(props) {
        super(props)


        this.logout = this.logout.bind(this)
        this.toBack = this.toBack.bind(this)
    }

    toBack(e) {
        e.preventDefault()
        this.props.history.goBack()
    }


    logout(e) {
        e.preventDefault()
        this.props.logout(this.props);
    }


    isActive(name) {
        const ActiveClass = "active"
        switch (name) {
            case 'articles':
                if (
                    this.props.location.pathname === '/articles' ||
                    this.props.location.pathname === '/articles/add'
                ) {
                    return ActiveClass
                }
                break
            default:
                return ''

        }

        return ''
    }


    render() {

        const changeLanguage = (lng) => {
            i18n.changeLanguage(lng)
            localStorage.setItem('localeId', lng)
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button type="button" className="btn btn-dark btn-sm" onClick={this.toBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>

                <div className="container">

                    <NavLink exact to="/" className="navbar-brand">Home</NavLink>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item dropdown">
                                <a href="#/" className="nav-link dropdown-toggle"
                                   id="navbarDropdownUsers"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Users
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownUsers">
                                    <NavLink exact className="dropdown-item" to="/users">
                                        List Users
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="/users/add">
                                        Add User
                                    </NavLink>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a href="#/" className={"nav-link dropdown-toggle " + (this.isActive('articles'))}
                                   id="navbarDropdownArticles"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Articles
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownArticles">
                                    <NavLink exact className="dropdown-item" to="/articles">
                                        List Articles
                                    </NavLink>
                                    <NavLink className="dropdown-item" to="/articles/add">
                                        Add Articles
                                    </NavLink>
                                </div>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/datatable" className="nav-link">
                                    DataTable
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown">
                                <a href="#/" className="nav-link dropdown-toggle"
                                   id="navbarDropdownLanguage"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Language
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownLanguage">
                                    <button className="dropdown-item"
                                            onClick={() => changeLanguage('ar')}>Arabic
                                    </button>
                                    <button className="dropdown-item"
                                            onClick={() => changeLanguage('fr')}>French
                                    </button>
                                    <button className="dropdown-item"
                                            onClick={() => changeLanguage('en')}>English
                                    </button>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a href="#/" className="nav-link dropdown-toggle"
                                   id="navbarDropdownMyAccount"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user" style={{paddingRight: 10 + 'px'}}></i>
                                    {this.props.currentUser.name}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMyAccount">
                                    <NavLink className="dropdown-item" to="/profil">My Account</NavLink>
                                    <button className="dropdown-item" onClick={this.logout}>Logout</button>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        )
    }


}


const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (ownProps) => dispatch(logout(ownProps)),
    }
}


export default withNamespaces()(withRouter(connect(mapStateToProps, mapDispatchToProps)(Header)))
