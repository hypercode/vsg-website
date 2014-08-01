// JavaScript Document

<!--------------------------------------------TAXI PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------>

function open_call_taxi_popup(tel)
{
	$("#call_taxi_popup").empty();
	$telephones = tel.split(",");
	
	tels = '<p>Καλέστε το ταξί<p>';
	for($i=0; $i < $telephones.length; $i++)
	{
		
		tels = tels + '<p class="taxi_tel"><a href="tel:'+$telephones[$i]+'" class="telephone" data-inline="true" data-mini="true">'+$telephones[$i]+'</a></p>';
	}
	$( "#call_taxi_popup" ).popup( "option", "transition", "pop" );
	$('#call_taxi_popup').append(tels).trigger('create');
	$('#call_taxi_popup').popup('open');
}

$(document).on('pagebeforeshow', '#taxi_page', function(){ 
    setFontSize();
   
	    var taxis;
	    $.ajax({url: 'php/taxi.php',
                        data:{action : 'get_city_taxis'},
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
							
							$("#taxis_list").empty();
							
							taxis='<li data-role="list-divider">Στην Πόλη Σας</li>';
							for($i=0; $i < result.length; $i++)
							{
								$id = result[$i].id;
								$owner = result[$i].owner;
								$location = result[$i].location;
								$tel = result[$i].tel;
								$url = result[$i].url;
								$email = result[$i].email;
								
									 
							taxis=taxis+'<li data-icon="false"><a href="#" onclick="open_call_taxi_popup(\''+$tel+'\');" data-rel="popup" data-transition="pop">'+ 
											'<h2>'+$owner+'</h2>'+
											'<p><strong>Πόλη </strong>'+$location+'</p>'+
											'<p><strong>Τηλέφωνο </strong>'+$tel+'</p>';
								             if($url!='')
											   taxsi = taxis + '<p><strong>Url </strong>'+$url+'</p>';
											 if($email!='')
											   taxis = taxis + '<p><strong>Email </strong>'+$email+'</p>';
							taxis=taxis+'</a></li>';
							
							
							
							}
							if($i==0)
							  taxis=taxis+'<li data-icon="false">Δεν υπάρχουν διαθέσιμα λευκά ταξί στην πόλη σας</li>'
							 
							$("#taxis_list").append(taxis).trigger('create');
							$('#taxis_list').listview('refresh');	
							get_greece_taxis();
							
							
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                 }); 
				 
function get_greece_taxis()
{
	              var taxis;
				  $.ajax({url: 'php/taxi.php',
                        data:{action : 'get_greece_taxis'},
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
							
							taxis='<li data-role="list-divider">Υπόλοιπη Ελλάδα</li>';
							for($i=0; $i < result.length; $i++)
							{
								$owner = result[$i].owner;
								$location = result[$i].location;
								$tel = result[$i].tel;
								$url = result[$i].url;
								$email = result[$i].email;
								
									 
				taxis=taxis+'<li data-icon="false"><a href="#" onclick="open_call_taxi_popup(\''+$tel+'\');" data-rel="popup" data-transition="pop">'+
											'<h2>'+$owner+'</h2>'+
											'<p><strong>Πόλη </strong>'+$location+'</p>'+
											'<p><strong>Τηλέφωνο </strong>'+$tel+'</p>';
								             if($url!='')
											   taxsi = taxis + '<p><strong>Url </strong>'+$url+'</p>';
											 if($email!='')
											   taxis = taxis + '<p><strong>Email </strong>'+$email+'</p>';
								taxis=taxis+'</a></li>';
								
								
							$telephones = $tel.split(",");
							
							}
							 $("#taxis_list").append(taxis).trigger('create');
							 $('#taxis_list').listview('refresh');	
							
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                 }); 
}



});