import pandas as pd


def profile_dataset(file_path):
    df = pd.read_csv(file_path)

    statistics = df.describe().to_dict()

    profile = {
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": df.columns.tolist(),
        "data_types": df.dtypes.astype(str).to_dict(),
        "missing_percentage": (df.isna().mean() * 100).round(2).to_dict(),
        "duplicate_rows": int(df.duplicated().sum()),
        "statistics": statistics
    }

    return profile