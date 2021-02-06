
 ##DISCLAIMER: Any Part or segment of the comments presented as documentation cannot be modified or removed without the proper permission from the current author. If any of the documentation in the public domain is found without proper credits and permission of the author, it will be dealt as plagiarism of the original code. However, part of the codes can be customized and used as per needs without any permission for personal use.
 #Author: GARGEE SRIVASTAVA
 #Contact details: srivastava.gargee@gmail.com
 #Developed for: Smart India Hackathon 2020
 

import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="jokes-jjcedq-ba06145b949e.json"
import dialogflow_v2 as dialogflow
dialogflow_session_client=dialogflow.SessionsClient()
PROJECT_ID="jokes-jjcedq"

def detect_intent_from_text(text,session_id,language_code='en'):
    session = dialogflow_session_client.session_path(PROJECT_ID,session_id)
    text_input = dialogflow.types.TextInput(text=text,language_code=language_code)
    query_input= dialogflow.types.QueryInput(text=text_input)
    response = dialogflow_session_client.detect_intent(session=session,query_input=query_input)
    return response.query_result


def fetch_reply(query,session_id):

    response=detect_intent_from_text(query,session_id) 
    return response.fulfillment_text # here 12345 is session id , it could be a phone number

    #print(response.fulfillment_text)   # to print the text from response

    #print(response.intent.display_name)

    #print(response.intent_detection_confidence)


#fetch_reply("tell me joke",1234)
