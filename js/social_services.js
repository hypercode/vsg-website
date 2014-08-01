// JavaScript Document

<!-----------------------------SOCIAL SERVICES LIST PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageshow', '#social_services_list_page', function(){ 
    setFontSize();
    $("#service_data_display").empty();
   
});


$(document).on('pageinit', '#social_services_list_page', function(){ 
     
	  
	   //alert(sessionStorage.fontSize);
       $.ajax({url: 'php/social_services.php',
                        data:{action:'get_social_services_list'},
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
							var list;
							$("#social_services_list").empty();
							//$("#social_services_list").append('<li data-role="list-divider">Κοινωνικές Υπηρεσίες</li>').trigger('create');;
							for($i=0; $i < result.length; $i++)
							{
								$id = result[$i].id;
								$title = result[$i].title;
								
								list=$('<li><a id="'+$id+'" href="#social_service_page" data-transition="slide" onclick="sessionStorage.serviceID='+$id+'">'+$title+'</a></li>');
										
										
							  $("#social_services_list").append(list).trigger('create');
							  $('#social_services_list').listview('refresh');	
							}
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                 });      
   
}); 

<!-----------------------------------SOCIAL SERVICE PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageinit', '#social_service_page', function(){ 

     $("a.tab_nav").on("click",function(){
		  var id=$(this).attr('id');
		  id=id+'_store';
		  //alert(id);
		  var content=$('#'+id).html();
		  //alert(content);
		  $("#service_data_display").empty().append(content);
	 });
});
$(document).on('pageshow', '#social_service_page', function(){ 
     
	 setFontSize();
	 $("#service_description_store").empty();
	 
	 $id = sessionStorage.serviceID;
	 
	 $.ajax({url: 'php/social_services.php',
                        data:{action:'get_social_service', service_id:$id},
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
							if(result.status)
							{
								var content=$('<h4>'+result.title+'</h4>'+
								              '<p>'+result.description+'</p>');
								
								$("#service_description_store").empty().append(content);
								var content_new=$('#service_description_store').html();
								$("#service_data_display").empty().append(content_new);
							}
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
                 });
				 
    
});


