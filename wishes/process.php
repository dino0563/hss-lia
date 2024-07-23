<?php
// process.php
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
    
    echo "Terima kasih! Wishes Anda telah disimpan.";
}
?>