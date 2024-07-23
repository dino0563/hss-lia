<?php
// display.php
$jsonFile = 'wishes.json';
if (file_exists($jsonFile)) {
    $wishes = json_decode(file_get_contents($jsonFile), true);
    
    echo "<h1>Daftar Wishes</h1>";
    foreach ($wishes as $wish) {
        echo "<p><strong>Nama:</strong> " . htmlspecialchars($wish['nama']) . "</p>";
        echo "<p><strong>Wishes:</strong> " . htmlspecialchars($wish['wishes']) . "</p>";
        echo "<p><strong>Waktu:</strong> " . $wish['timestamp'] . "</p>";
        echo "<hr>";
    }
} else {
    echo "Belum ada wishes yang tersimpan.";
}
?>