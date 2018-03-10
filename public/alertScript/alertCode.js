window.alert = function(textMsg, messageType){
	swal({   title: "Boco Says",   
    text: textMsg,   
    type: messageType,   
    showCancelButton: false,   
    confirmButtonColor: "#DD6B55",   
    confirmButtonText: "Ok",   
    closeOnConfirm: true}, 
    function(isConfirm){    }
)};