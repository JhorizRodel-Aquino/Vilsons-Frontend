import Icon from "./Icon";

function SearchBar() {
    return (
        <div className="filter-container grid grid-flow-col justify-between items-center gap-2">
            <Icon iconFilename="user" />
            <input type="text" placeholder="Search" className="filter-input" />
        </div>
    )
}

export default SearchBar;