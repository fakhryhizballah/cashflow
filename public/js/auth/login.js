
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Mencegah form melakukan reload halaman

            // Ambil elemen input
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const rememberInput = document.getElementById('remember');
            const submitButton = loginForm.querySelector('button[type="submit"]');

            // Simpan state awal tombol
            const originalBtnText = submitButton.innerHTML;

            // 1. Ubah tombol menjadi status loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            submitButton.classList.add('opacity-75', 'cursor-not-allowed');

            try {
                let body = {
                    email: emailInput.value,
                    password: passwordInput.value,
                    remember: rememberInput.checked
                }
                let kirim = await apiPost('/api/auth/login', body);
                // Simpan token jika backend mengirimkannya
                let response = await kirim.json();
           if (kirim.status == 200) {
               Swal.fire({
                   icon: 'success',
                   title: 'Login Berhasil',
                   text: kirim.message,
                   confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                   confirmButtonText: 'OK'
               })
               window.location.href = '/dashboard';
           }else{
    
               Swal.fire({
                   icon: 'error',
                   title: 'Login Gagal',
                   text: response.error,
                   confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                   confirmButtonText: 'OK'
               })
           }
            } catch (error) {
                console.log(error);
                // console.log(error.response);
                Swal.fire({
                    icon: 'error',
                    title: 'Terjadi Kesalahan',
                    text: error.error || 'Terjadi kesalahan pada server. Silakan coba lagi.',
                    confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                    confirmButtonText: 'Coba Lagi'
                });
            } finally {
                // 3. Kembalikan state tombol seperti semula (jika gagal/selesai)
                submitButton.disabled = false;
                submitButton.innerHTML = originalBtnText;
                submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });
    }