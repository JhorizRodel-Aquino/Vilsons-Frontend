import Icon from "./Icon";
import InputBox from './InputBox';

function SearchBar({ placeholder, search, setSearch }: { placeholder?: string, search: string, setSearch: (text: string) => void }) {
    // const [query, setQuery] = useState(search);

    // const handleSearch = () => {

    //     setSearch(query);
    // };


    return (
        <InputBox>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2 input w-full">
                <label htmlFor="search"><Icon name="search" className="-ml-[3px]" /></label>
                <div className="relative pr-5">
                    <input
                        id="search"
                        type="text"
                        placeholder={placeholder || 'Search'}
                        value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && <button className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-sm" onClick={() => setSearch('')}>✕</button>}
                </div>
            </div>
        </InputBox>
    )
}

export default SearchBar;