import Icon from "./Icon";
import InputBox from './InputBox';

function SearchBar() {
    return (
        <InputBox>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2 input">
                <label htmlFor="search"><Icon name="search" className="-ml-[3px]" /></label>
                <input id="search" type="text" placeholder="Search" />
            </div>
        </InputBox>
    )
}

export default SearchBar;