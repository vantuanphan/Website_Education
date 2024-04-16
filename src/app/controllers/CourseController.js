const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] /sourses/:slug
    show(req, res) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch((err) => next(err));
    }

    // [GET] /sourses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /sourses/store
    store(req, res, next) {
        const formData = req.body;
        // formData.image = `https://www.youtube.com/watch?v=${formData}`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/my/stored/courses'))
            .catch((error) => {});
    }

    // [GET] /sourses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /sourses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);
    }

    // [DELETE] /sourses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /sourses/:id
    forced(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /sourses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid' });
        }
    }
}

module.exports = new CourseController();
