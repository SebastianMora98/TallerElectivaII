//function traerDatos(){
const xhttp = new XMLHttpRequest();
xhttp.open('GET', 'facturas.json', true);
xhttp.send();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let datos = JSON.parse(this.responseText);
        let res = document.querySelector('#res');
        res.innerHTML = '';
        console.log(datos);
        for (let item of datos) {
            res.innerHTML += `
            <tr>
                <td scope="row">${item.numFactura}</td>
                <td>${item.fecha}</td>
                <td>${item.tipoPago}</td>
                <td>${item.plazo}</td>
                <td>$${item.valorTotal}</td>
            </tr>
            `
        }
    }
};
//}
function validarFactura() {
    var selectFac = document.getElementById("Check");
    if (selectFac != null) {
        var numFac = document.getElementById("inputFactura").value;
        const xhttp1 = new XMLHttpRequest();
        xhttp1.open('GET', 'abonos.json', true);
        xhttp1.send();
        xhttp1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let datosAbonos = JSON.parse(this.responseText);
                console.log(datosAbonos);
                var fac;
                for (let item of datosAbonos) {
                    if (parseInt(item.numFactura) == numFac) {
                        fac = numFac;
                        console.log("encontro");
                        document.getElementById("inputSaldo").value = item.Saldo;
                    }
                }
                console.log("Salio for");
                if (fac == null) {
                    document.getElementById("Check").checked = false;
                    alert('No existe la factura ' + numFac + '!!');
                } else {
                    alert("Factura encontrada!!");
                }
            }
        };
    }
}
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