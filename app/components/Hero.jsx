import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 mb-8 rounded-2xl shadow-2xl px-6 py-16 text-center">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    Discover Amazing Recipes
                </h1>
                
                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Explore thousands of delicious recipes from around the world. 
                    Find your next favorite dish with our comprehensive recipe collection.
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        href="/search"
                        className="bg-yellow-400 hover:bg-yellow-500 text-red-800 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Start Cooking
                    </Link>
                    <Link 
                        href="/cuisines"
                        className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
                    >
                        Browse Cuisines
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
