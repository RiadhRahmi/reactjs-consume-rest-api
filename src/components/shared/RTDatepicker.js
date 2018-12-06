import React, {Component} from 'react';
import $ from 'jquery';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker.js';

class RTDatepicker extends Component {


    componentDidMount() {
        this.rtdatepicker = $(this.refs.datepicker);
        this.rtdatepicker.datepicker();

        this.handleChange = this.handleChange.bind(this);
        this.rtdatepicker.on('change', this.handleChange);
    }

    componentWillUnmount() {
        this.rtdatepicker.off('change', this.handleChange);
        this.rtdatepicker.datepicker("destroy");
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return <input
            type="text" id="published_at"
            ref='datepicker'
            className={this.props.rtdClassName}
            name={this.props.rtdName}
            value={this.props.rtdValue}
            placeholder={this.props.rtdPlaceholder}
            autoComplete={this.props.rtdAutoComplete}
            onChange={this.handleChange}
        />;
    }
}

export default RTDatepicker;
