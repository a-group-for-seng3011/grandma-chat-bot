const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const webviewRoutes = require('./routes/webviews');
const verificationRoutes = require('./routes/verification');
const diseaseRoutes = require('./routes/diseases');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');
app.set('views', './views');

// GET endpoint
app.get('/', function(request, response) {
    response.send('Hi, welcome to our home page.');
});

app.use('/diseases', diseaseRoutes);
app.get('/diseases', function(request, response, next) {
    next();
});

app.post('/attributes/reset', (request, response) => {
    const keyNames = Object.keys(request.body);

    let attributes = {};
    keyNames.forEach(keyName => {
        attributes[keyName] = null;
    });

    response.json({ set_attributes: attributes });
});

app.use('/webviews', webviewRoutes);

// Add verification routes
app.use('/verify', verificationRoutes);


// Start the server and listen for incoming requests
const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
