var firebaseConfig = {
    apiKey: "AIzaSyCzn9Ns0m1rT8D5L6x8sQp9y8JEcAEjuBM",
    authDomain: "abicdb-93d79.firebaseapp.com",
    databaseURL: "https://abicdb-93d79-default-rtdb.firebaseio.com",
    projectId: "abicdb-93d79",
    storageBucket: "abicdb-93d79.appspot.com",
    messagingSenderId: "651823119173",
    appId: "1:651823119173:web:900808b5843af08adb5c2c",
    measurementId: "G-F36XZNYZLW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var precio = document.getElementById("Input3").value;
    var categoria = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var product = {
            id, //matricula:id
            nombre,
            precio,
            categoria,
        }

        

        firebase.database().ref('Productos/' + id).update(product).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");


    }
    else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;

}

function read() {
    document.getElementById("Table1").innerHTML = '';

    var ref = firebase.database().ref('Productos');


    ref.on("child_added", function (snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(product) {

    if (product != null) {
        var table = document.getElementById("Table1");

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = product.id;
        cell2.innerHTML = product.nombre;
        cell3.innerHTML = product.precio;
        cell4.innerHTML = product.categoria;
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${product.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + product.id + ')">Modificar</button>';
    }
}

function deleteR(medicamento) {
    firebase.database().ref('Productos/' + product).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id) {
    var ref = firebase.database().ref('Productos/' + id);
    ref.on('value', function (snapshot) {
        updateR(snapshot.val());
    });
}

function updateR(product) {
    if (product != null) {
        document.getElementById("Input1").value = product.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = product.nombre;
        document.getElementById("Input3").value = product.precio;
        document.getElementById("Input4").value = product.categoria;
    }
}


//Para consulta de carrera
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Productos");
    ref.orderByChild("categirua").equalTo(c).on("child_added", function (snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(product) {

    var table = document.getElementById("Table2");

    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = product.id;
    cell2.innerHTML = product.nombre;
    cell3.innerHTML = product.precio;
    cell4.innerHTML = product.categoria;

}