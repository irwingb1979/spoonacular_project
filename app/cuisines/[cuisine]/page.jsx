import { fetchRecipesByCuisine } from "@/lib/data";
import Link from "next/link";
import { FaUsers, FaLeaf, FaFire, FaArrowLeft } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';

const CuisinePage = async ({ params }) => {
    const { cuisine } = params;
    const recipes = await fetchRecipesByCuisine(cuisine);
    
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            {/* Header with Breadcrumb */}
            <div className="mb-8">
                <nav className="mb-4">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                        <FaArrowLeft className="text-sm" />
                        Back to Home
                    </Link>
                </nav>
                
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 capitalize">
                        {cuisine} Cuisine
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Discover delicious {cuisine.toLowerCase()} recipes
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full">
                        <span className="font-semibold">{recipes.length}</span>
                        <span>recipes found</span>
                    </div>
                </div>
            </div>

            {/* Recipe Grid */}
            {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recipes.map((recipe) => (
                        <Link 
                            href={`/recipes/${recipe.id}`} 
                            key={recipe.id} 
                            className="group relative block overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white"
                        >
                            {/* Recipe Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={recipe.image} 
                                    alt={recipe.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                                />
                                {/* Overlay with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            </div>
                            
                            {/* Recipe Info */}
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {recipe.title}
                                </h2>
                                
                                {/* Recipe Stats */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {recipe.readyInMinutes && (
                                        <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full text-xs">
                                            <BiTime className="text-orange-600" />
                                            <span className="text-orange-800 font-medium">{recipe.readyInMinutes}m</span>
                                        </div>
                                    )}
                                    {recipe.servings && (
                                        <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-full text-xs">
                                            <FaUsers className="text-blue-600" />
                                            <span className="text-blue-800 font-medium">{recipe.servings}</span>
                                        </div>
                                    )}
                                    {recipe.vegetarian && (
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs">
                                            <FaLeaf className="text-green-600" />
                                            <span className="text-green-800 font-medium">Veg</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* View Recipe Button */}
                                <div className="text-center">
                                    <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-red-600 transition-colors">
                                        View Recipe
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No recipes found</h2>
                        <p className="text-gray-600 mb-6">
                            We couldn't find any {cuisine.toLowerCase()} recipes at the moment.
                        </p>
                        <Link 
                            href="/" 
                            className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Browse All Recipes
                        </Link>
                    </div>
                </div>
            )}

            {/* Footer with cuisine info */}
            {recipes.length > 0 && (
                <div className="mt-12 text-center">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            About {cuisine} Cuisine
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore the rich flavors and traditional cooking methods of {cuisine.toLowerCase()} cuisine. 
                            From classic dishes to modern interpretations, discover recipes that showcase the unique 
                            ingredients and techniques that make {cuisine.toLowerCase()} food so special.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CuisinePage;