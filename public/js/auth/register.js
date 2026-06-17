const loginForm = document.getElementById('registerForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Mencegah form melakukan reload halaman

        // Ambil elemen input
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const submitButton = loginForm.querySelector('button[type="submit"]');

        // Simpan state awal tombol
        const originalBtnText = submitButton.innerHTML;

        // 1. Ubah tombol menjadi status loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        submitButton.classList.add('opacity-75', 'cursor-not-allowed');

        if (passwordInput.value !== confirmPasswordInput.value) {
            Swal.fire({
                icon: 'error',
                title: 'Password Tidak Sama',
                text: 'Password dan konfirmasi password tidak sama.',
                confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                confirmButtonText: 'OK'
            });
            submitButton.disabled = false;
            submitButton.innerHTML = originalBtnText;
            submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
            return;
        }
        try {
            let body = {
                username: usernameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                confirmPassword: confirmPasswordInput.value
            }
            let kirim = await apiPost('/api/auth/register', body);
            // Simpan token jika backend mengirimkannya
            let response = await kirim.json();
            if (kirim.status == 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Register Berhasil',
                    text: kirim.message,
                    confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                    confirmButtonText: 'OK'
                })
                window.location.href = '/login';

            } else {
                let message = '';
                for (let x of response.errors) {
                    console.log(x);
                    message += x.msg + ', ';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Register Gagal',
                    text: message,
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