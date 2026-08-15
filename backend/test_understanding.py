from app.services.dataset_understanding import understand_dataset

result = understand_dataset("../data/test_data.csv")

print(result)