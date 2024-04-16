const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MyController {
    // [GET] /my/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find(),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCount]) =>
                res.render('my/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch((err) => next(err));

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //     })
        //     .catch(() => {});
        // Course.find()
        //     .then(courses => res.render('my/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(err => next(err));
    }

    // [GET] /my/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) => {
                res.render('my/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch((err) => next(err));
    }
}

module.exports = new MyController();
