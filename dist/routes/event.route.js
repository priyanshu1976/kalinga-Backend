"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const event_controller_2 = require("../controllers/event.controller");
const router = (0, express_1.Router)();
// * teacher
router.put('/create', event_controller_1.createEvent);
router.delete('/delete/:id', event_controller_2.deleteEvent);
router.get('/tevent', event_controller_2.getTeacherEvent);
// * student
router.get('/:type', event_controller_2.getStudentEvent);
exports.default = router;
