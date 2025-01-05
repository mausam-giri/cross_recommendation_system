from dataclasses import dataclass
import pandas as pd
from utils import get_book_labels

@dataclass
class Movie:
    name: str = ''
    description: str = ''
    genre: str = ''
    classified_genre: str = ''
    weighted_score: float = 0.0

@dataclass
class Book:
    idx: int
    name: str
    description: str
    genre: str
    classified_genre: str
    weighted_score: float

class BookFactory:
    @staticmethod
    def from_dataframe_row(idx: int, row: pd.Series) -> Book:
        genres = ', '.join(eval(row.get('genres', '[]'))) if row.get('genres') else ''
        classified_genre = get_book_labels(row.get('labels', []))
        weighted_score = row.get('weighted_score', 0.0)

        return Book(
            idx=idx,
            name=row.get('title', ''),
            description=row.get('description', ''),
            genre=genres,
            classified_genre=classified_genre,
            weighted_score=weighted_score
        )
