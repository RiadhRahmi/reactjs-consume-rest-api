import React, {Component} from 'react';


class Alert extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className={'alert alert-' + this.props.color + ' alert-dismissible fade show'}
                        role="alert">
                        {this.props.message}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Alert;
