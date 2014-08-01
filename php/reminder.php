<?php
  session_start();
  $user_id=$_SESSION['user'];
  $action=$_POST['action'];
  include('db_connect.php');
  
  define('TIMEZONE', 'Europe/Athens');
  date_default_timezone_set(TIMEZONE);
  
  if($action == 'load_recent_schedules')
  {
	  $t=time();
      $date=date("Y-m-d",$t);
      $time=date("H:i:s",$t);;
	  
	  //$file = 'log.txt';
	  //file_put_contents($file, $date.' '.$time);
	  
	  $schedules=array();
	  
	  $sql = "select message,TIME_FORMAT(`time`, '%H:%i') as time 
	          from schedules 
	          where user_id='$user_id' and (date='$date' or date='0000-00-00') and  TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(`time`, '%H:%i'), '$time' ))>0
			  order by time"; 
			    
	  $result= sqlQuery($sql);
		  
	   while($row = mysql_fetch_array($result))
	   {
		   $schedules[] = array('message' => $row['message'], 'time' => $row['time']);
		   
	   }
	   $output=$schedules;
  }
  else if($action == 'check_recent_schedule')
  {
	  $t=time();
      $date=date("Y-m-d",$t);
      $time=date("H:i:s",$t);;
	  
	  
	  $sql = "select id 
	          from schedules 
	          where user_id='$user_id' and (date='$date' or date='0000-00-00') and 
              TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(`time`, '%H:%i'), '$time' ))/3600 > 0 and
              TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(`time`, '%H:%i'), '$time' ))/3600 < 1 
			  order by time"; 
			    
	  $result= sqlQuery($sql);
		  
	   if($row = mysql_fetch_array($result))
	   {
		 
		   $sql = "select id,message 
	          from schedules 
	          where user_id='$user_id' and (date='$date' or date='0000-00-00') and 
              TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(`time`, '%H:%i'), '$time' )) > 0 and
              TIME_TO_SEC(TIMEDIFF(TIME_FORMAT(`time`, '%H:%i'), '$time' )) < 300 
			  order by time";
			    
	     $result= sqlQuery($sql);
		  if($row = mysql_fetch_array($result))
	      {  
		      $output = array('status' => 'alarm', 'id' => $row['id'], 'message' => $row['message']);
			  
		  }
		  else
		   $output = array('status' => 'notification');
		   
	   }
	   else
	      $output = array('status' => 'default');
	  
	  
  }
  else if($action == 'delete_schedule')
  {
	 $id=$_POST['schedule_id'];
	 
	 $sql = "delete from schedules where id='$id' and user_id='$user_id' and date!='0000-00-00'";
	 $result= sqlQuery($sql);
	  
  }
  
  mysql_close($server); 
  echo json_encode($output);

?>