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
const bullmq_1 = require("bullmq");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const redis_1 = require("../redis");
const worker = new bullmq_1.Worker('attendanceQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { className, section, students } = job.data;
    console.log('heelo');
    console.log(className, section, students);
    const now = new Date();
    const monthIndex = now.getMonth();
    const dayIndex = now.getDate() - 1;
    for (const studentData of students) {
        const { admissionNumber, present, } = studentData;
        const student = yield prisma.student.findFirst({
            where: { admissionNumber },
        });
        if (!student)
            continue;
        const details = [...student.details];
        if (details.length < 12) {
            const defaultMonths = [
                '0000000000000000000000000000000', // Jan
                '0000000000000000000000000000', // Feb
                '0000000000000000000000000000000', // Mar
                '000000000000000000000000000000', // Apr
                '0000000000000000000000000000000', // May
                '000000000000000000000000000000', // Jun
                '0000000000000000000000000000000', // Jul
                '0000000000000000000000000000000', // Aug
                '000000000000000000000000000000', // Sep
                '0000000000000000000000000000000', // Oct
                '000000000000000000000000000000', // Nov
                '0000000000000000000000000000000', // Dec
            ];
            for (let i = details.length; i < 12; i++)
                details[i] = defaultMonths[i];
        }
        if (present) {
            let monthString = details[monthIndex];
            const chars = monthString.split('');
            if (chars[dayIndex] === '0') {
                chars[dayIndex] = '1';
                monthString = chars.join('');
                yield prisma.student.updateManyAndReturn({
                    where: { admissionNumber },
                    data: {
                        attendence: student.attendence + 1,
                        details: {
                            set: details.map((m, i) => i === monthIndex ? monthString : m),
                        },
                    },
                });
            }
        }
    }
    return { status: 'done' };
}), { connection: redis_1.redis });
worker.on('completed', (job) => {
    console.log(`✅ Attendance job ${job.id} completed`);
});
worker.on('failed', (job, err) => {
    console.error(`❌ Attendance job ${job === null || job === void 0 ? void 0 : job.id} failed:`, err);
});
