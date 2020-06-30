// Vector de facturas
var facturas = [
    ["345345", "2017-07-21", "Crédito", "30", 234454],
    ["872034", "2020-06-25", "Contado", "", 7435246],
    ["293658", "2018-12-04", "Crédito", "90", 932937]
];
//Inicializando la tabla que mostrara las facturas
tablaFacturas = $('#tableFac').DataTable( {
    data: facturas,
    "ordering": false,
    columns: [
        { title: "Número Factura" },
        { title: "Fecha Factura" },
        { title: "Tipo Pago" },
        { title: "Plazo" },
        { title: "Valor Total" }
    ]
} );


// Para agregar facturas
// tablaFacturas.row.add( [ "293658", "2018-12-04", "Crédito", "90", "$932.937" ] ).draw();


// Buscar Facturas
function buscarFactura(numero){
    var factura = [];
    facturas.forEach(element => {
        if(numero == element[0]){
            factura = element;
        }
    });
    return factura;
}


// Eventos - input numero de factura e input valor abono

var factura;

$( "#inputNumeroFactura" ).on('input',function() {

    // busca si el numero de factura ingresado ya existe y si existe guarda el
    // array de la factura en "factura"

    factura = buscarFactura($("#inputNumeroFactura").val())
    
    // si la factura existe
    if(factura.length>0){

        // muestra el saldo de la factura en el input Saldo Factura
        $("#inputSaldoFactura").val(factura[4])
    }else{

        $("#inputSaldoFactura").val("")
    }
});

    // Cuando se ingresa un valor en input valor abono resta el saldo de la factura con el
    // valor de abono ingresado y lo muestra en input Nuevo Saldo
$( "#inputValorAbono" ).on('input',function() {
   
    if(factura.length>0){

        // factura[4] tiene el saldo de la factura
        $("#inputNuevoSaldo").val( factura[4] - parseInt($("#inputValorAbono").val()))
    }

});
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
