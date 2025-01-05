from flask import request, jsonify
import numpy as np
import pandas as pd
import pickle
import json
from models import Book, BookFactory, Movie
from utils import get_book_labels, rank_results_by_title

model = pickle.load(open('data/cross-recommender-model-v33.pkl', 'rb'))
book_model = pickle.load(open('data/book-recommender-model-v33.pkl', 'rb'))

books_df = pd.read_csv('data/books_final_v32.csv')
movies_df = pd.read_csv('data/movies_final_v32.csv')

book_labels = [x['genre'] for x in json.load(open('data/book_genres.json', 'rb'))]

def configure_routes(app):
    @app.route('/')
    def index():
        return f'''
        <p>Books Dataset: {len(books_df)}</p>
        <p>Movies Dataset: {len(movies_df)}</p>
        <p>Genres {len(book_labels)} <kbd>{[x for x in book_labels]}</kbd> <p>
        '''

    @app.route('/api/records')
    def get_records():
        records = {
            'books': len(books_df),
            'movies': len(movies_df)
        }
        return jsonify(records), 200
    
    @app.route('/api/labels')
    def get_labels():
        with open('data/book_genres.json', 'rb') as f:
            book_labels = [x['genre'] for x in json.load(f)]
        return jsonify(book_labels), 200

    @app.route('/api/books')
    def get_books():
        NUM_RECORDS = 10
        page = request.args.get('page', 1, type=int)

        books = []
        for idx in range((page - 1) * NUM_RECORDS, page * NUM_RECORDS):
            if idx < len(books_df):
                print(idx)
                book = BookFactory.from_dataframe_row(idx, books_df.iloc[idx])
                books.append(book)

        return jsonify(books), 200

    @app.route('/api/movies')
    def get_movies():
        NUM_RECORDS = 10

        recommended_movies = []
        for _, row in movies_df.head(NUM_RECORDS).iterrows():
            movie = Movie(
                name=row['names'],
                description=row['description'],
                genre=row['genre'],
                classified_genre=get_book_labels(row['labels']),
                weighted_score=row['weighted_score']
            )
            recommended_movies.append(movie)

        return jsonify(recommended_movies), 200

    @app.route('/api/bookFilter')
    def filter_categories():
        books_filter = request.args.get('filters', type=str)
        books_filter = [int(x.strip()) for x in books_filter.split(',')]
        liked_books_input = np.array([books_filter])

        distances, books = model.kneighbors(liked_books_input, n_neighbors=10)

        books = books.flatten().tolist()

        filtered_books = []
        for idx in books:
            if 0 <= idx < len(books_df):
                book = BookFactory.from_dataframe_row(idx, books_df.iloc[idx])
                filtered_books.append(book)

        filtered_books.sort(key=lambda book: book.weighted_score, reverse=True)
        return jsonify(filtered_books), 200

    @app.route('/api/searchBooks')
    def search_books():
        keyword = request.args.get('keyword', type=str)
        MAX_RESULT = 10

        keyword = keyword.lower()
        searched_books = books_df[books_df['title'].str.contains(keyword, case=False, na=False)]
        searched_books = searched_books.head(MAX_RESULT)

        filtered_books = []
        for idx, row in searched_books.iterrows():
            book = BookFactory.from_dataframe_row(idx, row)
            filtered_books.append(book)

        filtered_books.sort(key=lambda book: book.weighted_score, reverse=True)
        return jsonify(filtered_books), 200
    
    @app.route('/api/predict')
    def predict():
        liked_books = request.args.get('books', type=str)
        liked_books = [int(x.strip()) for x in liked_books.split(',')]

        # liked_books_input = np.array([
        #     books_df.iloc[x, 3:].values.tolist() for x in liked_books
        # ])
        liked_books_input = np.array([
            eval(books_df.iloc[x]['labels']) for x in liked_books
        ])
        # print(liked_books_input)
        distances, movies = model.kneighbors(liked_books_input, n_neighbors=10)

        movies = movies.flatten().tolist()

        movie_list = []    
        for movie_idx in movies:
            if (row := movies_df.iloc[movie_idx]) is not None:
                movie = Movie(
                    name=row['names'],
                    description=row['description'],
                    genre=row['genre'],
                    classified_genre=get_book_labels(row['labels']),
                    weighted_score=row['weighted_score']
                )
                movie_list.append(movie)

        movie_list.sort(key=lambda movie: movie.weighted_score, reverse=True)
        return jsonify(movie_list), 200
