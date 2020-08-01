//Objeto JSON facturas
var facturasJSONTxt = '{"facturas":[' + '{"numero":"46778","fecha":"2020-07-30","tipoPago":"Contado","plazo":"","valorTotal":"150650" },' + '{"numero":"565945","fecha":"2020-07-21","tipoPago":"Contado","plazo":"","valorTotal":"80000" },' + '{"numero":"45000","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"30","valorTotal":"30000" },' + '{"numero":"990945","fecha":"2017-07-21","tipoPago":"Contado","plazo":"","valorTotal":"500500" },' + '{"numero":"4995345","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"30","valorTotal":"60000" },' + '{"numero":"490538","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"120","valorTotal":"750600" },' + '{"numero":"4905345","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"60","valorTotal":"999999" },' + '{"numero":"3455326","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"150","valorTotal":"234454" },' + '{"numero":"345345","fecha":"2017-07-21","tipoPago":"Crédito","plazo":"30","valorTotal":"210000" },' + '{"numero":"872034","fecha":"2020-06-25","tipoPago":"Contado","plazo":"","valorTotal":"7435246" },' + '{"numero":"293658","fecha":"2018-12-04","tipoPago":"Crédito","plazo":"90","valorTotal":"932937" } ]}';
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
    datosFacturas.push([factura.numero, factura.fecha, factura.tipoPago, factura.plazo,factura.valorTotal]);
});
//Array de abonos por factura que mostrara la tabla de facturas
// Array abonos ingresados
var abonosIngresados = []


// esta funcion da formato de pesos al valor total de las facturas en datosFacturas
function formatearDatosFactura(datosFacturasArray){
    var datosFacturasFormateados = JSON.parse(JSON.stringify(datosFacturas))
    for(var i = 0;i<datosFacturasFormateados.length;i++){
        datosFacturasFormateados[i][4] = formato(parseInt(datosFacturasFormateados[i][4]))
    }   
    return datosFacturasFormateados;
}

//Inicializando la tabla que mostrara las facturas
tablaFacturas = $('#tableFac').DataTable({
    data: formatearDatosFactura(datosFacturas),
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
    ["293658", 134454, 100000, 34454, "observacion"]
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

function obtenerIndiceFactura(numero){
    for(var i = 0;i<datosFacturas.length;i++){
        if (numero == datosFacturas[i][0]) {
            return i;
        }
    }
    return null;
}

// Buscar Facturas por plazos
function buscarFacturaPorPlazo(inicio, final) {
    var fila = "";
    limpiarTabla('tableCartera');
    datosFacturas.forEach(factura => {
        if (final != '+') {
            if (factura[3] >= inicio && factura[3] <= final) {
                fila = "<tr><td>" + factura[0] + "</td><td>" + factura[1] + "</td><td>" + factura[2] + "</td><td>" + factura[3] + "</td><td>" + formato(parseInt(factura[4], 10)) + "</td></tr>";
                $('#tableCartera tbody').append(fila);
            }
        } else {
            if (factura[3] >= inicio) {
                fila = "<tr><td>" + factura[0] + "</td><td>" + factura[1] + "</td><td>" + factura[2] + "</td><td>" + factura[3] + "</td><td>" + formato(parseInt(factura[4], 10)) + "</td></tr>";
                $('#tableCartera tbody').append(fila);
            }
        }
    });
    return factura;
}
$(document).on('click', 'input[type="checkbox"]', function() {
    $('input[type="checkbox"]').not(this).prop('checked', false);
});
$(".plazos").on('change', function() {
    if (this.checked) {
        if ($(this).val() == 1) {
            buscarFacturaPorPlazo(1, 30);
        }
        if ($(this).val() == 2) {
            buscarFacturaPorPlazo(31, 60);
        }
        if ($(this).val() == 3) {
            buscarFacturaPorPlazo(61, 90);
        }
        if ($(this).val() == 4) {
            buscarFacturaPorPlazo(91, '+');
        }
    }
});
// Eventos - input numero de factura e input valor abono
var factura;
$("#inputNumeroFactura").on('input', function () {
    establecerSaldo();
});


function establecerSaldo(){
    // busca si el numero de factura ingresado ya existe y si existe guarda el
    // array de la factura en "factura"
    factura = buscarFactura($("#inputNumeroFactura").val())
    // si la factura existe
    if (factura.length > 0) {
        // muestra el saldo de la factura en el input Saldo Factura
        $("#inputSaldoFactura").val(formato(parseInt(factura[4])))
    } else {
        $("#inputSaldoFactura").val("")
    }
}
// Cuando se ingresa un valor en input valor abono resta el saldo de la factura con el
// valor de abono ingresado y lo muestra en input Nuevo Saldo
$("#inputValorAbono").on('input', function () {
    if (factura.length > 0) {
        // factura[4] tiene el saldo de la factura
        if(factura[4] - parseInt($("#inputValorAbono").val())>=0){
            $("#inputNuevoSaldo").val(formato(factura[4] - parseInt($("#inputValorAbono").val())))
        }else{
            $("#inputNuevoSaldo").val("")
        }
        
    }
});

// da formato a los valores ingresados
function formato(num) {
    var p = num.toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

function validar() {

    var numeroFactura = document.getElementById('inputNumeroFactura');
    var valorAbono = document.getElementById('inputValorAbono');

    var factura = buscarFactura($("#inputNumeroFactura").val())
    var valorNuevoSaldo = factura[4] - parseInt($("#inputValorAbono").val())

    if (numeroFactura.value == "") {
        MensajeError(numeroFactura, " Ingrese un valor")
        return false;
    }
    if (valorAbono.value == "") {
        MensajeError(valorAbono, " Ingrese un valor")
        return false;
    }

    // validacion numero factura
    if (factura.length > 0) {
        if(factura[2]=="Contado"){
            MensajeError(numeroFactura, "El sistema unicamente permite abonar a facturas con tipo de pago Crédito")
            return false;
        }
        MensajeExito(numeroFactura)

    } else {
        MensajeError(numeroFactura, "La factura no existe")
        return false;
    }

    // validacion valor abono

    var factura = buscarFactura($("#inputNumeroFactura").val())
    var valorNuevoSaldo = factura[4] - parseInt($("#inputValorAbono").val())
  
    // si la factura existe
    if (factura.length > 0) {


        if (parseInt(valorAbono.value) > 0 && valorNuevoSaldo >= 0 &&parseInt(valorAbono.value) <= parseInt(factura[4])) {  
            MensajeExito(valorAbono)
            return true;
        } else {

            if(parseInt(factura[4]) == 0){
                MensajeError(valorAbono, "El valor de la factura es 0, no se pueden realizar mas abonos.")
                return false;
            }
            if(parseInt(valorAbono.value) <= 0){
                MensajeError(valorAbono, "Valor invalido, El valor ingresado debe ser mayor a cero")
                return false;
            }else{
                MensajeError(valorAbono, "Valor invalido, El valor ingresado debe ser menor al saldo")
                return false;
            }
        }
    } else {
       return false;
    }

   
}

function MensajeError(input, message) {
    const formGroup = input.parentElement;
    const small = formGroup.querySelector('small');
    formGroup.className = 'form-group error col-md-6 error';
    small.innerText = message;
}

function MensajeExito(input) {
    const formGroup = input.parentElement;
    formGroup.className = 'form-group success col-md-6 ';
}

// Guarda los datos enviados del formulario al array abonosIngresados
$("#formulario").submit(function (event) {
    event.preventDefault();

    if (validar()) {
        abonosIngresados.push([
            $("#inputNumeroFactura").val(),
            removerFormato($("#inputSaldoFactura").val()),
            parseInt($("#inputValorAbono").val()),
            removerFormato($("#inputNuevoSaldo").val()),
            $("#textareaObservaciones").val()
        ]);

        var indice = obtenerIndiceFactura($("#inputNumeroFactura").val());
        datosFacturas[indice][4] = removerFormato($("#inputNuevoSaldo").val())
        
        establecerSaldo();

        $("#inputNuevoSaldo").val("")
        $("#inputValorAbono").val("")

        mostrarTAbonos();
    }

});

function removerFormato(numero){
    var valor = numero.slice(0, -3)
    valor = valor.split(',').join("");
    valor = valor.split('$').join("");
    return parseInt(valor);
}


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
        totalFactura = totalFactura + parseInt(element[2]);
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

        return fechaVencimiento;
    } else {
        console.log("la factura no tiene metodo de pago = Crédito")
        return null;
    }
}
// CalcularFechaVencimiento("293658")
// toma el numero de factura, obtiene la fecha 2018-12-04 le suma 90 del plazo y retorna '2019-03-03'
//-----------------------------------------------------------------------------------------------------------------------------
/**
 * limpiarTabla [Método para limpiar los registros de la tabla antes de refrescarla limpia también las consultas
 * para evitar consultas]
 * @param  {var} nombreTabla [Nombre de la tabla cuyos datos se van a borrar]
 */
function limpiarTabla(nombreTabla) {
    $("#" + nombreTabla + " tbody").empty();
    $('#divTablaConsulta').empty();
}
/**
 * mostrarTAbonos Añade las variables a mostrar en la tablaAbonos: Número de factura, # de Abonos, Total de Abonos, 
 * Fecha de Vencimiento, Saldo, Opción de consultar. Esta información será de las facturas con tipo
 * de pago "crédito", a las cuales ya se les hayan hecho abonos. Lo que hace es que toma información
 * de los métodos numeroAbonosYTotal() y CalcularFechaVencimiento() de las facturas y muestra la información en 
 * conjunto.
 **/
function mostrarTAbonos() {
    limpiarTabla("tablaFAbono");
    var idFact = "";
    var saldo = "";
    var fila = "";
    var botonConsulta = "<button class=\"consulta\"  > <img id=\"lupa\" src=\"./src/icons/zoom-in.svg\"> </button>";
    for (var i = 0; i < datosFacturas.length; i++) {
        if (datosFacturas[i][2] == "Crédito") {
            idFact = datosFacturas[i][0];
            if (buscarAbonos(idFact).length > 0) {
                saldo = buscarAbonos(idFact)[0][3];
                fila = "<tr><td>" + idFact + "</td><td>" + buscarAbonos(idFact).length + "</td><td>" + formato(totalAbonos(buscarAbonos(idFact))) + "</td><td>" + CalcularFechaVencimiento(idFact) + "</td><td>" + formato(parseInt(datosFacturas[i][4])) + "</td><td>" + botonConsulta + "</td></tr>";
              
                $('#tablaFAbono tbody').append(fila);
           
            }
        }
    }
}
/**
 * [Método para mostrar nueva tabla anidada con datos extendidos acerca de  
 * factura y sus abonos].
 * @param {var} [idFact] [Identificador de la factura a consultar]
 */
function consulta(idFact) {
 
    if ($('#divTablaConsulta').is(':empty')) {
        var elementos = "<hr style=\"color: #0056b2;\"/> <h2>Consulta</h2><p>Aquí se puede ver información general de la factura y sus abonos.</p>";
        var tableConsulta = "<table id=\"tablaConsulta\" class=\"table\"><thead class=\"thead-dark\"><tr><th scope=\"col\" class=\"numFact\">Numero de Factura</th><th scope=\"col\">Fecha de Factura</th><th scope=\"col\">Fecha Vencimiento</th><th scope=\"col\">Plazo</th><th scope=\"col\">Saldo</th><th scope=\"col\">Valor Total</th></tr></thead><tbody id=\"principal\"></tbody></table>";
        $('#divTablaConsulta').append(elementos);
        $('#divTablaConsulta').append(tableConsulta);
    }
    var infoFactura = "";
    var abonos = buscarAbonos(idFact);
    for (var i = 0; i < datosFacturas.length; i++) {
        if (datosFacturas[i][0] == idFact) {

            infoFactura = "<tr id=" + idFact + "><td>" + datosFacturas[i][0] + "</td><td>" + datosFacturas[i][1] + "</td><td>" + CalcularFechaVencimiento(idFact) + "</td><td>" + datosFacturas[i][3] + "</td><td>" + formato(parseInt(datosFacturas[i][4])) + "</td><td>" + formato(totalAbonos(buscarAbonos(idFact))) + "</td></tr>";
            
            break;
        }
    }
    //Mini tabla de abonos de factura
    var tablaAbonos = "<table id=\"tablaAbonos" + idFact + "\" class=\"table table-borderless\"><thead ><tr><th scope=\"col\" class=\"\"></th><th scope=\"col\" class=\"\">#</th><th scope=\"col\" class=\"\">Valor de Abono</th><th scope=\"col\" class=\"numFact\">Observaciones</th></tr></thead><tbody>";
    for (var j = 0; j < abonos.length; j++) {
        tablaAbonos += "<tr ><td><img src=\"./src/icons/arrow-return-right.svg\"></td><th scope=\"row\">" + (j + 1) + "</th><td>" + formato(abonos[j][2]) + "</td><td>" + abonos[j][4] + "</td></tr>";
    }
    tablaAbonos += "</tbody></table>";
    infoFactura += "<tr id=" + idFact + "><td colspan=\"6\">" + tablaAbonos + "</td></tr>";
    $('#tablaConsulta #principal').append(infoFactura);
}
/**
 * Trigger para el botón de consulta que extrae el id de la factura que 
 * se desea consultar.
 * @param  event click
 */
$(document).on('click', '.consulta', function (event) {
    event.preventDefault();
    //Toma la fila en la que se encuentra el botón
    var fila = $(this).closest('tr');
    //Busca la columna del id y lo guarda
    var idFact = fila.find('td:eq(0)').text();
    consulta(idFact);
    //Cambia el icono del botón
    $(this).find('img').attr("src", "./src/icons/zoom-out.svg");
    //Cambia el evento del botón
    $(this).attr("class", "ocultarConsulta");
});
/**
 * Trigger para ocultar la consulta.
 * @param  {[type]} event
 */
$(document).on('click', '.ocultarConsulta', function (event) {
    event.preventDefault();
    var fila = $(this).closest('tr');
    var idFact = fila.find('td:eq(0)').text();
    $(this).find('img').attr("src", "./src/icons/zoom-in.svg");
    $(this).attr("class", "consulta");
    $('#tablaConsulta #' + idFact + '').remove();
    //Si la tabla de consultas está vacía elimina esa parte de la página
    if ($('#tablaConsulta #principal').is(':empty')) {
        $('#divTablaConsulta').empty();
    }
});
/**
 * Método para mostrar los créditos con abonos que se encuentran en el sistema
 * al iniciar la página
 *  */
$(() => {
    'use strict';
    mostrarTAbonos();
});

