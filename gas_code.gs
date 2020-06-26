function doGet() {
  return HtmlService.createTemplateFromFile('search_RIMS').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}