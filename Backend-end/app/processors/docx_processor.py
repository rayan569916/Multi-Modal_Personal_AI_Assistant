import docx
from io import BytesIO

def extract_text_from_docx_file(file):
    doc=docx.Document(BytesIO(file.read()))
    return "\n".join(p.text for p in doc.paragraphs)
