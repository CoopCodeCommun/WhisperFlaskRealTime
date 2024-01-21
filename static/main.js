// Initialisation de l'objet de reconnaissance vocale
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// Ajout d'un écouteur d'événements pour l'événement 'audiostart'
recognition.addEventListener('audiostart', () => {
    console.log('Début de la détection de la parole...');
});

// Définition de la fonction pour gérer l'événement 'result'
recognition.addEventListener('result', (e) => {
    // Obtention de la transcription
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // Enregistrement de la phrase
    console.log(`Transcription reçue: ${transcript}.`);

    // Affichage qu'un enregistrement existe
    console.log('Un enregistrement a été effectué.');
});

// Démarrage de la reconnaissance vocale
recognition.start();
