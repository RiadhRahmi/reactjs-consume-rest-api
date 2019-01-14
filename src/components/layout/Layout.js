import React, {Component} from 'react'
import Footer from "./Footer"
import Header from "./Header"
import Router from "../../router/router"
import {Breadcrumbs} from 'react-breadcrumbs-dynamic'
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import CrumbItem from "../shared/CrumbItem"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import Alert from "../shared/Alert";


class Layout extends Component {


    getHeader() {
        if (this.props.currentUser) {
            return <Header/>
        }
    }

    getFooter() {
        if (this.props.currentUser) {
            return <Footer/>
        }
    }

    getBredcrumbs() {
        if (this.props.currentUser && this.props.location.pathname !== '/') {
            return (
                <nav aria-label="breadcrumb">

                    <BreadcrumbsItem to="/">
                        Home
                    </BreadcrumbsItem>

                    <Breadcrumbs
                        container="ol"
                        containerProps={{className: "breadcrumb mt-5"}}
                        item={CrumbItem}
                        finalItem={'span'}
                        finalProps={{
                            className: "breadcrumb-item active"
                        }}
                    />
                </nav>
            )
        }
    }

    render() {
        return (
            <div>
                {this.getHeader()}
                <div className="container">
                    {this.getBredcrumbs()}
                    <Alert/>
                    <Router/>
                </div>
                {this.getFooter()}
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
