<?php
   session_start();
   session_destroy();
  
   $output = array('status' => true);
   echo json_encode($output);
?>