from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import spacy
from spacy.matcher import Matcher
from typing import List, Dict

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

nlp = spacy.load('en_core_web_sm')

@app.post("/pos_tagging/")
async def pos_tagging(text: str = Form(...)):
    """
    Perform POS tagging on the input text.
    """
    doc = nlp(text)
    tokens = []
    for token in doc:
        tokens.append({
            'text': token.text,
            'pos': token.pos_,
            'tag': token.tag_,
            'start': token.idx,
            'end': token.idx + len(token.text)
        })
    return {'tokens': tokens}

@app.post("/chunking/")
async def chunking(text: str = Form(...), formula: str = Form(...)):
    """
    Perform chunking based on the provided formula.
    """
    doc = nlp(text)
    patterns = parse_formula(formula)
    matcher = Matcher(nlp.vocab)
    matcher.add('CustomChunk', [patterns])
    matches = matcher(doc)
    chunks = []
    for match_id, start, end in matches:
        span = doc[start:end]
        chunks.append({
            'text': span.text,
            'start': span.start_char,
            'end': span.end_char,
            'labels': [token.pos_ for token in span]
        })
    return {'chunks': chunks}

def parse_formula(formula: str) -> List[Dict]:
    """
    Parses the custom formula into spaCy matcher patterns.
    Supports quantifiers like '*' (zero or more), '+' (one or more), '?' (zero or one).
    """
    tokens = formula.strip().split()
    pattern = []
    for token in tokens:
        if '*' in token:
            pos = token.replace('*', '')
            pattern.append({'POS': pos, 'OP': '*'})
        elif '+' in token:
            pos = token.replace('+', '')
            pattern.append({'POS': pos, 'OP': '+'})
        elif '?' in token:
            pos = token.replace('?', '')
            pattern.append({'POS': pos, 'OP': '?'})
        else:
            pattern.append({'POS': token})
    return pattern