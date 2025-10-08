"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendence_controller_1 = require("../controllers/attendence.controller");
const router = (0, express_1.Router)();
// * teacher
router.post('/getAll', attendence_controller_1.getStudents);
router.post('/byname', attendence_controller_1.studentTotalAtt);
router.post('/markAttendence', attendence_controller_1.markAttendance);
// * student
exports.default = router;
