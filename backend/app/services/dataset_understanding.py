from app.services.profiler import profile_dataset
from app.services.quality import analyze_quality
from app.services.eda import analyze_eda
from app.services.insights import generate_insights


def understand_dataset(file_path):
    profile = profile_dataset(file_path)
    quality = analyze_quality(file_path)
    eda = analyze_eda(file_path)
    insights = generate_insights(file_path)

    return {
        "status": "success",
        "dataset_profile": profile,
        "data_quality": quality,
        "eda": eda,
        "insights": insights
    }