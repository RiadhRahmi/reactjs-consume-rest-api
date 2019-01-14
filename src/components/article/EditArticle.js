import React, {Component} from 'react'
import RTDatepicker from "../shared/RTDatepicker"
import {withRouter} from "react-router-dom"
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic"

import {connect} from 'react-redux'
import {updateArticle, getArticle} from "../../actions"
import Spinner from "../shared/Spinner";


class EditArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagetitle: 'Edit Article',
            article: {
                title: '',
                author: '',
                published_at: '',
                body: '',
            },
        }

        this.handleChangeRTDatepicker = this.handleChangeRTDatepicker.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.editArticle = this.editArticle.bind(this)
    }

    componentDidMount() {
        this.props.getArticle(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            article: nextProps.article,
        })
    }


    editArticle(event) {
        event.preventDefault()
        this.props.updateArticle(this.props.match.params.id, this.state.article, this.props)
    }

    changeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            article: {
                ...this.state.article,
                [name]: value,
            }
        })

    }

    handleChangeRTDatepicker(value) {
        this.setState({
            article: {
                ...this.state.article,
                published_at: value,
            }
        })
    }




    render() {

        if (this.props.loading) {
            return <Spinner/>
        }


        return (
            <div>
                <BreadcrumbsItem to='/articles/:id/edit'>Edit Article {this.state.article.title}</BreadcrumbsItem>
                <div className="row">
                    <div className="col-12">
                        <div className="pb-2 mt-4 mb-2 border-bottom">
                            <h1>
                                {this.state.pagetitle}
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.editArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input name="title" value={this.state.article.title} type="text"
                                       className="form-control"
                                       id="title" placeholder="Enter title"
                                       onChange={this.changeHandler}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Author</label>
                                <input name="author" value={this.state.article.author}
                                       type="text" className="form-control"
                                       id="author"
                                       placeholder="Enter author"
                                       onChange={this.changeHandler}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="published_at">Published at </label>
                                <RTDatepicker
                                    rtdName="published_at" rtdValue={this.state.article.published_at}
                                    onChange={this.handleChangeRTDatepicker}
                                    rtdClassName="form-control"
                                    rtdPlaceholder="Enter date published" rtdAutoComplete="off"/>
                            </div>


                            <div className="form-group">
                                <label htmlFor="body">Description</label>
                                <textarea name="body" value={this.state.article.body} className="form-control"
                                          id="body" rows="5" placeholder="Enter description"
                                          onChange={this.changeHandler}></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>

        )
    }

}


const mapStateToProps = state => {
    return {
        loading: state.spinner.loading,
        article: state.article.article,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle: (id) => dispatch(getArticle(id)),
        updateArticle: (id, article, ownProps) => dispatch(updateArticle(id, article, ownProps)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditArticle))
