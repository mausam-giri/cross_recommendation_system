interface CardProps {
  showImage?: boolean;
  imageSrc?: string;
  book_idx: number;
  title: string;
  genre?: string | string[];
  classified_genre?: string | string[];
  description?: string;
  onSelected?: (bookId: number) => void;
  isSelected?: boolean;
  setShowCardModal: (x: boolean) => void;
  setCardModalDetails: () => void;
}
export default function Card(props: CardProps) {
  return (
    <div>
      <div
        className={`relative max-w-[300px] bg-primary-500 text-gray-100 border rounded-lg shadow ${
          props.isSelected ? "border-yellow-300" : "border-primary-700"
        }`}
      >
        <div
          className="absolute top-3 right-3 w-6 h-6 text-center rounded-full bg-primary-700 cursor-pointer text-white hover:bg-primary-900"
          onClick={() => {
            props.setShowCardModal(true);
            props.setCardModalDetails();
          }}
        >
          <kbd className="pointer-events-none">i</kbd>
        </div>

        {props.showImage && (
          <a href="#">
            <img
              className="rounded-t-lg aspect-square"
              src={props.imageSrc || "/book_cover.png"}
              alt=""
            />
          </a>
        )}
        <div className="p-5">
          <a href="#">
            <h5 className="mb-1 font-bold tracking-tight line-clamp-2">
              {props.title}
            </h5>
          </a>

          <p className="mb-3 text-sm font-normal text-gray-200 line-clamp-5">
            {props.description || (
              <span className={"text-red-500"}>No description available</span>
            )}
          </p>

          {props.genre && (
            <p className={"text-sm mb-2 line-clamp-5"}>
              <span className="font-medium mr-1">Genre:</span>
              <kbd>
                {typeof props.genre === "string"
                  ? props.genre
                  : props.genre?.map((x) => x).join(", ")}
              </kbd>
            </p>
          )}
          {props.classified_genre && (
            <p className={"text-sm mb-2 line-clamp-5"}>
              <span className="font-medium mr-1">Classified Genre:</span>
              <kbd>
                {typeof props.classified_genre === "string"
                  ? props.classified_genre
                  : props.classified_genre?.map((x) => x).join(", ")}
              </kbd>
            </p>
          )}
        </div>
        <div className="text-center py-2">
          <button
            className={
              "border shadow px-2 py-1 rounded " +
              (props.isSelected ? "bg-yellow-300 text-slate-800" : "")
            }
            onClick={() => props.onSelected && props.onSelected(props.book_idx)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
