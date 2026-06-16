# Cash Flow Management API

Aplikasi Cash Flow Management adalah alat untuk mencatat pengeluaran dan pemasukan keuangan dengan sistem double-entry bookkeeping profesional.

## Teknologi yang Digunakan

- **Backend:** Node.js + Express.js
- **Database:** MariaDB (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Token)
- **Template Engine:** EJS
- **Frontend Styling:** Tailwind CSS

## Setup & Installation

### Prerequisites
- Node.js v14+
- MariaDB atau MySQL
- npm

### Installation

1. **Clone repository**
   ```bash
   cd /Users/rsudabdulaziz/Documents/Full-stack/cashflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` dengan konfigurasi database Anda:
   ```
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=cashflow
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Create database**
   ```bash
   mysql -u root -p -e "CREATE DATABASE cashflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

5. **Run migrations (automatic via sequelize.sync)**
   Server akan otomatis membuat tabel saat startup

6. **Start server**
   ```bash
   npm run dev  # Development dengan nodemon
   npm start    # Production
   ```

Server akan berjalan di `http://localhost:3000`

---

## API Endpoints

### 1. Authentication

#### Register
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Registrasi berhasil",
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGc..."
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** Same as register

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

---

### 2. Assets (Aset)

#### Create Asset
- **POST** `/api/assets`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
  ```json
  {
    "nama_aset": "BRI Savings",
    "tipe_aset": "bank",
    "saldo": 1000000,
    "mata_uang": "IDR"
  }
  ```
- **Tipe Aset:** bank, kartu_debit, kartu_kredit, dompet, investasi, lainnya

#### Get All Assets
- **GET** `/api/assets`
- **Headers:** `Authorization: Bearer {token}`

#### Get Asset by ID
- **GET** `/api/assets/:id`
- **Headers:** `Authorization: Bearer {token}`

#### Update Asset
- **PUT** `/api/assets/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Body:** (Opsional)
  ```json
  {
    "nama_aset": "BRI Savings Updated",
    "saldo": 2000000
  }
  ```

#### Delete Asset
- **DELETE** `/api/assets/:id`
- **Headers:** `Authorization: Bearer {token}`

---

### 3. Categories (Kategori)

#### Create Category
- **POST** `/api/categories`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
  ```json
  {
    "nama_kategori": "Makanan",
    "tipe": "expense",
    "warna": "#FF6B6B"
  }
  ```
- **Tipe:** income, expense

#### Get All Categories
- **GET** `/api/categories`
- **Headers:** `Authorization: Bearer {token}`

#### Get Category by ID
- **GET** `/api/categories/:id`
- **Headers:** `Authorization: Bearer {token}`

#### Update Category
- **PUT** `/api/categories/:id`
- **Headers:** `Authorization: Bearer {token}`

#### Delete Category
- **DELETE** `/api/categories/:id`
- **Headers:** `Authorization: Bearer {token}`

---

### 4. Transactions (Transaksi)

#### Create Transaction
- **POST** `/api/transactions`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
  ```json
  {
    "asset_id": 1,
    "category_id": 5,
    "tanggal": "2026-06-16",
    "tipe": "expense",
    "jumlah": 50000,
    "catatan": "Makan siang",
    "is_recurring": false,
    "is_bookmarked": false
  }
  ```
- **Tipe:** income, expense

#### Get Transactions
- **GET** `/api/transactions?startDate=2026-06-01&endDate=2026-06-30&asset_id=1&tipe=expense&limit=50&offset=0`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - startDate (optional): YYYY-MM-DD
  - endDate (optional): YYYY-MM-DD
  - asset_id (optional): Asset ID
  - category_id (optional): Category ID
  - tipe (optional): income atau expense
  - limit (optional): Default 50
  - offset (optional): Default 0

#### Update Transaction
- **PUT** `/api/transactions/:id`
- **Headers:** `Authorization: Bearer {token}`
- **Body:** (Opsional)
  ```json
  {
    "jumlah": 75000,
    "catatan": "Makan siang updated"
  }
  ```

#### Delete Transaction
- **DELETE** `/api/transactions/:id`
- **Headers:** `Authorization: Bearer {token}`

---

### 5. Reports (Laporan)

#### Get Monthly Summary
- **GET** `/api/reports/monthly/:year/:month`
- **Headers:** `Authorization: Bearer {token}`
- **Example:** `/api/reports/monthly/2026/6`
- **Response:**
  ```json
  {
    "success": true,
    "period": "6/2026",
    "summary": {
      "income": 5000000,
      "expense": 2500000,
      "net": 2500000,
      "byCategory": {
        "Makanan": { "income": 0, "expense": 500000 },
        "Gaji": { "income": 5000000, "expense": 0 }
      }
    }
  }
  ```

#### Get Yearly Summary
- **GET** `/api/reports/yearly/:year`
- **Headers:** `Authorization: Bearer {token}`
- **Example:** `/api/reports/yearly/2026`

#### Get Asset Summary
- **GET** `/api/reports/assets`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "success": true,
    "assets": [
      {
        "id": 1,
        "nama_aset": "BRI Savings",
        "tipe_aset": "bank",
        "saldo": 2000000,
        "mata_uang": "IDR"
      }
    ],
    "totalBalance": 2000000
  }
  ```

---

## Struktur Database

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Aset Table
```sql
CREATE TABLE aset (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nama_aset VARCHAR(100) NOT NULL,
  tipe_aset ENUM('bank', 'kartu_debit', 'kartu_kredit', 'dompet', 'investasi', 'lainnya'),
  saldo DECIMAL(15,2) DEFAULT 0,
  mata_uang VARCHAR(10) DEFAULT 'IDR',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Kategori Table
```sql
CREATE TABLE kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nama_kategori VARCHAR(50) NOT NULL,
  tipe ENUM('income', 'expense') NOT NULL,
  warna VARCHAR(10) DEFAULT '#4F46E5',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  asset_id INT NOT NULL,
  category_id INT NOT NULL,
  tanggal DATE NOT NULL,
  tipe ENUM('income', 'expense') NOT NULL,
  jumlah DECIMAL(15,2) NOT NULL,
  catatan TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_type ENUM('daily', 'weekly', 'monthly', 'yearly'),
  is_bookmarked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (asset_id) REFERENCES aset(id),
  FOREIGN KEY (category_id) REFERENCES kategori(id)
);
```

---

## Error Handling

API mengembalikan error dalam format:
```json
{
  "error": "Error message",
  "details": [
    { "field": "email", "message": "Email tidak valid" }
  ]
}
```

### Status Codes
- **200:** Success
- **201:** Created
- **400:** Bad Request (Validation Error)
- **401:** Unauthorized (Missing or Invalid Token)
- **403:** Forbidden (Invalid Token)
- **404:** Not Found
- **500:** Internal Server Error

---

## Development Notes

### Key Features Implemented
- ✅ User Authentication dengan JWT
- ✅ CRUD untuk Assets, Categories, Transactions
- ✅ Double-Entry Bookkeeping (Automatic Balance Update)
- ✅ Monthly & Yearly Reports
- ✅ Input Validation dengan express-validator
- ✅ Error Handling Middleware
- ✅ Database Relationships (Sequelize)

### Future Enhancements
- [ ] Budget Management
- [ ] Recurring Transactions Automation
- [ ] Transaction Bookmarking
- [ ] Credit Card & Debit Card Tracking
- [ ] Advanced Analytics & Visualization
- [ ] Mobile App Integration
- [ ] Cloud Sync
- [ ] Data Export (PDF, Excel)

---

## Author
Senior Developer

## License
MIT
