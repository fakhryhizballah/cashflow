async function getListAset() {
    try {
        let getAseet = await apiGet('/api/assets/');
        let assets = getAseet.assets || [];
        let total = 0;
        let htmlContent = '';

        // Target elemen DOM (Sesuaikan dengan ID di HTML-mu)
        const gridContainer = document.getElementById('assetsGrid');

        if (assets.length === 0) {
            // Jika tidak ada aset
            gridContainer.innerHTML = `
                <div class="col-span-full">
                    <div class="bg-white rounded-lg shadow p-12 text-center">
                        <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500 text-lg mb-4">Belum ada aset</p>
                        <a href="/assets/form" class="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
                            <i class="fas fa-plus mr-2"></i>Buat Aset Pertama Anda
                        </a>
                    </div>
                </div>
            `;
            return; // Hentikan eksekusi fungsi jika kosong
        }

        // Fungsi bantuan untuk menentukan icon berdasarkan tipe aset
        const getIconClass = (tipe) => {
            const icons = {
                'bank': 'fas fa-university',
                'kartu_debit': 'fas fa-credit-card',
                'kartu_kredit': 'fas fa-credit-card',
                'dompet': 'fas fa-wallet',
                'investasi': 'fas fa-chart-line'
            };
            return icons[tipe] || 'fas fa-piggy-bank'; // piggy-bank sebagai default
        };

        // Jika aset tersedia, jalankan loop
        for (let asset of assets) {
            // Menjumlahkan total saldo
            total += Number(asset.saldo) || 0;

            // Memformat angka ke Rupiah
            let formatRupiah = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(asset.saldo || 0);

            // Format tanggal
            let formattedDate = new Date(asset.createdAt).toLocaleDateString('id-ID');

            // Format tipe aset (hilangkan underscore)
            let formattedTipeAset = asset.tipe_aset ? asset.tipe_aset.replace(/_/g, ' ') : '-';

            // Ambil class icon
            let iconClass = getIconClass(asset.tipe_aset);

            // Menambahkan elemen HTML (Menggunakan ${} murni bawaan JS)
            htmlContent += `
                <div class="bg-white rounded-lg shadow hover:shadow-lg transition">
                    <div class="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-bold text-white">${asset.nama_aset}</h3>
                            <div class="text-white text-3xl opacity-30">
                                <i class="${iconClass}"></i>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 py-4">
                        <div class="mb-4">
                            <p class="text-xs text-gray-500 uppercase font-medium mb-1">Tipe Aset</p>
                            <p class="text-sm text-gray-700 capitalize">
                                ${formattedTipeAset}
                            </p>
                        </div>

                        <div class="mb-4">
                            <p class="text-xs text-gray-500 uppercase font-medium mb-1">Saldo</p>
                            <p class="text-2xl font-bold text-indigo-600">
                                ${formatRupiah}
                            </p>
                        </div>

                        <div class="mb-6">
                            <p class="text-xs text-gray-500 uppercase font-medium mb-1">Mata Uang</p>
                            <p class="text-sm text-gray-700">${asset.mata_uang}</p>
                        </div>

                        <p class="text-xs text-gray-400 mb-4">
                            Dibuat: ${formattedDate}
                        </p>

                        <div class="flex space-x-2 pt-4 border-t">
                            <a href="/assets/form?id=${asset.id}" class="flex-1 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-center font-medium transition text-sm">
                                <i class="fas fa-edit mr-1"></i>Edit
                            </a>
                            <button onclick="deleteAsset(${asset.id}, '${asset.nama_aset}')" class="flex-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition text-sm">
                                <i class="fas fa-trash mr-1"></i>Hapus
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        // Masukkan HTML ke dalam grid
        gridContainer.innerHTML = htmlContent;

        // OPSIONAL: Jika kamu punya elemen untuk menampilkan total keseluruhan saldo
        // document.getElementById('totalSaldoAset').innerText = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);

    } catch (error) {
        console.error("Gagal mengambil data aset:", error);
        // Opsional: Tampilkan pesan error ke user
        document.getElementById('assetsGrid').innerHTML = `
            <div class="col-span-full text-center py-8 text-red-500">
                Gagal memuat data. Silakan muat ulang halaman.
            </div>`;
    }
}
getListAset();

async function deleteAsset(id, name) {
    Swal.fire({
        icon: 'warning',
        title: `Anda yakin ingin menghapus ${name}?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Hapus'
    }).then((result) => {
        if (result.isConfirmed) {

            fetch(`/api/assets/${id}`, {
                method: 'DELETE'
            }).then(response => {
                if (response.ok) {
                    getListAset();
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Data berhasil dihapus.",
                        icon: "success"
                    });
                } else {
                    throw new Error("Gagal menghapus data aset");
                }
            }).catch(error => {
                console.error("Gagal menghapus data aset:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: error.error || 'Terjadi kesalahan pada server. Silakan coba lagi.',
                    confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                    confirmButtonText: 'Coba Lagi'
                });
            });
           

        }
    });
}