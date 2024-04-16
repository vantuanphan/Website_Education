const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
    // [GET] /news
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
        // .catch((error) => next(error))
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('HOME/:SLUG');
    }
}

module.exports = new HomeController();
