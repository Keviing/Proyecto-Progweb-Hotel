function set(cliente){
    $("#txtNombre").val(cliente.nombre);
    $("#txtCedula").val(cliente.color1);
    $("#txtCiudad").val(cliente.color2);
    $("#txtEdad").val(cliente.diasFlorero);
}

function retrieve(){       

    let txtBuscar = $("#txtBuscar").val();
    if(txtBuscar=="") return;
    let id = parseInt(txtBuscar); //Transforma el txtBuscar en un número entero
    console.log(id);
    if(isNaN(id)){
        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/cliente/retrieve?nombre=" + txtBuscar, //Dirección para realizar la petición HTTP        
            contentType : "application/json",
            dataType : "json",
            success : function(response){
                console.log(response);    
                //El response contiene el objeto cliente consultado
                set(response);                            
		    },
		    error : function(err){
			    console.error(err);
		    },
            complete : function(xhr, textStatus){
                if(xhr.status == 404)
                {
                    alert(xhr.responseText);                    
                }
            }
        });
    }
    else{
        $.ajax({        
            type: "GET", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/cliente/retrieve/" + id, //Dirección para realizar la petición HTTP        
            contentType : "application/json",
            dataType : "json",
            success : function(response){
                console.log(response);    
                //El response contiene el objeto cliente consultado
                set(response);                            
		    },
		    error : function(err){
			    console.error(err);
		    },
            complete : function(xhr, textStatus){
                if(xhr.status == 404)
                {
                    alert(xhr.responseText);                    
                }
            }
        });
    }
}

function serializeForm(){
    let cliente = {
        "nombre" : $("#txtNombre").val(),
        "cedula" : $("#txtCedula").val(),
        "ciudad" : $("#txtCiudad").val(), 
        "edad" : $("#txtEdad").val(),
    };
    return cliente;
}

function save(){
    var cliente = serializeForm();
    console.log(cliente);
    var requestBody = JSON.stringify(cliente);
    console.log(requestBody);
    //Utilizar jQuery AJAX para enviar al Backend
   if(cliente.idCliente == 0){
        $.ajax({        
            type: "POST", //Verbo de HTTP a utilizar
            url: "http://localhost:8080/cliente/create", //Dirección para realizar la petición HTTP
            data: requestBody, //El contenido Body de la petición HTTP                
            contentType : "application/json",
            crossDomain: true,
            dataType: "json",
            success : function(response){
                console.log(response);
                
		    },
		    error : function(err){
			    console.error(err);
		    },
                 
        });
    }
   else{
    //Update
    let id = variedad.idVariedad;
    $.ajax({        
        type: "PUT", //Verbo de HTTP a utilizar
        url: "http://localhost:8080/variedad/update/" + id, //Dirección para realizar la petición HTTP
        data: requestBody, //El contenido Body de la petición HTTP                
        contentType : "application/json",
        crossDomain: true,
        dataType: "json",
        success : function(response){
            console.log(response);             
        },
        error : function(err){
            console.error(err);
        }            
    });
}
}

$(function() {    
    
    $('#frmCliente').on('submit', function() {
        var form = document.getElementById('frmCliente');
        var a = form.checkValidity();
        console.log(a);
        if(a){
            save();
        }
    });



    $("#btnBuscar").click(function(){        
        retrieve();
    });    
});