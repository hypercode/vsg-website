<?php

  session_start();
  $user_id=$_SESSION['user'];
  $action=$_POST['action'];
  include('db_connect.php');
  
  if($action == 'load_profile_settings')
  {
	  $sql = "select name,location from user where id='$user_id'"; 
	  $result= sqlQuery($sql);
	  
	  if($row = mysql_fetch_array($result))
	  {
		  $name = $row['name'];
		  $location = $row['location'];
		
		  $a = explode(",",$location);
		  $location = $a[0];
		  $region = $a[1];
		  $groups=array(false,false);
		
		  $sql = "select * from user_belongs_to_group where user_id='$user_id'";   
		  $result= sqlQuery($sql);
		  
		 
		  while($row = mysql_fetch_array($result))
		  {
				   $group_id = $row['group_id'];
				   $groups[$group_id-1] = true;
		  }
		 
		  
		  $output = array('status' => true, 'name' => $name, 'location' => $location,  'region' => $region,
		                  'isElderly' => $groups[0], 'isDisabled' => $groups[1] );
	
	  }
  }
  else if($action == 'save_profile_settings')
  {
	   parse_str($_POST['formData'], $formData);

	   $name = $formData['name'];
	   $location = $formData['location'];
	   $region = $formData['region'];
	   $isElderly = $formData['elderly_checkbox'];
	   $isDisabled = $formData['disabled_checkbox'];
	   
	   if($location == "Αθήνα")
	      $location = $location.','.$region;
	   
	   $sql = "update user set name='$name', location='$location' where id='$user_id' ";   
	   $result= sqlQuery($sql);
	   if(!$result)
	       $output = array('status' => false, 'message' => 'Profile settings not saved');
	   else
	   {
		   $_SESSION['location']= $location;
		   if( $isElderly == 'on')
		   {
			    $sql = "select * from user_belongs_to_group where user_id='$user_id' and group_id=1";   
		        $result= sqlQuery($sql);
				
				if(!$row = mysql_fetch_array($result))
				{
					$sql = "insert into user_belongs_to_group (user_id,group_id) values ('$user_id',1)";
					$result= sqlQuery($sql);
				}
		   }
		   else
		   {
			    $sql = "delete from user_belongs_to_group where user_id='$user_id' and group_id=1";   
		        $result= sqlQuery($sql);
		   }
		   
		   if( $isDisabled == 'on')
		   {
			    $sql = "select * from user_belongs_to_group where user_id='$user_id' and group_id=2";   
		        $result= sqlQuery($sql);
				
				if(!$row = mysql_fetch_array($result))
				{
					$sql = "insert into user_belongs_to_group (user_id,group_id) values ($user_id,2)";
					$result= sqlQuery($sql);
				}
		   }
		   else
		   {
			    $sql = "delete from user_belongs_to_group where user_id='$user_id' and group_id=2";   
		        $result= sqlQuery($sql);
		   }
		   
		   $output = array('status' => true , 'message' => 'data saved');
	   }
	   
	  
  }
 
  mysql_close($server); 
 
  echo json_encode($output);
  
?>