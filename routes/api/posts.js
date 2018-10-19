const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Post = require('../../models/Post');


// @route   GET api/posts/
// @desc    Get all posts
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}) , (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json({notFound: "No posts found"}));
});


// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', {session:false}), (req,res) => {
    const { id } = req.params;

    Post.findById(id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json({notFound: "Post not found"}));

});


// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}) , (req,res) => {

    if(req.body.text === ''){
        return res.status(404).json({post: "Post can't be empty"});
    }

    const newPost = new Post({
        text: req.body.text,
        login: req.user.login,
        avatar: req.user.avatar,
        user: req.user.id,
        date: Date.now()
    });

    newPost.save().then(post => res.json(post)).catch(err => console.log(err));

});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    const { id } = req.params;

    Post.findById(id)
        .then(post => {
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({notAuthorized: "User not authorized"});
            }

            post.remove().then(() => res.json({success: true})).catch(err => console.log(err));

        })
        .catch(err => res.status(400).json({notFound: "Post not found"}));

});

// @route   POST api/posts/like/:id
// @desc    Like/unlike post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
    const { id } = req.params;

    Post.findById(id)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                //Splice out of array
                post.likes.splice(removeIndex , 1);
                post.save().then(post => res.json(post));

            }else{
                post.likes.unshift({ user: req.user.id });
                post.save().then(post => res.json(post));
            }

        })
        .catch(err => res.status(400).json({notFound: "Post not found"}));

});

// @route   POST api/posts/comment/:id
// @desc    Create comment
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session:false }), (req, res) => {

    const { id } = req.params;

    if(!req.body.text)return;

    Post.findById(id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                login: req.user.login,
                avatar: req.user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);
            post.save().then(savedPost => res.json(savedPost)).catch(err => console.log(err));

        })
        .catch(err => res.status(404).json({notFound: "Post with this ID not found"}));

});


// @route   DELETE api/posts/commet/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { id, comment_id } = req.params;

    Post.findById(id)
        .then(post =>{
            const comment = post.comments.filter(comment => comment._id.toString() === comment_id)[0];
            // Check if comment exist
            if(comment.length === 0){
                return res.status(404).json({notFound: 'Comment not found'});
            }

            // Check if comment is wrtitten by logged in user
            if(comment.user.toString() !== req.user.id){
                return res.status(401).json({notAuthorized: "User not authorized"});
            }

            // Get index of item that will be removed
            const removeIndex = post.comments
                .map(comment => comment._id.toString())
                .indexOf(req.params.comment_id);

            // Delete comment and save post to db
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post)).catch(err => console.log(err));
            
        })
        .catch(err => res.json({success:false}))

});

module.exports = router;