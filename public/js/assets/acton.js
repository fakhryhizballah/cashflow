document.addEventListener('DOMContentLoaded', () => {
    // Your code runs safely here
    console.log('The DOM is fully loaded and ready!');

    const assetForm = document.getElementById('formContainer');
    if (assetForm) {

        assetForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            console.log(data);
            if (data.id == '') {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Data berhasil disimpan.',
                    confirmButtonColor: '#4f46e5', // Warna tombol sesuai tema indigo Tailwind
                    confirmButtonText: 'Oke'
                }).then((result) => {
                    if (result.isConfirmed) {
                        apiPost('/api/assets', data)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                window.location.href = '/assets';
                            })
                            .catch(error => console.error(error));
                    }
                })

            } else {
                console.log(data);
                Swal.fire({
                    title: "Do you want to save the changes?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    denyButtonText: `Don't save`
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        apiPut(`/api/assets/${data.id}`, data)
                            .then(data => {
                                console.log(data);
                                window.location.href = '/assets';
                            })
                            .catch(error => console.error(error));
                        Swal.fire("Updated!", "", "success");
                    }
                    else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
                });


            }
        });
    }
});