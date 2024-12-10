$(function () {

    function listar() {
        $.get(" https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes", function (data){
          console.log(data);  
        })

    }


listar();


})