interface CardDetailsProps {
  idx?: number;
  name: string;
  description?: string;
  genre?: string | string[];
  classified_genre?: string | string[];
  showCardModal?: boolean;
  setShowCardModal: (x: boolean) => void;
}

export default function CardDetails(props: CardDetailsProps) {
  return (
    <>
      <div
        className={`fixed h-screen w-screen inset-0 bg-primary-500/50 ${
          props.showCardModal ? "visible" : "hidden"
        }`}
      ></div>
      <div
        className={`flex items-center justify-center fixed inset-0 w-screen h-[100dvh] transition duration-300 ${
          props.showCardModal ? "visible" : "hidden"
        }`}
      >
        <div className="relative max-w-2xl rounded-lg h-fit bg-primary-900">
          <div
            className="absolute top-3 right-3 w-6 h-6 text-center rounded-full bg-red-400 text-white cursor-pointer hover:bg-red-500"
            onClick={() => props.setShowCardModal(false)}
          >
            <kbd className="align-top pointer-events-none">x</kbd>
          </div>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-1 font-bold tracking-tight line-clamp-2">
                {props.name}
              </h5>
            </a>

            <p className="mb-3 text-sm font-normal text-gray-200">
              {props.description || (
                <span className={"text-red-500"}>No description available</span>
              )}
            </p>

            {props.genre && (
              <p className={"text-sm mb-2"}>
                <span className="font-medium mr-1">Genre:</span>
                <kbd>
                  {typeof props.genre === "string"
                    ? props.genre
                    : props.genre?.map((x) => x).join(", ")}
                </kbd>
              </p>
            )}
            {props.classified_genre && (
              <p className={"text-sm mb-2"}>
                <span className="font-medium mr-1">Classified Genre:</span>
                <kbd>
                  {typeof props.classified_genre === "string"
                    ? props.classified_genre
                    : props.classified_genre?.map((x) => x).join(", ")}
                </kbd>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
