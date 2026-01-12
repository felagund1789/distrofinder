import "./SearchBar.css";

interface Props {
  query: string;
  setQuery: (q: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  return (
    <div className="search">
      <div className="container">
        <label htmlFor="search" className="visually-hidden">
          Search distributions
        </label>
        <input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, origin, or desktop..."
          className="search-input"
          aria-label="Search distributions"
        />
      </div>
    </div>
  );
}
