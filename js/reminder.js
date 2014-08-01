// JavaScript Document

<!-----------------------------------REMINDER PAGE------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pagebeforeshow', '#reminder_page', function(){
	 $("#recent_schedules_list").empty();
	 setFontSize();
});
$(document).on('pageshow', '#reminder_page', function(){ 
    
	 $.ajax({url: 'php/reminder.php',
                        data: {action : 'load_recent_schedules'},
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
							
                            var schedules='';
							
							
							for($i=0; $i < result.length; $i++)
							{
								$message = result[$i].message;
								$time = result[$i].time;
								
								schedules=schedules+'<li data-icon="false">'+ 
											'<h4>'+$message+'</h4>'+
											'<p>Ώρα:'+$time+'</p></li>';     
						
							}
							//alert('result');
							if($i == 0)
						        schedules=schedules+'<li data-icon="false">Δεν υπάρχουν υπενθυμίσεις για σήμερα</li>';
							 
							$("#recent_schedules_list").append(schedules);
							$('#recent_schedules_list').listview('refresh');	 
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
     });   
	 
});

function check_recent_schedule()
{
	
	$.ajax({url: 'php/reminder.php',
                        data: {action : 'check_recent_schedule'},
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
							
							if(result.status=='default')
							{
								$('.reminder_icon').attr('src', 'images/icons/reminder2_icon.png');
								
							}	
							else if(result.status=='notification')
							{
								$('.reminder_icon').attr('src', 'images/icons/reminder2_icon_notification.png');
							} 
							else if(result.status=='alarm')
							{
								
								//$message=result.message;
								
								$('.reminder_icon').attr('src', 'images/icons/reminder2_icon_notification.png');
								
								//$( "#call_market_popup" ).popup( "option", "transition", "slideup" );
								$.mobile.changePage("#reminder_page",{ transition: "slidedown", role: 'dialog'}); 
								
								delete_schedule(result.id);
								$('.reminder_icon').attr('src', 'images/icons/reminder2_icon.png');
								
							}
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                           // alert('Network error has occurred please try again!');
                        }
     });   
}
function delete_schedule(id)
{
	 $.ajax({url: 'php/reminder.php',
                        data: {action : 'delete_schedule', schedule_id : $id},
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
							
                             
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            //alert('Network error has occurred please try again!');
                        }
     });
	
}

