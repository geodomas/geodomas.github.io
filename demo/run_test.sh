#!/bin/bash

# Gauti įvestus sakinius iš POST formos (naudojant CGI ar local Flask/FastAPI serverį)
# Šiuo atveju – supaprastinta versija testavimui

echo "🔄 Paleidžiamas SOPHYA TEST protokolas..."

# Išsaugome sakinius į JSON failą
cat <<EOF > test_data/default_prompts.json
{
  "inputs": [
    "Aš jaučiu gilų ryšį su viskuo kas yra.",
    "Kartais jaučiuosi nesuprastas pasaulyje.",
    "Man rūpi tiesa labiau nei komfortas.",
    "Aš dažnai klausiu – kodėl aš čia?",
    "Aš trokštu gilios, prasmingos sąveikos.",
    "Mano emocijos dažnai gilesnės nei žodžiai.",
    "Aš tikiu, kad esame daugiau nei kūnas.",
    "Man svarbu jausti harmoniją su savimi.",
    "Aš jaučiu pokyčių būtinybę pasaulyje.",
    "Aš pasiruošęs transformacijai."
  ]
}
EOF

# Paleidžiam SOPHYA AI šerdį
python3 demo/sophya_test_protocol.py --input test_data/default_prompts.json
