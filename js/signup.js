// JavaScript Document

<!-----------------------------------SIGNUP PAGE--------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageinit', '#signup_page', function(){  
        
        $(document).on('click', '#signup_submit', function() { 
		  
		  if($('#signup_email').val().length>0 && 
		     $('#signup_password').val().length>0 && $('#confirm_signup_password').val().length>0)
		  {
			 $email = $('#signup_email').val();
            if(validate_email($email)) {
				
				if($('#signup_password').val() == $('#confirm_signup_password').val()){
                
                    $.ajax({url: 'php/signup.php',
                        data: {formData : $('#signup_form').serialize()},
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
								initTooltips();
								sessionStorage.newUser=true;  
								$.mobile.changePage("#profile_page");                      
                            } else {
                               toast('Εγγραφής Ανεπιτυχής. Προσπαθήστε ξανά.');
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    }); 
				}
				else{
				    toast('Το συνθηματικό και η επιβεβαίωσή του δεν είναι ίδια');
				}
            } else {
                toast('Το email δεν είναι σε έγκυρη μορφή');
            } 
		  }
		  else{
			      toast('Παρακαλώ, συμπληρώστε όλα τα πεδία');
		  }
            return false; // cancel original event to prevent form submitting
        });    
});

