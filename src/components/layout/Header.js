import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {

    goBack() {
        console.log('hello yes')
    }

    logout() {

    }

    switchLanguage(langue) {
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <button type="button" className="btn btn-dark btn-sm" onClick={this.goBack}>
                    <i className="fas fa-arrow-left"></i>
                </button>

                <div className="container">

                    <Link to="/" className="navbar-brand" active-class="active">Home</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle"
                                   id="navbarDropdownUsers" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Users
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownUsers">
                                    <Link className="dropdown-item" to="/users">
                                        List Users
                                    </Link>
                                    <Link className="dropdown-item" to="/users/add">
                                        Add User
                                    </Link>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle"
                                   id="navbarDropdownArticles" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Articles
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownArticles">
                                    <a className="dropdown-item" href="/articles">
                                        List Articles
                                    </a>
                                    <a className="dropdown-item" href="/articles/add">
                                        Add Articles
                                    </a>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a href="/axios" className="nav-link" active-class="active">Axios</a>
                            </li>
                            <li className="nav-item">
                                <a href="/datatable" className="nav-link" active-class="active">DataTable
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="/vue-datatable" className="nav-link" active-class="active">Vue DataTable
                                </a>
                            </li>

                            <li className="nav-item">
                                <a href="/vuex" className="nav-link" active-class="active">Vuex</a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle"
                                   id="navbarDropdownLanguage" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Language
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownLanguage">
                                    <a className="dropdown-item" onClick={this.switchLanguage('ar')}>Arabic</a>
                                    <a className="dropdown-item" onClick={this.switchLanguage('fr')}>French</a>
                                    <a className="dropdown-item" onClick={this.switchLanguage('en')}>English</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle"
                                   id="navbarDropdownMyAccount" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                    User Name
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMyAccount">
                                    <a className="dropdown-item" href="/profil">My Account</a>
                                    <a className="dropdown-item" onClick={this.logout}>Logout</a>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        );
    }


}

export default Header;
