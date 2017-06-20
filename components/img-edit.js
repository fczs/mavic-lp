$(document).ready(function (){

    setTimeout(function(){
    $("div").mouseenter(function (){
	$(this).children(".images-edit").parent().addClass("hover-border");
    });
    $("div").mouseleave(function (){
	$(this).children(".images-edit").parent().removeClass("hover-border");
    });
    $("div.images-edit").click(function (ev){


        if(typeof($.fancybox) !== "undefined")
            $.fancybox.close();

	var name = $(this).attr("name");
	var folder = $(this).attr("folder");
	var w = $(this).attr("w");
	var h = $(this).attr("h");
	var desc = $(this).attr("desc");
	var orig = $(this).attr("save-orig");
	$("div#images-edit-footer-dialog input[name=name]").val(name);
	$("div#images-edit-footer-dialog input[name=folder]").val(folder);
	$("div#images-edit-footer-dialog input[name=w]").val(w);
	$("div#images-edit-footer-dialog input[name=h]").val(h);
	$("div#images-edit-footer-dialog input[name=desc]").val(desc);
	$("div#images-edit-footer-dialog input[name=save-orig]").val(orig);
	imgEditDisplayGallery();

	return false;
    });

    function imgEditDisplayGallery(){
	$("div#images-edit-footer-dialog").scrollTop(0);
	var name = $("div#images-edit-footer-dialog input[name=name]").val();
	var folder = $("div#images-edit-footer-dialog input[name=folder]").val();
	var desc = $("div#images-edit-footer-dialog input[name=desc]").val();
	$("div#images-edit-footer-dialog .ajax-content").load("?ajax&images-edit&name="+name+"&folder="+folder, function (){
	    // галарея загруженных
	    $("div#images-edit-footer-dialog .ajax-content images").click(function (){
		$("div#images-edit-footer-dialog input[name=images-edit-newval]").val($(this).attr("src"));
		$("div#images-edit-footer-dialog form").submit();
	    });
	});
	var w = parseInt($("div#images-edit-footer-dialog input[name=w]").val())+20;
	var winw = $(window).width() - 50;
	if(w < winw)
		w = Math.floor(winw/w)*w + 60;
	$("div#images-edit-footer-dialog").dialog({
	    width: w,
	    height: $(window).height()*0.95,
	    title: desc,
	    modal: true,
	    buttons: [
		 { text: "Загрузить", click: function() { imgUploadDialog(
			$("div#images-edit-footer-dialog input[name=w]").val(),
			$("div#images-edit-footer-dialog input[name=h]").val(),
			$("div#images-edit-footer-dialog input[name=folder]").val(),
			$("div#images-edit-footer-dialog input[name=save-orig]").val(),
			imgEditDisplayGallery
			);
		    } },
		 { text: "Убрать", click: function() {
		    $("div#images-edit-footer-dialog input[name=images-edit-newval]").val("");
		    $("div#images-edit-footer-dialog form").submit();
		 } },
		 { text: "Отмена", click: function() { $( this ).dialog( "close" ); } }
	     ]
	});
    };
    
}, 1000);
});
