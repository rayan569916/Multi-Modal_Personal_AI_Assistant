from flask import Blueprint,jsonify,request
from flask_jwt_extended import jwt_required
from services.prompt_builder import prompt_builder
from services.llm_service import generate_response
from processors.image_processor import extract_text_from_image
from processors.docx_processor import extract_text_from_docx_file
from processors.pdf_processor import extract_text_from_pdf_file

chat_route=Blueprint('chat',__name__)

@chat_route.route('/chatRequest',methods=['POST'])
@jwt_required()
def chat_request():
    text_message=request.form.get('text')
    attachments=request.files.getlist('attachements')
    extracted_input=""
    for files in attachments:
        if files.content_type.startswith("image"):
            extracted_input +=extract_text_from_image(files)
        elif files.filename.endswith('.pdf'):
            extracted_input+=extract_text_from_pdf_file(files)
        elif files.filename.endswith(".docx"):
            extracted_input+=extract_text_from_docx_file(files)
        files.seek(0)

    prompt=prompt_builder(text_message,extracted_input)
    response=generate_response(prompt)

    return jsonify({"message":response}), 200