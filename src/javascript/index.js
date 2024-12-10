$(function () {

    function listar() {
        $.get("https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes", function (data){
          console.log(data); 
          data.forEach(element => {
            $('tbody').append($('<tr>').append($('<td>').attr('data-id', element.id).text(element.nombre)).append($('<td>').attr('data-id', element.id).text(element.apellidos)))
          }); 
        })

    }
    function listarPorID(id) {
        $.get(`https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes/${id}`, function (data){
          $('#nombre').val(data.nombre);
          $('#apellidos').val(data.apellidos);
          $('#edad').val(data.edad);
          $('#direccion').val(data.direccion);
          $('#profesion').val(data.profesion);
          $('#correo').val(data.correo);

          
        })

    }
    function mostrarDetalle() {
      $('td').on('click', function(event) {        
          listarPorID($(this).attr('data-id'))
          
      })

    }
    
    
    
    listar();
    setTimeout(mostrarDetalle,2000)
    
    
    


})