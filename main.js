// REGISTRAR SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registro OK
            console.log('ServiceWorker registrado com sucesso ', registration.scope);
        }, function (err) {
            // Ragistro não funcionou :(
            console.log('Falha no registro do ServiceWorker ', err);
        });
    });
}

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