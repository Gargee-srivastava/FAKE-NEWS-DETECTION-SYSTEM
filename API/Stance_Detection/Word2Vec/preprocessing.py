import emoji
from ekphrasis.classes.preprocessor import TextPreProcessor
from ekphrasis.classes.tokenizer import SocialTokenizer
from ekphrasis.dicts.emoticons import emoticons


def reframe_sentence(x, pre_processor):
    annotate_list = ["<hashtag>", "<allcaps>", "<elongated>", "<repeated>",
        '<emphasis>', '<censored>', "</hashtag>", "</allcaps>", "</elongated>", "</repeated>",
        '</emphasis>', '</censored>']

    pre_processed_text_temp = pre_processor.pre_process_doc(emoji.demojize(x))
    pre_processed_text = []

    for i in pre_processed_text_temp:
        if i not in annotate_list:
            pre_processed_text.append(i)

    res = " ".join(pre_processed_text)
    return res


text_processor = TextPreProcessor(
    normalize=['url', 'email', 'percent', 'money', 'phone', 'user',
        'time', 'date', 'number'],
    annotate={"hashtag", "allcaps", "elongated", "repeated",
        'emphasis', 'censored'},
    fix_html=True,
    segmenter="twitter",
    corrector="twitter",
    unpack_hashtags=True,
    unpack_contractions=True,
    spell_correct_elong=True,
    speel_correction=True,
    tokenizer=SocialTokenizer(lowercase=True).tokenize,
    dicts=[emoticons],
    fix_text=True,
    remove_tags=True
)




# tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=True)
# print(tokenizer.tokenize("cant wait for the new season of twin peaks ＼(^o^)／ ! david lynch tv series <happy>"))

# sentences = [
#     "CANT WAIT for the new season of #TwinPeaks ＼(^o^)／!!! #davidlynch #tvseries :))).",
#     "I saw the new #johndoe movie and it suuuuucks!!! WAISTED $10... #badmovies :/.",
#     "@SentimentSymp:  can't wait for the Nov 9 #Sentiment talks!  YAAAAAAY !!! :-D http://sentimentsymposium.com/."
# ]
