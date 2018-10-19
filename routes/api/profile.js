const express = require('express');
const router = express.Router();
const passport = require('passport');

const Profile = require('../../models/Profile');

// @route   GET api/profile/:user_id
// @desc    Get profile by user id
// @access  Private
router.get('/:user_id', passport.authenticate('jwt', { session: false }) ,(req,res) => {

    const { user_id } = req.params;

    Profile.findOne({user: user_id})
        .then(profile => res.json(profile))
        .catch(err => res.status(404).json({notFound:"Profile not found"}));

});

// @route   GET api/profile/edit/
// @desc    Update profile
// @access  Private
router.post('/edit/', passport.authenticate('jwt', { session: false }), (req,res) => {

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if(req.body.avatar)profile.avatar = req.body.avatar; 
            if(req.body.liveIn)profile.liveIn = req.body.liveIn; 
            if(req.body.attendedTo)profile.attendedTo = req.body.attendedTo; 
            if(req.body.number)profile.number = req.body.number; 
            if(req.body.work)profile.work = req.body.work; 
            profile.save().then(savedProfile => res.json(savedProfile)).catch(err => console.log(err));
        })
        .catch(err => res.status(404).json({notFound: 'Profile not found'}));

});

router.get('/test', (req,res) => {
    res.json({success: true});
})

module.exports = router;