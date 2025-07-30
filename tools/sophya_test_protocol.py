# demo/sophya_test_protocol.py
import json
from pathlib import Path
from datetime import datetime
from core.quantum_core import QuantumCore, BiofieldScanner

# Load prompts (default or from input)
def load_prompts(file_path='default_prompts.json'):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)["prompts"]

# Save results
def save_results(results, file_path='result_output.json'):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

def run_demo(user_id="test_user"):
    core = QuantumCore(user_id)
    scanner = BiofieldScanner()
    prompts = load_prompts()

    results = []
    for i, sentence in enumerate(prompts, 1):
        response = scanner.scan(sentence)
        response["id"] = i
        response["input"] = sentence
        results.append(response)

    save_results(results)
    print("✅ SOPHYA DEMO test completed! Results saved to result_output.json")

if __name__ == "__main__":
    run_demo()
