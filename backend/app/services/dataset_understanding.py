from app.services.profiler import profile_dataset


def understand_dataset(file_path):
    profile = profile_dataset(file_path)

    return profile