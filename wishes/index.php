<?php
// Proses form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST['nama'];
    $wishes = $_POST['wishes'];
    
    $data = [
        'nama' => $nama,
        'wishes' => $wishes,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    $jsonFile = 'wishes.json';
    $currentData = file_exists($jsonFile) ? json_decode(file_get_contents($jsonFile), true) : [];
    $currentData[] = $data;
    
    file_put_contents($jsonFile, json_encode($currentData, JSON_PRETTY_PRINT));
    
    $successMessage = "Terima kasih! Wishes Anda telah disimpan.";
}

// Menampilkan wishes
$jsonFile = 'wishes.json';
$wishesList = '';
if (file_exists($jsonFile)) {
    $wishes = json_decode(file_get_contents($jsonFile), true);
    
    $wishesList .= "<h2>Daftar Wishes</h2>";
    foreach ($wishes as $wish) {
        $wishesList .= "<p><strong>Nama:</strong> " . htmlspecialchars($wish['nama']) . "</p>";
        $wishesList .= "<p><strong>Wishes:</strong> " . htmlspecialchars($wish['wishes']) . "</p>";
        $wishesList .= "<p><strong>Waktu:</strong> " . $wish['timestamp'] . "</p>";
        $wishesList .= "<hr>";
    }
} else {
    $wishesList = "<p>Belum ada wishes yang tersimpan.</p>";
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wishes Form</title>
</head>
<body>
    <h1>Wishes Form</h1>
    <form action="" method="POST">
        <label for="nama">Nama:</label>
        <input type="text" id="nama" name="nama" readonly>
        <br><br>
        <label for="wishes">Wishes:</label>
        <textarea id="wishes" name="wishes" required></textarea>
        <br><br>
        <input type="submit" value="Submit">
    </form>

    <script>
        // Mengambil nama dari URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const nama = urlParams.get('to');
        document.getElementById('nama').value = nama || '';
    </script>

    <?php
    if (isset($successMessage)) {
        echo "<p>{$successMessage}</p>";
    }
    echo $wishesList;
    ?>
</body>
</html>
