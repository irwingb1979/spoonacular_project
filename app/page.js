// app/page.jsx
import { fetchRecipes, fetchRecipeById } from '@/lib/data';
import Link from 'next/link';
import HeroSection from './components/Hero';
import Cuisines from './components/Cuisines';
import SearchBar from './components/SearchBar';
import { FaUsers, FaLeaf, FaFire, FaStar, FaClock, FaHeart } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

// This is an async Server Component
export default async function HomePage() {
  let recipes = [];
  let detailedRecipes = [];
  
  try {
    recipes = await fetchRecipes('pasta'); // Fetch recipes for a specific query
    
    // Fetch detailed information for each recipe
    const detailedPromises = recipes.map(recipe => fetchRecipeById(recipe.id));
    detailedRecipes = await Promise.all(detailedPromises);
  } catch (error) {
    console.error(error);
    // You can handle the error gracefully here
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Main Content */}
      <div className="container mx-auto p-4 max-w-7xl">
        <HeroSection />
        
        {/* Search Section */}
        <div className="mb-12">
          <SearchBar />
        </div>
        
        {/* Cuisines Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Explore Cuisines</h2>
            <p className="text-gray-600 dark:text-gray-300">Discover recipes from around the world</p>
          </div>
          <Cuisines />
        </div>
        
        {/* Featured Recipes Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Featured Recipes</h2>
            <p className="text-gray-600 dark:text-gray-300">Handpicked recipes for you to try</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => {
                const detailedRecipe = detailedRecipes[index];
                return (
                  <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700">
                    {/* Recipe Image */}
                    <div className="relative overflow-hidden">
                      <img
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        src={recipe.image}
                        alt={recipe.title}
                      />
                      {/* Overlay with favorite button */}
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full transition-colors duration-200">
                          <FaHeart className="text-sm" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {recipe.title}
                      </h3>
                      
                      {/* Recipe Stats */}
                      {detailedRecipe && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {detailedRecipe.readyInMinutes && (
                            <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full text-xs">
                              <BiTime className="text-orange-600 dark:text-orange-400" />
                              <span className="text-orange-800 dark:text-orange-200 font-medium">{detailedRecipe.readyInMinutes}m</span>
                            </div>
                          )}
                          {detailedRecipe.servings && (
                            <div className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full text-xs">
                              <FaUsers className="text-blue-600 dark:text-blue-400" />
                              <span className="text-blue-800 dark:text-blue-200 font-medium">{detailedRecipe.servings}</span>
                            </div>
                          )}
                          {detailedRecipe.vegetarian && (
                            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full text-xs">
                              <FaLeaf className="text-green-600 dark:text-green-400" />
                              <span className="text-green-800 dark:text-green-200 font-medium">Veg</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <Link 
                        href={`/recipes/${recipe.id}`} 
                        className="inline-block bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 w-full text-center"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No recipes found</h3>
                  <p className="text-gray-600 dark:text-gray-300">Try searching for different recipes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-300">Get started with these popular options</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/search" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group border border-gray-200 dark:border-gray-700">
              <div className="bg-red-100 dark:bg-red-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                <FaSearch className="text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Search Recipes</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Find recipes by ingredients, cuisine, or dietary preferences</p>
            </Link>
            
            <Link href="/cuisines" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <FaStar className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Browse Cuisines</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Explore recipes from different world cuisines</p>
            </Link>
            
            <Link href="/search?q=quick" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 group border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <FaClock className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Quick Meals</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Find recipes that are ready in 30 minutes or less</p>
            </Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-red-100 dark:text-red-200 mb-6 max-w-md mx-auto">
            Get the latest recipes and cooking tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 dark:text-gray-900 bg-white dark:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-300"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-red-800 dark:text-red-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}