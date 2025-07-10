## Be-Final-Project

### Dci_fbw_wd24_d07 Be Final Project

- [Randy Born](https://github.com/RandyBorn)

- [Kushtrim Bilali](https://github.com/Kushtrim2024)

- [Melissa Kebi](https://github.com/MelissaKebi)

- [Cihan Ünal](https://github.com/CihanUnall)

Benutzer registriert sich und loggt sich ein
Benutzer durchsucht Produkte (GET /products)
Benutzer fügt Produkt A und B in den Warenkorb (POST /cart)
Benutzer schickt Bestellung ab (POST /order)
Daten landen in Order-Collection + Warenkorb wird gelöscht
Wenn du möchtest, kann ich dir als Nächstes Folgendes erstellen:
:aktenordner: Eine Projektstruktur (Ordner + Dateien)
:ziegelsteine: Die MongoDB-Modelle (User, Product, Cart, Order)
:stecker: Beispiel-API-Routen (Express.js)
:reagenzglas: Ein kl

Ziel des Projekts:
Eine REST-API für einen kleinen Webshop, in dem:
Benutzer sich registrieren und einloggen können
Produkte angezeigt, hinzugefügt und bearbeitet werden können
Benutzer Produkte in den Warenkorb legen
Und schließlich eine Bestellung aufgeben
:jigsaw: Technologien:
Node.js mit Express.js
MongoDB mit Mongoose
JWT für Authentifizierung
Postman zum Testen der API
Deployment möglich z. B. auf Render, Railway oder Vercel (Frontend)
:white_check_mark: Funktionen im Detail
:closed_lock_with_key: 1. Authentifizierung & Kundenverwaltung
Registrieren: Benutzer gibt Name, E-Mail, Passwort an → Passwort wird gehasht gespeichert
Login: Benutzer gibt E-Mail + Passwort ein → erhält JWT
JWT Middleware: schützt alle "geschützten" Routen (Warenkorb, Bestellung)
Beispiel-Routen:
POST /api/auth/register
POST /api/auth/login
Modell:
js
Kopieren
Bearbeiten
User {
name: String,
email: String,
password: String (bcrypt)
}
:package: 2. Produktverwaltung (CRUD)
Produkte können erstellt, angezeigt, aktualisiert und gelöscht werden
Felder z. B.: Name, Beschreibung, Preis, Kategorie, Lagerbestand
Beispiel-Routen:
GET /api/products → Alle Produkte
POST /api/products → Produkt erstellen
PUT /api/products/:id → Produkt bearbeiten
DELETE /api/products/:id → Produkt löschen
Modell:
js
Kopieren
Bearbeiten
Product {
name: String,
description: String,
price: Number,
stock: Number,
category: String
}
:shopping_trolley: 3. Warenkorb & Bestellungen
Ein Benutzer kann mehrere Produkte mit Menge in seinen Warenkorb legen
Dann eine Bestellung aufgeben – danach wird der Warenkorb geleert
Modell: Warenkorb (embedded oder separat)
js
Kopieren
Bearbeiten
CartItem {
productId: ObjectId,
quantity: Number
}
Modell: Bestellung
js
Kopieren
Bearbeiten
Order {
userId: ObjectId,
items: [{ productId, quantity }],
total: Number,
createdAt: Date
}
Beispiel-Routen:
POST /api/cart → Produkt in Warenkorb legen
GET /api/cart → Aktuellen Warenkorb abrufen
POST /api/order → Bestellung auslösen
:test_tube: 4. Tests & Fehlerbehandlung
Middleware für Error-Handling (z. B. bei fehlenden Feldern oder ungültigem Token)
Unit-Tests mit z. B. Jest (optional)
API mit Postman testen
Validierung mit z. B. Joi oder custom middleware
:busts_in_silhouette: Teamaufteilung (für 4 Personen)
Person Bereich Aufgaben
:technologist: A Auth + Kundenverwaltung - Registrierung & Login

- JWT Middleware
- User-Modell
  :technologist: B Produkte (CRUD) - Produktmodell
- Routen zum Erstellen/Anzeigen/Bearbeiten/Löschen
  :technologist: C Warenkorb + Bestellungen - Cart-Logik
- Order-Routen
- Warenkorb-zu-Bestellung konvertieren
  :technologist: D Tests + Fehlerbehandlung - Postman Tests
- Middleware für Fehler + Validierung
- Logging
  :repeat: Beispielablauf:
  Benutzer registriert sich und loggt sich ein
  Benutzer durchsucht Produkte (GET /products)
  Benutzer fügt Produkt A und B in den Warenkorb (POST /cart)
  Benutzer schickt Bestellung ab (POST /order)
  Daten landen in Order-Collection + Warenkorb wird gelöscht
  Wenn du möchtest, kann ich dir als Nächstes Folgendes erstellen:
  :file_folder: Eine Projektstruktur (Ordner + Dateien)
  :bricks: Die MongoDB-Modelle (User, Product, Cart, Order)
  :electric_plug: Beispiel-API-Routen (Express.js)
  :test_tube: Ein kleines Postman-Test-Set
