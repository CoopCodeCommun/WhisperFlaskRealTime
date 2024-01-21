let chunks = [];
let recorder;

// Démarrage de l'enregistrement du microphone
navigator.mediaDevices.getUserMedia({ audio: true })
.then(function(stream) {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => {
        chunks.push(event.data);
        if (recorder.state === "inactive") {
            let blob = new Blob(chunks, { type: recorder.mimeType });
            chunks = [];
            sendToServer(blob);
        }
    };
    recorder.onstop = event => {
        recorder.start();
    };
    recorder.start();
    setInterval(() => {
        if (recorder.state !== "inactive") {
            recorder.stop();
        }
    }, 2000);
})
.catch(function(err) {
    console.error(err);
});

// Fonction pour envoyer les données audio au serveur
function sendToServer(blob) {
    let formData = new FormData();
    formData.append("audio_file", blob, "audio.wav");
    fetch("/upload", {
        method: "POST",
        body: formData
    }).then(resp => {
        if (resp.status === 200) {
            console.log("File uploaded successfully");
        } else {
            console.error("Error:", resp);
        }
    }).catch(err => {
        console.error(err);
    });
}
