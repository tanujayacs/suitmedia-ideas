import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Card from './components/Card';
import Pagination from './components/Pagination';
import { fetchIdeas } from './services/api';
import { Idea, ApiResponse } from './types';

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  // Get state from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page') || '1');
    const size = parseInt(urlParams.get('size') || '10');
    const sort = urlParams.get('sort') || 'newest';

    setCurrentPage(page);
    setItemsPerPage(size);
    setSortOrder(sort as 'newest' | 'oldest');
  }, []);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('size', itemsPerPage.toString());
    params.set('sort', sortOrder);
    
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }, [currentPage, itemsPerPage, sortOrder]);

  // Fetch ideas when parameters change
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchIdeas({
          page: currentPage,
          size: itemsPerPage,
          sort: sortOrder === 'newest' ? '-published_at' : 'published_at',
        });

        setIdeas(response.data);
        setApiResponse(response);
      } catch (err) {
        setError('Failed to load ideas. Please try again.');
        console.error('Error loading ideas:', err);
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [currentPage, itemsPerPage, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: 'newest' | 'oldest') => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  const getStatusText = () => {
    if (!apiResponse) return '';
    
    const { from, to, total } = apiResponse.meta;
    return `Showing ${from} - ${to} of ${total}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          {/* Status */}
          <div className="text-gray-600">
            {getStatusText()}
          </div>

          {/* Sort and Items per page */}
          <div className="flex items-center gap-6">
            {/* Show per page */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700">Show per page:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-suitmedia-orange"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700">Sort by:</label>
              <select
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as 'newest' | 'oldest')}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-suitmedia-orange"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-suitmedia-orange"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-suitmedia-orange text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Ideas Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ideas.map((idea) => (
                <Card key={idea.id} idea={idea} />
              ))}
            </div>

            {/* Pagination */}
            {apiResponse && (
              <Pagination
                currentPage={currentPage}
                totalPages={apiResponse.meta.last_page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;