$(document).ready(function () {

    cargarDatos();
    editar();
    eliminar();
    agregar();

    $("#add_user").on("click", function () {
        $("#add_container").slideDown();
    });

    $(".add_buttons #cancelar").on("click", function () {
        $("#add_container").slideUp();
    });

    $(".edit_buttons #edit_cancelar").on("click", function () {
        $("#update_container").slideUp();
    });

    $("#salir").on("click", function (event) {
        event.preventDefault();
        $("#opcion").val("salir");
        var vacio = "",
            opcion = 'salir';
        $.ajax({
            method: "POST",
            url: "php/editar_perfil.php",
            data: {
                "opcion": opcion,
                "id_usuario": vacio,
                "nombre": vacio,
                "apellido": vacio,
                "rol": vacio,
                "correo": vacio,
                "contrasenia": vacio
            }
        }).done(function (info) {
            var json_info = JSON.parse(info);                        
        })
    });

});

var cargarDatos = function () {
    $("#update_container").slideUp();
    $("#add_container").slideUp();
    var table = $('#dt_usuarios').DataTable({
        "destroy": true,
        "ajax": {
            url: "php/listar_usuarios.php",
            dataSrc: 'data'
        },
        "columns": [
            { "data": "nombre" },
            { "data": "apellido" },
            { "data": "correo" },
            { "data": "rol" },
            { "defaultContent": "<button type='button' class='editar btn btn-sm btn-primary'><i class='fa fa-pencil-square-o'></i>Editar</button> <button type='button' class='eliminar btn btn-sm btn-danger' data-toggle='modal' data-target='#modalEliminar' ><i class='fa fa-trash-o'></i> Borrar</button>" }
        ],
        "language": espaniol
    });
    cargar_datos_editar("#dt_usuarios tbody", table);
    cargar_datos_eliminar("#dt_usuarios tbody", table);
};

var cargar_datos_editar = function (tbody, table) {
    $(tbody).on("click", "button.editar", function () {
        $("#update_container").slideDown();
        var data = table.row($(this).parents("tr")).data();
        var id_usuario = $("#actualizar #edit_id_usuario").val(data.id_usuario),
            nombre = $("#nombre").val(data.nombre),
            apellido = $("#apellido").val(data.apellido),
            correo = $("#correo").val(data.correo),
            rol = $("#rol").val(data.rol),
            opcion = $("#actualizar #edit_opcion").val("editar");
    });
};

var editar = function () {
    $("#actualizar").on("submit", function (event) {
        event.preventDefault();
        var opcion = $("#actualizar #edit_opcion").val(),
            nombre = $("#actualizar #nombre").val(),
            apellido = $("#actualizar #apellido").val(),
            rol = $("#actualizar #rol").val(),
            correo = $("#actualizar #correo").val(),
            id_usuario = $("#actualizar #edit_id_usuario").val(),
            vacio = "";
        $.ajax({
            method: "POST",
            url: "php/usuario_funciones.php",
            data: {
                "id_usuario": id_usuario,
                "nombre": nombre,
                "apellido": apellido,
                "rol": rol,
                "correo": correo,
                "contrasenia": vacio,
                "opcion": opcion
            }
        }).done(function (info) {
            var json_info = JSON.parse(info);
            mostrar_mensaje(json_info);
            limpiar_datos_editar();
            setTimeout(function () {
                location.reload();
            }, 500);
        });
    });
};

var mostrar_mensaje = function (informacion) {
    if (informacion.Resultado == "Exito") {
        $(".alert_mensaje_exito").fadeIn();
        $(".alert_mensaje_exito").fadeOut(4000);
    } else if (informacion.Resultado == "Borrado") {
        $(".alert_mensaje_delete").fadeIn();
        $(".alert_mensaje_delete").fadeOut(4000);
    } else if (informacion.Resultado == "Agregado") {
        $(".alert_mensaje_agregar").fadeIn();
        $(".alert_mensaje_agregar").fadeOut(4000);
    } else {
        $(".alert_mensaje_error").fadeIn();
        $(".alert_mensaje_error").fadeOut(4000);
    }
};

var limpiar_datos_editar = function () {
    $("#actualizar #edit_opcion").val("");
    $("#actualizar #edit_id_usuario").val("");
    $("#nombre").val("").focus();
    $("#apellido").val("");
    $("#rol").val("");
    $("#correo").val("");
};

var limpiar_datos_eliminar = function () {
    $("#eliminar_usuario #del_opcion").val("");
    $("#eliminar_usuario #del_id_usuario").val("");
};

var limpiar_datos_agregar = function () {
    $("#n_nombre").val("").focus();
    $("#n_apellido").val("");
    $("#n_rol").val("");
    $("#n_correo").val("");
    $("#n_contrasenia").val("");
    $("#n_contrasenia2").val("");
};

var cargar_datos_eliminar = function (tbody, table) {
    $(tbody).on("click", "button.eliminar", function () {
        var data = table.row($(this).parents("tr")).data();
        var id_usuario = $("#eliminar_usuario #del_id_usuario").val(data.id_usuario);
        $("#eliminar_usuario #del_opcion").val("eliminar");
    });
};

var eliminar = function () {
    $("#eliminar-usuario").on("click", function (event) {
        event.preventDefault();
        var id_usuario = $("#del_id_usuario").val(),
            opcion = $("#del_opcion").val(),
            vacio = "";
        $.ajax({
            method: "POST",
            url: "php/usuario_funciones.php",
            data: {
                "id_usuario": id_usuario,
                "nombre": vacio,
                "apellido": vacio,
                "rol": vacio,
                "correo": vacio,
                "contrasenia": vacio,
                "opcion": opcion
            }
        }).done(function (info) {
            var json_respuesta = JSON.parse(info);
            console.log(json_respuesta);
            mostrar_mensaje(json_respuesta);
            limpiar_datos_eliminar();
            setTimeout(function () {
                location.reload();
            }, 500);
        });
    });
};


var agregar = function () {
    $("#aceptar").on("click", function (event) {
        event.preventDefault();
        var n_opcion = $("#agregar #add_opcion").val(),
            n_nombre = $("#agregar #n_nombre").val(),
            n_apellido = $("#agregar #n_apellido").val(),
            n_rol = $("#agregar #n_rol").val(),
            n_correo = $("#agregar #n_correo").val(),
            n_contrasenia = $("#agregar #n_contrasenia").val(),
            id_usuario = $("#agregar #add_id").val();
        $.ajax({
            method: "POST",
            url: "php/usuario_funciones.php",
            data: {
                "id_usuario": id_usuario,
                "nombre": n_nombre,
                "apellido": n_apellido,
                "rol": n_rol,
                "correo": n_correo,
                "contrasenia": n_contrasenia,
                "opcion": n_opcion
            }
        }).done(function (info) {
            var json_response = JSON.parse(info);
            mostrar_mensaje(json_response);
            limpiar_datos_agregar();
            cargarDatos();
            location.reload();
        });
    });
};

var espaniol = {
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};
