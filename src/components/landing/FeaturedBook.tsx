import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faAmazon, faKickstarterK } from "@fortawesome/free-brands-svg-icons";

const FeaturedBook = () => {
  const bookData = {
    title: "Prompt-Driven Development Handbook",
    description: "Master the art of collaborating with AI coding assistants like GitHub Copilot, Cursor, and Claude. Learn practical techniques for AI-assisted development, from prompt engineering to building complete applications while maintaining quality and control.",
    coverImage: "/assets/book_cover.jpg",
    tags: ["AI Development", "Prompt Engineering", "GitHub Copilot", "Software Architecture"],
    isbn: "9789365892932",
    buyLink: "https://in.bpbonline.com/products/prompt-driven-development-handbook",
    kindleLink: "https://www.amazon.com/dp/B0GF6M6KG2",
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl -z-10 group-hover:blur-xl transition-all duration-500"></div>
      
      <div className="relative bg-theme-glass-light backdrop-blur-lg border border-theme-border-medium rounded-3xl overflow-hidden hover:border-theme-border-dark transition-all duration-300">
        <div className="p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faBook} className="text-3xl text-theme-accent" />
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Featured Book</h2>
            <span className="ml-auto px-3 py-1 bg-theme-accent/20 text-theme-accent text-sm font-semibold rounded-full border border-theme-accent/40">
              NEW 📖
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="relative group/cover">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-indigo-500/40 rounded-xl blur-xl group-hover/cover:blur-lg transition-all duration-300"></div>
                <div className="relative w-48 h-64 md:w-56 md:h-80 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-xl shadow-2xl overflow-hidden ring-4 ring-theme-border-medium group-hover/cover:ring-theme-accent transition-all duration-300">
                  {bookData.coverImage ? (
                    <img 
                      src={bookData.coverImage} 
                      alt={bookData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                      <FontAwesomeIcon icon={faBook} className="text-6xl mb-4 opacity-80" />
                      <div className="text-center space-y-2">
                        <p className="text-2xl font-bold">Your Book</p>
                        <p className="text-lg opacity-90">Title Here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Book Details */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-theme-text-primary">
                {bookData.title}
              </h3>
              <p className="text-base md:text-lg text-theme-text-secondary leading-relaxed">
                {bookData.description}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {bookData.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-theme-glass-medium text-theme-text-primary text-sm rounded-full border border-theme-border-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                <a
                  href={bookData.buyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn flex items-center gap-2 px-6 py-3 bg-theme-accent hover:bg-theme-accent-light text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-theme-accent/50"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Buy Now</span>
                </a>
                <a
                  href={bookData.kindleLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn flex items-center gap-2 px-6 py-3 bg-[#FF9900] hover:bg-[#FFB84D] text-[#232F3E] font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF9900]/50"
                >
                  <FontAwesomeIcon icon={faAmazon} />
                  <span>Get on Kindle</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
