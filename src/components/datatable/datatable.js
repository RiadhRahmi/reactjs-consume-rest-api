import React, {Component} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class DataTable extends Component {
    state = {
        products: [
            {
                id: 1,
                name: 'TV',
                'price': 1000
            },
            {
                id: 2,
                name: 'Mobile',
                'price': 500
            },
            {
                id: 3,
                name: 'Book',
                'price': 20
            },
        ],
        columns: [
            {
                dataField: 'id',
                text: 'Product ID',
                sort: true
            },
            {
                dataField: 'name',
                text: 'Product Name',
                sort: true,
                filter: textFilter()
            }, {
                dataField: 'price',
                text: 'Product Price',
                sort: true
            }
        ]
    }

    render() {
        return (
            <div className="container" style={{marginTop: 50}}>
                <BootstrapTable
                    striped
                    hover
                    keyField='id'
                    data={this.state.products}
                    columns={this.state.columns}
                    filter={ filterFactory() }
                    pagination={ paginationFactory() }
                />
            </div>
        );
    }
}

export default DataTable;
