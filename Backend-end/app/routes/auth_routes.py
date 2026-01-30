from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.user_service import create_user, find_user_by_username, verify_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    if create_user(username, password):
        return jsonify({"message": "User registered successfully"}), 201
    else:
        return jsonify({"message": "Username already exists"}), 409

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = find_user_by_username(username)
    if user and verify_password(user['password_hash'], password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token, username=username), 200
    
    return jsonify({"message": "Invalid credentials"}), 401
