import json
from openai import OpenAI
from docx import Document
print("Looking for file:", FIRMWARE_FILE)
import os
if not os.path.exists(FIRMWARE_FILE):
    print("[ERROR] FAILAS NERASTAS:", FIRMWARE_FILE)
    exit(1)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIRMWARE_FILE = os.path.join(BASE_DIR, "MetaCore_FIRMWARE", "core", "firmware_qna_test.docx")
RESULTS_FILE = "demo/result_output.json"
OPENAI_MODEL = "gpt-4"  # arba 'gpt-3.5-turbo'

def extract_questions(doc_path):
    doc = Document(doc_path)
    questions = [p.text.strip() for p in doc.paragraphs if p.text.strip().startswith(("1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10."))]
    return questions

def ask_openai(question):
    client = OpenAI()
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[{"role": "user", "content": question}]
    )
    return response.choices[0].message.content.strip()

def run_qna_test():
    questions = extract_questions(FIRMWARE_FILE)
    results = {}

    for i, q in enumerate(questions, 1):
        print(f"❓ Q{i}: {q}")
        answer = ask_openai(q)
        print(f"💬 A{i}: {answer}\n")
        results[f"Q{i}"] = {"question": q, "answer": answer}

    with open(RESULTS_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"✅ Atsakymai išsaugoti į: {RESULTS_FILE}")

if __name__ == "__main__":
    run_qna_test()
