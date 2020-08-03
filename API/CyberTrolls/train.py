from keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split
import torch
import torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler, random_split
from transformers import AdamW, get_linear_schedule_with_warmup
import emoji
from ekphrasis.classes.preprocessor import TextPreProcessor
from ekphrasis.classes.tokenizer import SocialTokenizer
from ekphrasis.dicts.emoticons import emoticons
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from transformers import (WEIGHTS_NAME, BertConfig,
                                  BertForSequenceClassification, BertTokenizer)
import random
import time
import datetime
from sklearn.metrics import confusion_matrix
import pandas as pd

df = pd.read_json('Dataset for Detection of Cyber-Trolls.json', lines=True)

def reframe_sentence(x):
    annotate_list = ["<hashtag>", "<allcaps>", "<elongated>", "<repeated>",
        '<emphasis>', '<censored>', "</hashtag>", "</allcaps>", "</elongated>", "</repeated>",
        '</emphasis>', '</censored>']

    pre_processed_text_temp = text_processor.pre_process_doc(emoji.demojize(x))
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

df.drop(['extras'],axis=1,inplace=True)
def mark_category(stance):
    if len(stance['label']) > 1:
        print('debug')
    return int(stance['label'][0])

df['labels']=df['annotation'].apply(mark_category)
df.drop(['annotation'],axis=1,inplace=True)
df['content']=df['content'].apply(reframe_sentence)
# df.drop(['Headline','articleBody'],axis=1,inplace=True)

config_class, model_class, tokenizer_class = BertConfig, BertForSequenceClassification, BertTokenizer
content = df.content.values
labels = df.labels.values
del df

tokenizer = tokenizer_class.from_pretrained('bert-base-cased', do_lower_case=False)

# Tokenize all of the sentences and map the tokens to thier word IDs.
content_ids = []
content_attention_masks = []

# For every sentence...
for input in content:
    encoded_input = tokenizer.encode(
                        input,                      # Sentence to encode.
                        add_special_tokens = True, # Add '[CLS]' and '[SEP]'
                   )
    
    content_ids.append(encoded_input)

# Set the maximum sequence length.
MAX_LEN = 256
content_ids = pad_sequences(content_ids, maxlen=MAX_LEN, dtype="long", 
                          value=0, truncating="post", padding="post")

# Create attention masks
content_attention_masks = []

# For each sentence...
for sent in content_ids:
    
    att_mask = [int(token_id > 0) for token_id in sent]
    
    content_attention_masks.append(att_mask)

# Use 90% for training and 10% for validation.
train_inputs, validation_inputs, train_labels, validation_labels = train_test_split(content_ids, labels,
                                                            random_state=42, test_size=0.1)
# Do the same for the masks.
train_masks, validation_masks, _, _ = train_test_split(content_attention_masks, labels,
                                             random_state=42, test_size=0.1)
import torch
train_inputs = torch.tensor(train_inputs)
validation_inputs = torch.tensor(validation_inputs)

train_labels = torch.tensor(train_labels)
validation_labels = torch.tensor(validation_labels)

train_masks = torch.tensor(train_masks)
validation_masks = torch.tensor(validation_masks)

batch_size = 16

# Create the DataLoader for our training set.
train_data = TensorDataset(train_inputs, train_masks, train_labels)
train_sampler = RandomSampler(train_data)
train_dataloader = DataLoader(train_data, sampler=train_sampler, batch_size=batch_size)

# Create the DataLoader for our validation set.
validation_data = TensorDataset(validation_inputs, validation_masks, validation_labels)
validation_sampler = SequentialSampler(validation_data)
validation_dataloader = DataLoader(validation_data, sampler=validation_sampler, batch_size=batch_size)

del train_data
del validation_data
del train_inputs
del validation_inputs
del train_labels
del validation_labels
del train_masks
del validation_masks

del content_ids
del content_attention_masks
del labels

class BertCSC413_Linear(BertForSequenceClassification):
    def __init__(self, config):
        super(BertCSC413_Linear, self).__init__(config)
        self.classifier = nn.Linear(config.hidden_size, self.config.num_labels)

model_finetune_bert = BertCSC413_Linear.from_pretrained(
    "bert-base-uncased", 
    num_labels = 2,    
    output_attentions = False, 
    output_hidden_states = False,
)

seed_val = 42

random.seed(seed_val)
np.random.seed(seed_val)
torch.manual_seed(seed_val)
torch.cuda.manual_seed_all(seed_val)

device = torch.device("cuda")
model_finetune_bert.to(device)

def flat_accuracy(preds, labels):
    pred_flat = np.argmax(preds, axis=1).flatten()
    labels_flat = labels.flatten()
    return np.sum(pred_flat == labels_flat) / len(labels_flat), pred_flat, labels_flat

def format_time(elapsed):
    elapsed_rounded = int(round((elapsed)))
    return str(datetime.timedelta(seconds=elapsed_rounded))

def train_model(model):      
    optimizer = AdamW(model.parameters(),
                  lr = 2e-5, # args.learning_rate - default is 5e-5, our notebook had 2e-5
                  eps = 1e-8 # args.adam_epsilon  - default is 1e-8.
                )
    epochs = 4
    total_steps = len(train_dataloader) * epochs
    scheduler = get_linear_schedule_with_warmup(optimizer, 
                                            num_warmup_steps = 0, 
                                            num_training_steps = total_steps)
    loss_values = []
    best_accuracy = 0

    for epoch_i in range(0, epochs):
        print("")
        print('======== Epoch {:} / {:} ========'.format(epoch_i + 1, epochs))
        print('Training...')
        t0 = time.time()

        total_loss = 0
        model.train()

        for step, batch in enumerate(train_dataloader):

            if step % 40 == 0 and not step == 0:
                elapsed = format_time(time.time() - t0)
                
                # Report progress.
                print('  Batch {:>5,}  of  {:>5,}.    Elapsed: {:}.'.format(step, len(train_dataloader), elapsed))

            b_input_ids = batch[0].to(device)
            b_input_mask = batch[1].to(device)
            b_labels = batch[2].to(device)

            model.zero_grad()        

            # Perform a forward pass (evaluate the model on this training batch).
            # This will return the loss (rather than the model output) because we
            # have provided the `labels`.
            # The documentation for this `model` function is here: 
            # https://huggingface.co/transformers/v2.2.0/model_doc/bert.html#transformers.BertForSequenceClassification
            outputs = model(b_input_ids, 
                        token_type_ids=None, 
                        attention_mask=b_input_mask, 
                        labels=b_labels)
            
            # The call to `model` always returns a tuple, so we need to pull the 
            # loss value out of the tuple.
            loss = outputs[0]

            # Accumulate the training loss over all of the batches so that we can
            # calculate the average loss at the end. `loss` is a Tensor containing a
            # single value; the `.item()` function just returns the Python value 
            # from the tensor.
            total_loss += loss.item()

            # Perform a backward pass to calculate the gradients.
            loss.backward()

            # Clip the norm of the gradients to 1.0.
            # This is to help prevent the "exploding gradients" problem.
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)

            # Update parameters and take a step using the computed gradient.
            # The optimizer dictates the "update rule"--how the parameters are
            # modified based on their gradients, the learning rate, etc.
            optimizer.step()

            # Update the learning rate.
            scheduler.step()

        # Calculate the average loss over the training data.
        avg_train_loss = total_loss / len(train_dataloader)            
        
        # Store the loss value for plotting the learning curve.
        loss_values.append(avg_train_loss)

        print("")
        print("  Average training loss: {0:.2f}".format(avg_train_loss))
        print("  Training epoch took: {:}".format(format_time(time.time() - t0)))
            

        print("Running Validation...")
        predlist=torch.zeros(0,dtype=torch.long, device='cpu')
        lbllist=torch.zeros(0,dtype=torch.long, device='cpu')

        t0 = time.time()
        model.eval()

        eval_loss, eval_accuracy = 0, 0
        nb_eval_steps, nb_eval_examples = 0, 0

        # Evaluate data for one epoch
        for batch in validation_dataloader:
            batch = tuple(t.to(device) for t in batch)
            # batch = tuple(t for t in batch)
            b_input_ids, b_input_mask, b_labels = batch
            
            with torch.no_grad():        
                # Forward pass, calculate logit predictions.
                # This will return the logits rather than the loss because we have
                # not provided labels.
                # token_type_ids is the same as the "segment ids", which 
                # differentiates sentence 1 and 2 in 2-sentence tasks.
                outputs = model(b_input_ids, 
                                token_type_ids=None, 
                                attention_mask=b_input_mask)
            
            # Get the "logits" output by the model. The "logits" are the output
            # values prior to applying an activation function like the softmax.
            logits = outputs[0]

            _, preds = torch.max(logits, 1)

            # Move logits and labels to CPU
            logits = logits.detach().cpu().numpy()
            label_ids = b_labels.to('cpu').numpy()
            # Calculate the accuracy for this batch of test sentences.
            tmp_eval_accuracy, pred_flat, label_flat = flat_accuracy(logits, label_ids)
            predlist=torch.cat([predlist,preds.view(-1).cpu()])
            lbllist=torch.cat([lbllist,b_labels.view(-1).cpu()])
            # Accumulate the total accuracy.
            eval_accuracy += tmp_eval_accuracy
            # Track the number of batches
            nb_eval_steps += 1

        conf_mat=confusion_matrix(lbllist.numpy(), predlist.numpy())
        print(conf_mat)
        class_accuracy=100*conf_mat.diagonal()/conf_mat.sum(1)
        print("  Accuracy: {0:.2f}".format(eval_accuracy/nb_eval_steps))
        print(class_accuracy)
        if eval_accuracy/nb_eval_steps > best_accuracy:
            torch.save(model.state_dict(), "model-1.bin")
            best_accuracy = eval_accuracy/nb_eval_steps
        print("  Validation took: {:}".format(format_time(time.time() - t0)))

    print("")
    print("Training complete!")
    return loss_values

finttune_bert_loss_vals = train_model(model_finetune_bert)