import Fuse from "fuse.js";
import { useState } from "react";

export const COLORKEY = {
  SAFE: {
    name: "Safe",
    description: "Nothing sketch, as far as we know",
    class: "bg-[#248662] text-white",
    icon: "👍",
  },
  QUESTIONABLE: {
    name: "Questionable",
    description: "Debatable, shifted over time, or otherwise worth noting",
    class: "bg-[#c4961a] text-white",
    icon: "❓",
  },
  SKETCH: {
    name: "Sketchy",
    description:
      "Evidence suggesting fascists or far right but perhaps no true proof",
    class: "bg-[#763535] text-white",
    icon: "👎",
  },
  NAZI: {
    name: "Nazi",
    description: "Pro-fascist, far right content or proven fascists",
    class: "bg-black text-white",
    icon: "💀",
  },
  UNKNOWN: {
    name: "Unknown",
    description: "Politics & views of band are unknown",
    class: "bg-[#16485e] text-white",
    icon: "🤷‍♂️",
  },
};

const options = {
  keys: ["Artist"],
  includeMatches: true,
  minMatchCharLength: 3,
  threshold: 0.5,
};

function Search({ searchList }) {
  const [query, setQuery] = useState("");
  const fuse = new Fuse(searchList, options);

  const bands = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({ target = {} }) {
    const { value } = target;
    setQuery(value);
  }

  return (
    <div>
      <label
        htmlFor="search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <circle cx={10} cy={10} r={7}></circle>
            <line x1={21} y1={21} x2={15} y2={15}></line>
          </svg>
        </div>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleOnSearch}
          className="block w-full rounded-full border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-800 focus:border-red-500 focus:outline-none focus:ring-red-500"
          placeholder="Search for a band..."
        />
      </div>

      {query.length > 1 && (
        <div className="my-4">
          Found {bands.length} {bands.length === 1 ? "result" : "results"} for '
          {query}'
        </div>
      )}

      <ul className="list-none">
        {bands &&
          bands.map((band) => (
            <li
              className={`m-3 p-4 ${COLORKEY[band.Sketchy].class} relative rounded-xl`}
              key={band.Artist}
            >
              <p class="absolute right-0 top-0 p-5 text-xl">
                <div class="bg-white/8 items-center justify-center rounded-full border border-white px-2 py-1 text-sm">
                  {band.Genre}
                </div>
              </p>
              <h1 className="text-2xl font-bold uppercase">
                {band.Artist} {COLORKEY[band.Sketchy].icon}
              </h1>

              <p className="pt-2 text-sm text-white">
                {band.Country} -
                {band.Explanation && band.Explanation.trim() !== "" ? (
                  " " + band.Explanation
                ) : (
                  <span className="italic">
                    {" "}
                    No further explanation, give us info on our{" "}
                    <a
                      href="/contact"
                      className="underline hover:text-blue-300"
                    >
                      contact form.
                    </a>
                  </span>
                )}
              </p>
              {band.Sources &&
                band.Sources.map((source) => (
                  <a
                    href={source}
                    className="border-dotted border-blue-100 pt-2 text-sm"
                  >
                    Source
                  </a>
                ))}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Search;
