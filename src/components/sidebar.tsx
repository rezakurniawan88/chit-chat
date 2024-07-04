import Link from "next/link"

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-6 pb-4 px-2 transition-transform -translate-x-full bg-white border-r border-gray-100 sm:translate-x-0">
            <div className="flex justify-center mb-6">
                <Link href="/">
                    <h1 className="font-bold font-sans text-2xl text-blue-400">ChitChat</h1>
                </Link>
            </div>
            <div className="space-y-2 overflow-y-auto overflow-x-hidden">
                <Link href="/chat">
                    <div className="flex items-center gap-4 py-3 px-5 mb-2 rounded-lg cursor-pointer hover:bg-gray-200">
                        <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                        <h1 className="font-semibold text-sm text-gray-600">John Doe</h1>
                    </div>
                </Link>
                <hr />
                <div className="flex items-center gap-4 py-3 px-5 mb-2 rounded-lg cursor-pointer hover:bg-gray-200">
                    <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                    <h1 className="font-semibold text-sm text-gray-600">Jane Dae</h1>
                </div>
                <hr />
            </div>
        </aside>
    )
}
