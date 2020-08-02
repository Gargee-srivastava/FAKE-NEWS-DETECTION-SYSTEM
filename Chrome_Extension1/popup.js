
/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for: Affective Computing Team, IIT-Guwahati for development of vedinkakSa, a sensitive classroom application.
 */
var u='http://18.234.107.157:5000/api/text?id='
var u2='http://52.21.76.215:5000/api/text?id='
function setup() {
  noCanvas();

  // This is a way of getting a global variable from the background script
  var word = chrome.extension.getBackgroundPage().word;
 // Query the wordnik API
 

    var url2=u2+word;
     loadJSON(url2, gotData2);

  // And update the DOM to show the definition
 function gotData2(a) {
  var h_display = document.getElementById("humour");
   h_display.innerHTML = a[0];
	
            if (a[0] == "Not humour") {
               
                try {
                    h_display.classList.remove("badge-success");
                } catch (err) {
                    console.log(err)
                } finally {
                    h_display.classList.add("badge-danger");
                }
            } else {
               
                try {
                    h_display.classList.remove("badge-danger");
                } catch (err) {
                    console.log(err)
                } finally {
                    h_display.classList.add("badge-success");
                }
            }
 var t_display = document.getElementById("troll");
 
  t_display.innerHTML = a[1];
	
            if (a[1] == "troll") {
               
                try {
                    t_display.classList.remove("badge-success");
                } catch (err) {
                    console.log(err)
                } finally {
                    t_display.classList.add("badge-danger");
                }
            } else {
               
                try {
                    t_display.classList.remove("badge-danger");
                } catch (err) {
                    console.log(err)
                } finally {
                    t_display.classList.add("badge-success");
                }
            }
var o_display = document.getElementById("offense");
 
    o_display.innerHTML = a[2];
	
            if (a[2] == "Offense") {
               
                try {
                    o_display.classList.remove("badge-success");
                } catch (err) {
                    console.log(err)
                } finally {
                    o_display.classList.add("badge-danger");
                }
            } else {
               
                try {
                    o_display.classList.remove("badge-danger");
                } catch (err) {
                    console.log(err)
                } finally {
                    o_display.classList.add("badge-success");
                }
            }
    
    
  }

   // Query the wordnik API
  var url =u+word;
 loadJSON(url, gotData);
$(document).ready(function()
{
  $("table#tblid tr:even").css("background-color", "color code");
  $("table#tblid tr:odd").css("background-color", "color code");
});

  // And update the DOM to show the definition
  function gotData(arr) {
  
   //var arr = JSON.parse(data);
   var out = "";
    var i,c=0; 
		var display = document.getElementById("res");
     
	if(arr[0].Score=='disagree')
	  display.innerHTML='Fake News!!';
        else
          display.innerHTML='Real News!';   
	 if (arr[0].Score == "disagree") {
               
                try {
                     display.classList.remove("badge-success");
                } catch (err) {
                    console.log(err)
                } finally {
                    display.classList.add("badge-danger");
                }
            } else {
               
                try {
                    display.classList.remove("badge-danger");
                } catch (err) {
                    console.log(err)
                } finally {
                    display.classList.add("badge-success");
                }
            }
    
          
    out += "<table border='4'>" 
  for(i = 0; i < arr.length; i++) {
	 if(c>10)
         break;
      c=c+1;
    out +="<tr><td>" +'<a href="' + arr[i].link + '">' + 
    arr[i].title + '</a><br />' + "\n \n"+ arr[i].summary+"</td></tr>";
	
       }
    out+="</table>"
    var p = select('#definition');
    if (out) {
      p.html(out)
   } else {
      p.html('Something went wrong.');
    }
  var tblrows = document.getElementsByTagName('tr');

for(i=0;i<tblrows.length;i++){
    if(i%2==0) tblrows[i].style.backgroundColor = '#1abc9c';
    //else tblrows[i].style.backgroundColor = '#FFA07A';
}
  
}
}


