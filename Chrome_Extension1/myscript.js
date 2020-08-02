/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for:Smart India Hackathon 2020
 */
var url=chrome.extension.getURL('toolbar.html');
var height="10px";

function fun(){
      
       console.log("clicked");
        alert("Your request has been sent.Click Plugin icon to check result!!");
     var PopupDiv = document.getElementById('PopupDiv');
		if (PopupDiv !== null){
			PopupDiv.style.display = "none";
		}
                      
}


	window.addEventListener('mouseup',get_selected);
 function get_selected(){
	  console.log("text selected");
	 let selectedtext=window.getSelection().toString();
         
         
         //console.log(range);
	 if(selectedtext.length>0 && event.altKey){
                   var range = window.getSelection().getRangeAt(0);
		 var PopupDiv = document.getElementById('PopupDiv');
		if (PopupDiv === null) {
			PopupDiv = document.createElement('div');
		}
                
		PopupDiv.id = 'PopupDiv';
		PopupDiv.style.fontSize = "1em";
		PopupDiv.style.color="#ffffff";
		PopupDiv.style.textalign="center";
		//PopupDiv.style.right="20%";
		PopupDiv.style.width="10%";
		PopupDiv.style.margin="auto";
		//PopupDiv.style.top="20%";
		PopupDiv.style.border="1px solid #DCA";
		PopupDiv.style.background="#000000";
		PopupDiv.style.opacity="0.7";
		PopupDiv.style.borderRadius = "5px";
		PopupDiv.style.boxShadow = "5px 5px 8px #CCC";
		//PopupDiv.style.position="fixed";
		PopupDiv.style.zIndex = "99999";
		PopupDiv.style.padding="10px";
		PopupDiv.style.display = "inline";           
		range.insertNode(PopupDiv);
		console.log("in");
                console.log(range);
		//document.getElementsByTagName('body') [0].appendChild(PopupDiv);
		myImage = document.createElement('img');
                 myImage.id='ig';
		myImage.setAttribute("width", "20");
		myImage.setAttribute("height", "20");
		iconUrl = chrome.runtime.getURL("icon.png");
		myImage.src = iconUrl;
		PopupDiv.appendChild(myImage);
                myImage.addEventListener("click", function(){console.log("clicked");
        alert("Your request has been sent.Click Plugin icon to check result!!");
           var PopupDiv = document.getElementById('PopupDiv');
                   old=document.getElementById("ig");
		if (PopupDiv !== null){
			
			old.parentNode.removeChild(old);
			
			PopupDiv.style.display = "none";
			PopupDiv.parentNode.removeChild(PopupDiv);
		} });	
                     
		     //range.insertNode(iframex);
			var modal = document.getElementById('PopupDiv');

// When the user clicks anywhere outside of the modal, close it
         window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
              }
        }
 
           
	 console.log(range);
		//createUI(selectedtext,range);
		 let message  ={
			text:selectedtext
			};

		 //send mesage to background script
		 chrome.runtime.sendMessage({"word":selectedtext});//global var of bg script
	
       
		}
	 
 //document.getElementById("btn").addEventListener("click",fun);
 //document.getElementById("btn2").addEventListener("click",fun);
}

