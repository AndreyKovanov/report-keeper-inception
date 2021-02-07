import fs from 'fs';
import path from 'path';
import { app, dialog, ipcMain } from 'electron';
import ExcelJS from 'exceljs';

class ExcelFile {
  // eslint-disable-next-line class-methods-use-this
  public init() {
    console.log('ExcelFileManager was initialized');
  }
}

export const ExcelFileManager = new ExcelFile();

ipcMain.handle('excelFile:writeReport', (event, ...reportData) => {
  console.log('test2', reportData);
  // Write reportData to file
  return null;
});

// ipcMain.handle('appWindow:chooseReportsTemplate', async () => {
//   const paths = dialog.showOpenDialogSync({
//     properties: ['openFile'],
//   });

//   if (!paths || !paths[0]) {
//     return undefined;
//   }

//   const [filePath] = paths;

//   fs.copyFileSync(
//     filePath,
//     path.join(app.getPath('userData'), 'template.xlsx')
//   );

//   const workbook = new ExcelJS.Workbook();
//   const book = await workbook.xlsx.readFile(filePath);
//   const worksheet = book.getWorksheet('Projects');
//   const columnValues = worksheet.getColumn('A').values;

//   return columnValues.slice(2);
// });
