import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export function exportAsExcelFile(data, excelFileName) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const da = new Blob([excelBuffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(da, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
