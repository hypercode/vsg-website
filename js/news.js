// JavaScript Document

<!---------------------------------------------NEWS PAGE------------------------------------------------->
<!------------------------------------------------------------------------------------------------------->

$(document).on('pageshow', '#news_page', function(){  
 
   switch(sessionStorage.newsCategory)
   { 
      case 'Κυριότερες Ειδήσεις':
	     $parameter='Uulu';
	  break;
	  case 'Ελλάδα':
	     $parameter='PLwa';
	  break;
	  case 'Κόσμος':
	     $parameter='aqOL';
	  break;
	  case 'Πολιτική':
	     $parameter='yinm';
	  break;
	  case 'Οικονομία':
	     $parameter='oPUt';
	  break;
	  case 'Υγεία':
	     $parameter='TABn';
	  break;
	  case 'Τεχνολογία':
	     $parameter='fqsg';
	  break;
	  case 'Πολιτισμός':
	     $parameter='ppGl';
	  break;
	  case 'Αθλητισμός':
	     $parameter='TfmK';
	  break;
	  case 'Παράξενα':
	     $parameter='bpAR';
	  break;
	  
   }
   
	 
	   $('#newsContainer').rssfeed('http://feeds.feedburner.com/skai/'+$parameter+'?format=xml', {
			limit: 20,
			snippet: false,
			media: false,
			date: false,
			linktarget: '_top'
		});
});

$(document).on("pagehide","#news_page",function(){ // When leaving pagetwo
      $('#newsContainer').empty();
	  $('#news_category_title').empty();
});