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
exports.createCircular = createCircular;
exports.getCircularsByClass = getCircularsByClass;
exports.deleteCircular = deleteCircular;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createCircular(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url, className } = req.body;
            if (!url || !className)
                return res.status(400).json({ error: 'Missing fields' });
            const circular = yield prisma.circular.create({
                data: { url, className },
            });
            res.json({ success: true, circular });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function getCircularsByClass(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const className = req.params.className.toUpperCase();
            const circulars = yield prisma.circular.findMany({
                where: { className },
                orderBy: { createdAt: 'desc' },
            });
            res.json({ success: true, circulars });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
function deleteCircular(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            yield prisma.circular.delete({ where: { id } });
            res.json({ success: true, message: 'Deleted' });
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}
