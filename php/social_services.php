<?php
   session_start();
  
   $user_id=$_SESSION['user'];
   $user_location=$_SESSION['location'];
   $action=$_POST['action'];
   $services=array();
   include('db_connect.php');
   
   if($action == 'get_social_services_list')
   {
	   $sql = "select distinct social_services.id as 'id', social_services.title as 'title'
from user_belongs_to_group,social_services_related_to_group,social_services
 where user_id = '$user_id' and
	   user_belongs_to_group.group_id = social_services_related_to_group.group_id and
	   social_services_related_to_group.social_service_id = social_services.id "; 
	   
	   $result= sqlQuery($sql);
	   
	   
	   while($row = mysql_fetch_array($result))
	   {
		   $services[] = array('id' => $row['id'],'title' => $row['title']);   
	   }
	   $output=$services;
   }
   else if($action == 'get_social_service')
   {
	   $id = $_POST['service_id'];
	   
	   $sql="select * from social_services where id='$id'";
	   
	   $result= sqlQuery($sql);
	   
	   
	   if($row = mysql_fetch_array($result))
	        $output=array("status" => true, "title" => $row['title'], "description" => $row['description']);
	   else
	        $output=array("status" => false);

   }
   mysql_close($server); 
   echo json_encode($output);
?>