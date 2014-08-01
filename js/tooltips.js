// JavaScript Document

//---------------------------------------------------TOOL TIPS-----------------------------------------------------------
function initTooltips()
{
	$(document).one('click', '#home_button', function(){ 
    hideToolTip(); 	
	}); 
	$(document).one('click', '#reminder_button', function(){    
		hideToolTip(); 
	});
	
	$(document).one('pagehide', '#reminder_page', function(){ 
		hideToolTip(); 
		showPanelTooltip();
	});
	 
	$(document).one('pageshow', '#home_page', function(){ 
	   showNotificationTooltip();   
    }); 
	
}

function showPanelTooltip()
{
	$.mobile.activePage.find("#panel_button").powerTip({
	   placement: 'se-alt', // north-east tooltip position
	   manual: true,
	   offset: 30      
    });
	$.mobile.activePage.find("#panel_button").data('powertip', 'Πατήστε σε αυτό το κουμπί<br/>για να εμφανιστεί το μενού');
    $.powerTip.show($.mobile.activePage.find("#panel_button"));
		
}
function showHomeTooltip()
{
	$.mobile.activePage.find("#home_button").powerTip({
	   placement: 'sw-alt', // north-east tooltip position
	   manual: true,
	   offset: 30   
    });
	$.mobile.activePage.find("#home_button").data('powertip', 'Πατήστε σε αυτό το κουμπί<br/>για να πάτε στο αρχικό παράθυρο');
	
	$.powerTip.show($.mobile.activePage.find("#home_button"));
}
function showNotificationTooltip()
{
	$.mobile.activePage.find("#reminder_button").powerTip({
	   placement: 'sw-alt', // north-east tooltip position
	   manual: true,
	   offset: 30     
    });
	$.mobile.activePage.find("#reminder_button").data('powertip', 'Πατήστε σε αυτό το κουμπί<br/>για να δείτε τις ειδοποιήσεις σας');
    $.powerTip.show($.mobile.activePage.find("#reminder_button"));
}
function hideToolTip()
{
	$.powerTip.hide();
}
//-----------------------------------------------------------------------------------------------------------------------