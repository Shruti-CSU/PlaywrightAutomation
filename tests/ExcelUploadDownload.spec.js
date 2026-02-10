const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');


async function ExcelWriteTest (ActualValue, ReplaceValue, ChangeLocation, FilePath) 
{   
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(FilePath);
    const worksheet = workbook.getWorksheet("Sheet1");
    const output = ExcelReadTest(worksheet, ActualValue);

    const cell =  worksheet.getCell(output.row, output.column + ChangeLocation.colChange);
    cell.value = ReplaceValue;
    await workbook.xlsx.writeFile(FilePath);

};

function ExcelReadTest (worksheet, ActualValue) 
{
    let output = {row:1, column:1};
    worksheet.eachRow( (row, rowNumber)=> 
        {
            row.eachCell( (cell, colNumber) => 
            {
                if (cell.value === ActualValue) {
                    output = {row:rowNumber, column:colNumber}
                }
            });
    });

    return output;
};


test('@Excel Download > Modify > Upload Excel', async ({page})=>
{
    const OriginalText = "Mango";
    const ReplaceText = "500";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    
    const download = page.waitForEvent('download');
    await page.locator("#downloadButton").click();
    const D1 = await download;

    const FilePath = "C:/Users/shrut/Downloads/download.xlsx";
    await ExcelWriteTest(OriginalText, ReplaceText, { rowChange: 0, colChange: 2 }, FilePath);

    await page.locator("#fileinput").setInputFiles(FilePath);
    
    console.log(await page.locator("#row-0").filter({has: page.locator("#cell-4-undefined")}).textContent());


});