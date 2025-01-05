import { Wrapper } from "./Styled.tsx";

export default function Navbar() {
  return (
    <nav className={"bg-primary-500"}>
      <Wrapper className={"flex justify-between items-center py-4"}>
        <div>
          <h2 className={"text-2xl font-semibold text-white"}>FlixReads</h2>
        </div>
        {/* <div>
          <button onClick={handleRemoveLocalStorage} className={"btn-primary"}>Remove Local Data</button>
        </div> */}
      </Wrapper>
    </nav>
  );
}
