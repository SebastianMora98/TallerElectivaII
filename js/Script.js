
//function traerDatos(){
const xhttp= new XMLHttpRequest();
xhttp.open('GET','facturas.json',true);
xhttp.send();
xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        let datos= JSON.parse(this.responseText);
        let res= document.querySelector('#res');
        res.innerHTML='';
        console.log(datos);
        for(let item of datos){
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