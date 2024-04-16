const newRouter = require('./news');
const myRouter = require('./my');
const coursesRouter = require('./courses');

const homeRouter = require('./home');

function route(app) {
    app.use('/news', newRouter);
    app.use('/my', myRouter);
    app.use('/courses', coursesRouter);

    app.use('/', homeRouter);
}

module.exports = route;
