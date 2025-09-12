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
exports.setHomework = setHomework;
exports.getHomeworkByTeacher = getHomeworkByTeacher;
exports.getHomeworkForStudents = getHomeworkForStudents;
exports.deleteHomework = deleteHomework;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function setHomework(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { className, section, subject, teacher } = req.body;
            if (!className || !section || !subject || !teacher)
                return res.status(400).json({ error: 'Missing fields' });
            const hw = yield prisma.homework.create({
                data: { className, section, subject, teacher },
            });
            res.json({ success: true, homework: hw });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function getHomeworkByTeacher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teacher = req.params.teacher;
            const hw = yield prisma.homework.findMany({
                where: { teacher },
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, homework: hw });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function getHomeworkForStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const className = req.params.className.toUpperCase();
            const section = req.params.section;
            const hw = yield prisma.homework.findMany({
                where: { className, section },
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, homework: hw });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function deleteHomework(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield prisma.homework.delete({ where: { id } });
            res.json({ success: true, message: 'Deleted' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
