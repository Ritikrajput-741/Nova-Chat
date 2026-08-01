import { SearchIcon } from "lucide-react";

const Search = ({ search, setSearch }) => {
  return (
    <div className="border-b border-white/10 bg-black/10 p-5 backdrop-blur-xl">
      {/* Title */}
      <div className="mb-3 flex items-center justify-between"></div>

      {/* Search Box */}
      <div className="group relative">
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-300 group-focus-within:text-cyan-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search friends..."
          className="
            h-12
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.05]
            pl-12
            pr-4
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-cyan-500
            focus:bg-white/[0.08]
            focus:ring-2
            focus:ring-cyan-500/20
            hover:border-cyan-500/20
          "
        />
      </div>
    </div>
  );
};

export default Search;
