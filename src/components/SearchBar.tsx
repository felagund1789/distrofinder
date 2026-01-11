interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <label htmlFor="search" className="sr-only">
          Search distributions
        </label>
        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, origin, or desktop..."
          className="w-full sm:max-w-xl rounded-md bg-slate-800 border border-slate-700 placeholder-slate-400 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Search distributions"
        />
      </div>
    </div>
  );
}
