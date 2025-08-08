import { searchRecipes } from '@/lib/data';
import Link from 'next/link';
import { FaUsers, FaLeaf, FaFire } from 'react-icons/fa';

export default async function SearchPage({ searchParams }) {
    const query = searchParams.q;
    let recipes = [];

    if (query) {
        try {
            recipes = await searchRecipes(query, {
                number: '12',
                addRecipeInformation: 'true',
                fillIngredients: 'true'
            });
        } catch (error) {
            console.error('Search error:', error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">
                Search Results for "{query}"
            </h1>
            
            {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                            <img
                                className="w-full h-48 object-cover"
                                src={recipe.image}
                                alt={recipe.title}
                            />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    {recipe.title}
                                </h3>
                                
                                <Link 
                                    href={`/recipes/${recipe.id}`} 
                                    className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mb-3"
                                >
                                    View Recipe
                                </Link>
                                
                                {/* Recipe Details */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {recipe.servings && (
                                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                            <FaUsers className="text-gray-600" />
                                            <span className="text-gray-600">{recipe.servings}</span>
                                        </div>
                                    )}
                                    {recipe.vegetarian && (
                                        <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full text-xs">
                                            <FaLeaf className="text-green-600" />
                                            <span className="text-gray-600">Veg</span>
                                        </div>
                                    )}
                                    {recipe.readyInMinutes && (
                                        <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full text-xs">
                                            <FaFire className="text-orange-600" />
                                            <span className="text-gray-600">{recipe.readyInMinutes}m</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">
                        {query ? `No recipes found for "${query}"` : 'Enter a search term to find recipes'}
                    </p>
                </div>
            )}
        </div>
    );
} 