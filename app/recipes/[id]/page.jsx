import { fetchRecipeById } from '@/lib/data';
import { FaUsers, FaLeaf, FaFire, FaClock, FaStar, FaHeart } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import Link from 'next/link';

const RecipePage = async ({ params }) => {
  const { id } = params;
  const recipe = await fetchRecipeById(id);

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/" className="text-red-500 hover:text-red-600">
          ← Back to Home
        </Link>
      </nav>

      {/* Recipe Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          {/* Recipe Image */}
          <div className="md:w-1/2">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          
          {/* Recipe Info */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            
            {/* Recipe Stats */}
            <div className="flex flex-wrap gap-3 mb-6">
              {recipe.readyInMinutes && (
                <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-full">
                  <BiTime className="text-orange-600" />
                  <span className="text-sm font-medium">{recipe.readyInMinutes} min</span>
                </div>
              )}
              {recipe.servings && (
                <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-full">
                  <FaUsers className="text-blue-600" />
                  <span className="text-sm font-medium">Serves {recipe.servings}</span>
                </div>
              )}
              {recipe.vegetarian && (
                <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-full">
                  <FaLeaf className="text-green-600" />
                  <span className="text-sm font-medium">Vegetarian</span>
                </div>
              )}
              {recipe.glutenFree && (
                <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-full">
                  <FaStar className="text-purple-600" />
                  <span className="text-sm font-medium">Gluten Free</span>
                </div>
              )}
            </div>

            {/* Recipe Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About this recipe</h3>
              <p className="text-gray-600 leading-relaxed">
                {stripHtml(recipe.summary)}
              </p>
            </div>

            {/* Health Score */}
            {recipe.healthScore && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Health Score</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${recipe.healthScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{recipe.healthScore}/100</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-medium text-gray-800">{ingredient.original}</span>
                  {ingredient.amount && ingredient.unit && (
                    <span className="text-sm text-gray-600 ml-2">
                      ({ingredient.amount} {ingredient.unit})
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h2>
          {recipe.analyzedInstructions?.[0]?.steps ? (
            <ol className="space-y-4">
              {recipe.analyzedInstructions[0].steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{step.step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500">No detailed instructions available.</p>
          )}
        </div>
      </div>

      {/* Nutrition Information */}
      {recipe.nutrition && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipe.nutrition.nutrients?.map((nutrient, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-500">{nutrient.amount}g</div>
                <div className="text-sm text-gray-600">{nutrient.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wine Pairing */}
      {recipe.winePairing && recipe.winePairing.pairedWines?.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Wine Pairing</h2>
          <div className="space-y-4">
            <p className="text-gray-600">{recipe.winePairing.pairingText}</p>
            <div className="flex flex-wrap gap-2">
              {recipe.winePairing.pairedWines.map((wine, index) => (
                <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  {wine}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;