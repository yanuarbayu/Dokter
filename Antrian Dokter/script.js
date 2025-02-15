$(document).ready(function () {
    let antrian = JSON.parse(localStorage.getItem("antrian")) || [];
    let pasienTetap = new Set(JSON.parse(localStorage.getItem("pasienTetap")) || []);
    let nomorSekarang = localStorage.getItem("nomorSekarang") || null;

    function updateAntrianDisplay() {
        $("#antrianSekarang").text("Antrian Saat Ini: " + (nomorSekarang || "-"));
    }
    updateAntrianDisplay();

    $("#ambilAntrian").click(function () {
        let nomor = antrian.length + 1;
        antrian.push(nomor);
        localStorage.setItem("antrian", JSON.stringify(antrian));
        alert("Nomor Antrian Anda: " + nomor);
    });

    $("#panggilAntrian").click(function () {
        if (antrian.length === 0) {
            alert("Tidak ada antrian!");
            return;
        }
        nomorSekarang = antrian.shift();
        localStorage.setItem("nomorSekarang", nomorSekarang);
        localStorage.setItem("antrian", JSON.stringify(antrian));
        updateAntrianDisplay();
    });

    $("#prosesPasien").click(function () {
        let nik = $("#nik").val();
        let nama = $("#nama").val();
        let age = $('#age').val();
        let penyakit = $("#penyakit").val();
        
        if (!nik || !nama || !age) {
            alert("Harap masukkan data pasien!");
            return;
        }

        let biaya = 0;
        if (penyakit === "ringan") biaya = 50000;
        else if (penyakit === "sedang") biaya = 100000;
        else if (penyakit === "berat") biaya = 200000;

        if (pasienTetap.has(nik)) {
            biaya *= 0.9; // Diskon 10%
        } else {
            pasienTetap.add(nik);
            localStorage.setItem("pasienTetap", JSON.stringify(Array.from(pasienTetap)));
        }

        localStorage.setItem('age', age);
        localStorage.setItem('nik', nik);
        localStorage.setItem('nama', nama);

        $("#biaya").text("Biaya: Rp " + biaya.toLocaleString("id-ID"));
        alert("Pasien diproses. Biaya: Rp " + biaya.toLocaleString("id-ID"));
    });

    $('#login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert('Login successful!');
            },
            error: function() {
                alert('Login failed!');
            }
        });
    });

    $('#register').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/register',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                alert('Registration successful!');
            },
            error: function() {
                alert('Registration failed!');
            }
        });
    });
});

function clearData()  {
    localStorage.clear();
    location.reload();
}