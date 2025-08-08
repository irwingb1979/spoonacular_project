import Link from "next/link";
const HeaderPage = () => {
    return (
        <header className="header-container text-gray-800 dark:text-white">
            <div className="container mx-auto p-4">
                <div className="flex justify-between h-8">
                    <div className="flex">
                        <div className="flex-shrink-0  flex items-center">
                            <Link href="/">
                                <h1 className="text-xl font-bold">Spoonacular App</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link href="/" className=" hover:text-gray-700">Home</Link>
                        <Link href="/recipes" className=" hover:text-gray-700">Recipes</Link>
                        <Link href="/about" className=" hover:text-gray-700">About</Link>
                        <div className="avartar flex items-center">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://i.pravatar.cc/"
                                alt="User Avatar"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
};
export default HeaderPage;