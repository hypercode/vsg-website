// JavaScript Document

<!-----------------------------------WEATHER PAGE-------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageshow', '#weather_page', function(){ 
     
		$('#weather_widget').empty();
		
        $.ajax({url: 'php/weather.php',
                        data:{action:'get_weather_widget'},
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
							 //$('#weather_widget').trigger('create');
							if(result.status)
							{
								  var iframe=$('<iframe scrolling="no" frameborder="0" allowtransparency="true"      src="http://www.weather.gr/gr/gr/widgets/weather_w3.aspx?p='+result.city_id+'" style="width: 330px; height: 183px; margin-left:auto; margin-right:auto"></iframe><a target="blank" style="color: #999999; width: 300px; display: block; text-align: center; font: 10px/10px Arial,san-serif; text-decoration: none;" rel="external" href="http://www.weather.gr">πρόγνωση καιρού από το weather.gr</a>');
								 
								 $('#weather_widget').append(iframe);
							}
							
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });      
     
});

