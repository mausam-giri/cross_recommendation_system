import "./App.css";
import Navbar from "./components/Navbar.tsx";
import { Wrapper } from "./components/Styled.tsx";
import Card from "./components/Card/Card.tsx";
import { useEffect, useRef, useState } from "react";
import MovieCard from "./components/Card/MovieCard.tsx";
import CardDetails from "./components/Details/CardDetails.tsx";

interface Book {
  idx: number;
  name: string;
  description: string;
  genre: string;
  classified_genre: string;
}
interface RecommendedMovie {
  name: string;
  description: string;
  genre: string;
  classified_genre: string;
  weighteg_score?: number;
}

function App() {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [booksRepo, setBooksRepo] = useState<Book[]>([]);
  const [bookLabels, setBookLabels] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);
  const [filterLabel, setFilterLabel] = useState<number[]>(Array(17).fill(0));
  // need to insert pagination
  const [page, setPageNumber] = useState(1);

  const [recommendedMovies, setRecommendedMovies] = useState<
    RecommendedMovie[]
  >([]);

  // Show card details
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [cardModalDetails, setCardModalDetails] = useState<
    Book | RecommendedMovie
  >();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  async function fetchBooks(pageNumber = page) {
    const resp = await fetch(
      `http://localhost:5000/api/books?page=${pageNumber}`
    );
    const fetchedBooks: Book[] = await resp.json();

    const existingBookIds = new Set(booksRepo.map((book) => book.idx));

    const newBooks = fetchedBooks.filter(
      (book) => !existingBookIds.has(book.idx)
    );

    setBooksRepo((prevBook) => [...prevBook, ...newBooks]);
  }

  async function recommendMovies() {
    if (selectedBooks.length == 0) return;
    const response = await fetch(
      "http://localhost:5000/api/predict?books=" + selectedBooks.join(",")
    );
    const recommendedMovies: RecommendedMovie[] = await response.json();
    setRecommendedMovies(recommendedMovies);
  }

  async function initialMovies() {
    const response = await fetch("http://localhost:5000/api/movies", {
      mode: "cors",
    });
    const recommendedMovies: RecommendedMovie[] = await response.json();
    setRecommendedMovies(recommendedMovies);
    localStorage.setItem("recommendedMovies", JSON.stringify(recommendMovies));
  }
  async function getLabels() {
    try {
      const response = await fetch("http://localhost:5000/api/labels");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const labels = await response.json();
      const labelsWithoutLast = labels.slice(0, -1);
      setBookLabels(labelsWithoutLast);
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  }

  async function getFilterBooks() {
    console.log(filterLabel);
    const response = await fetch(
      "http://localhost:5000/api/bookFilter?filters=" + filterLabel
    );
    const fetchedBooks: Book[] = await response.json();
    setBooksRepo(fetchedBooks);
  }

  function handleFilterLabels(e: React.MouseEvent<HTMLButtonElement>) {
    const selectedLabel = parseInt(e.currentTarget.value);

    if (selectedLabels.includes(selectedLabel)) {
      setSelectedLabels((prev) =>
        prev.filter((label) => label !== selectedLabel)
      );
    } else {
      setSelectedLabels((prev) => [selectedLabel, ...prev]);
    }
  }

  async function removeFilters() {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    const resp = await fetch("http://localhost:5000/api/books?page=1");

    const fetchedBooks: Book[] = await resp.json();
    setBooksRepo(fetchedBooks);
  }

  async function handleSearchBook() {
    if (!searchKeyword) {
      const resp = await fetch("http://localhost:5000/api/books?page=" + 1);
      const fetchedBooks: Book[] = await resp.json();
      let selectedSet: Book[] = [];
      selectedBooks.forEach((bookId) => {
        const book = booksRepo.find((b) => b.idx === bookId);
        if (book) {
          selectedSet.push(book);
        }
      });
      setBooksRepo([...selectedSet, ...fetchedBooks]);
    } else {
      setSelectedBooks([]);
      const response = await fetch(
        "http://localhost:5000/api/searchBooks?keyword=" + searchKeyword
      );
      const fetchedBooks: Book[] = await response.json();
      setBooksRepo(fetchedBooks);
    }
  }

  function handleInputSearchBook(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setSearchKeyword(value);
  }

  async function handleRemoveLocalStorage() {
    const recommendedMovies = localStorage.getItem("recommendedMovies");

    if (recommendedMovies) {
      localStorage.removeItem("recommendedMovies");
      try {
        await initialMovies();
      } catch (error) {
        console.error("Error fetching new recommendations:", error);
      }
    } else {
      try {
        await initialMovies();
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    }
  }

  useEffect(() => {
    async function initializeData() {
      try {
        await fetchBooks();
        await getLabels();
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    }

    initializeData();
  }, []);

  useEffect(() => {
    const savedMovies = localStorage.getItem("recommendedMovies");
    if (savedMovies) {
      try {
        const parsedMovies = JSON.parse(savedMovies);
        if (Array.isArray(parsedMovies) && parsedMovies.length > 0) {
          console.log(parsedMovies, parsedMovies.length);
          setRecommendedMovies(parsedMovies);
        } else {
          initialMovies();
        }
      } catch (error) {
        console.error("Error parsing saved movies from localStorage:", error);
      }
    } else {
      initialMovies();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recommendedMovies",
      JSON.stringify(recommendedMovies)
    );
  }, [recommendedMovies]);

  useEffect(() => {
    const newFilterLabel = [...filterLabel];
    newFilterLabel.map((_, index) =>
      selectedLabels.includes(index)
        ? (newFilterLabel[index] = 1)
        : (newFilterLabel[index] = 0)
    );
    setFilterLabel(newFilterLabel);
  }, [selectedLabels]);

  function handleBookSelection(bookId: number) {
    setSelectedBooks((books) => {
      if (books.includes(bookId)) return books.filter((x) => x != bookId);
      else return [bookId, ...books];
    });
  }

  useEffect(() => {
    setBooksRepo((prevBooks) => {
      const bookSet = new Map<number, Book>();

      selectedBooks.forEach((bookId) => {
        const book = prevBooks.find((b) => b.idx === bookId);
        if (book) {
          bookSet.set(bookId, book);
        }
      });

      prevBooks.forEach((book) => {
        if (!bookSet.has(book.idx)) {
          bookSet.set(book.idx, book);
        }
      });

      return Array.from(bookSet.values());
    });
  }, [selectedBooks]);

  return (
    <>
      <Navbar />
      <main className="relative">
        <Wrapper>
          <section className={"relative pt-10"}>
            <img
              className={"absolute top-0  w-full h-[90%] -z-[1]"}
              src="/hero_text.png"
              alt=""
            />
            <div className={"py-10 space-y-4 text-center"}>
              <h1 className={"text-3xl font-bold"}>
                Explore movies based on your read on FlickReads
              </h1>
              <p>
                Explore a vast collection of books and get movies suggestion!
              </p>
            </div>

            <div
              className={
                "flex flex-col item-center justify-between w-fit px-10 mx-auto"
              }
            >
              <div className={"flex-1 mr-1 bg-primary-500 rounded-full py-5 "}>
                {/* <label htmlFor={"search-genre mb-2"}>Genre</label> */}
                <div className="flex flex-wrap justify-center gap-4 px-4">
                  {bookLabels.map((label, idx) => (
                    <button
                      onClick={handleFilterLabels}
                      className={`px-2 bg-primary-700 rounded-md ${
                        selectedLabels.includes(idx) ? "bg-yellow-500" : ""
                      }`}
                      key={idx}
                      value={idx}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <div className="flex gap-4 items-center justify-center text-center mt-4 space-x-4">
            <div className="relative flex items-center">
              <input
                type="text"
                className="min-w-[400px] px-4 py-1.5 bg-transparent border border-primary-500 text-gray-300 rounded-lg"
                placeholder="Search book"
                ref={searchInputRef}
                onChange={handleInputSearchBook}
              />
              <button
                type="button"
                className="absolute right-0 py-1.5 px-2 rounded-r-lg  bg-white/10 text-white"
                onClick={handleSearchBook}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
                </svg>
              </button>
            </div>
            <div className="space-x-2">
              <button
                className="px-6 py-1.5 border border-primary-500 text-primary-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 disabled:bg-primary-700 disabled:text-gray-300"
                onClick={getFilterBooks}
                disabled={selectedLabels.length == 0}
              >
                Filter
              </button>
              <button
                className="px-4 py-1.5  border border-primary-500 rounded-lg hover:bg-primary-700 disabled:bg-primary-700 disabled:text-gray-300"
                disabled={
                  selectedLabels.length == 0 &&
                  searchInputRef.current?.value == null
                }
                onClick={async () => {
                  await removeFilters();
                  setSelectedLabels([]);
                  setFilterLabel(Array(17).fill(0));
                }}
              >
                Remove Filter
              </button>
              <button
                disabled={!localStorage.getItem("recommendedMovies")}
                onClick={handleRemoveLocalStorage}
                className="px-4 py-1.5 border border-red-500 rounded-lg hover:bg-primary-700 disabled:bg-primary-700 disabled:text-gray-300"
              >
                Remove Local Data
              </button>
            </div>
          </div>
        </Wrapper>

        <Wrapper>
          <section className={"relative my-10"}>
            <div className="grid grid-cols-2 gap-2 mx-auto py-4">
              <div>
                <div className="py-2 flex items-center justify-center rounded-md mb-2">
                  <h2 className="text-lg text-center font-semibold">
                    Books List
                  </h2>
                </div>
                <div>
                  <div
                    className={
                      "flex flex-wrap gap-2  max-h-[700px] overflow-y-auto"
                    }
                  >
                    {booksRepo.map((book, idx) => (
                      <Card
                        key={idx}
                        book_idx={book.idx}
                        title={book.name}
                        genre={book.genre}
                        classified_genre={book.classified_genre}
                        description={book.description}
                        onSelected={handleBookSelection}
                        isSelected={selectedBooks.indexOf(book.idx) !== -1}
                        setShowCardModal={() => setShowCardModal(true)}
                        setCardModalDetails={() => setCardModalDetails(book)}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-center">
                    <button
                      onClick={async () => {
                        const newpage = page + 1;
                        setPageNumber(newpage);
                        await fetchBooks(newpage);
                      }}
                      className="py-2 px-4 rounded-lg hover:bg-primary-700 border border-primary-500"
                    >
                      Load More
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="py-2 flex items-center justify-center rounded-md mb-2">
                  <h2 className="text-lg text-center font-semibold">
                    Movies Suggestion
                  </h2>
                </div>
                <div
                  className={
                    "flex flex-wrap gap-2 max-h-[700px] overflow-y-auto"
                  }
                >
                  {recommendedMovies.map((movie, idx) => (
                    <MovieCard
                      key={idx}
                      name={movie.name}
                      genre={movie.genre}
                      classified_genre={movie.classified_genre}
                      description={movie.description}
                      setShowCardModal={() => setShowCardModal(true)}
                      setCardModalDetails={() => setCardModalDetails(movie)}
                    />
                  ))}
                </div>
              </div>
              <div></div>
            </div>

            <div className="position absolute top-0 left-1/2 -translate-x-[55%] text-center py-4">
              <button
                className={
                  "border text-white border-blue-500 bg-blue-500/10 py-2 px-4 rounded-lg"
                }
                onClick={recommendMovies}
              >
                Recommend
              </button>
            </div>
          </section>
        </Wrapper>
      </main>
      {cardModalDetails && (
        <CardDetails
          idx={0}
          name={cardModalDetails?.name}
          description={cardModalDetails?.description}
          classified_genre={cardModalDetails?.classified_genre}
          genre={cardModalDetails?.genre}
          setShowCardModal={setShowCardModal}
          showCardModal={showCardModal}
        />
      )}
    </>
  );
}

export default App;
