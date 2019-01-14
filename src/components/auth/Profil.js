import React, {Component} from 'react'
import {Redirect, withRouter} from "react-router-dom"
import connect from "react-redux/es/connect/connect";


class Profil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'My Profil',
        }

    }


    render() {

        if (!this.props.currentUser) {
            return <Redirect to='/login'/>
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
                <div className="card bg-light mb-3 mt-5 pt-5" v-if="user">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.currentUser.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{this.props.currentUser.email}</h6>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profil))
