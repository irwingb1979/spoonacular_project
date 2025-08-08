// lib/data.js (or wherever you prefer to store data fetching logic)

const API_KEY = process.env.SPOONACULAR_API_KEY;

export async function fetchRecipes(query) {
    if (!API_KEY) {
        throw new Error('SPOONACULAR_API_KEY is not set in environment variables.');
    }

    const searchParams = new URLSearchParams({
        query: query,
        cuisine: 'Italian', // Example cuisine filter
        number: '9', // Fetch 10 recipes
        apiKey: API_KEY,
    });

    const url = `https://api.spoonacular.com/recipes/complexSearch?${searchParams.toString()}`;

    const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
        throw new Error('Failed to fetch recipes from Spoonacular');
    }

    const data = await response.json();
    return data.results; // Spoonacular returns an object with a 'results' array
}

// Recipe information can be fetched using the ID
export async function fetchRecipeById(id) {
    if (!API_KEY) {
        throw new Error('SPOONACULAR_API_KEY is not set in environment variables.');
    }

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch recipe with ID ${id} from Spoonacular`);
    }

    const data = await response.json();
    return data; // Returns detailed information about the recipe
}

// Random recipe fetcher
export async function fetchRandomRecipe() {
    if (!API_KEY) {
        throw new Error('SPOONACULAR_API_KEY is not set in environment variables.');
    }

    const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${API_KEY}`;

    const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
        throw new Error('Failed to fetch a random recipe from Spoonacular');
    }

    const data = await response.json();
    return data.recipes[0]; // Returns a single random recipe
}

// list of supported cuisines African
export const CUISINES = [
    'Asian',
    'Chinese',
    'European',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Korean',
    'Mediterranean',
    'Mexican',
];

export async function fetchCuisines() {
    return CUISINES;
}
export async function fetchRecipesByCuisine(cuisine) {
    const searchParams = new URLSearchParams({
        query: cuisine,
        number: '10',
        apiKey: API_KEY,
    });
    const url = `https://api.spoonacular.com/recipes/complexSearch?${searchParams.toString()}`;
    const response = await fetch(url, {
        next: { revalidate: 3600 },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes for cuisine ${cuisine} from Spoonacular`);
    }
    const data = await response.json();
    return data.results;
}

export async function searchRecipes(query, options = {}) {
    if (!API_KEY) {
        throw new Error('SPOONACULAR_API_KEY is not set in environment variables.');
    }

    const searchParams = new URLSearchParams({
        query: query,
        number: options.number || '12', // Number of results
        addRecipeInformation: 'true', // Include detailed recipe info
        fillIngredients: 'true', // Include ingredient information
        apiKey: API_KEY,
    });

    // Add optional filters
    if (options.cuisine) searchParams.append('cuisine', options.cuisine);
    if (options.diet) searchParams.append('diet', options.diet);
    if (options.intolerances) searchParams.append('intolerances', options.intolerances);
    if (options.maxReadyTime) searchParams.append('maxReadyTime', options.maxReadyTime);
    if (options.minProtein) searchParams.append('minProtein', options.minProtein);
    if (options.maxProtein) searchParams.append('maxProtein', options.maxProtein);
    if (options.minFat) searchParams.append('minFat', options.minFat);
    if (options.maxFat) searchParams.append('maxFat', options.maxFat);
    if (options.minCarbs) searchParams.append('minCarbs', options.minCarbs);
    if (options.maxCarbs) searchParams.append('maxCarbs', options.maxCarbs);

    const url = `https://api.spoonacular.com/recipes/complexSearch?${searchParams.toString()}`;

    const response = await fetch(url, {
        next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
        throw new Error('Failed to search recipes from Spoonacular');
    }

    const data = await response.json();
    return data.results;
}