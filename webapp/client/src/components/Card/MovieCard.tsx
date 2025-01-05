interface CardProps {
  showImage?: boolean;
  imageSrc?: string;
  name: string;
  genre?: string | string[];
  classified_genre?: string | string[];
  description?: string;

  setShowCardModal: (x: boolean) => void;
  setCardModalDetails: () => void;
}
export default function MovieCard(props: CardProps) {
  return (
    <div>
      <div className="relative max-w-[300px] bg-primary-500 text-gray-100 border border-primary-700 rounded-lg shadow">
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
            <h5 className="mb-1 text-base font-bold tracking-tight line-clamp-2">
              {props.name}
            </h5>
          </a>

          <p className="mb-3 text-sm font-normal text-gray-200 line-clamp-5">
            {props.description || (
              <span className={"text-red-500"}>No description available</span>
            )}
          </p>

          {props.genre && (
            <p className={"italic mb-2 line-clamp-5"}>
              <span className="font-medium mr-1">Genre:</span>
              <kbd className="text-sm">
                {typeof props.genre === "string"
                  ? props.genre
                  : props.genre?.map((x) => x).join(", ")}
              </kbd>
            </p>
          )}
          {props.classified_genre && (
            <p className={"italic mb-2 line-clamp-5"}>
              <span className="font-medium mr-1">Classified Genre:</span>
              <kbd className="text-sm">
                {typeof props.classified_genre === "string"
                  ? props.classified_genre
                  : props.classified_genre?.map((x) => x).join(", ")}
              </kbd>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
