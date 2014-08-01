// JavaScript Document

<!----------------------------------------------MAP PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->
$(document).on('pageshow', '#map_page', function(){ 
   /*$('#map_canvas').gmap();*/
   /*$('#map_canvas').gmap('option', 'zoom', 7);*/
   $('#map_canvas').gmap().bind('init', function(evt, map) {
	$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
		if ( status == 'OK' ) 
		{
			//toast('gps');
			var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$('#map_canvas').gmap('addMarker', {'position': clientPosition, 
			                                    'bounds': true, 
												'icon': 'images/icons/gps_marker.png',
												'zIndex': 0});
			$('#map_canvas').gmap('option', 'zoom', 15);
			/*$('#map_canvas').gmap('addShape', 'Circle', { 
				'strokeWeight': 0, 
				'fillColor': "#008595", 
				'fillOpacity': 0.3, 
				'center': clientPosition, 
				'radius': 70, 
				'clickable': false 
			});*/
		}
		else
		{
			//toast(sessionStorage.userLocation);
			$('#map_canvas').gmap('search', { 'address': sessionStorage.userLocation+' Ελλάδα' }, function(results, status) {
                if ( status === 'OK' ) {
                        $('#map_canvas').gmap('get', 'map').panTo(results[0].geometry.location);
						$('#map_canvas').gmap('option', 'zoom', 10);
                }
        });
		}
	});   
	 
   });
   
    load_places();
   
});

$(document).on('pageinit', '#map_page', function(){ 
     
   
 
   $(".ui-btn-active").removeClass('ui-btn-active');
   
   
   $.ajax({url: 'php/map.php',
                        data: {action : 'load_subcategories'},
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
                            
							var options = '';
							var checkboxes = '';
							$category_buffer = '';
							
							for($i=0;$i<result.length;$i++)
							{
								$id = result[$i].id;
								$title = result[$i].title;
								$category = result[$i].category;
								
								if($category!=$category_buffer)
								{
								  if($category_buffer!='')
								  {
								     options+='</optgroup>';
									 checkboxes+='</fieldset></div></div>';
								  }
								  $category_buffer = $category;
								  
								  options+='<optgroup label="'+$category+'">';
								  checkboxes+='<div data-role="collapsible" data-collapsed="true" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u">'+
                                '<h3>'+
                                '<input class="category_checkbox" type="checkbox" id="'+$category+'" style="width:40px !important;"/>'+
                                '<label for="'+$category+'">'+$category+'</label>'+
                                '</h3>'+
                               '<div id="mycontent">'+
                               '<fieldset data-role="controlgroup">';
								}
								
								 options+='<option value="'+$id+'">'+$title+'</option>';
								 checkboxes+='<input type="checkbox" name="c_'+$id+'" id="'+$title+'" class="subcategory_checkbox '+$category+'">'+
                                '             <label for="'+$title+'">'+$title+'</label>';
							}
							options+='</optgroup>';
							checkboxes+='</fieldset></div></div>';
							
							$("#place_subcategory").append(options).trigger('create');
							$("#collapsibleSetWrapper").append(checkboxes).trigger('create');
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
    }); 
	
	$.ajax({url: 'php/map.php',
                        data: {action : 'load_facilities'},
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
                            
							var facilities = '';
							
							for($i=0;$i<result.length;$i++)
							{
								$id = result[$i].id;
								$title = result[$i].title;
								
								
							facilities+='<input type="checkbox" name="f_'+$id+'" id="f_'+$id+'" class="custom" />';
                            facilities+='<label for="f_'+$id+'">'+$title+'</label>';
							}
							
							
							 $("#facilities").append(facilities).trigger('create');
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
    });  
	
	
	
	$(document).on('change','.category_checkbox',function(e){
		//alert('click');
		$id=$(this).attr('id');
		if($(this).is(':checked'))
		{
		   $("#"+$id).prop('checked', true).checkboxradio('refresh');
		   $("."+$id).prop('checked', true).checkboxradio('refresh');
		}
		else
		{
			$("#"+$id).prop('checked', false).checkboxradio('refresh');
		    $("."+$id).prop('checked', false).checkboxradio('refresh');
		}
		
		map_places_filter();
		
    });
	$(document).on('change','.subcategory_checkbox',function(e){
		//alert('click');
		
		$class=$(this).attr('class').split(' ');
		$category = $class[1];
		$id=$(this).attr('id');
		if($(this).is(':checked'))
		{
		  $(this).prop('checked', true).checkboxradio('refresh'); 
		}
		else
		{
			 $(this).prop('checked', false).checkboxradio('refresh');
			
		}	
		 var all_unchecked = true;
			 
			 $("."+$category).each(function(){
                if($(this).is(':checked'))
				  all_unchecked = false;
            });
			
			if(all_unchecked)
			  $("#"+$category).prop('checked', false).checkboxradio('refresh');
			else 
			  $("#"+$category).prop('checked', true).checkboxradio('refresh');
		
		map_places_filter();
			
    });
   
});

$(document).on('pagebeforeshow', '#map_page', function(){ 
    
	setFontSize(); 
   
});

$(document).on('click','#goto_location_submit',function(){
	 
	$location = $('#location').val(); 
	$('#goto_location').popup('close');
	
	$('#map_canvas').gmap('search', { 'address': $location }, function(results, status) {
                if ( status === 'OK' ) {
                        $('#map_canvas').gmap('get', 'map').panTo(results[0].geometry.location);
						$('#map_canvas').gmap('option', 'zoom', 15);
                }
        });
	
});


$(document).on('click','#add_place_submit',function(){
	
	 
	 $( ".selector" ).button( "refresh" );
	// alert(latitude+' '+longitude);
	 if($('#place_description').val().length > 0 && $('#place_address').val().length > 0)
	 {
		     var address = $("#place_address").val();
			 var geocoder = new google.maps.Geocoder();
			 //var validAddress=false;
			 
			 geocoder.geocode( { 'address': address}, function(results, status) {
		
			if (status == google.maps.GeocoderStatus.OK) {
				latitude = results[0].geometry.location.lat();
				longitude = results[0].geometry.location.lng();
				
				
				$('#post_to_map').popup('close');
						
						$.ajax({url: 'php/map.php',
							data: {action : 'add_place',
							       formData : $('#add_place_form').serialize(), 
								   lat: latitude,
								   lon: longitude},
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
									toast('Το σημείο αποθηκεύτηκε επιτυχώς'); 
									load_places();                      
								}
								else{
								   toast('Το σημείο δεν αποθηκεύτηκε. Προσπαθήστε ξανά.');   
								}
							},
							error: function (request,error) {
								// This callback function will trigger on unsuccessful action                
								alert('Network error has occurred please try again!');
							}
						}); 
				} 
				else
			    {
					toast('Παρακαλώ δώστε έγκυρη διεύθυνση (Οδός Αριθμός, Πόλη)');
			    }
			});
		    
       } 
	   else 
	   {
                toast('Παρακαλώ, δηλώστε τα στοιχεία για το σημείο');
       }  
	            
       return false; // cancel original event to prevent form submitting
	   

	
});
function load_places()
{
	 $.ajax({url: 'php/map.php',
                        data: {action : 'load_places'},
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
							
                 			$('#map_canvas').gmap('clear', 'markers');
							
							for($i=0;$i<result.length;$i++)
							{
								$id = result[$i].id;
								$subcategory = result[$i].subcategory;
								$subcategory_id=result[$i].subcategory_id;
								$lat = result[$i].lat;
								$lon = result[$i].lon;
								
								$position = $lat+','+$lon;
							 
			                   $('#map_canvas').gmap('addMarker', { 'id': $id, 
							   'subcategory': [$subcategory], 
							   'position': $position, 
							   'bounds': false,
							   'icon': 'images/map/subcategories/'+$subcategory_id+'.png'}).click(function() {
							   //alert($infoWindow);  
							  
							   $marker=this;
							    $.ajax({url: 'php/map.php',
								data: {action : 'load_place_info', id: this.id},
								type: 'post',                   
								async: 'true',
								dataType: 'json',
								
								success: function (result) {
									if(result.status)
									{
									  $subcategory = result.subcategory;
									  $description = result.description;
							          $address = result.address;
									  $facilities=result.facilities;
									  
									  $facilities_signs='';
									  for($j=0;$j<$facilities.length;$j++)
							          {
										  $facilities_signs=$facilities_signs+
										  '<img class="facility_sign" src=images/map/facilities/'+$facilities[$j]+'.jpg />';
									  }
									  //alert($facilities_signs);
									  $infoWindow='<h4>'+$subcategory+'</h4>'+
									        '<p>'+$description+'<p>'+
								            '<p>'+$address+'</p>'+
											'<p>'+$facilities_signs+'</p>';
									    //alert($marker.id);
									  $('#map_canvas').gmap('openInfoWindow', { 'content': $infoWindow }, $marker);
									}
									else
									 alert('data not loaded');
								},
								error: function (request,error) {
									// This callback function will trigger on unsuccessful action                
									alert('Network error has occurred please try again!');
								}
							  });  
									   
					           
			                   }); 
							
							}
			
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action                
                            alert('Network error has occurred please try again!');
                        }
    });  
}
function map_places_filter()
{
	
	var filter = [];

	$('.subcategory_checkbox').each(function(index, element) {
		
        if($(this).is(':checked'))
		{
			$subcategory=$(this).attr('id');
			filter.push($subcategory);

		} 
    });
	
	if(filter.length == 0)
	{
		$('.subcategory_checkbox').each(function(index, element) {   
			$subcategory=$(this).attr('id');
			filter.push($subcategory); 
         });
	}
	
	$('#map_canvas').gmap('find', 'markers', { 'property': 'subcategory', 'value': filter, 'operator': 'OR' }, 
    function(marker, found)                
	{
				marker.setVisible(found);
					
	});
	

}