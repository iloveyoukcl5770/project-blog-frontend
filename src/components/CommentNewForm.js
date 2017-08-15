import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { clearDataErr } from "../actions/post";
import { createComment } from "../actions/comment"
import { Link } from 'react-router-dom';
import history from '../history';
import { Button } from 'antd';

class CommentNewForm extends Component{
    constructor(){
        super();
        this.renderField = this.renderField.bind(this);
    }

    componentWillMount(){
        this.props.clearDataErr();
    }

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "has-error" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <textarea className="form-control" type={field.type} {...field.input}/>
                <div className="input-helper">
                    {touched ? error : ""}
                </div>
            </div>
        );

    }

    renderDataMessage(){
        if(this.props.postErrorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>{this.props.postErrorMessage}</strong>
                </div>
            )
        }
    }

    renderButton(){
        const { handleSubmit } = this.props;
        return(
            <div>
                <Button onClick={handleSubmit(this.onSubmit.bind(this))}>
                    Submit
                </Button>
            </div>

        )
    }

    onSubmit(values){
        if(values){
            this.props.createComment({content: values.content}, this.props.postId);
        }
    }

    render(){

        return(
            <form>
                <Field
                    label="Leave you comment:"
                    name="content"
                    type="text"
                    component={this.renderField}
                />
                {this.renderDataMessage()}
                {this.renderButton()}
            </form>
        );
    }
}

function validateForm(values){
    const errors={};
    return errors;
}

function mapStateToProps(state){
    return { postErrorMessage: state.data.error};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        createComment: createComment,
        clearDataErr: clearDataErr
    },dispatch);
}

export default  reduxForm({
    validate: validateForm,
    form: 'commentNew',
})(connect(mapStateToProps, mapDispatchToProps)(CommentNewForm))