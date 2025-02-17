$(document).ready(function() {
    // Ambil data riwayat pembayaran dari localStorage
    const riwayatPembayaran = JSON.parse(localStorage.getItem('riwayatPembayaran')) || [];

    if (riwayatPembayaran.length > 0) {
        $('#tabelRiwayat').empty();
        riwayatPembayaran.forEach((pembayaran) => {
            $('#tabelRiwayat').append(`
                <tr>
                    <td>${pembayaran.nama}</td>
                    <td>${pembayaran.nomorKtp}</td>
                    <td>${pembayaran.tingkatPenyakit}</td>
                    <td>Rp ${pembayaran.jumlahPembayaran.toLocaleString()}</td>
                    <td>${pembayaran.tanggal}</td>
                </tr>
            `);
        });
    } else {
        $('#tabelRiwayat').append('<tr><td colspan="5">Belum ada riwayat pembayaran.</td></tr>');
    }

    // Tombol kembali ke halaman utama
    $('#kembali').click(function() {
        window.location.href = "index.html";
    });
});
