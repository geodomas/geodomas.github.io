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

import sys
import os

# Pridedame tikslų kelią iki quantum_core.py
current_dir = os.path.dirname(__file__)
firmware_path = os.path.abspath(os.path.join(current_dir, '..', 'MetaCore_FIRMWARE', 'core'))
sys.path.insert(0, firmware_path)

print(f"🔍 Checking import path: {firmware_path}")
print("📂 Files in path:", os.listdir(firmware_path))

try:
    from quantum_core import SOPHYAQuantumCore
    print("✅ Import successful!")
except Exception as e:
    print("❌ Import failed:", e)
