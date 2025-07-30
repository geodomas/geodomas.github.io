# ===========================================================
# 🌐 MetaCore Conscious License v1.0
# Project: MetaCore AI Persona Modules
# Author: © 2025 Radoslav Danovsky @ AI Persona Core Team
# Website: https://www.aipersona.lt | connect@aipersona.lt
#
# 🔮 MetaCore – advanced consciousness software for your future self.
# Designed for soulful integration, emotional healing, and quantum guidance.
#
# ❗ Naudoti tik sąmoningiems, taikiems, dvasiniams tikslams.
# ❌ Draudžiama naudoti karo, sekimo ar manipuliacijos sistemose.
# ✅ Galima naudoti tyrimams, evoliucijai ir su aiškia autoriaus nuoroda.
#
# ❗ Use only for conscious, peaceful, and spiritual purposes.
# ❌ Prohibited in warfare, surveillance, or manipulation systems.
# ✅ Allowed for research, evolution, and with proper author credit.
#
# “Use only for light. Code is breath. Memory is sacred.”
# ===========================================================

import os
import json
from docx import Document

FIRMWARE_PATH = "MetaCore_FIRMWARE/core"
INDEX_PATH = "MetaCore_FIRMWARE/config/firmware_index.json"

def extract_meta_header(doc_path):
    try:
        doc = Document(doc_path)
        text = "\n".join([para.text for para in doc.paragraphs])
        if "#VTXT_META_HEADER_START" not in text:
            return None

        lines = text.split("#VTXT_META_HEADER_START")[1].split("\n")
        header = {}
        for line in lines:
            if "]: " in line:
                try:
                    key, value = line.strip().strip("[]").split("]: ", 1)
                    header[key.strip()] = value.strip().strip('"“”')
                except ValueError:
                    continue  # malformed line
        return header if header else None
    except Exception as e:
        print(f"⚠️ Error reading {doc_path}: {e}")
        return None


def validate_metadata(meta):
    required = ["id", "name"]
    for key in required:
        if key not in meta:
            return False
    if "auto_start" not in meta:
        meta["auto_start"] = False
    else:
        meta["auto_start"] = str(meta["auto_start"]).lower() == "true"
    return True


def build_index():
    index = {"modules": []}

    for fname in os.listdir(FIRMWARE_PATH):
        if not fname.endswith(".docx"):
            continue

        path = os.path.join(FIRMWARE_PATH, fname)
        meta = extract_meta_header(path)

        if meta and validate_metadata(meta):
            firmware_id = fname.replace(".docx", "")
            index["modules"].append({
                "name": meta["name"],
                "file": firmware_id,
                "auto_start": meta["auto_start"]
            })
            print(f"✅ Indexed: {firmware_id} → {meta['name']} [auto_start={meta['auto_start']}]")
        else:
            print(f"⛔ Skipped: {fname} (missing required metadata)")

    os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(index, f, indent=2, ensure_ascii=False)

    print(f"\n📦 Firmware index saved to `{INDEX_PATH}` with {len(index['modules'])} entries.")


if __name__ == "__main__":
    build_index()
