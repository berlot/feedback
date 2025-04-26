# Aplikacja do zbierania opinii po prezentacji AI

Prosta, interaktywna aplikacja webowa w stylu "vibe coding" do zbierania opinii po prezentacji o narzędziach AI, z zapisem danych w Google Sheets.

## Funkcje

- Ocena prezentacji w skali od 0 do 10 za pomocą interaktywnego suwaka
- Pole do wpisania szczegółowego feedbacku
- Animowane przejścia między ekranami
- Ekran potwierdzenia po wysłaniu opinii
- Zapisywanie opinii w Google Sheets, dostępne tylko dla administratora
- Responsywny design działający na urządzeniach mobilnych i desktopach

## Jak uruchomić

1. Skonfiguruj backend Google Sheets według instrukcji w pliku `README-SETUP.md`
2. Zaktualizuj URL API w pliku `script.js`
3. Wdróż aplikację na wybranym hostingu (GitHub Pages, Netlify, itp.)
4. Udostępnij link uczestnikom prezentacji

## Jak używać po prezentacji

1. Udostępnij link do aplikacji uczestnikom prezentacji
2. Uczestnicy mogą ocenić prezentację i wpisać swój feedback
3. Wszystkie opinie są automatycznie zapisywane w Twoim arkuszu Google Sheets
4. Tylko Ty (właściciel arkusza) masz dostęp do zebranych opinii

## Technologie

- HTML5
- CSS3 (z animacjami i zmiennymi CSS)
- JavaScript (vanilla, bez zewnętrznych bibliotek)
- Google Sheets API jako backend do przechowywania danych

## Struktura projektu

- `index.html` - struktura aplikacji
- `styles.css` - stylizacja i animacje
- `script.js` - logika aplikacji i obsługa danych
- `README-SETUP.md` - instrukcje konfiguracji backendu Google Sheets

## Prywatność

Wszystkie dane są przechowywane w Twoim prywatnym arkuszu Google, do którego tylko Ty masz dostęp. Uczestnicy prezentacji mogą tylko dodawać nowe opinie, ale nie mogą zobaczyć opinii innych osób. 