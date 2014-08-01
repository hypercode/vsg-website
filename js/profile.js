// JavaScript Document

<!-----------------------------------PROFILE PAGE-------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageinit', '#profile_page', function(){ 

    $("#profile_settings_location").on("change",function(){
			 
			   if($("#profile_settings_location").val() == "Αθήνα")
			        $("#region_fieldcontain").show();
			   else
				   $("#region_fieldcontain").hide();
   }); 
   
});
$(document).on('pagebeforeshow', '#profile_page', function(){  
       	
		setFontSize();
		$("#region_fieldcontain").hide();
		
		$.ajax({url: 'php/profile.php',
                        data: {action : 'load_profile_settings'},
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
								//alert('elderly:'+result.isElderly+' - disabled:'+result.isDisabled); 
								$('#profile_settings_name').val(result.name);
								$('#profile_settings_location').val(result.location).selectmenu('refresh');
								
								if(result.location == "Αθήνα")
								{
								    $("#region_fieldcontain").show();
									$('#profile_settings_region').val(result.region).selectmenu('refresh');
								}
								$('#elderly_checkbox').prop('checked',result.isElderly).checkboxradio('refresh');
								$('#disabled_checkbox').prop('checked',result.isDisabled).checkboxradio('refresh');
								
								//sessionStorage.location=result.location;
							                         
                            } else {
                                alert('Data not loaded'); 
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
         });     
		
		
		
		
		
        $(document).on('click', '#profile_settings_submit', function() { 
		  
            if($('#profile_settings_name').val().length > 0 && $('#profile_settings_location').val().length > 0){
                
                    $.ajax({url: 'php/profile.php',
                        data: {action : 'save_profile_settings',formData : $('#profile_settings_form').serialize()},
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
								toast('Τα στοιχεία σας αποθηκεύτηκαν επιτυχώς');  
								if(sessionStorage.newUser)
								   showHomeTooltip();                     
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                    });                   
            } else {
                toast('Παρακαλώ, συμπληρώστε το όνομα και την περιοχή');
            }           
            return false; // cancel original event to prevent form submitting
        });   
		
		
		
  });
  
  