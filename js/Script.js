// Vector de facturas
var facturas = [
    [ "345345", "2017-07-21", "Crédito", "30", "$234.454" ],
    [ "872034", "2020-06-25", "Contado", "", "$7.435.246" ],
    [ "293658", "2018-12-04", "Crédito", "90", "$932.937" ]
];


//Inicializando la tabla que que mostrara las facturas
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


    function validarFactura(){

        var selectFac = document.getElementById("Check");
        if(selectFac != null){
            var numFac= document.getElementById("inputFactura").value;
            const xhttp1= new XMLHttpRequest();
            xhttp1.open('GET','abonos.json',true);
            xhttp1.send();
            xhttp1.onreadystatechange=function(){
                if(this.readyState==4 && this.status==200){
                    let datosAbonos= JSON.parse(this.responseText);
                    console.log(datosAbonos);
                    var fac;
                    for(let item of datosAbonos){
                        if(parseInt(item.numFactura)==numFac){
                            fac=numFac;
                            console.log("encontro");
                            document.getElementById("inputSaldo").value=item.Saldo;
                            
                        }
                    }
                    console.log("Salio for");
                    if(fac==null){
                        document.getElementById("Check").checked = false;
                        alert('No existe la factura '+numFac+'!!');
                    }else{
                        alert("Factura encontrada!!");
                    }

                }

            };

        }            
    }