# Aplikacja do zbierania opinii po prezentacji AI

Prosta, interaktywna aplikacja webowa w stylu "vibe coding" do zbierania opinii po prezentacji o narzędziach AI.

## Funkcje

- Ocena prezentacji w skali od 0 do 10 za pomocą interaktywnego suwaka
- Pole do wpisania szczegółowego feedbacku
- Animowane przejścia między ekranami
- Ekran potwierdzenia po wysłaniu opinii
- Zapisywanie opinii w formacie JSON do pobrania
- Responsywny design działający na urządzeniach mobilnych i desktopach

## Jak uruchomić

1. Pobierz wszystkie pliki z repozytorium
2. Otwórz plik `index.html` w przeglądarce internetowej
3. Możesz również hostować te pliki na dowolnym serwerze statycznym lub usłudze hostingowej

## Jak używać po prezentacji

1. Udostępnij link do aplikacji uczestnikom prezentacji
2. Uczestnicy mogą ocenić prezentację i wpisać swój feedback
3. Po kliknięciu "Wyślij opinię", dane zostaną zapisane lokalnie oraz zostanie pobrany plik JSON z opiniami
4. Możesz zbierać pliki JSON od uczestników lub poprosić ich o przesłanie tych plików

## Technologie

- HTML5
- CSS3 (z animacjami i zmiennymi CSS)
- JavaScript (vanilla, bez zewnętrznych bibliotek)
- LocalStorage do zapisywania danych

## Struktura projektu

- `index.html` - struktura aplikacji
- `styles.css` - stylizacja i animacje
- `script.js` - logika aplikacji i obsługa danych

## Bonus

Aplikacja automatycznie generuje plik JSON z opiniami, który można pobrać po wysłaniu każdej opinii. 