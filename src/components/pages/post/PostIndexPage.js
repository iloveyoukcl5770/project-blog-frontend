import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {fetchPosts} from "../../../actions/post"


class PostIndexPage extends Component{

    componentDidMount(){
        this.props.fetchPosts();
    }

    renderPost(post){
        const id = post._id;
        const title = post.title;
        const content = post.content;

        return (
            <tr key={id}>
                <td>{title}</td>
                <td>{content}</td>
            </tr>
        );
    }

    render(){
        console.log(this.props.posts);
        if(!this.props.posts){
            return (
                <div>
                    LOADING...
                </div>
            );
        }else{
            return (
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>title</th>
                        <th>content</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.posts.data.map(this.renderPost)}
                    </tbody>
                </table>
            );
        }

    }

}

function mapStateToProps(state){
    return {
        posts: state.data.posts
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchPosts: fetchPosts
    },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostIndexPage);