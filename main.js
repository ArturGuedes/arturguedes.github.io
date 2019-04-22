// REGISTRAR SERVICE WORKER
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registro OK
            console.log('ServiceWorker registrado com sucesso com scope: ', registration.scope);
        }, function (err) {
            // Ragistro não funcionou :(
            console.log('Falha no registro do ServiceWorker: ', err);
        });
    });
}