from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

tokenizer = AutoTokenizer.from_pretrained(
    "databoks-irfan/socmed-comment-roberta-base-indonesian-smsa"
)

model = AutoModelForSequenceClassification.from_pretrained(
    "databoks-irfan/socmed-comment-roberta-base-indonesian-smsa"
)

def predict(text: str):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits
    probs = torch.softmax(logits, dim=1)[0]

    id2label = model.config.id2label

    scores = {
        id2label[i].upper(): probs[i].item()
        for i in range(len(probs))
    }

    label = max(scores, key=scores.get)

    return {
        "label": label,
        "confidence": scores[label],
        "scores": scores
    }