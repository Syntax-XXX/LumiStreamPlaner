-------------------------------------
# Stream Time Webhook

Ein Open-Source-Tool zum Posten von Webhooks an Stream Time, basierend auf JavaScript und Electron.

## WICHTIG 
webhook link in der server.mjs einstellabr 
und die webhook konfiguration
## Für https://twitch.tv/lumizap vohr konfiguriert

## Funktionen

* Einfache Benutzeroberfläche
* Automatisches Posten von Webhooks zu konfigurierbaren Zeiten.
* Unterstützung für verschiedene Webhook-Datenformate (z.B. JSON).
* Option zum Testen von Webhooks.
* Benachrichtigungen bei erfolgreichem oder fehlgeschlagenem Webhook-Posting.

## Installation - Selbst clonen

1. **Klone das Repository:**
   ```bash
   git clone https://github.com/Syntax-XXX/LumiStreamPlaner.git
   ```
2. **Installiere Abhängigkeiten:**
   ```bash
   cd LumiStreamPlaner
   npm install
   ```
3. **Starte die Anwendung:**
   ```bash
   npm start
   ```

## Installation - Release

1. **Downloade die .zip**

2. **Starte die Anwendung:**
   Führe die .exe aus

## Verwendung

1. **Konfiguriere die Webhook-URL:** Gib die URL deines Stream Time Webhooks ein.
2. **Konfiguriere die Webhook-Daten:**  Definiere die Daten, die mit dem Webhook gesendet werden sollen (z.B. Stream-Titel, Startzeit, etc.).
3. **Wähle die Post-Zeit:** Bestimme, wann der Webhook automatisch gepostet werden soll.
4. **Teste den Webhook:** Verwende die Testfunktion, um sicherzustellen, dass der Webhook korrekt funktioniert.
5. **Starte das automatische Posten:** Die Anwendung wird nun den Webhook zur konfigurierten Zeit posten.

## Technologien

* **JavaScript:**  Für die Logik und die Benutzeroberfläche.
* **Electron:** Zum Erstellen einer Desktop-Anwendung.
* **Node.js:** Für die Backend-Funktionalität (z.B. Webhook-Posting).

## Beitrag leisten

Beiträge sind herzlich willkommen!

## Lizenz

MIT Lizenz
