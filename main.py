from django.shortcuts import render
import requests
import json
import pdfplumber
import pytesseract
from pdf2image import convert_from_path
import cv2
import numpy as np
import spacy
from transformers import BertTokenizer, BertModel
from deep_translator import GoogleTranslator
import torch
import torch.nn as nn
import torch.optim as optim
import random
from collections import deque
from bs4 import BeautifulSoup
import ollama
from io import BytesIO



"""
def index(request):
    context={}
    return render(request, "myApp/index.html", context)
"""
# Function to send a chat message to the Ollama model and get a response
def analyze_and_chat_with_emo(text, query):
    # Use the Ollama API to get a response from the llama3.1 model
    stream = ollama.chat(
        model='llama3.1',
        messages=[{'role': 'user', 'content': query}],
        stream=True,
    )
    
    response_content = ''
    for chunk in stream:
        response_content += chunk['message']['content']
    
    return response_content if response_content else "Sorry, I couldn't get a response from the model."

# Define supported languages
supported_languages = {
    'hi': 'Hindi',
    'en': 'English',
    'fr': 'French',
    'de': 'German',
    'ko': 'Korean',
    'ta': 'Tamil',
    'te': 'Telugu',
    'mr': 'Marathi',
    'es': 'Spanish',
    'zh-cn': 'Chinese (Simplified)',
    'ja': 'Japanese'
}

# Function to extract text from a regular (non-scanned) PDF using pdfplumber
def extract_text_with_pdfplumber(pdf_path):
    text = ''
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to extract text from a scanned PDF using Tesseract OCR
def extract_text_from_scanned_pdf(pdf_path):
    images = convert_from_path(pdf_path)
    text = ''
    for image in images:
        image = np.array(image)
        gray_image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        text += pytesseract.image_to_string(gray_image)
    return text

# Function to fetch and process content from a URL
def fetch_and_process_content(url):
    response = requests.get(url)
    content_type = response.headers['Content-Type']
    
    if 'pdf' in content_type:
        # Agar PDF hai
        pdf_file = BytesIO(response.content)
        return extract_text_from_pdf(BytesIO(response.content))
    elif 'text/html' in content_type:
        # Agar HTML hai
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.get_text()
        return text
    else:
        return "Unsupported content type"

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_file):
    text = ''
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to structure text into paragraphs
def structure_text(text):
    paragraphs = text.split('\n\n')
    structured_data = [para.strip() for para in paragraphs if para.strip()]
    return structured_data

# Function to process query with BERT
def process_query_with_bert(query):
    inputs = tokenizer(query, return_tensors='pt')
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state
    return embeddings

# Function to process user query using spaCy
def process_query(query):
    doc = nlp(query)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]
    return entities, keywords

# Function to find relevant paragraphs based on keywords
def find_relevant_paragraphs(keywords, structured_text):
    relevant_paragraphs = []
    for paragraph in structured_text:
        if any(keyword.lower() in paragraph.lower() for keyword in keywords):
            relevant_paragraphs.append(paragraph)
    return relevant_paragraphs

# Function to translate text
def translate_text(text, target_language):
    if target_language not in supported_languages:
        raise ValueError(f"Target language '{target_language}' is not supported. Supported languages are: {', '.join(supported_languages.keys())}")

    translator = GoogleTranslator(target_lang=target_language)
    translation = translator.translate(text)
    return translation

# Function to search Google and extract relevant data
def google_search(query):
    search_url = f"https://www.google.com/search?q={query}"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    search_results = []
    for g in soup.find_all(class_='BVG0Nb'):
        search_results.append(g.text)
    
    return search_results

# Define the environment (simplified for the example)
class ChatbotEnv:
    def _init_(self):
        self.state_space = 10
        self.action_space = 2
        self.state = np.zeros(self.state_space)  # Initialize state as an array with zeros
    
    def reset(self):
        self.state = np.random.rand(self.state_space)  # Return a state with proper shape
        return self.state
    
    def step(self, action):
        reward = 0
        if action == 0:
            reward = 1
        else:
            reward = -1
        self.state = np.random.rand(self.state_space)  # Return a new state with proper shape
        done = False
        return self.state, reward, done

# Neural Network Model
class DQN(nn.Module):
    def _init_(self, state_space, action_space):
        super(DQN, self)._init_()
        self.fc1 = nn.Linear(state_space, 24)  # Ensure state_space matches the environment
        self.fc2 = nn.Linear(24, 24)
        self.fc3 = nn.Linear(24, action_space)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

# DQN Agent
class DQNAgent:
    def _init_(self, state_space, action_space):
        self.state_space = state_space
        self.action_space = action_space
        self.memory = deque(maxlen=2000)
        self.gamma = 0.95
        self.epsilon = 1.0
        self.epsilon_min = 0.01
        self.epsilon_decay = 0.995
        self.learning_rate = 0.001
        self.model = DQN(state_space, action_space)
        self.optimizer = optim.Adam(self.model.parameters(), lr=self.learning_rate)
        self.criterion = nn.MSELoss()
    
    def remember(self, state, action, reward, next_state, done):
        self.memory.append((state, action, reward, next_state, done))
    
    def act(self, state):
        if np.random.rand() <= self.epsilon:
            return random.randrange(self.action_space)
        state = torch.FloatTensor(state).unsqueeze(0)
        act_values = self.model(state)
        return torch.argmax(act_values).item()
    
    def replay(self, batch_size):
        minibatch = random.sample(self.memory, batch_size)
        for state, action, reward, next_state, done in minibatch:
            state = torch.FloatTensor(state).unsqueeze(0)
            target_f = self.model(state).clone()  # Clone to ensure we have a fresh copy
            
            target = reward
            if not done:
                next_state = torch.FloatTensor(next_state).unsqueeze(0)
                target = reward + self.gamma * torch.max(self.model(next_state)).item()
            
            # Ensure target_f has correct shape and update the target value
            target_f = target_f.squeeze(0)  # Remove the batch dimension
            
            if action < len(target_f):  # Ensure action is within bounds
                target_f[action] = target
            
            target_f = target_f.unsqueeze(0)  # Add batch dimension back
            self.optimizer.zero_grad()
            loss = self.criterion(target_f, self.model(state))
            loss.backward()
            self.optimizer.step()
        
        if self.epsilon > self.epsilon_min:
            self.epsilon *= self.epsilon_decay

# Load models and initialize tools
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
nlp = spacy.load('en_core_web_sm')

# Main function to demonstrate the pipeline
def main(input_source, input_type, query, target_language):
    if target_language not in supported_languages:
        raise ValueError(f"Target language '{target_language}' is not supported. Supported languages are: {', '.join(supported_languages.keys())}")

    # Determine karo ki input URL hai ya PDF path
    if input_type == 'url':
        extracted_text = fetch_and_process_content(input_source)
    elif input_type == 'pdf':
        extracted_text = extract_text_with_pdfplumber(input_source)
    else:
        raise ValueError("Invalid input type. Must be 'url' or 'pdf'.")

    structured_text = structure_text(extracted_text)
    
    # Process the query
    entities, keywords = process_query(query)
    relevant_paragraphs = find_relevant_paragraphs(keywords, structured_text)
    
    # Translate the query
    translated_query = translate_text(query, target_language)
    
    # Google search for additional data
    google_results = google_search(query)
    
    # Analyze and chat using emo model
    emo_response = analyze_and_chat_with_emo(extracted_text, query)
    
    # Print relevant information
    print("Relevant Information Found from Document:")
    for para in relevant_paragraphs:
        print(para)
    
    print("\nAdditional Information from Google:")
    for result in google_results:
        print(result)
    
    print("\nTranslated Query:", translated_query)
    print("\nEmo Model Response:", emo_response)
    
    # Interactive conversation with the emo model
    while True:
        user_input = input("\nAsk something about the content or type 'exit' to end the conversation: ")
        if user_input.lower() == 'exit':
            print("Thank you for using the chatbot! If you have any more questions, feel free to ask.")
            break
        
        response = analyze_and_chat_with_emo(extracted_text, user_input)
        print("\nEmo Model Response:", response)
    
    # Setup and train the DQN agent (if needed)
    # ...

    # User Feedback
    feedback = input("Was this information helpful? (thumbs up/down): ").strip().lower()
    if feedback == "thumbs up":
        print("Thank you for your positive feedback! We're glad we could assist you.")
    elif feedback == "thumbs down":
        print("We're sorry to hear that. Please let us know how we can improve.")
    else:
        print("Invalid feedback. Please provide 'thumbs up' or 'thumbs down'.")

    # Polite Response
    print("\nIf you have any more questions or need further assistance, feel free to ask!")

# Example usage
input_source = "C:/Users/Rishav/Downloads/lech104.pdf"  # URL ya PDF path
input_type = "pdf"  # 'url' ya 'pdf'
query = "Explain the issue in English."
target_language = 'hi'

main(input_source, input_type, query, target_language)


from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
import os
from .models import UploadedFile
from .forms import UploadFileForm
from django.core.files.storage import default_storage
import pdfplumber
import pytesseract
from pdf2image import convert_from_path
import cv2
import numpy as np
import spacy
from transformers import BertTokenizer, BertModel
from deep_translator import GoogleTranslator
import ollama
from bs4 import BeautifulSoup

# Load models and initialize tools
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
nlp = spacy.load('en_core_web_sm')

def index(request):
    return render(request, 'index.html')
#flask

def upload_pdf(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = form.cleaned_data['file']
            filename = default_storage.save(f'uploads/{file.name}', file)
            file_path = default_storage.path(filename)
            extracted_text = extract_text_with_pdfplumber(file_path)
            request.session['pdf_text'] = extracted_text
            return JsonResponse({'text': extracted_text}, status=200)
        else:
            return JsonResponse({'error': 'Invalid file type'}, status=400)
    return HttpResponseBadRequest('Invalid request method')

def fetch_content(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        if not url:
            return JsonResponse({'error': 'No URL provided'}, status=400)

        extracted_text = fetch_and_process_content(url)
        return JsonResponse({'text': extracted_text}, status=200)
    return HttpResponseBadRequest('Invalid request method')

def query(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        target_language = request.POST.get('target_language')
        input_source = request.POST.get('input_source')
        input_type = request.POST.get('input_type')

        if not all([query, target_language, input_source, input_type]):
            return JsonResponse({'error': 'Missing parameters'}, status=400)

        if input_type == 'url':
            extracted_text = fetch_and_process_content(input_source)
        elif input_type == 'pdf':
            extracted_text = extract_text_with_pdfplumber(input_source)
        else:
            return JsonResponse({'error': 'Invalid input type'}, status=400)

        structured_text = structure_text(extracted_text)
        entities, keywords = process_query(query)
        relevant_paragraphs = find_relevant_paragraphs(keywords, structured_text)
        translated_query = translate_text(query, target_language)
        google_results = google_search(query)
        emo_response = analyze_and_chat_with_emo(extracted_text, query)

        return JsonResponse({
            'relevant_paragraphs': relevant_paragraphs,
            'google_results': google_results,
            'translated_query': translated_query,
            'emo_response': emo_response
        }, status=200)
    return HttpResponseBadRequest('Invalid request method')

def live_chat(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        if not query:
            return JsonResponse({'error': 'No query provided'}, status=400)

        pdf_text = request.session.get('pdf_text', None)
        if not pdf_text:
            return JsonResponse({'error': 'No PDF text available. Please upload a PDF first.'}, status=400)

        response = analyze_and_chat_with_emo(pdf_text, query)
        return JsonResponse({'response': response}, status=200)
    return HttpResponseBadRequest('Invalid request method')