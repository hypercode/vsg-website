<?php

session_start();
$user_id=$_SESSION['user'];
$action=$_POST['action'];
include('db_connect.php');
  
  if($action == 'load_places')
  {
	 $places=array();
	  
	 $sql = "select `map.places`.id as id,X(position) as lat,Y(position) as lon, title , `map.subcategories`.id as sub_id
            from `map.places`,`map.subcategories`
            where subcategory_id=`map.subcategories`.id";   
	 $result= sqlQuery($sql);
		  
	  while($row = mysql_fetch_array($result))
	  {
		   $places[] = array('id' => $row['id'], 'subcategory' => $row['title'], 'subcategory_id' => $row['sub_id'],
		                     'description' => $row['description'],'address' => $row['address'], 
							 'lat' => $row['lat'], 'lon' => $row['lon']);
		   
	  }
	  $output=$places;
  }
  else if($action == 'load_place_info')
  {
	  $place_id = $_POST['id'];
	  $sql = "select description, address, title2
             from `map.places`,`map.subcategories`
             where `map.places`.id='$place_id' and subcategory_id=`map.subcategories`.id";   
	 $result= sqlQuery($sql);
		  
	  if($row = mysql_fetch_array($result))
	  {
		   $subcategory=$row['title2'];
		   $description=$row['description'];
		   $address=$row['address'];
		   
		    $sql="select facility_id
			      from `map.places_provide_facilities`
				  where `map.places_provide_facilities`.place_id='$place_id'";
		   $result= sqlQuery($sql);
		   
		   $facilities=array();
		   
		   while($row = mysql_fetch_array($result))
			   $facilities[] = $row['facility_id'];   
		   
		   $info = array('status' => true, 'subcategory' => $subcategory, 'description' => $description, 'address' => $address, 'facilities' => $facilities);
		   
	  }
	  else
	       $info = array('status' => false);
	  
	  $output=$info;
  }
  else if($action == 'load_subcategories')
  { 
     $categories=array();
	  
	 $sql = "select `map.subcategories`.id, `map.subcategories`.title, `map.categories`.title as 'category'
             from `map.subcategories`,`map.categories` 
             where category_id=`map.categories`.id";   
	 $result= sqlQuery($sql);
		  
	  while($row = mysql_fetch_array($result))
	  {
		   $categories[] = array('id' => $row['id'],'title' => $row['title'], 'category' => $row['category']);
		   
	  }
	  $output=$categories;
  }
  else if($action == 'load_facilities')
  {
	  $facilities=array();
	  
	   $sql = "select * from `map.facilities`";   
	   $result= sqlQuery($sql);
		  
	  while($row = mysql_fetch_array($result))
	  {
		   $facilities[] = array('id' => $row['id'],'title' => $row['title']);
		   
	  }
	  $output=$facilities;
  }
  else if($action == 'add_place')
  {
	   parse_str($_POST['formData'], $formData);

	   $place_description = $formData['place_description'];
	   $place_address = $formData['place_address'];
	   $place_subcategory = $formData['place_subcategory'];
	   $latitude = $_POST['lat'];
	   $longitude = $_POST['lon'];
	   
	   $f_1 = $formData['f_1'];//parking
	   $f_2 = $formData['f_2'];//ramp
	   $f_3 = $formData['f_3'];//lift
	   $f_4 = $formData['f_4'];//phone
	   $f_5 = $formData['f_5'];//WC
	   
	   $sql = "INSERT INTO `map.places`(`subcategory_id`, `description`, `address`, `position`) 
	          VALUES ('$place_subcategory',' $place_description','$place_address',GeomFromText('POINT($latitude $longitude)'));";   
	   $result= sqlQuery($sql);
	   
	   if(!$result)
	   {
	       $output = array('status' => false, 'message' => 'Place not saved');
		   die();
	   }
	   else
	   {
		   $place_id=autoIncrementValue('map.places');
		   for($i=1;$i<=5;$i++)
		   {
			 $facility='f_'.$i;
		     if(${$facility} == 'on')
			 {
				$sql="INSERT INTO `map.places_provide_facilities`(`place_id`, `facility_id`) VALUES ('$place_id','$i')"; 
				$result= sqlQuery($sql);
		     }
		  }
		   $output = array('status'=> true, 'place_id'=> $place_id );
	   }
  }
  
   mysql_close($server); 
   echo json_encode($output);
?>