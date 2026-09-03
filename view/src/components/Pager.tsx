interface PagerState {
  pageNo: number,
  totalPages: number,
}

const Pager = ({ state, onPageChange }: { state: PagerState, onPageChange: (pageNo: number) => void }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <button onClick={() => onPageChange((state.pageNo + 1) % state.totalPages)}>{'<'}</button>
      <p>Page {state.pageNo} of {state.totalPages}</p>
      <button onClick={() => onPageChange(state.pageNo > 1 ? state.pageNo - 1 : 0)}>{'>'}</button>
    </div>
  );
};

export default Pager;