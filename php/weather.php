<?php

   session_start();
   
   $user_location=$_SESSION['location'];
   $city =  explode(",",$user_location);
   $city = $city[0];
   $city_id=NULL;
   $action=$_POST['action'];
   
   $file = 'log.txt'; 
   file_put_contents($file,$user_location);
   
   
   if($action == 'get_weather_widget')
   {
   
   switch($city)
   {
	   case 'Αθήνα':
	      $city_id = 3;
	   break;
	   case 'Αλεξανδρούπολη':
	       $city_id = 4;
	   break;
	   case 'Άγιος Νικόλαος':
	      $city_id = 1; 
	   break;
	   case 'Άμφισσα':
	       $city_id = 5; 
	   break;
	   case 'Αργοστόλι':
	        $city_id = 3044;
	   break;
	   case 'Άρτα':
	       $city_id = 6;
	   break;
	   case 'Βέροια':
	       $city_id = 9;
	   break;
	   case 'Βόλος':
	       $city_id = 10;
	   break;
	   case 'Γρεβενά':
	       $city_id = 11;
	   break;
	    case 'Δράμα':
	       $city_id = 12;
	   break;
	    case 'Έδεσσα':
		$city_id = 13;
	   break;
	    case 'Ερμούπολη':
	       $city_id = 10979;
	   break;
	    case 'Ζάκυνθος':
	       $city_id = 15;
	   break;
	    case 'Ηγουμενίτσα':
	       $city_id = 16;
	   break;
	    case 'Ηράκλειο':
	       $city_id = 17;
	   break;
	    case 'Θεσσαλονίκη':
	      $city_id = 19;
	   break;
	    case 'Ιωάννινα':
	       $city_id = 23;
	   break;
	    case 'Καβάλα':
	       $city_id = 24;
	   break;
	    case 'Καλαμάτα':
	       $city_id = 25;
	   break;
	    case 'Καρδίτσα':
	        $city_id = 27;
	   break;
	    case 'Καρπενήσι':
	        $city_id = 29;
	   break;
	    case 'Καρυές':
	       $city_id = 17751;
	   break;
	    case 'Καστοριά':
	      $city_id = 30;
	   break;
	    case 'Κατερίνη':
	       $city_id = 31;
	   break;
	    case 'Κέρκυρα':
	       $city_id = 32;
	   break;
	    case 'Κιλκίς':
	        $city_id = 33;
	   break;
	    case 'Κοζάνη':
	       $city_id = 34;
	   break;
	    case 'Κομοτηνή':
	       $city_id = 35;
	   break;
	    case 'Κόρινθος':
	       $city_id = 36;
	   break;
	    case 'Λαμία':
	        $city_id = 38;
	   break;
	    case 'Λάρισα':
	        $city_id = 39;
	   break;
	    case 'Λευκάδα':
	       $city_id = 42;
	   break;
	    case 'Λιβαδειά':
	       $city_id = NULL;
	   break;
	    case 'Μεσολόγγι':
	      $city_id = 142;
	   break;
	    case 'Μυτιλήνη':
	       $city_id = 45;
	   break;
	    case 'Ναύπλιο':
	       $city_id = 47;
	   break;
	    case 'Ξάνθη':
	       $city_id = 48;
	   break;
	    case 'Πάτρα':
	       $city_id = 53;
	   break;
	    case 'Πολύγυρος':
	        $city_id = 3159;
	   break; case 'Πρέβεζα':
	        $city_id = 54;
	   break;
	    case 'Πύργος':
	        $city_id = 55;
	   break;
	    case 'Ρέθυμνο':
	        $city_id = 56;
	   break;
	     case 'Σάμος':
	        $city_id = 11042;
	   break;
	    case 'Σέρρες':
	        $city_id = 60;
	   break;
	     case 'Σπάρτη':
	        $city_id = 62;
	   break;
	    case 'Τρίκαλα':
	        $city_id = 65;
	   break;
	     case 'Τρίπολη':
	         $city_id = 66;
	   break;
	    case 'Φλώρινα':
	        $city_id = 67;
	   break;
	     case 'Χαλκίδα':
	        $city_id = 69;
	   break;
	    case 'Χανιά':
	        $city_id = 70;
	   break;
	    case 'Χίος':
	        $city_id = 71;
	   break;
	   
   }
   
    $output = array('status' => true, 'city_id' => $city_id);
   }
   else 
     $output = array('status' => false); 
	
	
   echo json_encode($output);
   
   
?>