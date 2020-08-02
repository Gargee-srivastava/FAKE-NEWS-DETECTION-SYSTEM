/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for: Smart INdia Hackathon 2020
 */
function save_options() {
	var menutype_radio = document.getElementsByName("menutype");
	for(var i = 0; i < menutype_radio.length; i++) {if(menutype_radio[i].checked){localStorage.menutype = menutype_radio[i].value;}}
	
	var service_dropdown = document.getElementById("service");
	var selIndex = service_dropdown.selectedIndex;
	localStorage.service = service_dropdown[selIndex].value;

	chrome.extension.sendRequest({action:"updateContextMenu"});
	
	var status = document.getElementById("status");
	status.innerHTML = "Options saved.";
	setTimeout(function() { status.innerHTML = ""; }, 800);
}

function restore_options() {
	if (!localStorage.menutype){localStorage.menutype = "submenu";}
	var menutype = localStorage.menutype;
	document.getElementById(menutype).checked = true;
	
	document.getElementById("submenu_default").style.display = (document.getElementsByName("menutype")[1].checked ? '' : 'none' );

	if (!localStorage.service){localStorage.service = "all";}
	var service = localStorage.service;
	document.getElementById(service).selected = true;
}

function toggle_default_visibility() {
	document.getElementById('submenu_default').style.display = (document.getElementsByName("menutype")[1].checked ? '' : 'none' );
}

function close_window() {
	window.close();
}

function initialize() {
	restore_options();
	document.getElementById("submenu").addEventListener("click",toggle_default_visibility);
	document.getElementById("singleoption").addEventListener("click",toggle_default_visibility);
	document.getElementById("save_button").addEventListener("click",save_options);
	
	if (document.getElementById("close_button")){
		document.getElementById("close_button").addEventListener("click",close_window);
	}
}

window.addEventListener("load", initialize);

