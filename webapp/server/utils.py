import json
from fuzzywuzzy import fuzz

def get_book_labels(plabels):
    with open('data/book_genres.json', 'rb') as f:
        book_labels = [x['genre'] for x in json.load(f)]
    
    labels = [book_labels[idx] for idx, lbl in enumerate(eval(plabels)) if lbl]
    return ', '.join(labels)

def rank_results_by_title(book_title, results, movies_df):
    ranked_results = []
    
    for r in results:
        try:
            movie_title = movies_df.iloc[r]['name']
            similarity = fuzz.partial_ratio(book_title.lower(), movie_title.lower())
            ranked_results.append((similarity, r, movie_title))
        except:
            pass

    ranked_results.sort(reverse=True, key=lambda x: x[0])

    sorted_indices = [x[1] for x in ranked_results]
    sorted_titles = [x[2] for x in ranked_results]

    return sorted_indices, sorted_titles