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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const API_BASE = 'http://localhost:3000/api';
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\n===== TESTING CIRCULARS =====');
        const circular = yield axios_1.default.post(`${API_BASE}/circular`, {
            url: 'https://example.com/circular1.pdf',
            className: 'JUNIOR',
            subject: 'Maths',
        });
        console.log('Created Circular:', circular.data);
        const circulars = yield axios_1.default.get(`${API_BASE}/circular/JUNIOR`);
        console.log('Fetched Circulars:', circulars.data);
        yield axios_1.default.delete(`${API_BASE}/circular/${circular.data.circular.id}`);
        console.log('Deleted Circular');
        console.log('\n===== TESTING TIMETABLE =====');
        const timetable = yield axios_1.default.post(`${API_BASE}/timetable`, {
            url: 'https://example.com/timetable1.pdf',
            className: 'PRIMARY',
            section: 'A',
        });
        console.log('Created Timetable:', timetable.data);
        const timetables = yield axios_1.default.get(`${API_BASE}/timetable/PRIMARY/A`);
        console.log('Fetched Timetables:', timetables.data);
        yield axios_1.default.delete(`${API_BASE}/timetable/${timetable.data.timetable.id}`);
        console.log('Deleted Timetable');
        console.log('\n===== TESTING HOMEWORK =====');
        const homework = yield axios_1.default.post(`${API_BASE}/homework`, {
            className: 'SENIOR',
            section: 'B',
            subject: 'Science',
            teacher: 'Mr. Sharma',
        });
        console.log('Created Homework:', homework.data);
        const teacherHW = yield axios_1.default.get(`${API_BASE}/homework/teacher/Mr. Sharma`);
        console.log('Fetched Homework by Teacher:', teacherHW.data);
        const studentHW = yield axios_1.default.get(`${API_BASE}/homework/student/SENIOR/B`);
        console.log('Fetched Homework for Students:', studentHW.data);
        yield axios_1.default.delete(`${API_BASE}/homework/${homework.data.homework.id}`);
        console.log('Deleted Homework');
        console.log('\n===== ALL TESTS DONE SUCCESSFULLY =====');
    });
}
runTests().catch((err) => { var _a; return console.error('Test Failed:', ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message); });
