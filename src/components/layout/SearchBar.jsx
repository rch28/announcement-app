"use client"

import { useState } from "react"

const SearchBar = () => {
const [Search, setSearch] = useState("")
  return (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={Search}
            onChange={(e) => setSearch(e.target.value)} 
            className="border-2 border-gray-200 rounded-lg px-2 py-1 w-full outline-none"
        />
    </div>
  )
}

export default SearchBar