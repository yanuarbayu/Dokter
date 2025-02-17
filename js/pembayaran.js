$(document).ready(function() {
    // Ambil parameter index dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const indexPasien = urlParams.get('index');

    const dataPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];

    if (indexPasien !== null && dataPasien[indexPasien]) {
        const pasien = dataPasien[indexPasien];

        // Tampilkan detail pasien
        $('#namaPasien').text(pasien.nama);
        $('#nomorKtp').text(pasien.nomorKtp);
        $('#tingkatPenyakit').text(pasien.tingkatPenyakit);

        // Hitung total pembayaran berdasarkan tingkat penyakit
        let totalPembayaran = 0;
        switch (pasien.tingkatPenyakit) {
            case 'ringan':
                totalPembayaran = 500000;
                break;
            case 'sedang':
                totalPembayaran = 1000000;
                break;
            case 'berat':
                totalPembayaran = 2000000;
                break;
            default:
                totalPembayaran = 0;
        }
        $('#totalPembayaran').text(`Rp ${totalPembayaran.toLocaleString()}`);

        // Proses pembayaran
        $('#prosesPembayaran').click(function() {
            // Simpan riwayat pembayaran ke localStorage
            const riwayatPembayaran = JSON.parse(localStorage.getItem('riwayatPembayaran')) || [];
            const tanggalPembayaran = new Date().toLocaleString("id-ID");

            riwayatPembayaran.push({
                nama: pasien.nama,
                nomorKtp: pasien.nomorKtp,
                tingkatPenyakit: pasien.tingkatPenyakit,
                jumlahPembayaran: totalPembayaran,
                tanggal: tanggalPembayaran
            });

            localStorage.setItem('riwayatPembayaran', JSON.stringify(riwayatPembayaran));

            // Hapus data pasien setelah pembayaran berhasil
            dataPasien.splice(indexPasien, 1);
            localStorage.setItem('dataPasien', JSON.stringify(dataPasien));

            alert(`Pembayaran sebesar Rp ${totalPembayaran.toLocaleString()} untuk ${pasien.nama} berhasil diproses.`);
            
            // Redirect ke halaman riwayat pembayaran
            window.location.href = "riwayat.html";
        });
    } else {
        alert("Data pasien tidak ditemukan!");
        window.location.href = "index.html";
    }

    // Kembali ke halaman data pasien
    $('#kembali').click(function() {
        window.location.href = "index.html";
    });
});
