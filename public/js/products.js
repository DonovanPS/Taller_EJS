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
                const url = "/product"

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
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const responseData = JSON.parse(this.responseText);
                    console.log('Respuesta del servidor:', responseData);
                    $('#exampleModal').modal('hide');
                    toast = responseData.toast;

                    mostrarToast(toast.title, toast.msg, 3000, toast.type, true);

                    loadData(responseData.data);
                    if (method !== 'DELETE') {
                        clearForm();
                    }
                } else {
                    const errorMessage = 'Error en la operación';
                    console.error(errorMessage, this.status, this.statusText);
                    mostrarToast('Error', errorMessage, 3000, 'error', true);
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
    rowData = JSON.parse(decodeURIComponent(rowData));
    console.log(rowData);
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

function startData(data) {
    console.log("loadDataaaa");

    console.log(data);

    var table = $('#miTabla').DataTable({
        "data": data,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        },
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        "order": [],
        "columnDefs": [
            { "targets": [0], "visible": false, "searchable": false },  // Oculta la primera columna (ID)
            { "targets": [-2, -1], "orderable": false }  // Hace que las dos últimas columnas no sean ordenables
        ],
        "columns": [
            { "data": "ID" },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "Categoria" },
            { "data": "Cantidad" },
            { "data": "Precio" },
            {
                "data": null,
                "render": function (data, type, row) {
                    return '<button type="button" class="btn btn-info" onclick="editRow(\'' + encodeURIComponent(JSON.stringify(row)) + '\')"><i class="bi bi-pencil"></i></button>';
                }
            },
            {
                "data": null,
                "render": function (data, type, row) {
                    return '<button type="button" class="btn btn-danger" onclick="deteleRow(\'' + encodeURIComponent(JSON.stringify(row.ID)) + '\')"><i class="bi bi-trash"></i></button>';
                }
            }
        ]
    });

    // Vuelve a dibujar la tabla
    table.draw();
}



  
function loadData(data) {
    console.log("loadData");

    console.log(data);

    var table = $('#miTabla').DataTable();

    // Limpia la tabla
    table.clear();

    for (var i = 0; i < data.length; i++) {
        var rowData = {
            "ID": data[i].ID,
            "Nombre": data[i].Nombre,
            "Descripcion": data[i].Descripcion,
            "Categoria": data[i].Categoria,
            "Cantidad": data[i].Cantidad,
            "Precio": data[i].Precio
          
        };
        table.row.add(rowData);
        
    }

    // Vuelve a inicializar DataTable
    table.draw();

    
}

