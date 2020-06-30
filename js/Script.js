// Vector de facturas
var facturas = [
    [ "345345", "2017-07-21", "Crédito", "30", 234454 ],
    [ "872034", "2020-06-25", "Contado", "", 7435246 ],
    [ "293658", "2018-12-04", "Crédito", "90", 932937 ]
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