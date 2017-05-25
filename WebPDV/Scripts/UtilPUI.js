//leva em consideração que existe JQuery e JqueryUI

function UtilJSPUI() {
    this.executaAcao = function (pagina, dados, metodo, funcao, fecha_dialogo, toast) {
        if (metodo == "GET") {
            pagina = pagina + "?r=" + (Math.random());
            for (var x in dados) {
                pagina += "&" + x + "=" + dados[x];
            }
            $.get(pagina, function (data) {
                exibeGrowl('Mensagem', data);
            });
        } else {
            $.post(pagina, dados, function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                //$("#divhistpag").html(result);

                if (funcao != null) {
                    eval(funcao);
                }

                if (typeof fecha_dialogo !== "undefined") {
                    if (fecha_dialogo)
                        alert('fecha dialogo')
                } else {
                    //utilJS.fechaModal(null);
                }

                if (toast) {
                    //exibeToast('Mensagem', data, 3);
                    alert('exibe toast');
                }
                else {
                    //exibeGrowl('Mensagem', data);
                    //(new UtilJSPUI()).alerta(data);
                    utilJSPUI.alerta(data);
                }
            });
        }
    };

    this.confirma = function (mensagem, funcao) {
        var d = "<div title='Confirmação'>" + mensagem + "</div>";
        $(d).dialog({
            autoOpen: true,
            resizable: false,
            draggable: false,
            height: "auto",
            width: "auto",
            modal: true,
            buttons: {
                "Sim": function () {
                    eval(funcao);
                    $(this).dialog("close");
                },
                "Não": function () {
                    $(this).dialog("close");
                }
            },
            close: function () {
                return false;
            }
        });
    };

    this.alerta = function (mensagem) {
        var d = "<div title='Mensagem' style='padding: 50px;'>" + mensagem + "</div>";
        $(d).dialog({
            autoOpen: true,
            resizable: false,
            draggable: false,
            height: "auto",
            width: "auto",//"80%",
            modal: true,
            buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                }
            },
            close: function () {
                return false;
            }
        });
    };

    this.abreDialogo = function (divConteudo, titulo, pagina, dados) {
        //$("#" + divConteudo).attr('title', titulo);
        $('#' + divConteudo).html('');
        $('#' + divConteudo).load(pagina,
        dados,
        function (response, status, xhr) {
            var dialogo = $("#" + divConteudo).dialog({
                title: ""+titulo,
                autoOpen: false,
                resizable: false,
                draggable: false,
                height: "auto",
                width: "auto",
                modal: true,
                buttons: {
                    "Fechar": function () {
                        $(this).dialog("close");
                    }
                }
            });
            dialogo.dialog("open");
        });
        return false;
    };

    this.fechaDialogo = function (divConteudo) {
        $("#" + divConteudo).dialog('close');
    }

    this.carregaDivPagina = function (div, pagina, dados) {
        $('#' + div).load(pagina,
            dados,
            function (response, status, xhr) {
                if (status == "error") {
                    var msg = "Aconteceu um erro\n\n";
                    utilJSPUI.alerta("ERRO " + msg + " " + xhr.status + " " + xhr.statusText);
                }
            }
            );
        return false;
    }
}

//crio um objeto util pois há a possibilidade de utilizar em várias se não todas as páginas
var utilJSPUI = new UtilJSPUI();