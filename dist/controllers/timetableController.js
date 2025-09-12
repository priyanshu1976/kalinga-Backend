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
exports.setTimetable = setTimetable;
exports.getTimetable = getTimetable;
exports.deleteTimetable = deleteTimetable;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function setTimetable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url, className, section } = req.body;
            if (!url || !className || !section)
                return res.status(400).json({ error: 'Missing fields' });
            const tt = yield prisma.timetable.create({
                data: { url, className, section },
            });
            res.json({ success: true, timetable: tt });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function getTimetable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const className = req.params.className.toUpperCase();
            const section = req.params.section;
            const tts = yield prisma.timetable.findMany({
                where: { className, section },
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, timetables: tts });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function deleteTimetable(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield prisma.timetable.delete({ where: { id } });
            res.json({ success: true, message: 'Deleted' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
