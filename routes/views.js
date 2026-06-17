const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// ==========================================
// PUBLIC & MAIN ROUTES
// ==========================================

// Halaman Utama / Landing Page
router.get('/', (req, res) => {
    res.render('index', { title: 'Home - Cashflow' });
});

// Halaman Dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
    let user = req.user;
    let scripts = [{ src: '/js/dashboard.js' }];
    res.render('dashboard', { title: 'Dashboard', user, scripts });
});

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Halaman Login
router.get('/login', (req, res) => {
    if (req.cookies['x-access-token']) {
        res.redirect('/dashboard');
    }
    let scripts = [{ src: '/js/auth/login.js' }];

    res.render('auth/login', { title: 'Login', scripts });
});

// Halaman Register
router.get('/register', (req, res) => {
    let scripts = [{ src: '/js/auth/register.js' }];
    res.render('auth/register', { title: 'Register', scripts });
});

// ==========================================
// ASSETS ROUTES
// ==========================================

// Daftar Aset
router.get('/assets', (req, res) => {
    let scripts = [{ src: '/js/assets/index.js' }];
    res.render('assets/index', { title: 'Daftar Aset', scripts });
});

// Form Tambah/Edit Aset
router.get('/assets/form', (req, res) => {
    let isEdit = req.query.id ? true : false;
    let scripts = [
        { src: '/js/assets/form.js' },
        { src: '/js/assets/acton.js' }

    ];
    res.render('assets/form', { title: 'Form Aset', isEdit, scripts });
});

// ==========================================
// CATEGORIES ROUTES
// ==========================================

// Daftar Kategori
router.get('/categories', (req, res) => {
    res.render('categories/index', { title: 'Daftar Kategori' });
});

// Form Tambah/Edit Kategori
router.get('/categories/form', (req, res) => {
    res.render('categories/form', { title: 'Form Kategori' });
});

// ==========================================
// TRANSACTIONS ROUTES
// ==========================================

// Daftar Transaksi
router.get('/transactions', (req, res) => {
    res.render('transactions/index', { title: 'Daftar Transaksi' });
});

// Form Tambah/Edit Transaksi
router.get('/transactions/form', (req, res) => {
    res.render('transactions/form', { title: 'Form Transaksi' });
});

// ==========================================
// REPORTS ROUTES
// ==========================================

// Halaman Laporan
router.get('/reports', (req, res) => {
    let reportType = req.query.type || 'monthly';
    res.render('reports/index', { title: 'Laporan Keuangan', reportType });
});

// ==========================================
// PROFILE ROUTES
// ==========================================

// // Lihat Profil
// router.get('/profile', (req, res) => {
//     res.render('profile/index', { title: 'Profil Saya' });
// });

// // Edit Profil
// router.get('/profile/edit', (req, res) => {
//     res.render('profile/edit', { title: 'Edit Profil' });
// });

// // Ubah Password
// router.get('/profile/change-password', (req, res) => {
//     res.render('profile/change-password', { title: 'Ubah Password' });
// });

module.exports = router;