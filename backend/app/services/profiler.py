import pandas as pd


def profile_dataset(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = df.select_dtypes(include="number").columns.tolist()
    categorical_columns = df.select_dtypes(include=["object", "category"]).columns.tolist()
    datetime_columns = df.select_dtypes(include=["datetime"]).columns.tolist()

    column_info = {}

    for column in df.columns:
        column_info[column] = {
            "data_type": str(df[column].dtype),
            "unique_values": int(df[column].nunique(dropna=True)),
            "missing_values": int(df[column].isna().sum()),
            "missing_percentage": round(df[column].isna().mean() * 100, 2),
        }

    statistics = {}

    if numeric_columns:
        statistics = df[numeric_columns].describe().round(2).to_dict()

    categorical_summary = {}

    for column in categorical_columns:
        categorical_summary[column] = (
            df[column]
            .value_counts(dropna=False)
            .head(10)
            .to_dict()
        )

    duplicate_rows = int(df.duplicated().sum())

    profile = {
        "dataset": {
            "rows": int(len(df)),
            "columns": int(len(df.columns)),
            "memory_usage_bytes": int(df.memory_usage(deep=True).sum()),
        },

        "columns": {
            "all": df.columns.tolist(),
            "numeric": numeric_columns,
            "categorical": categorical_columns,
            "datetime": datetime_columns,
        },

        "column_info": column_info,

        "missing_analysis": {
            "total_missing_values": int(df.isna().sum().sum()),
            "columns_with_missing_values": [
                column
                for column in df.columns
                if df[column].isna().sum() > 0
            ],
        },

        "duplicate_analysis": {
            "duplicate_rows": duplicate_rows,
            "has_duplicates": duplicate_rows > 0,
        },

        "numeric_statistics": statistics,

        "categorical_summary": categorical_summary,
    }

    return profile