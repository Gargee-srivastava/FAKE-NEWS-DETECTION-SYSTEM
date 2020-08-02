
/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for: Smart INdia Hackathon 2020
 */
var url=chrome.extension.getURL('toolbar.html');
var height="10px";
main = function () {
function createUI(text){
		var PopupDiv = document.getElementById('PopupDiv');
		if (PopupDiv === null) {
			PopupDiv = document.createElement('div');
		}
                var btn=document.createElement('button');
                btn.id='btn';
                btn.innerHTML='X';
                btn.style.color='white';
		btn.style.float='right';
		btn.style.display='inline-block';
                btn.style.cursor='pointer';
                btn.style.position='absolute';
                btn.style.top='0%';
                btn.style.right='0%'; 
               btn.style.padding='2px 5px';
                btn.style.background='#ccc';
                //btn.style.transform='translate(0%,-50%)';
		var btn2=document.createElement('button');
                btn2.id='btn2';
                btn2.innerHTML='IGNORE';
                //btn.style.background="#3dfe3a";
		 btn2.style.background="#3dfe3a";
		PopupDiv.id = 'PopupDiv';
		PopupDiv.style.fontSize = "1em";
		PopupDiv.style.color="#ffffff";
		PopupDiv.style.textalign="center";
		PopupDiv.style.right="20%";
		PopupDiv.style.width="30%";
		PopupDiv.style.margin="auto";
		PopupDiv.style.top="20%";
		PopupDiv.style.border="1px solid #DCA";
		PopupDiv.style.background="#000000";
		PopupDiv.style.opacity="0.8";
		PopupDiv.style.borderRadius = "6px";
		PopupDiv.style.boxShadow = "5px 5px 8px #CCC";
		PopupDiv.style.position="fixed";
		PopupDiv.style.zIndex = "99999";
		PopupDiv.style.padding="20px";
		PopupDiv.style.display = "inline";
                  //for image
                  //var x = document.createElement("IMG");
		  //x.setAttribute("src", "icon.png");
		  //x.setAttribute("width", "50");
		  //x.setAttribute("height", "50");
		 //x.setAttribute("alt", "The Pulpit Rock"); 
                
		
		//el.innerHTML="<img src=\"http://placehold.it/350x350\" width=\"400px\" height=\"150px\">";
		//PopupDiv.innerHTML =             
		//range.insertNode(PopupDiv);
		document.getElementsByTagName('body') [0].appendChild(PopupDiv);
                var txt = text.fontsize(2);
	        var body = document.getElementsByTagName("body")[0];
		PopupDiv.innerHTML = txt;
		//btn.style.width = '70px'; // setting the width to 200px
		//btn.style.height = '30px'; // setting the height to 200px
		//btn.style.background = 'teal'; // setting the background color to teal
		//btn.style.color = 'black'; // setting the color to white
		//btn.style.fontSize = '10px';
                PopupDiv.appendChild(btn);
		//PopupDiv.appendChild(btn2);
		myImage = document.createElement('img');
                 myImage.id='ig';
		myImage.setAttribute("width", "30");
		myImage.setAttribute("height", "30");
		

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
		btn.addEventListener("click", function(){console.log("clicked");
        //alert("Your request has been cancelled!!");
     var PopupDiv = document.getElementById('PopupDiv');
		if (PopupDiv !== null){
			PopupDiv.style.display = "none";
		} });

		//document.getElementById("btn").addEventListener("click",fun);
                //document.getElementById("btn2").addEventListener("click",fun);
		

	}
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
			var range = window.getSelection().getRangeAt(0);
                     
		     //range.insertNode(iframex);

 
           
	 console.log(selectedtext);
		createUI(selectedtext,range);
		 let message  ={
			text:selectedtext
			};

		 //send mesage to background script
		 chrome.runtime.sendMessage({"word":selectedtext});//global var of bg script
	
       
		}
	 
 //document.getElementById("btn").addEventListener("click",fun);
 //document.getElementById("btn2").addEventListener("click",fun);
}
};
"use strict";


(function(){
	chrome.storage.sync.get(['blurOnDefault', 'blurAmount'], function(values){
		window.imageBlurOpacityAmount = values.blurAmount || 6;
	});

	function blur(image) {
		if (image.id != window.cloneImageId) {
		  image.style.filter = `blur(${window.imageBlurOpacityAmount}px) opacity(1)`;
	  }
	}

	function show(image) {
		if (image.id != window.cloneImageId) {
		  image.style.filter = "opacity(1)";
	  }
	}

	function blurAll() {
		const images = document.querySelectorAll('img');
		for (const image of images) {
			  blur(image);
	  }
	  window.imageBlurState = "blurred";
	}

	function revealAll() {
		const images = document.querySelectorAll('img');
		for (const image of images) {
	    	show(image);
	  }
	  window.imageBlurState = "revealed";
	}

	function reveal(e) {
		if (window.imageBlurState === "blurred") {
		    if (e.shiftKey && e.altKey) {
				e.preventDefault();
				e.stopPropagation();
		        show(e.target);

				} else if (e.altKey) {
					e.preventDefault();
					e.stopPropagation();
					revealSome(e);
				}
		}
	}

	function unreveal(e) {
		if (window.imageBlurState === "blurred") {
			blur(e.target);
		}
	}

	function initialBlurAll() {
		const images = document.querySelectorAll('img');
		for (const image of images) {
			if (image.dataset.imageBlurOnLoadUpdateOccured != "true"
		     && image.id != window.cloneImageId) {
				blur(image);
				image.addEventListener('click', reveal);
				image.addEventListener('mouseout', unreveal);
				image.dataset.imageBlurOnLoadUpdateOccured = true;
			}
	  	}
	  	window.imageBlurState = "blurred";
	}

	function removeBGImages() {
		const everything = document.querySelectorAll("*");
		for (item of everything) {
			if (item.style && image.id != window.cloneImageId) {
				item.style.backgroundImage = "none";
			}
		}
	}

	function initialLoadRevealAll() {
		const images = document.querySelectorAll('img');
		for (const image of images) {
			if (image.dataset.imageBlurOnLoadUpdateOccured != "true"
		      && image.id != window.cloneImageId) {
	    		show(image);
	    		image.addEventListener('click', reveal);
				image.addEventListener('mouseout', unreveal);
	    		image.dataset.imageBlurOnLoadUpdateOccured = true;
	    	}
	  	}
	  	window.imageBlurState = "revealed";
	}

	function onPageLoad(e) {
		chrome.storage.sync.get(['blurOnDefault', 'blurAmount'], function(values){
			if (values.blurOnDefault) {
				initialBlurAll();
			} else {
				initialLoadRevealAll();
			}
			window.imageBlurOpacityAmount = values.blurAmount || 6;
		});
	}

	function repositionMask(e) {
		const img = e.target;
    const ir = img.getBoundingClientRect();
		 img.style["webkitMaskPosition"] = (e.clientX - ir.left) + "px " +
		   (e.clientY - ir.top) + "px";
	}

	function revealSome(e) {
		const img = e.target;
		const div = document.getElementById(window.maskDivId);
		window.cloneImageId = "imageBlur-copy";
		const masked = document.getElementById(window.cloneImageId);
		if (masked) {
			masked.remove();
		}
		const ir = img.getBoundingClientRect();
		div.style.left =   (ir.left + window.pageXOffset) + "px";
		div.style.top = 	(ir.top + window.pageYOffset) + "px";
		div.style.display = "inline-block";
		div.style["zIndex"] = "100";

		const clone = img.cloneNode(true);
    clone.id = window.cloneImageId; // avoid duplicate id in clone
		clone.style.cursor = "crosshair";
		clone.style.webkitMaskRepeat = "no-repeat";
		const maskUrl = chrome.extension.getURL("assets/mask.png")
		clone.style.webkitMaskImage = "url('" + maskUrl + "')";
		clone.style.filter = "none";
		clone.addEventListener("mousemove", repositionMask);
		clone.addEventListener("click", stopRevealingSome);
		div.appendChild(clone);
		repositionMask(e);
	}

	function stopRevealingSome(img) {
		const div = document.getElementById(window.maskDivId);
		div.style.display = "none";
		if (img.id == window.cloneImageId) {
			img.style.display = "none";
		  img.remove();
	  }
	}

	function addMaskDivToPage(){
		window.maskDivId = "imageBlur-mask-div";
		const maskDiv = document.createElement("div");
		maskDiv.style = "position:absolute;";
		maskDiv.id = window.maskDivId;
		document.body.appendChild(maskDiv);
	}

	document.addEventListener('DOMContentLoaded', function(e) {
		addMaskDivToPage();
		onPageLoad(e);
		document.addEventListener('DOMNodeInserted', onPageLoad);
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		for (key in changes) {
			if (key === "blurAmount") {
				window.imageBlurOpacityAmount = changes[key].newValue;
			}
		}
	});

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request) {
				switch (request.status) {
					case 'blur':
						blurAll();
						break;
					case 'unblur':
						revealAll();
						break;
					case 'removeBGImages':
						removeBGImages();
						break;
				}
			}
		}
	);
})()	
main();
 

 

 

