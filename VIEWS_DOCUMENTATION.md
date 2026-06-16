# Views Documentation - Cash Flow Management

## Struktur Views

Aplikasi Cash Flow Management menggunakan template engine **EJS** dengan styling **Tailwind CSS**. Berikut adalah struktur lengkap views yang telah dibuat:

```
views/
├── layout/
│   ├── header.ejs          # Header HTML (meta tags, CSS)
│   ├── footer.ejs          # Footer dan scripts
│   └── navbar.ejs          # Navigation bar
├── auth/
│   ├── login.ejs           # Halaman login
│   └── register.ejs        # Halaman register
├── dashboard.ejs           # Dashboard utama
├── transactions/
│   ├── index.ejs          # List transaksi dengan filter
│   └── form.ejs           # Form create/edit transaksi
├── assets/
│   ├── index.ejs          # List aset dalam grid
│   └── form.ejs           # Form create/edit aset
├── categories/
│   ├── index.ejs          # List kategori (income & expense)
│   └── form.ejs           # Form create/edit kategori
├── reports/
│   └── index.ejs          # Laporan bulanan dan tahunan
└── profile/
    └── index.ejs          # Profil pengguna
```

## Halaman-Halaman Utama

### 1. **Authentication Pages**

#### `/views/auth/login.ejs`
- Halaman login dengan form email & password
- Error handling dan validasi
- Link ke halaman register
- Design gradient indigo

#### `/views/auth/register.ejs`
- Halaman registrasi dengan form lengkap
- Validasi confirm password
- Terms & conditions checkbox
- Redirect ke login page

### 2. **Dashboard** (`/views/dashboard.ejs`)

Halaman utama yang menampilkan:
- **Statistics Cards**: Total Aset, Pemasukan, Pengeluaran, Saldo Bersih
- **Daftar Aset**: 5 aset terbaru dengan saldo
- **Quick Actions**: Button untuk membuat transaksi, aset, kategori
- **Transaksi Terbaru**: Tabel 10 transaksi terakhir

### 3. **Transactions** (`/views/transactions/`)

#### `index.ejs`
- List semua transaksi dengan tabel
- Filter berdasarkan: tanggal, aset, tipe
- Indikator tipe (income/expense)
- Action buttons: edit, delete
- Modal konfirmasi hapus

#### `form.ejs`
- Form create/edit transaksi
- Toggle: Pemasukan/Pengeluaran
- Pilihan aset dan kategori
- Input jumlah dengan format currency
- Checkbox recurring transaction dan bookmark
- Dynamic recurring type selector

### 4. **Assets** (`/views/assets/`)

#### `index.ejs`
- Card grid layout untuk setiap aset
- Menampilkan: nama, tipe, saldo, mata uang
- Action buttons: edit, delete
- Empty state jika tidak ada aset

#### `form.ejs`
- Form create/edit aset
- Input: nama, tipe aset, saldo awal, mata uang
- Select tipe: bank, kartu debit/kredit, dompet, investasi
- Info box dengan guidance
- Validasi lengkap

### 5. **Categories** (`/views/categories/`)

#### `index.ejs`
- Daftar kategori dipisah: pemasukan & pengeluaran
- Display warna untuk setiap kategori
- Action buttons: edit, delete
- Empty state untuk setiap tipe

#### `form.ejs`
- Form create/edit kategori
- Radio button: income/expense dengan visual feedback
- Color picker dengan preview
- Popular colors quick select
- Validasi tipe dan warna

### 6. **Reports** (`/views/reports/index.ejs`)

Dua tipe laporan:
- **Laporan Bulanan**: Ringkasan per bulan dengan breakdown per kategori
- **Laporan Tahunan**: Ringkasan tahunan dengan detail per bulan

Fitur:
- Select month/year
- Summary cards: Income, Expense, Net Balance
- Category breakdown untuk income & expense
- Monthly detailed table untuk yearly report

### 7. **Profile** (`/views/profile/index.ejs`)

Menampilkan:
- Informasi profile pengguna
- Statistik akun (aset, transaksi, kategori)
- Security settings: change password
- Danger zone: delete account dengan konfirmasi

## Layout Components

### `/views/layout/header.ejs`
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Meta tags, Tailwind CSS, Font Awesome -->
</head>
<body class="bg-gray-50">
```
- HTML doctype dan meta tags
- Tailwind CSS via CDN
- Font Awesome icons
- Body dengan background gray

### `/views/layout/navbar.ejs`
- Responsive navigation bar
- Logo dan menu links
- Mobile menu toggle
- User dropdown menu
- Login/Logout

### `/views/layout/footer.ejs`
```html
    <footer class="bg-gray-800">
        <!-- Footer content -->
    </footer>
    <!-- Scripts -->
</body>
</html>
```
- Footer dengan links
- Script includes
- Conditional script loading

## Integrasi dengan Server

### Cara Penggunaan di Controllers

```javascript
// Render halaman dengan data
res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    stats: {
        totalAssets: 5000000,
        monthlyIncome: 10000000,
        monthlyExpense: 5000000
    },
    assets: assets,
    transactions: transactions
});
```

### Variabel yang Tersedia

#### Global Variables (di semua halaman):
- `user`: Object pengguna dari middleware auth
- `title`: Judul halaman
- `errors`: Array errors dari validation middleware

#### Page-Specific Variables:
- **Dashboard**: `stats`, `assets`, `transactions`
- **Transactions**: `transactions`, `assets`, `query`
- **Assets**: `assets`
- **Categories**: `categories`, `query`
- **Reports**: `reportType`, `selectedYear`, `selectedMonth`, `report`
- **Profile**: `stats`

## Styling Guidelines

### Color Scheme
- **Primary**: Indigo (#4F46E5)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)
- **Info**: Blue (#3B82F6)

### Components

#### Cards
```html
<div class="bg-white rounded-lg shadow p-6">
    <!-- Content -->
</div>
```

#### Buttons
- Primary: `bg-indigo-600 hover:bg-indigo-700 text-white`
- Secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800`
- Danger: `bg-red-600 hover:bg-red-700 text-white`

#### Forms
- Input: `px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none`
- Label: `block text-sm font-medium text-gray-700 mb-2`

#### Tables
```html
<div class="overflow-x-auto">
    <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
        <tbody>
    </table>
</div>
```

## JavaScript Functions

File: `/public/js/main.js`

Fungsi utility:
- `formatCurrency(amount)`: Format ke IDR
- `formatDate(date)`: Format tanggal ke Indonesia
- `showToast(message, type)`: Notifikasi
- `apiGet()`, `apiPost()`, `apiPut()`, `apiDelete()`: API helpers
- Mobile menu toggle dan smooth scroll

## Responsive Design

- **Mobile First**: Default styling adalah mobile
- **Breakpoints**:
  - `sm (640px)`: Mobile landscape
  - `md (768px)`: Tablet
  - `lg (1024px)`: Desktop
  - `xl (1280px)`: Large desktop

## Best Practices

1. **Consistency**: Gunakan color scheme dan komponen yang sudah ditentukan
2. **Accessibility**: Semua form memiliki label dan ARIA attributes
3. **Error Handling**: Display error messages yang jelas
4. **Loading States**: Tambahkan disabled state saat form submit
5. **Responsive**: Test di berbagai screen size
6. **Performance**: Minimize external dependencies, lazy load images

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Server**
   ```javascript
   // server.js
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));
   app.use(express.static(path.join(__dirname, 'public')));
   ```

3. **Render Views**
   ```javascript
   res.render('halaman', { data });
   ```

4. **Access Static Files**
   - CSS/JS: `/public/js/main.js`
   - Images: `/public/images/`

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Chart.js integration untuk visualisasi data
- [ ] Export data ke PDF/Excel
- [ ] Print functionality
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
