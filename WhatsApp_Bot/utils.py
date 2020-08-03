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
