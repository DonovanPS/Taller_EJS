function mostrarToast(titulo, mensaje, duracion = 3000, tipo = 'default', dismissable = false) {
    butterup.toast({
        title: titulo,
        message: mensaje,
        location: 'top-right',
        toastLife: duracion,
        type: tipo,
        icon: true,
        dismissable: dismissable,
    });
}
