import json
import os
import time
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import convertapi

convertapi.api_secret = 'ZIeRoUr3M6QY1kk7'
from pdfdocument import document
from TopicItem import TopicItem
from openai import OpenAI
client = OpenAI()
g_questions = {}

app = Flask(__name__)
CORS(app, origins=['http://localhost:4200'])
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'textfiles')

assistant = client.beta.assistants.create(
  name="Answerer",
  description="You are a summarizer. Please take in lecture notes and produce flashcard type questions.",
  model="gpt-3.5-turbo",
  tools=[],
  file_ids=[]
)

thread = client.beta.threads.create()
client = OpenAI(
  organization='org-UxJY236GcEIyGZsNEygaJmo0',
)
client.models.list()

# Create a URL route in our application for "/"
@app.route("/tests", methods = ['GET', 'POST', 'DELETE'])
@cross_origin()
def grade():
    if request.method == 'GET':
	    # """return the information of user"""
        # grade = 75
        # weight = 10
        data = {"grade": 75, "name": "TEST 1", "weight": 10}
        return data
    # if request.method == 'POST':
    #     print(request.form['file'])
    #     item = TopicItem.__init__(request.form['title'], request.form['icon'], request.form['file'], request.form['quiz'], request.form['completed'], request.form['notes'])
    #     # pdf = document.PdfDocument.FromFile(item.file)
    #     print("I am working")
    #     convertapi.convert('txt', {
    #         'File': item.file
    #     }, from_format = 'pdf').save_files('/textfiles')
	#     """modify/update the information for <user_id>"""
    #     data = request.form # a multidict containing POST data
    # if request.method == 'DELETE':
	#     """delete user with ID <user_id>"""
    #     userId = request.args.get('user_id')
    # else:
        # Error 405 Method Not Allowed


@app.route("/topic", methods = ['GET', 'POST', 'PUT'])
@cross_origin()
def topic():
    if request.method == 'POST':
        file = request.files['demo[]']
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        print(file.filename)
        convertapi.convert('txt', {
            'File': filepath
        }, from_format = 'pdf').save_files(app.config['UPLOAD_FOLDER'])
        questions = generate_notes(file.filename)
        print("Done")
        return jsonify({'ok': 'True'})
    
    if request.method == 'PUT':
        print("json is" + request.get_json())
        name = request.get_json().split('.')[0]
        print(g_questions.items())
        questions = g_questions.get(name)
        print("Done2")
        return jsonify({'ok': 'True', 'questions': questions})
    
        
def generate_notes(filename):
    name = filename.split('.')[0]
    new_filepath = os.path.join(app.config['UPLOAD_FOLDER'], name + '.txt')
    question = "Please produce a set of questions for this text: "
    # output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.txt')
    with open(new_filepath, 'r') as r: 
        for line in r: 
            if line.strip(): 
                question += line

    # print(question)
    questions = []
    # print("len =" + str(len(questions)))
    while len(questions) == 0:
        message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=question
        )

        run = client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant.id
        )
        ready = False

        # print("send request")
        while(not ready):
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
            )
            if run.status == "completed":
                ready = True

        # print("responded")
        messages = client.beta.threads.messages.list(
        thread_id=thread.id
        )
        # print(messages)
        response = messages.data[0].content[0].text.value
        lines = response.split('\n')
        questions = [line.split('. ', 1)[1] for line in lines if line.strip().startswith(str(lines.index(line) + 1) + '. ')]
        # print(questions)
    g_questions[name] = questions
    # print(g_questions[name])

    

            
         
      
