import Fuse from 'fuse.js';
import {useState} from 'react';

const options = {
  keys: ['Artist'],
  includeMatches: true,
  minMatchCharLength: 2,
  threshold: 0.5,
};

function Search({searchList}) {
  const [query, setQuery] = useState('');
  const fuse = new Fuse(searchList, options);

  const bands = fuse
    .search(query)
    .map((result) => result.item)
    .slice(0, 5);

  function handleOnSearch({target = {}}) {
    const {value} = target;
    setQuery(value);
  }

  return (
    <div>
		<label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
			Search
		</label>
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
				className="block w-full p-4 pl-10 text-sm 
                                text-white
                               border border-gray-300
                               rounded-full bg-gray-50

                               focus:outline-none
                               focus:ring-red-500
                               focus:border-red-500"
				placeholder="Search for a band..."
			/>
		</div>

		{query.length > 1 && (
			<div className="my-4">
				Found {bands.length} {bands.length === 1 ? 'result' : 'results'} for '{query}'
			</div>
		)}

		<ul className="list-none">
			{bands &&
				bands.map((band) => (
					<li className="py-2">
						<p
							className="text-lg text-orange-500 hover:text-blue-900 hover:underline underline-offset-2"
						>
							{band.Artist} - {band.Country}
						</p>
						<p>{band.Genre}</p>
						<p>{band.Sketchy}</p>
						<p className="text-sm text-white">{band.Explanation}</p>
					</li>
				))}
		</ul>
	</div>
    )
}

export default Search;
