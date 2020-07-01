function doGet() {
  return HtmlService.createTemplateFromFile('search_RIMS').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function readKokyurokuSheet(){
  var scriptProperties = PropertiesService.getScriptProperties();
  var url = scriptProperties.getProperty("kokyurokuSheet");
  var spreadsheet =  SpreadsheetApp.openByUrl(url);
  var sheets = spreadsheet.getSheets();
  return sheets[0];
}

function readAllPdfInfo(){
  var scriptProperties = PropertiesService.getScriptProperties();
  var url = scriptProperties.getProperty("allPdfInfo");
  var spreadsheet =  SpreadsheetApp.openByUrl(url);
  var sheets = spreadsheet.getSheets();
  return sheets[0];
}


function searchAllInKokyuroku(searchWord){
  Logger.log(searchWord);
  var kokyurokuSheet = readKokyurokuSheet();
  var numRows = kokyurokuSheet.getLastRow();
  var numColumns = kokyurokuSheet.getLastColumn();
  var values = kokyurokuSheet.getRange(1,1, numRows, numColumns).getValues();
  var hitValues = [];
  
  for(var i=1; i < numRows ; i++){
    for(var j=1; j<4; j++){
      if(values[i][j].indexOf(searchWord)!=-1){
        hitValues.push(values[i]);
        break;
      }
    }
  }
  Logger.log(hitValues);
  return hitValues
}

function searchAllInPdfInfo(searchWord){
  var allPdfInfoSheet = readAllPdfInfo();
  var numRows = allPdfInfoSheet.getLastRow();
  var numColumns = allPdfInfoSheet.getLastColumn();
  var values = allPdfInfoSheet.getRange(1,1, numRows, numColumns).getValues();
  var hitValues = [];
  
  for(var i=1; i < numRows ; i++){
    for(var j in [2,4,5,6]){
      if(typeof values[i][j] == "string" && values[i][j].indexOf(searchWord)!=-1){
        hitValues.push(values[i]);
        break;
      }
    }
  }
  return hitValues
}
  


  