import React, {Component} from 'react'
import {connect} from "react-redux";

class Alert extends Component {
    render() {
        if (this.props.alert.showAlert === true) {
            return (
                <div className="row">
                    <div className="col-12">
                        <div className={'alert alert-' + this.props.alert.colorAlert + ' alert-dismissible fade show'}
                             role="alert">
                            {this.props.alert.messageAlert}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>

            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert.alert,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(mapStateToProps, mapDispatchToProps)(Alert)
