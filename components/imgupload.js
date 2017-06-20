function imgUploadDialog(w, h, folder, saveOrig, callback){

    $("div#images-upload-footer-dialog .note, div#images-upload-footer-dialog .jcrop-holder").remove();
    $("div#images-upload-footer-dialog input[name=h]").val(h);
    $("div#images-upload-footer-dialog input[name=w]").val(w);
    $("div#images-upload-footer-dialog input[name=folder]").val(folder);
    $("div#images-upload-footer-dialog input[name=save-orig]").val(saveOrig);
    $("div#images-upload-footer-dialog").dialog(
	{modal: true, title: 'Загрузить картинку', width: 400,
    	    buttons: [
	    { text: "Сохранить", click: function() {
		if($("form[name=imguploadform] input[name=cx]").val() == ""){
		    $("div#images-upload-footer-dialog .note").css({'color':'#ff0000', 'font-size': '20px'});
		}
		else {
		    $("form[name=imguploadform] input[name=imgupload-save]").val(1); $("form[name=imguploadform]").submit();
		    $(this).dialog("close");
		}
	    } },
	    { text: "Отмена", click: function() { $( this ).dialog( "close" ); } }
	    ]
	}
    );

    imgUploadInitForm();

    function imgUploadInitForm(){
	$("div#images-upload-footer-dialog input[name=imgupload]").change(function (){
	    $("div#images-upload-footer-dialog input[name=imgupload]")
							.css("display", "none")
							.after('<images src="/images/ajax-loader-2.gif" />');
	    $("form[name=imguploadform]").submit();
	});
	$("form[name=imguploadform] input[name=imgupload-save]").val(0);
	$("form[name=imguploadform]").ajaxForm(imgUploadAjaxForm);

    }
    function imgUploadAjaxForm(d){
	if($("div#images-upload-footer-dialog input[name=imgupload-save]").val() == 1)
	    callback();

	$("div#images-upload-footer-dialog .ajax-content").html(d);
	imgUploadInitForm();

	if( ($("div#images-upload-footer-dialog input[name=w]").val() == 0) && ($("div#images-upload-footer-dialog input[name=h]").val() == 0) ){
	    $("div#images-upload-footer-dialog input[name=cx]").val(0);
	    $("div#images-upload-footer-dialog input[name=cy]").val(0);
	    $("div#images-upload-footer-dialog input[name=cw]").val($("div#images-upload-footer-dialog input[name=w]").val());
	    $("div#images-upload-footer-dialog input[name=ch]").val($("div#images-upload-footer-dialog input[name=h]").val());
	    return;
	}

	var ratio = -1;
	if( ($("div#images-upload-footer-dialog input[name=w]").val() > 0) && ($("div#images-upload-footer-dialog input[name=h]").val() > 0) ){
	    ratio = $("div#images-upload-footer-dialog input[name=w]").val()/$("div#images-upload-footer-dialog input[name=h]").val();
	}
		var ih = parseInt($("div#images-upload-footer-dialog .srcimg").attr("height")),
		iw = parseInt($("div#images-upload-footer-dialog .srcimg").attr("width"));
		var dh =  ih + 200, dw = iw + 60;
		if(dw < 350)
		    dw = 350;

		if(ih == 0)
			dh = 'auto';

		$("div#images-upload-footer-dialog").dialog("option", {height: dh, width: dw} );

		if(ratio >=0){
		    $("div#images-upload-footer-dialog .srcimg").Jcrop({
			aspectRatio: ratio,
			onChange: imgEditUpdateCoords,
			onSelect: imgEditUpdateCoords
		    });
		}
		else {
		    $("div#images-upload-footer-dialog .srcimg").Jcrop({
			onChange: imgEditUpdateCoords,
			onSelect: imgEditUpdateCoords
		    });
		}


	}
	function imgEditUpdateCoords(c){
	    $("div#images-upload-footer-dialog input[name=cx]").val(c.x);
	    $("div#images-upload-footer-dialog input[name=cy]").val(c.y);
	    $("div#images-upload-footer-dialog input[name=cw]").val(c.w);
	    $("div#images-upload-footer-dialog input[name=ch]").val(c.h);
	};
}
