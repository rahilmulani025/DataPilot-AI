import pandas as pd


def generate_insights(file_path):
    df = pd.read_csv(file_path)

    insights = []

    # Dataset size
    insights.append(
        f"The dataset contains {len(df)} rows and {len(df.columns)} columns."
    )

    # Missing values
    missing_count = int(df.isna().sum().sum())

    if missing_count == 0:
        insights.append("No missing values were detected.")
    else:
        insights.append(
            f"The dataset contains {missing_count} missing values."
        )

    # Duplicate rows
    duplicate_count = int(df.duplicated().sum())

    if duplicate_count == 0:
        insights.append("No duplicate rows were detected.")
    else:
        insights.append(
            f"The dataset contains {duplicate_count} duplicate rows."
        )

    # Numerical insights
    numeric_columns = df.select_dtypes(include="number").columns.tolist()

    for column in numeric_columns:
        mean_value = df[column].mean()

        insights.append(
            f"The average {column} is {mean_value:.2f}."
        )

    # Categorical insights
    categorical_columns = df.select_dtypes(
        include=["object", "category"]
    ).columns.tolist()

    for column in categorical_columns:
        if not df[column].empty:
            top_value = df[column].value_counts().idxmax()
            top_count = int(df[column].value_counts().max())

            insights.append(
                f"The most common value in {column} is "
                f"{top_value}, appearing {top_count} times."
            )

    # Outlier insights
    for column in numeric_columns:
        series = df[column].dropna()

        if len(series) >= 4:
            q1 = series.quantile(0.25)
            q3 = series.quantile(0.75)
            iqr = q3 - q1

            lower = q1 - 1.5 * iqr
            upper = q3 + 1.5 * iqr

            outlier_count = int(
                ((series < lower) | (series > upper)).sum()
            )

            if outlier_count == 0:
                insights.append(
                    f"No outliers were detected in {column}."
                )
            else:
                insights.append(
                    f"{column} contains {outlier_count} outlier values."
                )

    # Correlation
    if len(numeric_columns) >= 2:
        correlation = df[numeric_columns].corr()

        for i in range(len(numeric_columns)):
            for j in range(i + 1, len(numeric_columns)):
                col1 = numeric_columns[i]
                col2 = numeric_columns[j]

                value = correlation.loc[col1, col2]

                if abs(value) >= 0.7:
                    strength = "strong"
                elif abs(value) >= 0.4:
                    strength = "moderate"
                else:
                    strength = "weak"

                direction = (
                    "positive"
                    if value > 0
                    else "negative"
                )

                insights.append(
                    f"{col1} and {col2} have a "
                    f"{strength} {direction} correlation "
                    f"({value:.3f})."
                )

    return insights