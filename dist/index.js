"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const circulars_1 = __importDefault(require("./routes/circulars"));
const timetable_1 = __importDefault(require("./routes/timetable"));
const homework_1 = __importDefault(require("./routes/homework"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/circular', circulars_1.default);
app.use('/api/timetable', timetable_1.default);
app.use('/api/homework', homework_1.default);
app.get('/', (req, res) => res.json({ ok: true, message: 'School backend running' }));
app.listen(3000, () => {
    console.log('app running at http://localhost:3000');
});
exports.default = app;
