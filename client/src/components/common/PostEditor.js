import React, { Component } from 'react';
import styles from '../../CSS-Modules/dashboard/PostEditor.module.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/postActions';

class PostEditor extends Component {

    state = {
        postText: '',
        errors: {}
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createPost = e => {
        e.preventDefault();

        const postData = {
            text: this.state.postText
        }

        if(postData.text === ''){
            alert("Post can't be empty");
        }else{
            this.props.createPost(postData);
            this.setState({postText: ''});
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        return (
            <div className={styles.postEditor}>
                <form onSubmit={this.createPost}>
                    <textarea onChange={this.inputChange} placeholder="What's up?" value={this.state.postText} className={styles.postInput} name='postText' />
                    <button className={styles.postButton}>Submit</button>
                </form>
            </div>
        )
    }

}

PostEditor.propTypes = {
    createPost: PropTypes.func.isRequired
}

export default connect(null, { createPost })(PostEditor);