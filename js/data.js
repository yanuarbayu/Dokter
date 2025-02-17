$(document).ready(function() {
    // Muat data pasien dari localStorage
    loadDataPasien();

    // Tambah data pasien
    $('#tambahData').click(function() {
        const namaPasien = $('#namaPasien').val().trim();
        const nomorKtp = $('#nomorKtp').val().trim();
        const tingkatPenyakit = $('#tingkatPenyakit').val();
        if (namaPasien && nomorKtp) {
            tambahDataPasien(namaPasien, nomorKtp, tingkatPenyakit);
            $('#namaPasien').val(''); // Bersihkan input
            $('#nomorKtp').val(''); // Bersihkan input
        } else {
            alert("Nama pasien dan nomor KTP tidak boleh kosong!");
        }
    });

    // Hapus data pasien
    $(document).on('click', '.hapusData', function() {
        const index = $(this).data('index');
        hapusDataPasien(index);
    });

    // Tombol pembayaran
    $(document).on('click', '.pembayaran', function() {
        const index = $(this).data('index');
        const dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
        const pasien = dataPasien[index];

        if (pasien) {
            window.location.href = `pembayaran.html?index=${index}`;
        } else {
            alert("Data pasien tidak ditemukan!");
        }
    });

    function loadDataPasien() {
        const dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
        $('#tabelPasien tbody').empty();
        dataPasien.forEach((pasien, index) => {
            $('#tabelPasien tbody').append(`
                <tr>
                    <td>${pasien.nama}</td>
                    <td>${pasien.nomorKtp}</td>
                    <td>${pasien.tingkatPenyakit}</td>
                    <td>
                        <button type="button" class="pembayaran" data-index="${index}">Bayar</button>
                        <button type="button" class="hapusData" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `);
        });
    }

    function tambahDataPasien(namaPasien, nomorKtp, tingkatPenyakit) {
        const dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
        dataPasien.push({ nama: namaPasien, nomorKtp: nomorKtp, tingkatPenyakit: tingkatPenyakit });
        localStorage.setItem('dataPasien', JSON.stringify(dataPasien));
        loadDataPasien();
    }

    function hapusDataPasien(index) {
        const dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
        dataPasien.splice(index, 1);
        localStorage.setItem('dataPasien', JSON.stringify(dataPasien));
        loadDataPasien();
    }
});
