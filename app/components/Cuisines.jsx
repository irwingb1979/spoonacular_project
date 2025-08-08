import { fetchCuisines } from "@/lib/data";
import Link from "next/link";

const Cuisines = async () => {
    const cuisines = await fetchCuisines();
    console.log(cuisines);

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Supported Cuisines</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-10 gap-2">
                {cuisines.map((cuisine) => (
                    <Link 
                        href={`/cuisines/${cuisine}`} 
                        key={cuisine}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full text-sm text-center transition-colors duration-200 
                        flex items-center justify-center px-2 py-3 font-bold">
                        {cuisine}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Cuisines;
