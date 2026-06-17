// Buat fungsi dengan parameter isEdit (boolean) dan asset (object)
function renderAssetForm(isEdit = false, asset = {}) {
    return `
        <form id="assetForm" action="#" class="space-y-6">
        <input type="hidden" name="id" value="${isEdit ? asset.id : ''}">
            <div>
                <label for="nama_aset" class="block text-sm font-medium text-gray-700 mb-2">Nama Aset</label>
                <input type="text" id="nama_aset" name="nama_aset" required
                    value="${isEdit ? (asset.nama_aset || '') : ''}"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Misalnya: BRI Tabungan, Dompet, dsb">
            </div>

            <div>
                <label for="tipe_aset" class="block text-sm font-medium text-gray-700 mb-2">Tipe Aset</label>
                <select id="tipe_aset" name="tipe_aset" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="">Pilih Tipe Aset</option>
                    <option value="bank" ${isEdit && asset.tipe_aset === 'bank' ? 'selected' : ''}>
                        <i class="fas fa-university mr-2"></i>Bank
                    </option>
                    <option value="kartu_debit" ${isEdit && asset.tipe_aset === 'kartu_debit' ? 'selected' : ''}>
                        <i class="fas fa-credit-card mr-2"></i>Kartu Debit
                    </option>
                    <option value="kartu_kredit" ${isEdit && asset.tipe_aset === 'kartu_kredit' ? 'selected' : ''}>
                        <i class="fas fa-credit-card mr-2"></i>Kartu Kredit
                    </option>
                    <option value="dompet" ${isEdit && asset.tipe_aset === 'dompet' ? 'selected' : ''}>
                        <i class="fas fa-wallet mr-2"></i>Dompet
                    </option>
                    <option value="investasi" ${isEdit && asset.tipe_aset === 'investasi' ? 'selected' : ''}>
                        <i class="fas fa-chart-line mr-2"></i>Investasi
                    </option>
                    <option value="lainnya" ${isEdit && asset.tipe_aset === 'lainnya' ? 'selected' : ''}>
                        <i class="fas fa-piggy-bank mr-2"></i>Lainnya
                    </option>
                </select>
            </div>

            <div>
                <label for="saldo" class="block text-sm font-medium text-gray-700 mb-2">Saldo</label>
                <div class="relative">
                    <input type="number" id="saldo" name="saldo" required min="0"
                        value="${isEdit ? (asset.saldo || 0) : '0'}"
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="0">
                </div>
                <p class="text-xs text-gray-500 mt-1">
                    ${isEdit ?
            'Perubahan saldo akan mempengaruhi pencatatan transaksi Anda' :
            'Masukkan saldo awal aset ini'
        }
                </p>
            </div>

            <div>
                <label for="mata_uang" class="block text-sm font-medium text-gray-700 mb-2">Mata Uang</label>
                <select id="mata_uang" name="mata_uang" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="IDR" ${(!isEdit || asset.mata_uang === 'IDR') ? 'selected' : ''}>Rupiah (IDR)</option>
                    <option value="USD" ${isEdit && asset.mata_uang === 'USD' ? 'selected' : ''}>US Dollar (USD)</option>
                    <option value="EUR" ${isEdit && asset.mata_uang === 'EUR' ? 'selected' : ''}>Euro (EUR)</option>
                    <option value="SGD" ${isEdit && asset.mata_uang === 'SGD' ? 'selected' : ''}>Singapore Dollar (SGD)</option>
                    <option value="MYR" ${isEdit && asset.mata_uang === 'MYR' ? 'selected' : ''}>Malaysian Ringgit (MYR)</option>
                </select>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800">
                    <i class="fas fa-info-circle mr-2"></i>
                    ${isEdit ?
            'Pastikan saldo yang dimasukkan sudah akurat agar catatan transaksi Anda sesuai' :
            'Saldo awal akan menjadi titik awal pencatatan keuangan Anda. Anda dapat mengubahnya kapan saja.'
        }
                </p>
            </div>

            <div class="flex justify-end space-x-4 pt-6 border-t">
                <a href="/assets" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition">
                    Batal
                </a>
                <button type="submit" class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                    ${isEdit ?
            '<i class="fas fa-save mr-2"></i>Simpan Perubahan' :
            '<i class="fas fa-plus mr-2"></i>Buat Aset'
        }
                </button>
            </div>
        </form>
    `;
}
const formContainer = document.getElementById('formContainer');
const urlParams = new URLSearchParams(window.location.search);
const assetId = urlParams.get('id');
console.log(assetId);
if (assetId) {
    fetch(`/api/assets/${assetId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            formContainer.innerHTML = renderAssetForm(true, data.asset);
        })
        .catch(error => console.error(error));
} else {
    formContainer.innerHTML = renderAssetForm(false);
}

