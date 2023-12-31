import json
import os
import time
from gradeditem import GradedItem
from flask import Flask, jsonify
from flask import request
from flask_cors import CORS, cross_origin
import convertapi

convertapi.api_secret = 'ZIeRoUr3M6QY1kk7'
from openai import OpenAI
client = OpenAI()
g_questions = {}
assignments = {}
graded_items = {}


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

@app.route("/grades", methods = ['GET', 'POST', 'DELETE', 'PUT'])
@cross_origin()
def gradedItems():
    if request.method == 'GET':
        json_dict = {}
        for key, value in graded_items.items():
            json_dict[key] = value.toJSON()
        print(json_dict)
        return jsonify({'ok': 'True', 'items': json_dict})
    if request.method == 'POST':
        print(request.data)
        real_data = json.loads(request.data)

        new_item = GradedItem(real_data['id'], real_data['name'], real_data['type'], real_data['dueDate'], real_data['weight'], real_data['grade'], real_data['file'], real_data['assignees'], real_data['course'], real_data['timelineItems'])
        graded_items[real_data['id']] = new_item
        print(new_item.toJSON())
        return jsonify({'ok': 'True', 'addedItem': new_item.toJSON()})
    if request.method == 'DELETE':
        real_data = json.loads(request.data)
        del graded_items[real_data['id']]
        return jsonify({'ok': 'True', 'items': graded_items})
    if request.method == 'PUT':
        real_data = json.loads(request.data)
        new_item = GradedItem(real_data['id'], real_data['name'], real_data['type'], real_data['dueDate'], real_data['weight'], real_data['grade'], real_data['file'], real_data['assignees'], real_data['course'], real_data['timelineItems'])
        graded_items[real_data['id']] = new_item
        return jsonify({'ok': 'True', 'updatedItem': new_item.toJSON()})



        
	    # """return the information of user"""
        # grade = 75
        # weight = 10
        # data = {"grade": 75, "name": "TEST 1", "weight": 10}
        # return data

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

@app.route("/assignment", methods = ['GET', 'POST', 'PUT'])
@cross_origin()
def assignment():
    if request.method == 'POST':
        file = request.files['demo[]']
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        print(file.filename)
        convertapi.convert('txt', {
            'File': filepath
        }, from_format = 'pdf').save_files(app.config['UPLOAD_FOLDER'])
        questions = generate_tasks(file.filename)
        print("aDone")
        print(assignments)
        return jsonify({'ok': 'True'})
    
    if request.method == 'PUT':
        print("json was" + request.get_json())
        name = request.get_json().split('.')[0]
        items = assignments[name]
        print("aDone2")
        return jsonify({'ok': 'True', 'assignments': items})
    
        
def generate_tasks(filename):
    name = filename.split('.')[0]
    new_filepath = os.path.join(app.config['UPLOAD_FOLDER'], name + '.txt')
    question = "please take in the following assignment description and split it into manageable tasks assigned to 4 separate people. Please return to me a json array storing each task in chronological order with a title, list of assignees, and a description of the task: "
    with open(new_filepath, 'r') as r: 
        for line in r: 
            if line.strip(): 
                question += line

    tasks = {}
    while len(tasks) == 0:
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

        print("Waiting stage")
        while(not ready):
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
            )
            if run.status == "completed":
                ready = True

        messages = client.beta.threads.messages.list(
        thread_id=thread.id
        )
        response = messages.data[0].content[0].text.value
        print("resp" + response)
        # print(response)
        tasks = response
        # lines = response.split('\n')
        # questions = [line.split('. ', 1)[1] for line in lines if line.strip().startswith(str(lines.index(line) + 1) + '. ')]
   
    assignments[name] = tasks
    # print("Ass" + assignments.keys)



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
    with open(new_filepath, 'r') as r: 
        for line in r: 
            if line.strip(): 
                question += line

    questions = []
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

        while(not ready):
            time.sleep(1)
            run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
            )
            if run.status == "completed":
                ready = True

        messages = client.beta.threads.messages.list(
        thread_id=thread.id
        )
        response = messages.data[0].content[0].text.value
        lines = response.split('\n')
        questions = [line.split('. ', 1)[1] for line in lines if line.strip().startswith(str(lines.index(line) + 1) + '. ')]
   
    g_questions[name] = questions
