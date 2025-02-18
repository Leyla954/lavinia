import React from 'react'

const search = () => {
    return (
        <div className="search-button">
            <input
                type="text"
                placeholder="Axtarış"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    );
};

export default search;