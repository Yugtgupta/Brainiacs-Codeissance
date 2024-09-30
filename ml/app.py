from flask import Flask
from scholarship_recommendation import recommend_scholarships
from vivatool import generate_viva_questions
from flask import Flask, jsonify, request 
import super_agent as super_agent
import roadmap_generator as roadmap_generator
import schedule_generator as schedule_generator
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    # Assume user profile comes as JSON in the request body
    user_profile = request.json.get('user_profile', '')
    # Call the method from scholarship_recommendation.py
    recommendations = recommend_scholarships(user_profile)
    # Return recommendations as JSON response
    return jsonify({"recommendations": recommendations})

# Declare qa_dict as a global variable
qa_dict = {}

@app.route('/get_viva_questions/<int:num>', methods=['POST'])
def get_viva_questions(num):
    global qa_dict  # Indicating that qa_dict is global

    if num == 1:
        # Get difficulty level and PDF paths from the POST request
        data = request.json
        difficulty_level = data.get('difficulty_level', 'easy')  # Default to 'easy' if not provided
        pdf_paths = data.get('pdf_paths', [])  # List of paths to PDFs

        if not pdf_paths:
            return jsonify({"error": "No PDF paths provided"}), 400
        
        # Call the generate_viva_questions method
        qa_dict = generate_viva_questions(difficulty_level, pdf_paths)

        # Return the first viva question
        return jsonify(qa_dict.get("Question 1"))
    
    else:
        # Construct the key for the nth question (e.g., "Question 2" for num=2)
        question_key = f"Question {num}"
        
        # Ensure the question exists in qa_dict
        if question_key in qa_dict:
            return jsonify(qa_dict.get(question_key))
        else:
            return jsonify({"error": f"Question {num} does not exist"}), 404


@app.route('/chatbot', methods=["POST"])
def analyze():
    text = request.get_json()['text']
    type = super_agent.super_agent_function(text)
    output=''
    if type == "Roadmap Generator":
        output = roadmap_generator.send_mail(text)
    elif type == "Schedule Planner":
        output = schedule_generator.github_action(text)
    else:
        output = llm_generic.realtime_agent_function(text)
    # print(output)
    return jsonify({
        'output': output
    })
    



if __name__ == '__main__':
    app.run(debug=True)