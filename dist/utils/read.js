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
const path_1 = __importDefault(require("path"));
const xlsx_1 = __importDefault(require("xlsx"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function readFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = path_1.default.join(__dirname, 'student.xlsx');
            const workbook = xlsx_1.default.readFile(filePath);
            const sheets = workbook.SheetNames;
            console.log(sheets);
            for (const sheetName of sheets) {
                // Get the worksheet
                const worksheet = workbook.Sheets[sheetName];
                // Define the range where actual data starts (row 4 based on your sheet)
                //@ts-ignore
                const range = xlsx_1.default.utils.decode_range(worksheet['!ref']);
                range.s.r = 3; // Start from row 4 (0-indexed, so 3 means row 4)
                // Update the worksheet range
                worksheet['!ref'] = xlsx_1.default.utils.encode_range(range);
                // Convert to JSON starting from row 4
                const data = xlsx_1.default.utils.sheet_to_json(worksheet);
                let className = '';
                let section = '';
                let match = sheetName.match(/^(\d+)\s*([A-Z])?$/i);
                if (!match)
                    match = sheetName.match(/^([A-Z]+)\s*([A-Z])?$/i);
                if (match) {
                    className = match[1].trim();
                    section = match[2] ? match[2].trim() : '';
                }
                else {
                    className = sheetName.trim();
                    section = '';
                }
                console.log(`📘 Importing sheet: ${sheetName} => Class: ${className}, Section: ${section}`);
                for (const row of data) {
                    const name = 
                    //@ts-ignore
                    row.name || // lowercase 'name' based on your sheet
                        //@ts-ignore
                        row.Name ||
                        //@ts-ignore
                        row.StudentName ||
                        //@ts-ignore
                        row["Student's Name"] ||
                        //@ts-ignore
                        row['STUDENT NAME'];
                    console.log('Processing:', name);
                    if (!name) {
                        console.log('Skipping row with no name:', row);
                        continue; // skip empty rows
                    }
                    yield prisma.student.create({
                        data: {
                            name: name.trim(),
                            class: className,
                            section,
                            attendence: 0,
                        },
                    });
                }
            }
            console.log({ message: '✅ All students imported successfully!' });
        }
        catch (error) {
            console.error('❌ Error importing students:', error);
            console.log({ error: 'Something went wrong' });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
readFile();
