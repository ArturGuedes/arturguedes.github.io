// Console.log
(function () {
    var old = console.log;
    var logger = document.querySelector('.log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += '<code> <i>Log:</i> ' + message + '</code><br />';
        }
    }
})();


// REGISTRAR SERVICE WORKER
if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('sw.js').then(function () {
        console.log('CLIENT: service worker registration complete.');

        if(navigator.onLine){
            console.log("ONLINE");
        }else{
            console.log("OFFLINE");
        }

    }, function () {
        console.log('CLIENT: service worker registration failure.');
    });
} else {
    console.log('CLIENT: service worker is not supported.');
}


// Botão de compartilhar otimizado para Android
function share() {
    var text = 'Add text to share with the URL';
    if ('share' in navigator) {
        navigator.share({
            title: document.title,
            text: text,
            url: location.href,
        })
    } else {
        // Here we use the WhatsApp API as fallback; remember to encode your text for URI
        location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
    }
}

// Login com o google
function onSignIn(response) {
    // Conseguindo as informações do seu usuário:
    var perfil = response.getBasicProfile();

    // Conseguindo o ID do Usuário
    var userID = perfil.getId();

    // Conseguindo o Nome do Usuário
    var userName = perfil.getName();

    // Conseguindo o E-mail do Usuário
    var userEmail = perfil.getEmail();

    // Conseguindo a URL da Foto do Perfil
    var userPicture = perfil.getImageUrl();

    //document.getElementById('user-photo').src = userPicture;
    document.querySelector('.title').innerText = userName;
    //document.getElementById('user-email').innerText = userEmail;

    // Recebendo o TOKEN que você usará nas demais requisições à API:
    var LoR = response.getAuthResponse().id_token;
    console.log("~ le Tolkien: " + LoR);
};