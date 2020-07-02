//Objeto JSON facturas
var facturasJSONTxt = '{"facturas":[' + '{"numero":"345345","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"30","valorTotal":"234454" },' + '{"numero":"872034","fecha":"2020-06-25","tipoPago":"Contado","plazo":"","valorTotal":"7435246" },' + '{"numero":"293658","fecha":"2018-12-04","tipoPago":"Crédito","plazo":"90","valorTotal":"932937" } ]}';
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
    datosFacturas.push([factura.numero, factura.fecha, factura.tipoPago, factura.plazo, factura.valorTotal]);
});
//Array de abonos por factura que mostrara la tabla de facturas
// Array abonos ingresados
var abonosIngresados = []
//Inicializando la tabla que mostrara las facturas
tablaFacturas = $('#tableFac').DataTable({
    data: datosFacturas,
    "ordering": false,
    columns: [{
        title: "Número Factura"
    }, {
        title: "Fecha Factura"
    }, {
        title: "Tipo Pago"
    }, {
        title: "Plazo"
    }, {
        title: "Valor Total"
    }]
});
// Array abonos ingresados
var abonosIngresados = [
    //numero, saldo, abono, nuevo saldo, observaciones
    ["293658", 250000, 100000, 134454, "observacion"],
    ["293658", 250000, 100000, 134454, "observacion"]
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
$("#inputNumeroFactura").on('input', function() {
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
$("#inputAbono").on('input', function() {
    if (factura.length > 0) {
        // factura[4] tiene el saldo de la factura
        $("#inputNuevoSaldo").val(factura[4] - parseInt($("#inputAbono").val()))
    }
});
// Guarda los datos enviados del formulario al array abonosIngresados
$("#formulario").submit(function(event) {
    event.preventDefault();
    abonosIngresados.push([
        $("#inputNumeroFactura").val(),
        $("#inputSaldoFactura").val(),
        $("#inputValorAbono").val(),
        $("#inputNuevoSaldo").val(),
        $("#textareaObservaciones").val()
    ]);
    console.log("Abonos ingresados", abonosIngresados)
    mostrarTAbonos();
});
// metodo que busca los abonos dependiendo del numero de factura
// retorna un vector con los abonos asociados a la factura
function buscarAbonos(numeroFactura) {
    var abonos = [];
    abonosIngresados.forEach(element => {
        if (element[0] == numeroFactura) {
            abonos.push(element)
        }
    });
    return abonos;
}
/*
Método para encontrar el valor total en los abonos
 */
function totalAbonos(arrayAbonos) {
    var totalFactura = 0;
    arrayAbonos.forEach(element => {
        console.log("valor " + element[1])
        totalFactura = totalFactura + parseInt(element[1]);
    });
    return totalFactura;
}
/**ejemplo
 * console.log("numero de abonos " + numeroAbonosYTotal("293658")[0] + " total " +  numeroAbonosYTotal("293658")[1])
 * resultado en consola -> numero de abonos 2 total 500000
 */
//-----------------------------------------------------------------------------------------------------------------------------
function sumarDiasAFecha(fechaString, dias) {
    var fecha = new Date(fechaString);
    // fecha String debe tener este formato 'YYYY-MM-DD' -> '2016-01-01'
    fecha.setDate(fecha.getDate() + parseInt(dias));
    console.log(fecha)
    var año = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    if (mes >= 0 && mes < 10) {
        mes = "0" + mes
    }
    if (dia >= 0 && dia < 10) {
        dia = "0" + dia
    }
    return año + "-" + mes + "-" + dia;
}
/**Calcular fecha de vencimiento devuelve un string de la fecha de vencimiento de una factura
 * con tipo de pago = "Crédito" dependiendo del plazo que tenga.
 */
function CalcularFechaVencimiento(numeroFactura) {
    if (buscarFactura(numeroFactura)[2] == "Crédito") {
        var fecha = buscarFactura(numeroFactura)[1];
        var plazo = buscarFactura(numeroFactura)[3];
        var fechaVencimiento = sumarDiasAFecha(fecha, plazo);
        console.log("fecha: " + fecha, " | plazo: " + plazo + " |fecha vencimiento: " + fechaVencimiento)
        return fecha;
    } else {
        console.log("la factura no tiene metodo de pago = Crédito")
        return null;
    }
}
// CalcularFechaVencimiento("293658")
// toma el numero de factura, obtiene la fecha 2018-12-04 le suma 90 del plazo y retorna '2019-03-03'
//-----------------------------------------------------------------------------------------------------------------------------
function limpiarTabla(nombreTabla) {
    $("#" + nombreTabla + " tbody").empty();
}
/**
 * mostrarTAbonos[Añade las variables a mostrar en la tablaAbonos: Número de factura, # de Abonos, Total de Abonos, 
 * Fecha de Vencimiento, Saldo, Opción de consultar. Esta información será de las facturas con tipo
 * de pago "crédito", a las cuales ya se les hayan hecho abonos. Lo que hace es que toma información
 * de los métodos numeroAbonosYTotal() y CalcularFechaVencimiento() de las facturas y muestra la información en 
 * conjunto.
 **/
function mostrarTAbonos() {
    limpiarTabla("tablaFAbono");
    var idFact = "";
    var numAbono = 0;
    var fechaVenc = "";
    var saldo = "";
    var fila = "";
    var botonConsulta = "<button id=\"consulta\"  > <img src=\"./src/lupa.png\"> </button>";
    for (var i = 0; i < datosFacturas.length; i++) {
        if (datosFacturas[i][2] == "Crédito") {
            idFact = datosFacturas[i][0];
            if (buscarAbonos(idFact).length > 0) {
                fila = "<tr><td>" + idFact + "</td><td>" + buscarAbonos(idFact).length + "</td><td>" + totalAbonos(buscarAbonos(idFact)) + "</td><td>" + CalcularFechaVencimiento(idFact) + "</td><td>" + saldo + "</td><td>" + botonConsulta + "</td></tr>";
                $('#tablaFAbono tbody').append(fila);
            }
        }
    }
}
/**
 * [Método para mostrar nueva tabla con datos extendidos acerca de  
 * factura y sus abonos].
 * @param {var} [idFact] [Identificador de la factura a consultar]
 */
function consulta(idFact) {
    console.log(idFact);
    for (var i = 0; i < datosFacturas.length; i++) {
        alert(datosFacturas[i]);
    }
}
/**
 * Trigger para el botón de consulta que extrae el id de la factura que 
 * se desea consultar.
 * @param  event click
 */
$(document).on('click', '#consulta', function(event) {
    event.preventDefault();
    var row = $(this).closest('tr');
    var idFact = row.find('td:eq(0)').text();
    consulta(idFact);
});
/**
 * Método para mostrar los créditos con abonos que se encuentran en el sistema
 * al iniciar la página
 *  */
$(() => {
    'use strict';
    mostrarTAbonos();
});