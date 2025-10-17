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
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.getStudentEvent = getStudentEvent;
exports.getTeacherEvent = getTeacherEvent;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, type, title, teacherId } = req.body;
        // id is optional for autoincrement, so only check required fields
        if (!type || !title || !teacherId) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        console.log(req.body);
        try {
            const event = yield prisma.event.create({
                data: {
                    type: type.toUpperCase(),
                    title,
                    teacherId,
                },
            });
            return res.status(201).json({ success: true, event });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    });
}
function deleteEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing event id' });
        }
        try {
            const deletedEvent = yield prisma.event.delete({
                where: { id: Number(id) },
            });
            return res.status(200).json({ success: true, event: deletedEvent });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getStudentEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { type } = req.params;
        console.log(type);
        if (!type) {
            return res.status(400).json({ error: 'Missing event type' });
        }
        // Validate type is a valid EventType
        const validTypes = ['JUNIOR', 'PRIMARY', 'SENIOR', 'ALL'];
        if (!validTypes.includes(type.toUpperCase())) {
            return res.status(400).json({ error: 'Invalid event type' });
        }
        try {
            // Fetch events where type is the requested type or 'ALL'
            const events = yield prisma.event.findMany({
                where: {
                    OR: [{ type: type.toUpperCase() }, { type: 'ALL' }],
                },
            });
            return res.status(200).json({ success: true, events });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
function getTeacherEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch and return all events
            const events = yield prisma.event.findMany();
            return res.status(200).json({ success: true, events });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
