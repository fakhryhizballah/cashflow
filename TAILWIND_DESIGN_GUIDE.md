# Tailwind CSS Design Guide - Cash flow management system

## Overview
Cash flow management system adalah alat untuk mencatat pengeluaran dan pemasukan keuangan. Desain sistem ini menggunakan Tailwind CSS untuk menciptakan antarmuka yang bersih, responsif, dan mudah digunakan.

## Design Principles
1. **Simplicity:** Desain harus sederhana dan mudah dipahami oleh pengguna.
2. **Consistency:** Gunakan kelas Tailwind CSS secara konsisten untuk menjaga keseragaman desain.
3. **Responsiveness:** Pastikan desain responsif dan dapat diakses dengan baik di berbagai perangkat.
4. **Accessibility:** Pastikan desain memenuhi standar aksesibilitas untuk semua pengguna



## 🎨 Color Scheme

### Primary Colors
- **Indigo**: `#4F46E5` - Digunakan untuk tombol utama, form fields, dan accent
  - `from-indigo-500 to-indigo-600` - Gradient header untuk modal tambah
  - `bg-indigo-600 hover:bg-indigo-700` - Tombol utama

- **Amber**: `#F59E0B` - Digunakan untuk edit/update
  - `from-amber-500 to-amber-600` - Gradient header untuk modal edit
  - `bg-amber-600 hover:bg-amber-700` - Tombol update

- **Blue**: `#3B82F6` - Digunakan untuk preview/info
  - `from-blue-500 to-blue-600` - Gradient header untuk modal preview
  
- **Red**: `#EF4444` - Digunakan untuk warning/rejection
  - `from-red-500 to-red-600` - Gradient header untuk modal penolakan

### Secondary Colors
- **Gray**: Digunakan untuk text, borders, dan backgrounds
  - `text-gray-700` - Text utama
  - `bg-gray-50` - Background secondary
  - `border-gray-200/300` - Borders

- **Status Colors**
  - Green: `bg-green-100 text-green-800` - Status lengkap/success
  - Red: `bg-red-100 text-red-800` - Status belum/error
  - Yellow: `bg-yellow-100 text-yellow-800` - Status perlu perbaikan/warning

---

## 📱 Responsive Design

### Breakpoints
- **Mobile First**: Semua default adalah mobile
- **sm (640px)**: Mobile
- **md (768px)**: Tablet dan desktop
- **lg (1024px)**: Desktop besar
- **xl (1280px)**: Extra large screens
