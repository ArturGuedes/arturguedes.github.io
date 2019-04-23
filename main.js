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
// https://mariovalney.com/como-colocar-o-login-do-google-no-meu-site/
// https://developers.google.com/identity/sign-in/web/sign-in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    document.querySelector('.title').innerText = profile.getName();
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log(googleUser.getAuthResponse().id_token);
}