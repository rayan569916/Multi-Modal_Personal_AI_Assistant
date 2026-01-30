def prompt_builder(text_message:str,extracted_input:str)->str:
    return f"""
You are a helpful personal AI assistant.

User message:
{text_message}

Context extracted from files:
{extracted_input}

Give a clear, concise, and helpful answer.
"""