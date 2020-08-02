/**
 *DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 *Author: GARGEE SRIVASTAVA
 *Contact details: srivastava.gargee@gmail.com
 *Developed for: Affective Computing Team, IIT-Guwahati for development of vedinkakSa, a sensitive classroom application.
 */
/*
  Utility functions needed by the front and backends of the extension
  */
function url2Domain(url){
    'use strict';
    if(url){
      url = url.toString().replace(/^(?:https?|ftp)\:\/\//i, '');
      url = url.toString().replace(/^www\./i, '');
      url = url.toString().replace(/\/.*/, '');
      return url;
    }
}
