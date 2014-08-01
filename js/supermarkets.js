// JavaScript Document

<!------------------------------------SUPERMARKETS PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
function open_call_market_popup(tel)
{
	$("#call_market_popup").empty();
	$telephones = tel.split(",");
	
	tels = '<p>Κάντε τηλεφωνική παραγγελία<p>';
	for($i=0; $i < $telephones.length; $i++)
	{
		
		tels = tels + '<p class="taxi_tel"><a href="tel:'+$telephones[$i]+'" class="telephone" data-inline="true" data-mini="true">'+$telephones[$i]+'</a></p>';
	}
	$( "#call_market_popup" ).popup( "option", "transition", "slideup" );
	$('#call_market_popup').append(tels).trigger('create');
	$('#call_market_popup').popup('open');
}

$(document).on('pagebeforeshow', '#supermarkets_page', function(){ 
     
	   setFontSize();
	   
	    $.ajax({url: 'php/supermarkets.php',
                        data:{},
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            $.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                        },
                        success: function (result) {
							var markets='';
							$("#supermarkets_list").empty();
							
							for($i=0; $i < result.length; $i++)
							{
								$name = result[$i].name;
								$address = result[$i].address;
								$tel = result[$i].tel;
								$icon_name='';
								
									if($name=='ΑΒ ΒΑΣΙΛΟΠΟΥΛΟΣ')
									   $icon_name='vasilopoulos';
									
									else if($name=='ΒΕΡΟΠΟΥΛΟΣ')
									   $icon_name='veropoulos';
									
									else if($name=='ΜΑΣΟΥΤΗΣ')
									   $icon_name='masoutis';
									
									
								
								//$telephones = $tel.split(",");
								
								markets=markets+'<li data-icon="false"><a href="#" onclick="open_call_market_popup(\''+$tel+'\');" data-rel="popup" data-transition="pop">'+ 
											'<h2>'+$name+'</h2><img style="margin-top:0px" src="images/icons/'+$icon_name+'.png"/>'+
											/*'<p><strong>Πόλη </strong>'+$location+'</p>'+*/
											'<p><strong>Διεύθυνση </strong>'+$address+'</p>'+
											'<p><strong>Τηλέφωνο </strong>'+$tel+'</p></a></li>';     
						
							}
							if($i == 0)
						        markets=markets+'<li data-icon="false">Δεν υπάρχουν διαθέσιμα σουπερμαρκετ στην πόλη σας, που παρέχουν την υπηρεσία διανομής στο σπίτι.</li>'
							 
							$("#supermarkets_list").append(markets).trigger('create');
							$('#supermarkets_list').listview('refresh');	
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                 });      
});