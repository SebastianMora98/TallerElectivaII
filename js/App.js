var getSumar = function () {
	var num1= parseInt(document.getElementById("num1").value);
	var num2= parseInt(document.getElementById("num2").value);
	var suma=(num1+num2);
	//var text=document.createElement("input").value=suma;
	//Sumar.appendChild(text);
	document.getElementById("resSuma").value=suma;


	alert(suma);
	location.href="#Sumar";
}
var getRestar = function () {
	var num1= parseInt(document.getElementById("num1r").value);
	var num2= parseInt(document.getElementById("num2r").value);
	if(num2>=num1){
		var resta=(num1-num2);
		document.getElementById("resRestar").value=resta;
		location.href="#Restar";
	}
	else{
		alert("El numero 1 es menor al numero 2.");
		location.href="#Restar";
	}
	
}
var getMult = function () {
	var num1= parseInt(document.getElementById("num1m").value);
	var num2= parseInt(document.getElementById("num2m").value);
	var mult=(num1*num2);
	document.getElementById("resMult").value=mult;
	location.href="#Multiplicar";
}
var getDiv = function () {
	var num1= parseInt(document.getElementById("num1d").value);
	var num2= parseInt(document.getElementById("num2d").value);
	if(num2>=num1){
		var resta=(num1/num2);
		document.getElementById("resDiv").value=resta;
		location.href="#Dividir";
	}
	else{
		alert("El numero 1 es menor al numero 2.");
		location.href="#Dividir";
	}
}
var getPotencia = function () {
	var num1= parseInt(document.getElementById("num1p").value);
	var num2= parseInt(document.getElementById("num2p").value);
	var pot= Math.pow(num1,num2);
	document.getElementById("resPot").value=pot;
	location.href="#Potencia";
}
var getMCD = function () {
	var num1= parseInt(document.getElementById("num1c").value);
	var num2= parseInt(document.getElementById("num2c").value);
	while(num1!=num2){
		if(num1>num2)
                num1= num1-num2;
            else
                num2= num2 -num1;
	}
	var mcd=(num1);
	document.getElementById("resMCD").value=num1;
	//alert(num1);
	location.href="#MCD";
}
var getAmigos = function () {
	var num1= parseInt(document.getElementById("num1a").value);
	var num2= parseInt(document.getElementById("num2a").value);
	var suma=0;
	for(i=1;i<num1;i++){  // for para sumar todos los divisores propios de n1
             if(num1%i==0){
                suma=suma+i;
             }
        }
        // si la suma de los divisores de n1 es igual a n2
        if(suma==num2){
           suma=0;
           for(i=1;i<num2;i++){  // sumo los divisores propios de n2
                if(num2%i==0){
                   suma=suma+i;
               }
           }
        // si la suma de los divisores de n2 es igual a n1
           if(suma==num1){
              alert("Son amigos");
              document.getElementById("resAmigos").value="Son Amigos";
              location.href="#Amigos";
           }else{
                   alert("No son amigos");
                   document.getElementById("resAmigos").value="No son Amigos";
                   location.href="#Amigos";
           }
        }        
        else{
               alert("No son amigos");
               document.getElementById("resAmigos").value="No son Amigos";
               location.href="#Amigos";
        }
}

var getPrimos = function (){
	
		var num1= parseInt(document.getElementById("num1pr").value);
		var num2= parseInt(document.getElementById("num2pr").value);
		var primos= [];
		var sumPrimos=0;
		if(num2>num1){		
			for (var i = num1; i <= num2; i++) {
				if (esPrimo(i)) {
					primos.push(i);
					sumPrimos=sumPrimos+i;
				}
			}
		}
		else{
			for (var i = num2; i <= num1; i++) {
				if (esPrimo(i)) {
					primos.push(i);
					sumPrimos=sumPrimos+i;
				}
			}
		}
	if (document.getElementById("tabla")==null) {
		pintarTabla(primos);
		document.getElementById("resPrimo").value="Cantidad: "+primos.length+"; Suma = "+sumPrimos+".";
		location.href="#Primos";
	}
	else{
		alert("esta definida");
		var tabla=document.getElementById("tabla");
		var result = document.getElementById("resultado");
    	var ah = result.removeChild(tabla);	
    	pintarTabla(primos);
    	document.getElementById("resPrimo").value="Cantidad: "+primos.length+"; Suma = "+sumPrimos+".";
    	location.href="#Primos";
	
	}
	
}
function esPrimo(numero){
 	contador = 0;
 	for(i = 1; i <= numero; i++)
        {
            if((numero % i) == 0)
            {
                contador=contador+1;
            }
        }
        if(contador <= 2)
        {
            return true;
        }else{
            return false;
        }
}
function pintarTabla(primos){
	var body = document.getElementsByTagName("body")[0];
	// Creamos un elemento <table> y un elemento <tbody>
	var tabla = document.createElement("table");
	var tblBody = document.createElement("tbody");
	// Creamos las celdas

	var fila = document.createElement("tr");
	var textoCelda = document.createTextNode("Num. Primos");
    fila.appendChild(textoCelda);
    tblBody.appendChild(fila);

	for (var i = 0; i < primos.length; i++) {
	  // Creamos las hileras de la tabla
	  	var fila = document.createElement("tr");
	    var textoCelda = document.createTextNode(primos[i]);
	    fila.appendChild(textoCelda);
	    tblBody.appendChild(fila);
	  }
	tabla.appendChild(tblBody);
	// appends <table> into <body>
	body.appendChild(tabla);
	// modifica el atributo "border" de la tabla y lo fija a "2";
	tabla.setAttribute("border", 2);
	tabla.setAttribute("id", "tabla");
	var result = document.getElementById("resultado");
	result.appendChild(tabla);
	document.getElementById("tabla").className = "table table-striped";
}

var getDias = function (){

	var fecha1= document.getElementById("date1").value;
	var fecha2= document.getElementById("date2").value;		
	var aFecha1 = fecha1.split('-');
	var aFecha2 = fecha2.split('-');
	var fFecha1 = Date.UTC(aFecha1[0],aFecha1[1]-1,aFecha1[2]);
	var fFecha2 = Date.UTC(aFecha2[0],aFecha2[1]-1,aFecha2[2]);
	var dif = fFecha2 - fFecha1;
	var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
	console.log(fecha2);
	console.log(dias);

	document.getElementById("resDias").value="Transcurren "+dias+" dias.";
    	
	location.href="#Transcurridos";
}

var getEdad = function (){
	var fecha= document.getElementById("birt").value;
	var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log(edad);
    document.getElementById("resEdad").value="Tiene"+edad+" años.";
    	
	location.href="#Edad";
}

var getPropios = function (){
	var nombre = document.getElementById("nombre").value;
	
	var str = nombre.split(' ');
	var res = "";
	for (var i = 0; i < str.length; i++) {
		console.log(str[i]);
		res= res+" "+MaysPrimera(str[i]);
	}
    console.log(res);
    document.getElementById("resNombre").value=res;
    	
	location.href="#Nombre";
}

function MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var getPalindromo = function(){
	// Frase insertada porel usuario
    var fraseUser = document.getElementById("palabra").value;
    // Funcion de comparación
    
    // Llamo a la función comparación con el parámetro del user
    
    resultado = frasePalindromo(fraseUser);
    document.getElementById("resPalindromo").value="Tu frase "+resultado;
    location.href="#Palindromo";
}
function frasePalindromo(fraseUser){
    // Paso la fraseUser a minusculas y quito espacios
    var fraseUser1=fraseUser.toLowerCase().replace(/\s/g,"");
    /* Creo otra frase partiendo de la de userFrase pero
    la convierto en array, le doy la vuelta al array, lo paso a string*/
    fraserReverse=fraseUser1.split("").reverse().toString();
    // Le quito las "," con un remplace dentro del for
    // Lo igualo a -1 ya que tiene una coma menos que el número total de letras
    for (var i = 0; i < ((fraserReverse.length)-1); i++) {
    	fraserReverse=fraserReverse.replace(",","");
    };
    	  	// Comparo las dos frases.
      	if(fraseUser1==fraserReverse){
        	// Si el resultado es positivo
        	resultado="es un Palindromo";
      	}
      	else{
        	// Si el resultado es negativo
        	resultado="no es un Palindromo";
      	}
   	// Muestro el el resultado
    return resultado;
}