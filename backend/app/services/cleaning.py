import pandas as pd
import os


def generate_cleaning_plan(file_path):
    df = pd.read_csv(file_path)

    actions = []

    # Missing values
    for column in df.columns:
        missing_count = int(df[column].isna().sum())

        if missing_count > 0:
            actions.append({
                "column": column,
                "issue": "missing_values",
                "count": missing_count,
                "action": "fill_missing_values"
            })

    # Duplicate rows
    duplicate_count = int(df.duplicated().sum())

    if duplicate_count > 0:
        actions.append({
            "issue": "duplicate_rows",
            "count": duplicate_count,
            "action": "remove_duplicates"
        })

    # Constant columns
    for column in df.columns:
        if df[column].nunique(dropna=False) <= 1:
            actions.append({
                "column": column,
                "issue": "constant_column",
                "action": "review_column"
            })

    return {
        "status": "ready_for_approval",
        "total_actions": len(actions),
        "actions": actions
    }


def apply_cleaning(file_path, output_path):
    df = pd.read_csv(file_path)

    # Remove duplicate rows
    df = df.drop_duplicates()

    # Fill missing values
    for column in df.columns:

        if df[column].isna().sum() > 0:

            if pd.api.types.is_numeric_dtype(df[column]):
                df[column] = df[column].fillna(
                    df[column].median()
                )
            else:
                mode = df[column].mode()

                if not mode.empty:
                    df[column] = df[column].fillna(mode[0])

    os.makedirs(
        os.path.dirname(output_path),
        exist_ok=True
    )

    df.to_csv(output_path, index=False)

    return {
        "status": "success",
        "output_file": output_path,
        "rows_after_cleaning": len(df),
        "columns_after_cleaning": len(df.columns)
    }