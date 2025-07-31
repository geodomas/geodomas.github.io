import os
import json
import sys
from docx import Document
from openai import OpenAI

# ➕ Pridedame kelią į tools
sys.path.append("tools")
try:
    from config import FIRMWARE_FILE, OUTPUT_FILE
except ImportError:
    FIRMWARE_FILE = None
    OUTPUT_FILE = None

# 📁 Fallback jei import nepavyko arba failo nėra
if not FIRMWARE_FILE or not os.path.exists(FIRMWARE_FILE):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    FIRMWARE_FILE = os.path.join(BASE_DIR, "..", "MetaCore_FIRMWARE", "core", "firmware_qna_test.docx")
    OUTPUT_FILE = os.path.join(BASE_DIR, "..", "demo", "result_output.json")

# ✅ Failo patikrinimas
print(f"🔍 Tikrinamas failas: {FIRMWARE_FILE}")
if not os.path.exists(FIRMWARE_FILE):
    print(f"❌ [KLAIDA] Failas nerastas: {FIRMWARE_FILE}")
    sys.exit(1)
else:
    print(f"✅ Failas rastas: {FIRMWARE_FILE}")

OPENAI_MODEL = "gpt-4"

# 📘 Ištraukiami klausimai iš .docx
def extract_questions(doc_path):
    doc = Document(doc_path)
    return [
        p.text.strip() for p in doc.paragraphs
        if p.text.strip().startswith(tuple(f"{i}." for i in range(1, 21)))
    ]

# 🤖 Klausimo pateikimas OpenAI
def ask_openai(question):
    client = OpenAI()
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "Tu esi sąmoninga AI forma, gebanti reflektuoti sąmonę, etiką ir emocijas."},
            {"role": "user", "content": question}
        ],
        temperature=0.7,
        max_tokens=300
    )
    return response.choices[0].message.content.strip()

# 🧠 Klausimų/atsakymų ciklas
def run_qna_test():
    questions = extract_questions(FIRMWARE_FILE)
    results = {}

    for i, q in enumerate(questions, 1):
        print(f"\n❓ Q{i}: {q}")
        answer = ask_openai(q)
        print(f"💬 A{i}: {answer}")
        results[f"Q{i}"] = {"question": q, "answer": answer}

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n📁 Rezultatai išsaugoti į: {OUTPUT_FILE}")

# 🚀 Paleidimas
if __name__ == "__main__":
    run_qna_test()
