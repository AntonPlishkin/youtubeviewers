function getService() {
    return 'https://www.googleapis.com/youtube/v3';
}

function getVideoInfo(videoId) {
    try {
        var url = getService() + '/videos?id=' + videoId + '&part=snippet,statistics&key=' + API_KEY;
        var response = JSON.parse(UrlFetchApp.fetch(url).getContentText());
        var viewCount = response.items[0].statistics.viewCount;
        return viewCount;
    } catch (e) {
        console.error('Error fetching video info:', e);
        return 'Error';
    }
}

function updateViewCounts(sheetName, readRange, insertSheetName, insertRange) {
    try {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = spreadsheet.getSheetByName(sheetName);

        var videoIds = sheet.getRange(readRange).getValues().flat().map(function(url) {
            return url.match(/(?<=v=)[^&]+/)?.[0];
        });

        var viewCounts = videoIds.map(function(videoId) {
            return getVideoInfo(videoId);
        });

        var insertSheet = spreadsheet.getSheetByName(insertSheetName);
   
        insertSheet.getRange(insertRange).setValues(viewCounts.map(function(viewCount) {
            return [viewCount];
        }));
    } catch (e) {
        console.error('Error updating view counts:', e);
        Browser.msgBox('Произошла ошибка при выполнении скрипта. Подробности смотрите в журнале выполнения.');
    }
}

function youtubeviews() {
    try {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheets = spreadsheet.getSheets().map(function(sheet) {
            return sheet.getName();
        });

        // 1. Выбор листа и диапазона для считывания
        var readResponse = SpreadsheetApp.getUi().prompt(
            'Выберите лист для считывания информации:',
            'Доступные листы: ' + sheets.join(','),
            SpreadsheetApp.getUi().ButtonSet.OK_CANCEL
        );



        if (readResponse.getSelectedButton() === SpreadsheetApp.getUi().Button.CANCEL) {
            return; // Операция отменена пользователем
        }

        var readSheetName = readResponse.getResponseText();
        var readRange = Browser.inputBox('Введите диапазон считывания (например, D9:D28):');
        var readCellsCount = spreadsheet.getSheetByName(readSheetName).getRange(readRange).getValues().flat().filter(Boolean).length;

        // 2. Вопрос о воспроизведении в выбранном листе
        var reuseResponse = SpreadsheetApp.getUi().prompt(
            'Вывести в выбранный лист?',
            'Если Да, данные будут выведены в выбранный лист для считывания (' + readSheetName + '). Если Нет, будет предложен выбор другого листа для вывода.',
            SpreadsheetApp.getUi().ButtonSet.YES_NO
        );

        var insertSheetName, insertRange;

        if (reuseResponse.getSelectedButton() === SpreadsheetApp.getUi().Button.YES) {
            // 2a. Если "Да", запросите диапазон для вывода
            insertSheetName = readSheetName;
            insertRange = Browser.inputBox('Введите диапазон вставки (например, G9:G28). Необходимое количество ячеек для вывода: ' + readCellsCount);
        } else {
            // 3. Выбор листа и диапазона для вывода
            var insertResponse = SpreadsheetApp.getUi().prompt(
                'Выберите лист для вывода информации:',
                'Доступные листы: ' + sheets.join(','),
                SpreadsheetApp.getUi().ButtonSet.OK_CANCEL
            );

            if (insertResponse.getSelectedButton() === SpreadsheetApp.getUi().Button.CANCEL) {
                return; // Операция отменена пользователем
            }

            insertSheetName = insertResponse.getResponseText();
            // Включаем количество ячеек в текст вопроса о диапазоне для вывода
            insertRange = Browser.inputBox('Введите диапазон вставки (например, G9:G28). Необходимое количество ячеек для вывода: ' + readCellsCount);
        }

        if (readSheetName && readRange && insertSheetName && insertRange) {
            updateViewCounts(readSheetName, readRange, insertSheetName, insertRange);
            Browser.msgBox('Операция завершена успешно.');
        } else {
            Browser.msgBox('Введены некорректные данные. Операция отменена.');
        }
    } catch (e) {
        console.error('Error in youtubeviews:', e);
        Browser.msgBox('Произошла ошибка при выполнении скрипта. Подробности смотрите в журнале выполнения.');
    }
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('Скрипты')
        .addItem('Запустить youtubeviews', 'youtubeviews')
        .addToUi();
}

const API_KEY = 'Your API Key';
