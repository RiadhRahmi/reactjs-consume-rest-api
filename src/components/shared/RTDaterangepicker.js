import React, {Component} from 'react';
import $ from 'jquery';
import * as moment from 'moment';
import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';

class RTDaterangepicker extends Component {


    componentDidMount() {
        this.rtdaterangepicker = $(this.refs.daterangepicker);
        this.rtdaterangepicker.daterangepicker({
            alwaysShowCalendars: true,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'),
                    moment().subtract(1, 'month').endOf('month')]
            },
            locale: {
                format: this.props.rtdFormatDate
            }
        });

        this.handleChange = this.handleChange.bind(this);
        this.rtdaterangepicker.on('change', this.handleChange);
    }

    componentWillUnmount() {
        this.rtdaterangepicker.off('change', this.handleChange);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return <input
            ref='daterangepicker'
            type="text"
            name={this.props.rtdName}
            value={this.props.rtdValue}
            className={this.props.rtdClassName}
            placeholder={this.props.rtdPlaceholder}
            onChange={this.handleChange}
        />;
    }
}

export default RTDaterangepicker;
