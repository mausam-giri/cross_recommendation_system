---
# Book-Movie Cross-Domain Recommendation System

## Overview
This project, conducted during a six-week research internship at **NIT Kurukshetra**, focuses on developing a **Cross-Domain Recommendation System (CDRS)**. It leverages **Natural Language Processing (NLP)** and machine learning techniques to predict movie recommendations based on users' book-reading habits. The core of the system is built upon the **RoBERTa model**, fine-tuned for multilabel classification.
---

## Objectives

1. Investigate theoretical foundations of recommendation systems and CDRS.
2. Preprocess datasets to enable cross-domain predictions.
3. Train a **RoBERTa** model to predict movies from books.
4. Develop a web application to provide personalized recommendations.

---

## Literature Review

### Recommender Systems

- Types: Content-based Filtering, Collaborative Filtering, Hybrid Systems.
- Challenges: Cold Start, Long Tail, and Data Sparsity.

### Cross-Domain Recommendations

- Address data sparsity and cold start issues by transferring knowledge across domains.
- Techniques include **transfer learning**, **feature mapping**, and **hybrid approaches**.

---

## Project Implementation

### Data

- **Books Dataset**: Extracted from Goodreads, containing ~50k unique titles and 18 major genres.
- **Movies Dataset**: Extracted from IMDB, consisting of ~10k entries.
- Genres represented as vectors for multilabel classification.

### Model

- **RoBERTa**: Fine-tuned on book descriptions and genres to predict cross-domain recommendations.
- **Evaluation Metrics**:
  - **LRAP**: Evaluates label ranking precision.
  - **Cosine Similarity**: Measures similarity of genre vectors.

### Web Application

- Backend: **Flask** for API development and model integration.
- Frontend: **React.js** with **TailwindCSS** for an interactive interface.

---

## Results

- **LRAP Score**: Demonstrates effective genre ranking.
- Cosine similarity ensures alignment of recommendations with user preferences.

---

## Challenges and Solutions

1. **Cold Start**: Addressed using transfer learning and shared user-item features.
2. **Data Sparsity**: Mitigated by utilizing cross-domain data augmentation.
3. **Negative Knowledge Transfer**: Controlled through feature engineering and model optimization.

---

## Conclusion

The integration of cross-domain data and the advanced **RoBERTa model** enables personalized and accurate recommendations. This project demonstrates a scalable and user-centric approach to resolving challenges in traditional recommendation systems.

---

## References

1. [Simple Transformers Library](https://simpletransformers.ai/docs/multi-label-classification/)
2. [Goodreads Dataset](https://www.kaggle.com/datasets/jealousleopard/goodreadsbooks)
3. [IMDB Dataset](https://www.kaggle.com/datasets/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews)
4. [Label Ranking Average Precision Score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.label_ranking_average_precision_score.html)

---
