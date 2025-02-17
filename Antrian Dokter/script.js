$(document).ready(function() {
    // Muat daftar antrian dari localStorage
    loadAntrian();

    // Ambil antrian
    $('#ambilAntrian').click(function() {
        ambilAntrian();
    });

    // Hapus antrian
    $(document).on('click', '.hapusAntrian', function() {
        const index = $(this).data('index');
        hapusAntrian(index);
    });

    function loadAntrian() {
        const antrian = JSON.parse(localStorage.getItem('antrian')) || [];
        $('#daftarAntrian').empty();
        antrian.forEach((nomor, index) => {
            $('#daftarAntrian').append(`
                <li>
                    Nomor Antrian: ${nomor}
                    <button class="hapusAntrian" data-index="${index}">Hapus</button>
                </li>
            `);
        });
    }

    function ambilAntrian() {
        // Simulasikan AJAX request (bisa diganti dengan request ke server)
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts', // Contoh endpoint
            method: 'GET',
            success: function(response) {
                // Generate nomor antrian
                const antrian = JSON.parse(localStorage.getItem('antrian')) || [];
                const nomorBaru = antrian.length + 1;
                antrian.push(nomorBaru);
                localStorage.setItem('antrian', JSON.stringify(antrian));

                // Tampilkan nomor antrian
                $('#nomorAntrian').text(nomorBaru);
                loadAntrian();
            },
            error: function(err) {
                alert("Gagal mengambil antrian. Silakan coba lagi.");
            }
        });
    }

    function hapusAntrian(index) {
        const antrian = JSON.parse(localStorage.getItem('antrian')) || [];
        if (index >= 0 && index < antrian.length) {
            antrian.splice(index, 1); // Hapus nomor antrian berdasarkan index
            localStorage.setItem('antrian', JSON.stringify(antrian));
            loadAntrian(); // Muat ulang daftar antrian
        }
    }
});