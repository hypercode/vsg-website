// JavaScript Document

<!-----------------------------------SCHEDULE PAGE------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pagebeforeshow', '#schedule_page', function(){ 
     
	$("#dtBox").DateTimePicker();
	
	$("#daily").click(function(e) {	
        $("#schedule_date").textinput('disable');
    });
	
	$("#once").click(function(e) {	
        $("#schedule_date").textinput('enable');;
    });
	
	$("a.confirm_delete_schedule").on("click",function(){
		 
		  $id = sessionStorage.scheduleID;
		  $.ajax({url: 'php/schedule.php',
                        data: {action : 'delete_schedule',id : $id},
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
                            if(result.status) {
								 $("li#"+$id).remove();                        
                            } 
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });        
		  
		});
	
	$.ajax({url: 'php/schedule.php',
                        data: {action : 'load_schedules'},
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
							var list;
							$("#schedules_list").empty();
                            for($i=0; $i < result.length; $i++)
							{
								$id = result[$i].id;
								$message = result[$i].message;
								$date = result[$i].date;
								$time = result[$i].time;
								if($date == '0000-00-00')
								    $date = 'Κάθε Μέρα'
								else
								    $date = 'Ημερομηνία: '+$date;
								list=$('<li id="'+$id+'"><a href="#">'+
										'<h5>'+$message+'</h5>'+
										'<p>Ώρα: '+$time+'</p><p>'+$date+'</p></a>'+
										'<a href="#delete_confirmation" onclick="sessionStorage.scheduleID='+$id+'" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album</a></li>');
										
							  $("#schedules_list").append(list).trigger('create');
							  $('#schedules_list').listview('refresh');		
								
							}
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });     
	
	$(document).on('click', '#schedule_submit', function() { 
		  
            if($('#schedule_message').val().length > 0 && $('#schedule_time').val().length > 0){
                
                    $.ajax({url: 'php/schedule.php',
                        data: {action : 'save_schedule',formData : $('#schedule_form').serialize()},
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
                            if(result.status) {
								toast('H υπενθύμιση αποθηκεύτηκε επιτυχώς');
								//$.mobile.loadPage(); 
                                //$.mobile.changePage("#profile_page");       
							                  
                            } 
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });                   
            } else {
                toast('Παρακαλώ, συμπληρώστε το μήνυμα υπενθύμισης και την ώρα υπενθύμισης');
            }           
            return false; // cancel original event to prevent form submitting
        });    
	 
 });


