interface SearchProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
    return (
        <form className="w-full mb-4">
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="default-search" className="block w-full p-2 ps-12 text-sm font-sans text-gray-900 border border-gray-200 rounded-full outline-none" placeholder="Search" required />
            </div>
        </form>
    )
}
