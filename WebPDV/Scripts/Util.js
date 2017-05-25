//leva em consideração que existe JQuery e Dialogs

function Util() {
    this.exibeAlerta = function (mess) {
        exibeToast("Mensagem", mess, 2);
    };

    /*this.executaAcao = function (pagina, dados, metodo, funcao) {
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
                    exibeGrowl('Mensagem', data);
                    utilJS.fechaModal(null);
                    if (funcao != null) {
                        eval(funcao);
                    }
            });
        }
    }*/
	
	this.executaAcao = function (pagina, dados, metodo, funcao, fecha_modal, toast) {
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

                if (typeof fecha_modal !== "undefined") {
                    if (fecha_modal)
                        utilJS.fechaModal(null);
                } else {
                    utilJS.fechaModal(null);
                }

                if (toast) {
                    exibeToast('Mensagem', data, 3);
                }
                else {
                    exibeGrowl('Mensagem', data);
                }
            });
		}
	}

    this.carregaDivPagina = function (div, pagina, dados) {
        $('#' + div).load(pagina,
            dados,
            function (response, status, xhr) {
                if (status == "error") {
                    var msg = "Aconteceu um erro\n\n";
                    //alert(msg + xhr.status + " " + xhr.statusText)
                    exibeToast("ERRO", msg + xhr.status + " " + xhr.statusText, 2);
                }
            }
            );
        return false;
    }

    this.abreModal = function (divDialogo, divConteudo, campoTitulo, titulo, pagina, dados) {
        $('#' + divConteudo).html('');
        $('#' + divConteudo).load(pagina,
            dados,
            function (response, status, xhr) {
                $('#' + campoTitulo).html(titulo);
                $('#' + divDialogo).modal({ backdrop: 'static', keyboard: false }).modal("show");
                //$('#'+divDialogo).modal("show");
            });
        return false;
    }

    this.fechaModal = function (divDialogo) {
        //alert($('.modal'));
        if(divDialogo!=null)
            $('#' + divDialogo).modal("hide");
        else
            $('.modal').modal("hide");
    }
}

//crio um objeto util pois há a possibilidade de utilizar em várias se não todas as páginas
var utilJS = new Util();

/*
classe para filtro
não é criado um objeto pois só se utiliza em determinadas páginas
_form = form que contém dados do filtro
    ex: '#form1'
_divResultado = div onde será apresentada a página com resultados após o load:
    ex: 'div1' 
_controle = é o controller (ação) a ser executada pelo método de filtro
    ex: '/?controle=WebSISADIN.controle.controles.gerencial.ControleEmpresa'
*/
function Filtro(_form, _divResultado, _controle) {
    this.f = _form;
    this.dR = _divResultado;
    this.c = _controle;

    //método para executar um filtro
    this.filtrar = function () {
        var formData = $(this.f).serialize();
        utilJS.carregaDivPagina(this.dR, this.c, formData);
    }

    //método para executar o filtro com um enter -- usado em input text
    this.enter = function (evt) {
        var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
        if (keyCode == 13) {
            this.filtrar();
            return false;
        }
    }

    //método para limpar os dados do filtro e retornar todos os dados possíveis
    this.todos = function () {
        $(this.f).each(function () {
            this.reset();
        });
        this.filtrar();
    }
}