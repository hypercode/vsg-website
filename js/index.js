// JavaScript Document

<!-----------------------------------HTML DOCUMENT------------------------------------------------------->
<!-------------------------------------------------------------------------------------------------------> 
$(document).on('click', '.logout_button', function() {
	    
		  $.ajax({url: 'php/logout.php',
                        data:'logout',
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
					
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
							if(result.status)
							   $.mobile.changePage("#login_page");
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });      
	  
});
	   
$(document).ready(function(e) {
	   
	      var right_panel_content = $('<ul data-role="listview">'+
	                   '<li data-icon="gear"><a href="#profile_page">Ρυθμίσεις Προφίλ</a></li>'+
					   '<li data-icon="info"><a href="#about_page">Σχετικά με</a></li>'+
					   '<li data-icon="edit"><a href="#feedback_page">Αποστολή Σχολίων</a></li>'+
					   '<li data-icon="logout"><a href="#" class="logout_button">Αποσύνδεση</a></li>'+
					   '<li data-icon="false"><a href="#">Μέγεθος Γραμμάτων<input type="range" name="font_size_slider" id="font_size_slider" min="1" max="10" value="1" onchange="changeFontSize(this);"></a></li>'+
			           '</ul>');
		
		 var header_navigator_content = $('<a href="#home_page" id="home_button" data-transition="pop"><img src="images/icons/logo3_icon.png"></a>'+
		    '<a href="#reminder_page" id="reminder_button" data-rel="dialog" data-transition="slidedown"><img class="reminder_icon" src="images/icons/reminder2_icon.png"></a>'+
            '<a href="#panel" id="panel_button" onclick="hideToolTip();"><img src="images/icons/panel_icon.png"></a>');
		
		 $(".right_panel").append(right_panel_content);
		 $(".header_navigator").append(header_navigator_content).trigger('create');
		 
		 $("div[data-role='footer']").hide();
		 $("#map_page div[data-role='footer']").show();
		 
		// $("*").addClass('font-1');
		 
		 //$("#font_size_slider").val('3');
		 
	/*---------------------------------------------------------------------	 
	if (annyang) {
	  // Let's define a command.
	  var commands = {
		'open': function() { toast('open'); },
		'close': function() { toast('close'); }
	  };
	
	  // Add our commands to annyang
	  annyang.addCommands(commands);
	 //alert('before');
	  // Start listening.
	  annyang.start();
	 // alert('after');
	}
	----------------------------------------------------------------------*/
	check_recent_schedule();
    setInterval(check_recent_schedule,300000);
	
		 
});

function changeFontSize(e)
{
	$size = $(e).val();
	sessionStorage.fontSize = $size;
	setFontClass($size);
	//alert('change font size: '+$size);
	
}
function setFontSize()
{
	if(sessionStorage.fontSize!=null)
	     $size = sessionStorage.fontSize;
	else 
	     $size = 1;
	
	//$('#'+page_name).page();
	//alert("set font size - "+page_name+" - "+$size);
	$.mobile.activePage.find("#font_size_slider").val($size);
	$.mobile.activePage.find('#font_size_slider').slider('refresh');

	setFontClass($size);
	
	
}
function setFontClass(size)
{
	for($i=1;$i<=10;$i++)
	    $("*").removeClass('font-'+$i);
	
	$("*").addClass('font-'+size);
	
}

function validate_email(x)
{
var atpos=x.indexOf("@");
var dotpos=x.lastIndexOf(".");
if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
   return false;
else
  return true;
}
var toast=function(msg){
	$("<div class='ui-loader ui-overlay-shadow ui-body-a ui-corner-all'><h3>"+msg+"</h3></div>")
	.css({ display: "block", 
		opacity: 0.90, 
		position: "fixed",
		padding: "7px",
		"text-align": "center",
		width: "270px",
		left: ($(window).width() - 284)/2,
		top: $(window).height()/2 })
	.appendTo( $.mobile.pageContainer ).delay( 1500 )
	.fadeOut( 400, function(){
		$(this).remove();
	});
}


