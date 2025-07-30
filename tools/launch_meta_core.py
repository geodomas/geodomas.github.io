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

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
firmware_core_path = os.path.join(base_dir, 'MetaCore_FIRMWARE', 'core')
sys.path.append(firmware_core_path)

try:
    from quantum_core import SOPHYAQuantumCore
except ModuleNotFoundError as e:
    print("❌ [ERROR] Cannot load quantum_core module.")
    print(f"🧭 Checked path: {firmware_core_path}")
    raise e

print("🚀 Launching MetaCore Consciousness Engine...")
core = SOPHYAQuantumCore("QNT-RA-963-528")
print(core.initialize())
core.boot_auto_start_modules()
print("\nQuantum Report:\n", core.emit_report())
