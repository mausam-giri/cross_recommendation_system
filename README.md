---
# Book-Movie Cross-Domain Recommendation System

## Abstract
The **Book-Movie Cross-Domain Recommendation System** explores the intersection of **Natural Language Processing (NLP)** and **machine learning** by employing the **RoBERTa model** to predict movie recommendations based on a user's book preferences. The project addresses challenges such as **data sparsity**, **cold start problems**, and **domain disparity** while enhancing the scope of personalized recommendations.

This work is significant as it demonstrates the potential of **cross-domain recommendations (CDR)** in improving the diversity and relevance of user suggestions, thus overcoming the limitations of single-domain systems.
---

## Objectives

The primary goals of this research project include:

1. **Literature Review**: Understanding theoretical foundations of recommendation systems and cross-domain methodologies.
2. **Data Engineering**: Collection, preprocessing, and augmentation of book and movie datasets for cross-domain prediction.
3. **Model Training**: Employing **RoBERTa** for multilabel classification to capture the semantic relationships between books and movies.
4. **Web Interface Development**: Delivering an interactive platform for users to receive personalized movie recommendations.
5. **Performance Evaluation**: Analyzing system accuracy using metrics such as **Label Ranking Average Precision (LRAP)** and **Cosine Similarity**.

---

## Literature Review

### Fundamentals of Recommendation Systems

- **Content-Based Filtering**: Recommends items similar to those previously preferred by the user.
- **Collaborative Filtering**: Leverages user-item interactions to predict preferences based on peer behavior.
- **Hybrid Systems**: Combines multiple methods for better accuracy.

### Challenges

1. **Cold Start Problem**: Limited data on new users/items hinders personalized recommendations.
2. **Data Sparsity**: Sparse user-item interactions reduce the effectiveness of traditional models.
3. **Negative Knowledge Transfer**: Irrelevant data transfer across domains reduces recommendation accuracy.

### Cross-Domain Recommendations

- **Objective**: Utilize knowledge from source domains (e.g., books) to enhance predictions in target domains (e.g., movies).
- **Key Techniques**: Transfer learning, matrix factorization, feature engineering, and neural networks.

---

## Project Description

### Datasets

1. **Books Dataset**:
   - Source: Goodreads
   - Size: 49,927 unique titles
   - Features: Titles, genres, descriptions, ratings, and language.
2. **Movies Dataset**:
   - Source: IMDB
   - Size: 10,178 entries
   - Features: Titles, genres, overviews, and IMDB scores.
3. **Genre Dataset**:
   - 18 major genres and 191 subgenres for enhanced classification.

### Data Preprocessing

- **Text Cleaning**: Stopword removal, tokenization, and lemmatization using **NLTK**.
- **Language Filtering**: Non-English entries removed via **langdetect**.
- **Feature Mapping**: Genres converted to binary vectors for multilabel classification.

### Model Architecture

#### RoBERTa Overview:

- **Pre-training**: Masked language model (MLM) for rich linguistic representation.
- **Fine-tuning**: Adapted for multilabel classification using book descriptions and genres.
- **Embedding Generation**: Converts textual data into dense vector representations for similarity measurement.

#### Key Features:

- **Multilabel Classification**: Predicts multiple genres for books, facilitating accurate recommendations.
- **Transfer Learning**: Enables domain adaptation for movies using shared embeddings.

---

## System Architecture

### Backend: Flask

- **Model Integration**: Efficiently deploys the trained **RoBERTa model** for API requests.
- **Endpoints**:
  - `/api/recommend`: Generates movie recommendations based on selected books.
  - `/api/bookFilter`: Filters books by genres.

### Frontend: React.js

- **UI Design**: Responsive and interactive interface with genre-based filtering and real-time updates.
- **Styling**: TailwindCSS and styled-components for clean and modern aesthetics.

---

## Algorithm Workflow

1. **Input**: User's preferred book and number of recommendations required.
2. **Text Preprocessing**:
   - Clean, tokenize, and lemmatize book/movie descriptions.
   - Map genres to binary vectors.
3. **Model Prediction**:
   - Generate genre embeddings using **RoBERTa**.
   - Predict movie genres from book embeddings.
4. **Recommendation Generation**:
   - Use **Nearest Neighbors** with cosine similarity for matching user preferences to movies.
5. **Output**: Ranked list of movies tailored to the user's reading habits.

---

## Results and Evaluation

### Metrics

1. **Label Ranking Average Precision (LRAP)**: Measures ranking accuracy of predicted genres.
2. **Cosine Similarity**: Evaluates alignment of genre vectors across books and movies.

### Observations

- The system effectively resolves data sparsity and cold-start issues.
- Predictions align with user interests, demonstrating robustness in multilabel classification.

---

## Challenges

1. **Cold Start**: Addressed by leveraging shared features across domains.
2. **Negative Transfer**: Mitigated through refined feature selection and embedding alignment.
3. **Scalability**: Ensured efficient processing of large datasets through optimized algorithms.

---

## Conclusion

This project successfully integrates cross-domain data to develop a robust recommendation system, leveraging advanced NLP techniques and machine learning models. The implementation demonstrates a scalable solution to long-standing challenges in recommendation systems, paving the way for user-centric and diverse applications.

---

## References

1. [Simple Transformers Library](https://simpletransformers.ai/docs/multi-label-classification/)
2. [Goodreads Best Books Dataset](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks)
3. [IMDB Movies Dataset](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
4. [Scikit-Learn Metrics](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.label_ranking_average_precision_score.html)

---
