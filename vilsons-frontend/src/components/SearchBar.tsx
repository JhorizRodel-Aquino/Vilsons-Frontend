import Icon from "./Icon";

function SearchBar() {
    return (
        <div className="filter-container grid grid-cols-[auto_1fr] items-center gap-2">
            <label htmlFor="search"><Icon name="search" /></label>
            <input id="search" type="text" placeholder="Search" className="filter-input" />
        </div>
    )
}

export default SearchBar;