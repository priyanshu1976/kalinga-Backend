"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudents = getStudents;
exports.studentTotalAtt = studentTotalAtt;
exports.markAttendance = markAttendance;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const attendanceQueue_1 = require("../queues/attendanceQueue");
function getStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var { className, section } = req.body;
        if (!className || !section) {
            return res.status(400).json({ error: 'Missing class or section' });
        }
        className = className.toString();
        section = section.toUpperCase();
        try {
            const students = yield prisma.student.findMany({
                where: {
                    class: className,
                    section: section,
                },
                select: {
                    name: true,
                    attendence: true,
                },
            });
            return res.status(200).json({ success: true, students });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function studentTotalAtt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var { name } = req.body;
        name = name.toUpperCase();
        if (!name) {
            return res.status(400).json({ error: 'Missing student name' });
        }
        try {
            // Find the student by full name
            const student = yield prisma.student.findFirst({
                //@ts-ignore
                where: { name },
                select: {
                    name: true,
                    attendence: true,
                    details: true,
                },
            });
            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }
            // Get current month and year
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // JS months are 0-based
            // Filter details for this month
            // Assuming details are stored as ISO date strings
            // "details" is a string like "000000000000000000000000000000"
            // Count the number of '1's and get the size
            const detailsString = student.details[currentMonth];
            const presentCount = detailsString
                ? detailsString.split('').filter((c) => c === '1').length
                : 0;
            const totalDays = detailsString ? detailsString.length : 0;
            return res.status(200).json({
                success: true,
                name: student.name,
                attendence: student.attendence,
                presentCount,
                totalDays,
            });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function markAttendance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { class: className, section, students } = req.body;
        if (!className || !section || !students)
            return res.status(400).json({ error: 'Missing required fields' });
        try {
            yield attendanceQueue_1.attendanceQueue.add('markAttendance', {
                className,
                section,
                students,
            });
            return res.status(200).json({
                success: true,
                message: 'Attendance queued successfully ✅',
            });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to queue attendance' });
        }
    });
}
