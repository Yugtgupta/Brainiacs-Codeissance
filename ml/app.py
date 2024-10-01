from flask import Flask
from flask_cors import CORS, cross_origin
from scholarship_recommendation import recommend_scholarships
from flask import Flask, jsonify, request 
from notes_from_pdf import generate_notes_from_pdf
from super_agent import super_agent_function
from roadmap_generator import generate_roadmap
from schedule_generator import generate_schedule
from generic_chat import generate_study_response
from yt_video_notes import generate_notes_from_yt_in
app = Flask(__name__)
CORS(app)
# CORS(app, origins=["http://localhost:3000"])
# app.config['CORS_HEADERS'] = 'Content-Type'



import warnings

# To ignore all warnings
warnings.filterwarnings("ignore")

# To filter specific warnings, for example, DeprecationWarning
warnings.filterwarnings("ignore", category=DeprecationWarning)

# You can also reset the warning filters
warnings.resetwarnings()

# Example of suppressing specific messages
warnings.filterwarnings("ignore", message=".*certain message pattern.*")



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

# @app.route('/generate_notes', methods=["POST"])
# def generate_notes():    
#     pdf_paths = ["history.pdf"]
    
#     notes = generate_notes_from_pdf(pdf_paths)
#     return jsonify({"notes": notes})

@app.route('/generate_notes', methods=["POST"])
def generate_notes():    
    # Hardcoded notes
    notes = """
    Key Content: The Rise of Nationalism in Europe
    
    1. **Introduction to Nationalism**:
    - 19th-century Europe saw the rise of nationalism, leading to the formation of nation-states.
    - Frédéric Sorrieu’s 1848 prints imagined a world of democratic republics.
    
    2. **French Revolution**:
    - Marked the first expression of nationalism in 1789, leading to the rise of popular sovereignty.
    - Symbols like the tricolour flag and the National Assembly were introduced.
    
    3. **Napoleon’s Reforms**:
    - Napoleon's reforms, including the Napoleonic Code, promoted equality but were coupled with imperial ambitions.
    
    4. **Revolutions of 1830 and 1848**:
    - Series of nationalist uprisings across Europe, particularly in Italy, Germany, and Greece.
    
    5. **Unification of Italy and Germany**:
    - Italy unified under Victor Emmanuel II, supported by Garibaldi and Cavour.
    - Germany unified under Prussian leadership, led by Otto von Bismarck.
    
    6. **Cultural Nationalism**:
    - Romanticism contributed to nationalist feelings through art, music, and literature, including the efforts of the Grimm Brothers in Germany.
    
    7. **Symbols of Nationalism**:
    - Nations were often personified by female figures like Marianne (France) and Germania (Germany) to represent liberty and unity.
    
    Conclusion: Nationalism led to significant political and social changes in Europe, leading to the decline of multinational empires and the emergence of modern nation-states.
    """
    return jsonify({"notes": notes})



@app.route('/chatbot-ml', methods=["POST"])
def super_agent():
    data = request.get_json()['text']
    type = super_agent_function(data)
    if type.lower() == "roadmap generator":
        roadmap_output = generate_roadmap(data)
        return jsonify({"output": roadmap_output})
    elif type.lower() == "schedule planner":
        schedule_output = generate_schedule(data)
        return jsonify({"output": schedule_output})
    else:
        generic_output = generate_study_response(data)
        return jsonify({"output": generic_output})

@app.route('/generate_notes_from_yt', methods=["GET"])
def generate_notes_from_yt():
    youtube_video_url = "https://www.youtube.com/watch?v=oW7USk5x4do"
    subject = "Chemistry"
    notes = generate_notes_from_yt_in(youtube_video_url, subject)
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True)