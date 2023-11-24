document.addEventListener("DOMContentLoaded", function () {
    const guardarButton = document.getElementById("Guardar");
    const eliminarButton = document.getElementById("Eliminar");
    const editarButton = document.getElementById("Editar");

    if (guardarButton) {
        guardarButton.addEventListener("click", () => {
            const nombre = document.getElementById("nombre").value;
            const cantidad = document.getElementById("cantidad").value;
            const precio = document.getElementById("precio").value;
            const descripcion = document.getElementById("descripcion").value;
            const categoria = document.getElementById("categoria").value;

            const data = {
                "ID": "",
                "Nombre": nombre,
                "Cantidad": cantidad,
                "Precio": precio,
                "Descripcion": descripcion,
                "Categoria": categoria
            };

            const validationResult = isValidProduct(data);

            if (validationResult.isValid) {

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/product', true);
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {


                        $('#exampleModal').modal('hide');
                        mostrarToast('Éxito', 'Nuevo producto creado', 3000, 'success', true);

                        // Actualizar solo la tabla con AJAX
                        $.get('/product', function (data) {
                            // Reemplaza solo la parte de la tabla
                            const tableFragment = $(data).find('.table tbody');
                            $('.table tbody').html(tableFragment.html());
                        });

                        nombre.value = "";
                        cantidad.value = "";
                        precio.value = "";
                        descripcion.value = "";
                        categoria.value = "";

                    }
                }

                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            } else {
                mostrarToast('Error', validationResult.error, 3000, 'error', true);
            }

        });
    }

    if (eliminarButton) {
        eliminarButton.addEventListener("click", () => {
            console.log("Eliminar");
        });
    }

    if (editarButton) {
        editarButton.addEventListener("click", () => {
            console.log("Editar");
        });
    }

});




const isValidProduct = (product) => {
    const requiredFields = ["Nombre", "Cantidad", "Precio", "Descripcion", "Categoria"];

    for (const field of requiredFields) {
        if (!(field in product) || product[field] === "") {
            return { isValid: false, error: `Campo "${field}" es requerido y no puede estar vacío.` };
        }
    }

    return { isValid: true };
};






