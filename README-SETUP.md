# Konfiguracja backendu dla aplikacji feedback

## Krok 1: Utwórz arkusz Google Sheets

1. Przejdź do [Google Sheets](https://sheets.google.com)
2. Utwórz nowy arkusz
3. W pierwszym wierszu ustaw następujące nagłówki kolumn:
   - A1: `timestamp`
   - B1: `sessionId`
   - C1: `rating` 
   - D1: `feedback`
   - E1: `userAgent`

## Krok 2: Utwórz skrypt Google Apps Script

1. W arkuszu Google Sheets przejdź do menu "Rozszerzenia" > "Apps Script"
2. Usuń domyślny kod i wklej poniższy:

```javascript
function doGet(e) {
  return HtmlService.createHtmlOutput("Success");
}

function doPost(e) {
  try {
    // Pobierz dane JSON z żądania
    const data = JSON.parse(e.postData.contents);
    
    // Pobierz aktywny arkusz
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Dodaj dane do arkusza
    sheet.appendRow([
      data.timestamp,
      data.sessionId,
      data.rating,
      data.feedback,
      data.userAgent
    ]);
    
    // Zwróć sukces
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Obsłuż błąd
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Kliknij przycisk "Zapisz" (ikona dyskietki)
4. Nazwij projekt np. "Feedback App"

## Krok 3: Wdróż jako aplikację internetową

1. Kliknij przycisk "Wdróż" > "Nowe wdrożenie"
2. Wybierz typ: "Aplikacja internetowa"
3. Uzupełnij pola:
   - Opis: "Feedback App API"
   - Wykonaj jako: "Ja" (twoje konto Google)
   - Kto ma dostęp: "Wszyscy" (lub "Każdy, nawet anonimowo")
4. Kliknij "Wdróż"
5. Skopiuj wygenerowany URL aplikacji internetowej
6. Potwierdź uprawnienia jeśli zostaniesz o to poproszony

## Krok 4: Zaktualizuj plik script.js

1. W pliku script.js znajdź linię:
   ```javascript
   const apiUrl = 'TU_WSTAW_URL_TWOJEGO_WEB_APP';
   ```
2. Zamień `TU_WSTAW_URL_TWOJEGO_WEB_APP` na URL, który skopiowałeś w kroku 3.

## Krok 5: Wdróż aplikację

1. Wdróż aplikację na wybranym hostingu (np. GitHub Pages)
2. Udostępnij link użytkownikom
3. Zbierane opinie będą zapisywane w Twoim arkuszu Google Sheets

## Uwagi

- Tylko Ty masz dostęp do arkusza Google Sheets, więc tylko Ty widzisz opinie
- Dane są bezpiecznie przechowywane w Twoim koncie Google
- Możesz łatwo eksportować dane do innych formatów (CSV, PDF, itp.)
- W przypadku dużej liczby odpowiedzi, możesz potrzebować dostosować limity Google Apps Script 