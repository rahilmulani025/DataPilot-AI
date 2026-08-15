import pandas as pd


def analyze_eda(file_path):
    df = pd.read_csv(file_path)

    numeric_columns = df.select_dtypes(include="number").columns.tolist()
    categorical_columns = df.select_dtypes(
        include=["object", "category"]
    ).columns.tolist()

    numerical_analysis = {}

    for column in numeric_columns:
        series = df[column].dropna()

        numerical_analysis[column] = {
            "mean": float(series.mean()),
            "median": float(series.median()),
            "min": float(series.min()),
            "max": float(series.max()),
            "range": float(series.max() - series.min()),
            "std": float(series.std()) if len(series) > 1 else 0.0,
        }

    categorical_analysis = {}

    for column in categorical_columns:
        counts = df[column].value_counts(dropna=False)

        categorical_analysis[column] = {
            "unique_values": int(df[column].nunique(dropna=True)),
            "top_values": counts.head(10).to_dict(),
        }

    outliers = {}

    for column in numeric_columns:
        series = df[column].dropna()

        if len(series) >= 4:
            q1 = series.quantile(0.25)
            q3 = series.quantile(0.75)
            iqr = q3 - q1

            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr

            outlier_values = series[
                (series < lower_bound) | (series > upper_bound)
            ]

            outliers[column] = {
                "lower_bound": float(lower_bound),
                "upper_bound": float(upper_bound),
                "outlier_count": int(len(outlier_values)),
                "outlier_values": outlier_values.tolist(),
            }
        else:
            outliers[column] = {
                "lower_bound": None,
                "upper_bound": None,
                "outlier_count": 0,
                "outlier_values": [],
            }

    if len(numeric_columns) >= 2:
        correlation = df[numeric_columns].corr().round(3).to_dict()
    else:
        correlation = {}

    return {
        "numerical_analysis": numerical_analysis,
        "categorical_analysis": categorical_analysis,
        "outlier_analysis": outliers,
        "correlation": correlation,
    }