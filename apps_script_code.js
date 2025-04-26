// Obsłuż żądania GET (do testowania i do pobierania danych przez parametry URL)
function doGet(e) {
  // Sprawdź, czy mamy dane w parametrach
  if (e.parameter.data) {
    try {
      // Parsuj dane z parametru
      const data = JSON.parse(e.parameter.data);
      
      // Zapisz dane do arkusza
      saveDataToSheet(data);
      
      // Zwróć sukces
      return ContentService.createTextOutput("Dane zapisane pomyślnie")
        .setMimeType(ContentService.MimeType.TEXT);
    } catch (error) {
      // Zwróć błąd
      return ContentService.createTextOutput("Błąd: " + error.toString())
        .setMimeType(ContentService.MimeType.TEXT);
    }
  }
  
  // Domyślna odpowiedź, jeśli nie ma danych
  return HtmlService.createHtmlOutput("<h2>API Feedback App</h2><p>Ten endpoint przyjmuje dane w formacie JSON.</p>");
}

// Obsłuż żądania POST (dla kompatybilności)
function doPost(e) {
  try {
    // Pobierz dane JSON z żądania
    const data = JSON.parse(e.postData.contents);
    
    // Zapisz dane do arkusza
    saveDataToSheet(data);
    
    // Zwróć sukces
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Obsłuż błąd
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Wspólna funkcja do zapisywania danych w arkuszu
function saveDataToSheet(data) {
  // Pobierz aktywny arkusz
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Dodaj dane do arkusza
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.sessionId || "brak-id",
    data.rating || "0",
    data.feedback || "brak-feedbacku",
    data.userAgent || "nieznany"
  ]);
  
  // Zaloguj do dziennika, co pomaga w debugowaniu
  Logger.log("Zapisano dane: " + JSON.stringify(data));
} 