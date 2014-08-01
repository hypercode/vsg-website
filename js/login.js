// JavaScript Document

<!-----------------------------------LOGIN PAGE---------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageinit', '#login_page', function(){  
        
        $(document).on('click', '#login_submit', function() { 
		    
            if($('#login_email').val().length > 0 && $('#login_password').val().length > 0){
                
                    $.ajax({url: 'php/login.php',
                        data: {formData : $('#login_form').serialize()},
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
								sessionStorage.userLocation=result.location;
                                $.mobile.changePage("#home_page");                         
                            } else {
                                toast('Σύνδεση Ανεπιτυχής. Ελέξτε τα στοιχεία σας'); 
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
