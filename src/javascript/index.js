
$(function () {
  function listar() {
    $('tbody').empty();

    $.get("https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes", function (data) {
      console.log(data);
      data.forEach(element => {
        $('tbody').append($('<tr>')
          .append($('<td>').attr('data-id', element.id).text(element.nombre))
          .append($('<td>').attr('data-id', element.id).text(element.apellidos))
          .append($('<td>').attr('class', 'boton')
            .append($('<button>').attr('class', 'borrar').attr('data-id', element.id).text('Borrar'))
          ));
      });
    }).done(() => {
      $('#cargando').hide()
      $('td button').on('click', function (event) {
        event.stopPropagation();  // Evitar que el clic se propague a elementos padres
        borrarentrada($(this).attr('data-id'));  // Llamar a la función de borrar
      })
      mostrarDetalle();
      $('#detalle').hide();

    });
  }
  function listarPorID(id) {
    $.get(`https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes/${id}`, function (data) {
      $('#id').val(data.id);
      $('#nombre').val(data.nombre);
      $('#apellidos').val(data.apellidos);
      $('#edad').val(data.edad);
      $('#direccion').val(data.direccion);
      $('#profesion').val(data.profesion);
      $('#correo').val(data.correo);
    })
    $('#detalle').show()

  }
  function borrarentrada(id) {
    $('#detalle').hide();
    $.ajax({
      url: `https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes/${id}`,
      type: 'DELETE',
      success: function () { $('#resultado').text('Borrado con exito') },
      error: () => $('#resultado').text('Error de borrado'),

    })

    setTimeout(() => { 
      $('#resultado').text("")      
     }, 5000);



  }
  function vaciarCampos() {
    $('#id').val('0');
    $('#nombre').val('');
    $('#apellidos').val('');
    $('#edad').val('');
    $('#direccion').val('');
    $('#profesion').val('');
    $('#correo').val('');
  }
  function crear() {
    $('#botonCrear').on('click', () => {
      vaciarCampos();
      $('#detalle').show()
    })
  }
  function mostrarDetalle() {
    $('td').on('click', function (event) {
      listarPorID($(this).attr('data-id'))
    })
    $('td.boton').off('click')
  }
  function grabarDatos(datos) {

    $.ajax({
      url: 'https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes/',
      type: "POST",
      data: JSON.stringify(datos),
      contentType: "application/json"
    }).then(
      (response) => {
        $('#resultado').text('Guardado con exito')
        console.log(response)
      },
      (error) => {
        $('#resultado').text('Error de guardado')
        console.log(error.statusText)
      })
    setTimeout(() => { $('#resultado').text("") }, 5000);
  }
  function modificar(id, datos) {

    $.ajax({
      url: `https://my-json-server.typicode.com/josecalatayud/proyectoFormulario/solicitudes/${id}`,
      type: "PUT", // Método HTTP
      data: JSON.stringify(datos), // Envía el JSON plano
      contentType: "application/json" // Especifica que el contenido es JSON  
    }).then(
      (response) => {
        $('#resultado').text('Modificado con exito')
        console.log(response)
      },
      (error) => {
        $('#resultado').text('Error en la modificacion')
        console.log(error)
      })
    setTimeout(() => { $('#resultado').text("") }, 5000);
  }
  function guardar() {
    $('form').on('submit', (event) => {
      event.preventDefault()
      let id = $('#id').val();
      let nombre = $('#nombre').val()
      let apellidos = $('#apellidos').val();
      let edad = $('#edad').val();
      let direccion = $('#direccion').val();
      let profesion = $('#profesion').val();
      let correo = $('#correo').val();
      let datos = {
        "id": id,
        "nombre": nombre,
        "apellidos": apellidos,
        "edad": edad,
        "direccion": direccion,
        "profesion": profesion,
        "correo": correo
      }
      if (id <= 0) {
        grabarDatos(datos);
      } else {
        modificar(id, datos)
      }
    })
  }

  function refrescar() {
    $('#botonRefrescar').on('click', () => {
      listar()
      $('#detalle').hide();
      vaciarCampos();
    })
  }
  $('#detalle').hide();
  refrescar()
  crear();
  listar();
  guardar()







})