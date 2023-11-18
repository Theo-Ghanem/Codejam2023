from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Create a URL route in our application for "/"
@app.route("/tests", methods = ['GET', 'POST', 'DELETE'])
@cross_origin()
def grade():
    if request.method == 'GET':
	    # """return the information of user"""
        # grade = 75
        # weight = 10
        data = {"grade": 75, "weight": 10}
        return data
    # if request.method == 'POST':
	#     """modify/update the information for <user_id>"""
    #     data = request.form # a multidict containing POST data
    # if request.method == 'DELETE':
	#     """delete user with ID <user_id>"""
    #     userId = request.args.get('user_id')
    # else:
        # Error 405 Method Not Allowed