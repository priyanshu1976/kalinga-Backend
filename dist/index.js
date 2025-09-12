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
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
// Helmet helps secure Express apps by setting various HTTP headers to protect against common vulnerabilities.
app.use((0, helmet_1.default)());
// Morgan is an HTTP request logger middleware for Node.js, used here in 'dev' mode for concise colored output.
app.use((0, morgan_1.default)('dev'));
app.use('/api/circular', circulars_1.default);
app.use('/api/timetable', timetable_1.default);
app.use('/api/homework', homework_1.default);
app.get('/', (req, res) => res.json({ ok: true, message: 'School backend running' }));
app.listen(3001, () => {
    console.log('app running at http://localhost:3001');
});
exports.default = app;
