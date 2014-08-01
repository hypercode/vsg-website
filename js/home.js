// JavaScript Document

<!-----------------------------------HOME PAGE----------------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->

$(document).on('pagebeforeshow', '#home_page', function(){ 

     setFontSize();	
	 
	 
});
$(document).on('pageinit', '#home_page', function(){ 
  
   check_recent_schedule();
   setInterval(check_recent_schedule,300000);
   
   $(document).on('click','#panel_button', function(){ 
	       alert('panel');
           $.powerTip.hide();
   });
    
});
