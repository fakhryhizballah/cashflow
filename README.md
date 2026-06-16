# Cash Flow Management System

Sistem manajemen kas (cash flow) yang komprehensif untuk mencatat, melacak, dan menganalisis pengeluaran serta pemasukan keuangan dengan desain antarmuka yang bersih dan responsif.

## 🎯 Fitur Utama

### 1. **Authentication & Authorization**
- Sistem login/logout menggunakan JWT
- Password hashing dengan bcryptjs
- Session management yang aman

### 2. **Double-Entry Bookkeeping**
- Sistem akuntansi profesional
- Update saldo otomatis setiap transaksi
- Konsistensi data terjaga

### 3. **Manajemen Aset**
- Tracking multiple aset (bank, kartu debit, kartu kredit, dompet, investasi)
- Monitoring saldo real-time
- Support multiple mata uang

### 4. **Pencatatan Transaksi**
- CRUD lengkap untuk pemasukan dan pengeluaran
- Kategorisasi transaksi
- Pencatatan catatan detail
- Filter berdasarkan tanggal, aset, kategori

### 5. **Laporan & Analytics**
- Ringkasan bulanan (income, expense, net)
- Ringkasan tahunan dengan breakdown bulanan
- Breakdown per kategori
- Total asset summary

### 6. **Validasi & Security**
- Input validation dengan express-validator
- Error handling yang komprehensif
- Protection terhadap SQL Injection, XSS, CSRF
- JWT-based authentication

## 📋 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Runtime | Node.js v14+ |
| Framework | Express.js 4.18+ |
| Database | MariaDB 10.5+ |
| ORM | Sequelize 6.32+ |
| Authentication | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs |
| Template Engine | EJS |
| Frontend Styling | Tailwind CSS |
| Validation | express-validator |
| Development | nodemon |

## 📁 Struktur Direktori

```
cashflow/
├── config/
│   ├── database.js          # Konfigurasi Sequelize
│   └── jwt.js               # JWT utilities
├── controllers/
│   ├── AuthController.js    # Authentication logic
│   ├── TransactionController.js
│   ├── AssetController.js
│   ├── CategoryController.js
│   └── ReportController.js
├── models/
│   ├── index.js             # Model associations
│   ├── User.js
│   ├── Asset.js
│   ├── Category.js
│   └── Transaction.js
├── services/
│   ├── AuthService.js
│   ├── TransactionService.js
│   └── ReportService.js
├── middlewares/
│   ├── authMiddleware.js    # JWT verification
│   ├── validationMiddleware.js
│   └── errorHandler.js      # Global error handling
├── routes/
│   ├── index.js
│   ├── auth.js
│   ├── transactions.js
│   ├── assets.js
│   ├── categories.js
│   └── reports.js
├── views/                   # EJS templates (frontend)
├── public/                  # Static files
├── migrations/              # Database migrations
├── .env.example             # Environment template
├── server.js                # Entry point
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Installation
```bash
cd /Users/rsudabdulaziz/Documents/Full-stack/cashflow
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env dengan kredensial database Anda
```

### 3. Database Creation
```bash
mysql -u root -p -e "CREATE DATABASE cashflow CHARACTER SET utf8mb4;"
```

### 4. Run Server
```bash
npm run dev  # Development mode with nodemon
# atau
npm start    # Production mode
```

Server akan berjalan di: `http://localhost:3000`

### 5. API Health Check
```bash
curl http://localhost:3000/api/health
```

## 📡 API Quick Reference

### Authentication
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Assets
- `POST /api/assets` - Create asset baru
- `GET /api/assets` - Get semua assets
- `GET /api/assets/:id` - Get asset by ID
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Categories
- `POST /api/categories` - Create category baru
- `GET /api/categories` - Get semua categories
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions` - Get transactions (dengan filter)
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reports
- `GET /api/reports/monthly/:year/:month` - Monthly summary
- `GET /api/reports/yearly/:year` - Yearly summary
- `GET /api/reports/assets` - Asset summary

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing dengan bcryptjs
- ✅ Input validation & sanitization
- ✅ Error handling middleware
- ✅ SQL Injection prevention (Sequelize ORM)
- ✅ XSS protection
- ✅ CSRF prevention (stateless API)
- ✅ Rate limiting ready (dapat di-implement)

## 📊 Database Design

### User - Asset Relationship
- 1 User memiliki banyak Assets
- Double-entry bookkeeping: setiap transaksi update saldo asset

### User - Category Relationship
- 1 User memiliki banyak Categories
- Categories dibagi menjadi: income dan expense

### User - Transaction Relationship
- 1 User memiliki banyak Transactions
- Setiap Transaction terhubung ke 1 Asset dan 1 Category

### Asset - Transaction Relationship
- 1 Asset memiliki banyak Transactions
- Transactions automatic update saldo asset

### Category - Transaction Relationship
- 1 Category memiliki banyak Transactions
- Categories untuk categorizing transactions

## 🛠️ Development

### Add New Route
1. Create controller di `controllers/`
2. Create service di `services/`
3. Create route di `routes/`
4. Import route di `routes/index.js`

### Add New Model
1. Create model file di `models/`
2. Define di model dengan validasi
3. Setup associations di `models/index.js`

### Add New Middleware
1. Create middleware di `middlewares/`
2. Use di routes atau globally di `server.js`

## 📝 Contoh Usage

### 1. Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure123",
    "confirmPassword": "secure123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
```

### 3. Create Asset
```bash
curl -X POST http://localhost:3000/api/assets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nama_aset": "BRI Savings",
    "tipe_aset": "bank",
    "saldo": 1000000,
    "mata_uang": "IDR"
  }'
```

### 4. Create Category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nama_kategori": "Makanan",
    "tipe": "expense",
    "warna": "#FF6B6B"
  }'
```

### 5. Create Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "asset_id": 1,
    "category_id": 1,
    "tanggal": "2026-06-16",
    "tipe": "expense",
    "jumlah": 50000,
    "catatan": "Makan siang"
  }'
```

## 🎓 Best Practices

### Code Quality
- Clean code dengan SOLID principles
- Separation of concerns (Controllers, Services, Models)
- Consistent naming conventions
- Error handling di setiap layer

### Performance
- Database query optimization
- Connection pooling
- Async/await untuk non-blocking operations
- Proper indexing di database

### Security
- Validate all inputs
- Hash sensitive data
- Use environment variables
- Implement rate limiting
- Regular security updates

## 📈 Future Roadmap

- [ ] Budget Management System
- [ ] Recurring Transactions Automation
- [ ] Transaction Bookmarking
- [ ] Advanced Report Filters
- [ ] Mobile App (React Native)
- [ ] Real-time Notifications
- [ ] Data Export (PDF, Excel, CSV)
- [ ] Multi-currency Support Enhancement
- [ ] Investment Tracking
- [ ] Cloud Backup & Sync

## 🐛 Troubleshooting

### Database Connection Error
```
Solusi: Check DB_HOST, DB_PORT, DB_USER, DB_PASSWORD di .env
```

### JWT Token Error
```
Solusi: Pastikan JWT_SECRET di .env sudah di-set dengan benar
```

### Validation Errors
```
Solusi: Check request body format dan pastikan sesuai validation rules
```

## 📞 Support

For issues atau pertanyaan, silakan buat issue di repository atau hubungi developer.

---

**Status:** Development Ready ✅  
**Last Updated:** 2026-06-16  
**Version:** 1.0.0
