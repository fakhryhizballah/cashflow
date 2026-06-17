async function dashboard(year, month) {
    let dataRepot = await apiGet(`/api/reports/monthly/${month}/${year}`);
    console.log(dataRepot);
    document.getElementById('totalAssets').innerText = dataRepot.summary.income;
    document.getElementById('thisMonthIncome').innerText = dataRepot.summary.income;
    document.getElementById('thisMonthExpense').innerText = dataRepot.summary.expense;
    document.getElementById('netBalance').innerText = dataRepot.summary.net;
    
    let getAseet = await apiGet('/api/assets/');
    let assets = getAseet.assets;
    let total = 0;
    let htmlContent = '';
    if (assets.length === 0) {
        // Jika tidak ada aset
        document.getElementById('assetsSummary').innerHTML = `
        <p class="text-gray-500 text-center py-8">Belum ada aset. <a href="/assets" class="text-indigo-600 hover:text-indigo-700">Buat aset baru</a></p>
    `;
    } else {
        // Jika aset tersedia, jalankan loop
        for (let asset of assets) {
            // Menjumlahkan total saldo (karena kamu menyiapkan variabel let total = 0)
            // Pastikan tipe data asset.saldo adalah Number
            total += Number(asset.saldo) || 0;

            // Memformat angka ke Rupiah
            let formatRupiah = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(asset.saldo);

            // Menambahkan elemen HTML ke dalam variabel htmlContent
            htmlContent += `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition mb-2">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <i class="fas fa-university text-indigo-600"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-800">${asset.nama_aset}</p>
                    <p class="text-xs text-gray-500">${asset.tipe_aset}</p>
                </div>
            </div>
            <p class="font-semibold text-gray-800">
                ${formatRupiah}
            </p>
        </div>
        `;
        }

        // Setelah loop selesai, masukkan semua HTML ke dalam container
        document.getElementById('assetsSummary').innerHTML = htmlContent;
    }
}

let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;
dashboard(year, month);