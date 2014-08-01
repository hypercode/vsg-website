// JavaScript Document

<!-----------------------------------FEEDBACK PAGE---------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageinit', '#feedback_page', function(){  
        
        $(document).on('click', '#feedback_submit', function() { 
		    
            if($('#subject').val().length > 0 && $('#comment').val().length > 0){
                
                    $.ajax({url: 'php/feedback.php',
                        data: {formData : $('#feedback_form').serialize()},
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
                            if(result.status){
								$('#subject').val('');
	                            $('#comment').val('');
                                toast('Παραλάβαμε επιτυχώς το σχόλιό σας.');
							}
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });                   
            } else {
                toast('Παρακαλώ, συμπληρώστε όλα τα πεδία');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});

$(document).on('pagebeforeshow', '#feedback_page', function(){
	   $('#subject').val('');
	   $('#comment').val('');
});