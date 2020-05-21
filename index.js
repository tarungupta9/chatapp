const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const config = require('config');

const app = express();

app.use(helmet());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('auth', auth);
app.use('/api', api);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets like out main.js and main.css file
  app.use(express.static('client/build')); // no route specified try to look in client/build
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || config.get('PORT');
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
/**
 * In Package.json we have defined the engines for Herouku so that
 * it can run our app with specified verisons
 */