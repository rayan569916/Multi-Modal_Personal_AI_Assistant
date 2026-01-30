from flask import Flask
from flask_cors import CORS

def create_app():
    app=Flask(__name__)
    CORS(app,origins=["http://localhost:4200",
                "http://127.0.0.1:4200",
                "http://192.168.0.126:4200"])
    
    app.config.from_object('config')
    from flask_jwt_extended import JWTManager
    jwt = JWTManager(app)

    from routes.chat_routes import chat_route
    from routes.auth_routes import auth_bp
    app.register_blueprint(chat_route, url_prefix='/api/ai')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

    
if __name__=="__main__":
    app=create_app()
    app.run(
        debug=True,
        use_reloader=False  # 🔥 IMPORTANT
    )
