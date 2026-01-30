import csv
import os
from werkzeug.security import generate_password_hash, check_password_hash

USERS_FILE = 'users.csv'

def _init_csv():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, mode='w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['username', 'password_hash'])

def find_user_by_username(username):
    _init_csv()
    with open(USERS_FILE, mode='r', newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['username'] == username:
                return row
    return None

def create_user(username, password):
    if find_user_by_username(username):
        return False
    
    password_hash = generate_password_hash(password)
    with open(USERS_FILE, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([username, password_hash])
    return True

def verify_password(stored_hash, password):
    return check_password_hash(stored_hash, password)
