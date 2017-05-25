//requer bootstrap-popup.min.js

//tempo em segundos
function exibeToast(titulo, mensagem, tempo){
    $.bs.popup.toast({
        title: titulo,
        info: mensagem
    }, function(dialogE) {
        var modalBody = dialogE.find('.modal-body');
        modalBody.append('<p class="countdown"></p>');
        var cd = modalBody.find('.countdown'),
            i = tempo;
        //cd.html('It would be disappeared in ' + i + 's by default.');
        setInterval(function() {
            i -= 1;
            //cd.html('It would be disappeared in ' + i + 's by default.');
        }, 1000);
    });
}

function exibeGrowl(titulo, mensagem){
    $.notify({
        title: '<strong>'+titulo+'</strong>',
        message: ''+mensagem+''
    },{
        //type: 'danger',
        animate: {
		    enter: 'animated fadeInRight',
		    exit: 'animated fadeOutRight'
	    },
        allow_dismiss: true,
	    showProgressbar: false,
        //delay: 0,
        offset: {
		    x: 0,
		    y: 0
	    }
    });
}