document.addEventListener("DOMContentLoaded", function () {

    const buttonAction = document.getElementById("Button");

    buttonAction.addEventListener("click", () => {
        if (buttonAction.textContent === "Guardar") {
            const ID = document.getElementById("ID").value;
            //const fecha = document.getElementById("fecha").value;
            const cliente = document.getElementById("cliente").value;
            const producto_id = document.getElementById("producto").value;
            const nombreProducto = document.getElementById("producto").options[document.getElementById("producto").selectedIndex].text;
            const cantidad = document.getElementById("cantidad").value;
            const unitario = document.getElementById("Unitario").value;
            const total = document.getElementById("total").value;

            const data = {
                "ID": ID,
                "Fecha": new Date().toLocaleString(),
                "Cliente": cliente,
                "Producto_ID": producto_id,
                "NombreProducto": nombreProducto,
                "Cantidad": cantidad,
                "Unitario": unitario,
                "Total": total
            };



            const validationResult = isValidProduct(data);

            if (validationResult.isValid) {
                const method = 'POST';
                const url = "/sales"

                sendToServer(method, url, data);
            } else {
                mostrarToast('Error', validationResult.error, 3000, 'error', true);
            }
        }

        if (buttonAction.textContent === "Eliminar") {
            const ID = document.getElementById("ID").value;
            const method = 'DELETE';
            const url = '/sales';

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

                   
                    if (responseData.toast.type === "success") {
                        $('#exampleModal').modal('hide');
                        clearForm();
                        loadData(responseData.data);
                    }

                    toast = responseData.toast;

                    mostrarToast(toast.title, toast.msg, 3000, toast.type, true);

                   
                    
                } else {
                    const msg = JSON.parse(this.responseText).msg;

                    const errorMessage = 'Error en la operación' + msg;
                    console.error(errorMessage, this.status, this.statusText);
                    mostrarToast('Error', errorMessage, 3000, 'error', true);
                }
            }
        };

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }



    const isValidProduct = (product) => {
        const requiredFields = ["NombreProducto", "Fecha", "Cliente", "Cantidad", "Unitario"];

        for (const field of requiredFields) {
            if (!(field in product) || product[field] === "") {
                return { isValid: false, error: `Campo "${field}" es requerido y no puede estar vacío.` };
            }
        }

        if (product.Cantidad < 0) {
            return { isValid: false, error: `La cantidad no puede ser negativa.` };
        }


        return { isValid: true };
    };
});


document.addEventListener("DOMContentLoaded", function () {
    var selectElement = document.getElementById("producto");
    var inputPrecioUnitario = document.getElementById("Unitario");
    var inputCantidad = document.getElementById("cantidad");
    var inputTotal = document.getElementById("total");


    selectElement.addEventListener("change", function () {
        var selectedOption = selectElement.options[selectElement.selectedIndex];
        var precio = selectedOption.getAttribute("data-precio");
        inputPrecioUnitario.value = precio;
        updateTotal();
    });


    inputCantidad.addEventListener("input", function () {
        updateTotal();
    });

    function updateTotal() {
        var cantidad = parseFloat(inputCantidad.value) || 0;
        var precioUnitario = parseFloat(inputPrecioUnitario.value) || 0;
        var total = cantidad * precioUnitario;
        inputTotal.value = total.toFixed(2);
    }
});



function startData(data) {



    var table = $('#miTabla').DataTable({
        "data": data,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        },
        pageLength: 5,
        lengthMenu: [5, 10, 25],
        "order": [],
        "columnDefs": [
            { "targets": [0, 1, 2, -2, -1], "visible": false, "searchable": false },  // Oculta la primera columna (ID)
            { "targets": [-2, -1], "orderable": false }  // Hace que las dos últimas columnas no sean ordenables
        ],
        "columns": [
            { "data": "ID" },
            { "data": "Producto_ID" },
            { "data": "NombreProducto" },
            { "data": "Fecha" },
            { "data": "Cliente" },
            { "data": "Producto" },
            { "data": "Valor Unitario" },
            { "data": "Cantidad" },
            { "data": "Total" },
            {
                "data": null,

            },
            {
                "data": null,

            }
        ]
    });

    table.draw();
}


function loadData(data) {


    var table = $('#miTabla').DataTable();

    table.clear();

    for (var i = 0; i < data.length; i++) {
        var rowData = {
            "ID": data[i].ID,
            "Producto_ID": data[i].Producto_ID,
            "NombreProducto": data[i].NombreProducto,
            "Fecha": data[i].Fecha,
            "Cliente": data[i].Cliente,
            "Producto": data[i].Producto,
            "Valor Unitario": data[i].Unitario,
            "Cantidad": data[i].Cantidad,
            "Total": data[i].Total
        };

        table.row.add(rowData);
    }
    table.draw();
}

function clearForm() {

    document.getElementById("ID").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("Unitario").value = "";
    document.getElementById("total").value = "";


}