document.addEventListener("DOMContentLoaded", function () {
    const buttonAction = document.getElementById("Button");

    buttonAction.addEventListener("click", () => {
        if (buttonAction.textContent === "Guardar" || buttonAction.textContent === "Actualizar") {
            const ID = document.getElementById("ID").value;
            const nombre = document.getElementById("nombre").value;
            const cantidad = document.getElementById("cantidad").value;
            const precio = document.getElementById("precio").value;
            const descripcion = document.getElementById("descripcion").value;
            const categoria = document.getElementById("categoria").value;

            const data = {
                "ID": ID,
                "Nombre": nombre,
                "Descripcion": descripcion,
                "Categoria": categoria,
                "Cantidad": cantidad,
                "Precio": precio,
            };

            const validationResult = isValidProduct(data);

            if (validationResult.isValid) {
                const method = buttonAction.textContent === "Guardar" ? 'POST' : 'PUT';
                const url = buttonAction.textContent === "Guardar" ? '/product' : '/product';

                sendToServer(method, url, data);
            } else {
                mostrarToast('Error', validationResult.error, 3000, 'error', true);
            }
        }

        if (buttonAction.textContent === "Eliminar") {
            const ID = document.getElementById("ID").value;
            const method = 'DELETE';
            const url = '/product/';

            sendToServer(method, url, ID);
        }
    });

    function sendToServer(method, url, data) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                $('#exampleModal').modal('hide');
                const successMessage = buttonAction.textContent === "Guardar" ? 'Nuevo producto creado' :
                    buttonAction.textContent === "Actualizar" ? 'Producto actualizado' : 'Producto eliminado';
                mostrarToast('Éxito', successMessage, 3000, 'success', true);

                // Actualizar solo la tabla con AJAX
                $.get('/product', function (data) {
                    const tableFragment = $(data).find('.table');
                    $('.table').html(tableFragment.html());

                    // Reinitializar DataTable
                    $('#miTabla').DataTable().destroy();
                    $('#miTabla').DataTable({
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                        },
                        "pageLength": 5,
                        "lengthMenu": [5, 10, 25],
                        "order": [],
                        "columnDefs": [{
                            "targets": [0],
                            "visible": false,
                            "searchable": false
                        }, {
                            "targets": [-2, -1],
                            "orderable": false
                        }],
                    });
                });

                if (method !== 'DELETE') {
                    clearForm();
                }

            }
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    const isValidProduct = (product) => {
        const requiredFields = ["Nombre", "Cantidad", "Precio", "Descripcion", "Categoria"];

        for (const field of requiredFields) {
            if (!(field in product) || product[field] === "") {
                return { isValid: false, error: `Campo "${field}" es requerido y no puede estar vacío.` };
            }
        }

        return { isValid: true };
    };
});

function newProduct() {
    const serverPath = "/product/form";
    $('#exampleModal').find('.modal-title').text('Nuevo producto');
    $('#exampleModal').find('.modal-body').load(serverPath);
    $('#exampleModal').find('.btn-primary').text('Guardar');
    $('#exampleModal').modal('show');
}

function editRow(rowData) {
    const serverPath = "/product/form";
    $('#exampleModal').find('.modal-title').text('Editar producto');
    $('#exampleModal').find('.modal-body').load(serverPath, function () {
        document.getElementById("ID").value = rowData.ID;
        document.getElementById("nombre").value = rowData.Nombre;
        document.getElementById("cantidad").value = rowData.Cantidad;
        document.getElementById("precio").value = rowData.Precio;
        document.getElementById("descripcion").value = rowData.Descripcion;
        document.getElementById("categoria").value = rowData.Categoria;

        $('#exampleModal').modal('show');
    });
    $('#exampleModal').find('.btn-primary').text('Actualizar');
}

function deteleRow(ID) {
    $('#exampleModal').find('.modal-title').text('Eliminar producto');
    $('#exampleModal').find('.modal-body').html('<label id="ID" value="' + ID + '">¿Está seguro de eliminar el producto?</label>');
    $('#exampleModal').find('.btn-primary').text('Eliminar');

    $('#exampleModal').modal('show');

}

function clearForm() {
    document.getElementById("nombre").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
}
