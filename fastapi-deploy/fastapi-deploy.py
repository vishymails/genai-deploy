import uvicorn
import cohere 
from cohere import ClassifyExample
from fastapi import FastAPI
from pydantic import BaseModel, conlist

co = cohere.ClientV2("ppY5G6Vhw8WdFkVhe7b4fB5i8whnjYohkxveSd5G")

app = FastAPI()

class ProductReviews(BaseModel) :
    reviews : conlist(str, min_length=1)


@app.post("/prediction")
def predict_sentiment(product_reviews : ProductReviews) :
    examples =[
         ClassifyExample(text="I’m so proud of you", label="positive"),
    ClassifyExample(text="What a great time to be alive", label="positive"),
    ClassifyExample(text="That’s awesome work", label="positive"),
    ClassifyExample(text="The service was amazing", label="positive"),
    ClassifyExample(text="I love my family", label="positive"),
    ClassifyExample(text="They don't care about me", label="negative"),
    ClassifyExample(text="I hate this place", label="negative"),
    ClassifyExample(text="The most ridiculous thing I've ever heard", label="negative"),
    ClassifyExample(text="I am really frustrated", label="negative"),
    ClassifyExample(text="This is so unfair", label="negative"),
    ClassifyExample(text="This made me think", label="neutral"),
    ClassifyExample(text="The good old days", label="neutral"),
    ClassifyExample(text="What's the difference", label="neutral"),
    ClassifyExample(text="You can't ignore this", label="neutral"),
    ClassifyExample(text="That's how I see it", label="neutral")
    ]

    response = co.classify(
        model = "embed-english-v2.0",
        inputs = product_reviews.reviews,
        examples = examples)
    

    return response.classifications


if __name__ == "__main__" :
    uvicorn.run(app, host = "127.0.0.1", port = 8000)
    