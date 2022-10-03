const Search = ({ handleSearch }) => {
  return (
    <div
      className={`w-full flex flex-nowrap items-center py-2.5 px-5 rounded-[20px] border-2 border-solid border-[var(--color-text-primary)] bg-[var(--color-bg-primary)] mb-8`}
    >
      <input
        aria-label="Search articles"
        type="text"
        onChange={handleSearch}
        placeholder="🔍 Search.."
        className={`appearance-none bg-transparent flex-1 outline-none text-sm`}
      />
    </div>
  );
};

export default Search;
