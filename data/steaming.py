from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras
from data.utils import getCleanText

import os
load_dotenv()

class Steaming:
    def __init__(self):
        self.client = Cerebras(
            api_key=os.getenv("CEREBRAS_API_KEY")
        )

    def getResponse(self, text: str) -> str:
        SYSTEM_NORMALIZER = """
Kamu adalah text normalizer Bahasa Indonesia.

Tugas:
- Ubah kata tidak baku, slang, dan singkatan menjadi bahasa Indonesia baku.
- Contoh: gak, ga, nggak, ngk → tidak
- Jangan mengubah makna kalimat.
- Jangan menambah atau mengurangi kata.
- Jangan menjelaskan apa pun.
- Output hanya teks hasil normalisasi.
"""

        completion = self.client.chat.completions.create(
            model="llama-3.3-70b",
            temperature=0,
            top_p=1,
            max_completion_tokens=128,
            messages=[
                {"role": "system", "content": SYSTEM_NORMALIZER},
                {"role": "user", "content": getCleanText(text)}
            ],
            stream=False
        )

        return completion.choices[0].message.content