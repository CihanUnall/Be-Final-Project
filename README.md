# Be-Final-Project

### Dci_fbw_wd24_d07 Be Final Project - Webshop Api

- [Randy Born](https://github.com/RandyBorn)

- [Kushtrim Bilali](https://github.com/Kushtrim2024)

- [Melissa Kebi](https://github.com/MelissaKebi)

- [Cihan Ünal](https://github.com/CihanUnall)

- [Be-Final Project](https://github.com/CihanUnall/Be-Final-Project)

# 🛍️ Finalprojekt: REST-API für einen Webshop

## 🎯 Ziel des Projekts

Eine kleine Webshop-API mit folgenden Funktionen:

1. Benutzer kann sich registrieren und einloggen
2. Produkte durchsuchen (GET /products)
3. Produkte in den Warenkorb legen (POST /cart)
4. Bestellung abschicken (POST /order)

---

## 📁 Projektstruktur

      Be-Final-Project/
      ├────backend
      │  ├── controller
      │  │ ├── cartController.js
      │  │ └── orderController.js
      │  ├── db
      │  │ └── mongoose.connect.js
      │  ├── middleware/ → Middleware-Funktionen
      │  │ └── auth.js
      │  ├── models/ → Mongoose-Modelle
      │  │ ├── Cart.js
      │  │ ├── Order.js
      │  │ ├── Product.js
      │  │ └── User.js
      │  ├── routes/ → Express-Routen
      │  │ ├── cart.js
      │  │ ├── order.js
      │  │ ├── auth.js
      │  │ └── products.js
      │  ├── .env → Umgebungsvariablen
      │  ├── .gitignore
      │  ├── app.js → Express-Konfiguration
      │  ├── server.js → Einstiegspunkt der App
      │  ├── package.json
      │  └── README.md
      ├────frontend
      │  ├── /
      │
      │
      │

---

### ✅ Funktionen im Detail

#### 🔐 1. Authentifizierung & Benutzerverwaltung

- **Registrierung:** Name, E-Mail, Passwort → Passwort wird gehasht gespeichert
- **Login:** E-Mail + Passwort → JWT wird zurückgegeben
- **JWT-Middleware:** schützt geschützte Routen (z. B. /cart, /order)

**Beispiel-Routen:**

- `POST /api/auth/register`
- `POST /api/auth/login`

**User-Modell:**

```js
User {
  name: String,
  email: String,
  password: String (gehasht mit bcrypt)
}
```

---

#### 📦 2. Produktverwaltung (CRUD)

- Produkte können erstellt, angezeigt, bearbeitet und gelöscht werden

**Beispiel-Routen:**

- `GET /api/products` → Alle Produkte anzeigen
- `POST /api/products` → Neues Produkt erstellen
- `PUT /api/products/:id` → Produkt aktualisieren
- `DELETE /api/products/:id` → Produkt löschen

**Produkt-Modell:**

```js
Product {
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String
}
```

---

#### 🛒 3. Warenkorb & Bestellungen

- Benutzer kann Produkte mit Menge in den Warenkorb legen
- Dann Bestellung abschicken → Bestellung wird gespeichert, Warenkorb geleert

**CartItem-Modell:**

```js
CartItem {
  productId: ObjectId,
  quantity: Number
}
```

**Order-Modell:**

```js
Order {
  userId: ObjectId,
  items: [{ productId, quantity }],
  total: Number,
  createdAt: Date
}
```

**Beispiel-Routen:**

- `POST /api/cart` → Produkt in den Warenkorb legen
- `GET /api/cart` → Aktuellen Warenkorb abrufen
- `POST /api/order` → Bestellung absenden

---

#### 🧪 4. Tests & Fehlerbehandlung

- Middleware für Fehlerbehandlung (z. B. fehlender Token, ungültige Eingaben)
- Validierung mit Joi oder eigener Middleware
- API mit Postman testen
- Optional: Unit-Tests mit Jest

---

### 👥 Teamaufteilung (für 4 Personen)

| Person | Bereich                      | Aufgaben                                           |
| ------ | ---------------------------- | -------------------------------------------------- |
| A      | Authentifizierung & Benutzer | Registrierung, Login, JWT, User-Modell             |
| B      | Produkte (CRUD)              | Produktmodell, Routen zur Verwaltung von Produkten |
| C      | Warenkorb & Bestellung       | Logik für Warenkorb und Bestellung, Routen         |
| D      | Tests & Fehler               | Fehler-Handling, Validierung, Postman-Tests        |

---

### 🔁 Beispielablauf

1. Benutzer registriert sich und loggt sich ein
2. Benutzer ruft Produkte ab (`GET /products`)
3. Benutzer fügt Produkt A und B in den Warenkorb (`POST /cart`)
4. Benutzer gibt eine Bestellung auf (`POST /order`)
5. Daten werden in der **Order-Collection** gespeichert und der **Warenkorb wird geleert**

---
