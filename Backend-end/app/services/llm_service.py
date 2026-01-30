import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    AutoConfig
)
from config import MODEL_NAME, MAX_NEW_TOKENS, TEMPERATURE

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# Phi models have no pad token → use EOS
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

print("Loading config...")
config = AutoConfig.from_pretrained(MODEL_NAME)

# 🔑 CRITICAL FIX (must be BEFORE model init)
config.pad_token_id = tokenizer.pad_token_id

print("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    config=config,
    dtype=torch.float32,     # ✅ torch_dtype is deprecated
    device_map="auto"
)

def generate_response(prompt: str) -> str:
    inputs = tokenizer(
        prompt,
        return_tensors="pt",
        padding=True,
        truncation=True
    ).to(model.device)

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_new_tokens=MAX_NEW_TOKENS,
            temperature=TEMPERATURE,
            do_sample=True
        )

    return tokenizer.decode(output[0], skip_special_tokens=True)
