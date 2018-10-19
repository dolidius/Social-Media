const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

app.use(passport.initialize());
require('./config/passport')(passport);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = 5000 || process.env.port;

app.listen(port, () => console.log(`Server running on port ${port}`));