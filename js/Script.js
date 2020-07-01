//Objeto JSON facturas
var facturasJSONTxt = '{"facturas":[' +
'{"numero":"345345","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"30","valorTotal":"234454" },' +
'{"numero":"872034","fecha":"2020-06-25","tipoPago":"Contado","plazo":"","valorTotal":"7435246" },' +
'{"numero":"293658","fecha":"2018-12-04","tipoPago":"Crédito","plazo":"90","valorTotal":"932937" } ]}';

// Objeto facturas
var facturasJSON = JSON.parse(facturasJSONTxt);


// datosFacturas es un array que guarda arrays con unicamente los datos de las facturas
// Ejemplo

/* var datosFacturas = [
    ["345345", "2017-07-21", "Crédito", "30", 234454],
    ["872034", "2020-06-25", "Contado", "", 7435246],
    ["293658", "2018-12-04", "Crédito", "90", 932937]
]; */

var datosFacturas = [];

facturasJSON.facturas.forEach(factura => {
    datosFacturas.push([factura.numero,factura.fecha,factura.tipoPago, factura.plazo, factura.valorTotal]);
});

//Array de abonos por factura que mostrara la tabla de facturas
var abonosFactura = [
    ["293658", 2, "$500.000", "2019-03-04", "90", "$432.937"]
]

// Array abonos ingresados
var abonosIngresados = []



//Inicializando la tabla que mostrara las facturas
tablaFacturas = $('#tableFac').DataTable( {
    data: datosFacturas,
    "ordering": false,
    columns: [
        { title: "Número Factura" },
        { title: "Fecha Factura" },
        { title: "Tipo Pago" },
        { title: "Plazo" },
        { title: "Valor Total" }
    ]
} );


var abonosFactura = [
    ["293658", 2, "$500.000", "2019-03-04", "90", "$432.937"]
]

// Array abonos ingresados
var abonosIngresados = [
    //numero, saldo, abono, nuevo saldo, observaciones
    ["293658",250000,100000,134454,"observacion"],
    ["293658",250000,100000,134454,"observacion"]
]


// Para agregar facturas
// tablaFacturas.row.add( [ "293658", "2018-12-04", "Crédito", "90", "$932.937" ] ).draw();


// Buscar Facturas
function buscarFactura(numero) {
    var factura = [];
    datosFacturas.forEach(element => {
        if (numero == element[0]) {
            factura = element;
        }
    });
    return factura;
}


// Eventos - input numero de factura e input valor abono

var factura;

$("#inputNumeroFactura").on('input', function () {

    // busca si el numero de factura ingresado ya existe y si existe guarda el
    // array de la factura en "factura"

    factura = buscarFactura($("#inputNumeroFactura").val())
    console.log(factura)
    // si la factura existe
    if (factura.length > 0) {

        // muestra el saldo de la factura en el input Saldo Factura
        $("#inputSaldoFactura").val(factura[4])
    } else {

        $("#inputSaldoFactura").val("")
    }
});

// Cuando se ingresa un valor en input valor abono resta el saldo de la factura con el
// valor de abono ingresado y lo muestra en input Nuevo Saldo
$("#inputAbono").on('input', function () {

    if (factura.length > 0) {

        // factura[4] tiene el saldo de la factura
        $("#inputNuevoSaldo").val(factura[4] - parseInt($("#inputAbono").val()))
    }

});


// Guarda los datos enviados del formulario al array abonosIngresados
$( "#formulario" ).submit(function( event ) {
    event.preventDefault();
    abonosIngresados.push([   
        $("#inputNumeroFactura").val(), 
        $("#inputSaldoFactura").val(), 
        $("#inputValorAbono").val(), 
        $("#inputNuevoSaldo").val(),
        $("#textareaObservaciones").val()
    ]);
    console.log("Abonos ingresados", abonosIngresados)
}); 

// metodo que busca los abonos dependiendo del numero de factura
// retorna un vector con los abonos asociados a la factura

function buscarAbonos(numeroFactura)
{
    var abonos = [];
    abonosIngresados.forEach(element => {
        if(element[0]==numeroFactura){
            abonos.push(element)
        }
    });

    return abonos;
}

//devuelve array con numero de abonos y el total
function numeroAbonosYTotal(numeroFactura){

    if(buscarAbonos(numeroFactura).length>0){
        var numeroAbonos = buscarAbonos(numeroFactura).length;
        var totalFactura = 0;
        buscarAbonos(numeroFactura).forEach(element => {
            console.log("valor "+  element[1])
            totalFactura = totalFactura + parseInt(element[1]);
        });
        return [numeroAbonos, totalFactura]
    }else{
        return null;
    }
}

/**ejemplo
 * console.log("numero de abonos " + numeroAbonosYTotal("293658")[0] + " total " +  numeroAbonosYTotal("293658")[1])
 * resultado en consola -> numero de abonos 2 total 500000
 */


/**
 * consulta: Método para mostrar nueva tabla con datos extendidos acerca de  
 * factura y sus abonos.
 */
function consulta(idfact) {
    //aquí va el código
}
/**
 * Trigger para el botón de consulta que extrae el id de la factura que 
 * se desea consultar.
 * @param  event click
 * @return {[type]}        [description]
 */
$(document).on('click', '#consulta', function(event) {
    event.preventDefault();
    var row = $(this).closest('tr');
    alert(row.find('td:eq(0)').text());
});
/**
 * Método de prueba: En las siguientes líneas se agregan valores de
 *  prueba a la tablaAbono para probar ´la ejecución del método de
 *  consulta.
 * @param  {[type]} ( [description]
 * @return {[type]}   [description]
 */
$(() => {
    'use strict';
    var botonConsulta = "<button id=\"consulta\"  > consulta </button>";
    var filaPrueba = "<tr><td i>105</td><td>3</td><td>$432.937</td><td>2019-3-4</td><td>$432.937</td><td>" + botonConsulta + "</td></tr>";
    var filaPrueba2 = "<tr><td i>235</td><td>3</td><td>$432.937</td><td>2019-3-4</td><td>$432.937</td><td>" + botonConsulta + "</td></tr>";
    $('#tablaAbono tbody').append(filaPrueba);
    $('#tablaAbono tbody').append(filaPrueba2);
});
