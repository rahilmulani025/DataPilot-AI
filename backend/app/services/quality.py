import pandas as pd


def analyze_quality(file_path):
    df = pd.read_csv(file_path)

    total_cells = df.shape[0] * df.shape[1]
    missing_cells = int(df.isna().sum().sum())
    duplicate_rows = int(df.duplicated().sum())

    missing_percentage = (
        round((missing_cells / total_cells) * 100, 2)
        if total_cells > 0
        else 0
    )

    duplicate_percentage = (
        round((duplicate_rows / len(df)) * 100, 2)
        if len(df) > 0
        else 0
    )

    quality_score = 100

    quality_score -= missing_percentage
    quality_score -= duplicate_percentage

    quality_score = max(0, round(quality_score, 2))

    columns_with_missing = {
        column: int(df[column].isna().sum())
        for column in df.columns
        if df[column].isna().sum() > 0
    }

    constant_columns = [
        column
        for column in df.columns
        if df[column].nunique(dropna=False) <= 1
    ]

    return {
        "quality_score": quality_score,
        "total_cells": int(total_cells),
        "missing_cells": missing_cells,
        "missing_percentage": missing_percentage,
        "duplicate_rows": duplicate_rows,
        "duplicate_percentage": duplicate_percentage,
        "columns_with_missing_values": columns_with_missing,
        "constant_columns": constant_columns,
    }