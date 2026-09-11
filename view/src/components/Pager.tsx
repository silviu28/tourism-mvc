interface PagerState {
  pageNo: number,
  totalPages: number,
}

const Pager = ({ state, onPageChange }: { state: PagerState; onPageChange: (pageNo: number) => void }) => {
  const goToPrevious = () => {
    if (state.pageNo > 1) {
      onPageChange(state.pageNo - 1);
    }
  };

  const goToNext = () => {
    if (state.pageNo < state.totalPages) {
      onPageChange(state.pageNo + 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "12px" }}>
      <button onClick={goToPrevious} disabled={state.pageNo <= 1}>
        {'<'}
      </button>
      <p>Page {state.pageNo} of {state.totalPages}</p>
      <button onClick={goToNext} disabled={state.pageNo >= state.totalPages}>
        {'>'}
      </button>
    </div>
  );
};

export default Pager;