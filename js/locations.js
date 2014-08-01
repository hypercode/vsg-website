// JavaScript Document


$(document).ready(function(e) {


var cities = new Array( 
                   "Αθήνα",
                   "Αλεξανδρούπολη",
                   "Άγιος Νικόλαος",
                   "Αγρίνιο",
                   "Άμφισσα",
                   "Αργοστόλι",
                   "Άρτα",
                   "Βέροια",
                   "Βόλος",
                   "Γιαννιτσά",
                   "Γρεβενά",
                   "Δράμα",
                   "Έδεσσα",
                   "Ερμούπολη",
                   "Ζάκυνθος",
                   "Ηγουμενίτσα",
                   "Ηράκλειο",
                   "Θεσσαλονίκη",
                   "Θήβα",
                   "Ιωάννινα",
                   "Καβάλα",
                   "Καλαμάτα",
                   "Καρδίτσα",
                   "Καρπενήσι",
                   "Καρυές",
                   "Καστοριά",
                   "Κατερίνη",
                   "Κέρκυρα",
                   "Κιλκίς",
                   "Κοζάνη",
                   "Κομοτηνή",
                   "Κόρινθος",
                   "Λαμία",
                   "Λάρισα",
                   "Λευκάδα",
                   "Λιβαδειά",
                   "Μεσολόγγι",
                   "Μυτιλήνη",
                   "Ναύπλιο",
                   "Ξάνθη",
                   "Πάτρα",
                   "Πολύγυρος",
                   "Πρέβεζα",
                   "Πύργος",
                   "Ρέθυμνο",
                   "Ρόδος",
                   "Σάμος",
                   "Σέρρες",
                   "Σπάρτη",
                   "Τρίκαλα",
                   "Τρίπολη",
                   "Φλώρινα",
                   "Χαλκίδα",
				   "Χαλκιδική",
                   "Χανιά",
                   "Χίος"       
);

var regions = new Array( 

"Αγία Βαρβάρα",
"Αγία Κυριακή",
"Αγία Μαρίνα Αίγινας",
"Αγία Μαρίνα Γραμματικού",
"Αγία Μαρίνα Κορωπίου",
"Αγία Μαρίνα Νέας Μάκρης",
"Αγία Παρασκευή",
"Άγιοι Ανάργυροι",
"Άγιοι Απόστολοι",
"Άγιος Δημήτριος",
"Άγιος Ιωάννης Ρέντης",
"Άγιος Νικόλαος Αναβύσσου",
"Άγιος Νικόλαος Λούτσας",
"Άγιος Παντελεήμονας",
"Άγιος Σεραφείμ",
"Άγιος Στέφανος",
"Αθήνα",
"Αιάντειο",
"Αιγάλεω",
"Αίγινα",
"Αλεποχώρι",
"Άλιμος",
"Αμπελάκια",
"Ανάβυσσος",
"Ανθούσα",
"Άνοιξη",
"Άνω Λιόσια",
"Άνω Νέα Παλάτια",
"Αργυρούπολη",
"Αρτέμιδα",
"Ασπρόπυργος",
"Αυλάκι",
"Αυλώνα",
"Αφίδνες",
"Αχαρνές",
"Βάρη",
"Βαρνάβας",
"Βίλια",
"Βούλα",
"Βουλιαγμένη",
"Βραυρώνα",
"Βριλήσσια",
"Βύρωνας",
"Γαλάζια Ακτή",
"Γαλατάς Αττικής",
"Γαλάτσι",
"Γέρακας",
"Γλυκά Νερά",
"Γλυφάδα",
"Γραμματικό",
"Δασκαλειό",
"Δάφνη",
"Διόνυσος",
"Δραπετσώνα",
"Δροσιά",
"Εκάλη",
"Ελευσίνα",
"Ελληνικό",
"Ερυθρές",
"Ζεφύρι",
"Ζούμπερι",
"Ζωγράφος",
"Ηλιούπολη",
"Θρακομακεδόνες",
"Θυμάρι",
"Ίλιον",
"Καισαριανή",
"Κάλαμος Αττικής",
"Καλέτζι",
"Καλλιθέα",
"Καλλιτεχνούπολη",
"Καλύβια Θορικού",
"Καματερό",
"Κάντζα",
"Καπανδρίτι",
"Κάτω Σούλι",
"Κερατέα",
"Κερατσίνι",
"Κηφισιά",
"Κινέτα",
"Κόκκινο Λιμανάκι",
"Κορυδαλλός",
"Κορωπί",
"Κουβαράς",
"Κρυονέρι",
"Κύθηρα",
"Κυψέλη",
"Λαγονήσι",
"Λάκκα",
"Λαύριο",
"Λουτρόπυργος",
"Λυκόβρυση",
"Μαγούλα",
"Μάνδρα",
"Μαραθώνας",
"Μαρκόπουλο",
"Μαρούσι",
"Μάτι",
"Μέγαρα",
"Μέθανα",
"Μελίσσια",
"Μενίδι",
"Μεσαγρός",
"Μεταμόρφωση",
"Μεταξουργείο",
"Μοσχάτο",
"Νέα Ερυθραία",
"Νέα Ιωνία",
"Νέα Μάκρη",
"Νέα Παλάτια",
"Νέα Πεντέλη",
"Νέα Πέραμος Αττικής",
"Νέα Πολιτεία",
"Νέα Σμύρνη",
"Νέα Φιλαδέλφεια",
"Νέα Χαλκηδόνα",
"Νέο Ηράκλειο",
"Νέο Ψυχικό",
"Νέος Βουτζάς",
"Νίκαια",
"Ντράφι",
"Παιανία",
"Παλαιά Φώκαια",
"Παλαιό Φάληρο",
"Παλλήνη",
"Παλούκια",
"Παπάγος",
"Πατήσια",
"Πειραιάς",
"Πεντέλη",
"Πέραμα",
"Πέρδικα",
"Περιστέρι",
"Πετρούπολη",
"Πεύκη",
"Πικέρμι",
"Πολυδένδρι",
"Πόρος Τροιζηνίας",
"Πόρτο Ράφτη",
"Ποταμός Κυθήρων",
"Ραφήνα",
"Ροδόπολη Αττικής",
"Σαλαμίνα",
"Σαρωνίδα",
"Σελήνια",
"Σκάλα Ωρωπού",
"Σουβάλα",
"Σπάτα",
"Σπέτσες",
"Σταμάτα",
"Συκάμινο",
"Ταύρος",
"Ύδρα",
"Υμηττός",
"Φιλοθέη",
"Φυλή",
"Χαϊδάρι",
"Χαλάνδρι",
"Χαλκούτσι",
"Χαμολιά",
"Χολαργός",
"Ψυχικό",
"Ωρωπός"
);


  for($i=0;$i<cities.length;$i++)
  {
	 var option = $('<option value="'+cities[$i]+'">'+cities[$i]+'</option>');
	 $("#profile_settings_location").append(option);
  }
  
  for($i=0;$i<regions.length;$i++)
  {
	 var option = $('<option value="'+regions[$i]+'">'+regions[$i]+'</option>');
	 $("#profile_settings_region").append(option);
  }





});