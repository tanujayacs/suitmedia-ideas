import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Card from './components/Card';
import Pagination from './components/Pagination';
import { fetchIdeas } from './services/api';
import { Idea, ApiResponse } from './types';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? parseInt(savedPage) : 1;
  });
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const savedSize = localStorage.getItem('itemsPerPage');
    return savedSize ? parseInt(savedSize) : 10;
  });
  const [sortBy, setSortBy] = useState(() => {
    const savedSort = localStorage.getItem('sortBy');
    return savedSort === 'published_at' ? 'published_at' : '-published_at';
  });
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [fromItem, setFromItem] = useState(0);
  const [toItem, setToItem] = useState(0);

  useEffect(() => {
    loadIdeas();
  }, [currentPage, itemsPerPage, sortBy]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
    localStorage.setItem('sortBy', sortBy);
  }, [currentPage, itemsPerPage, sortBy]);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await fetchIdeas({
        page: currentPage,
        size: itemsPerPage,
        sort: sortBy as 'published_at' | '-published_at',
      });
      
      setIdeas(response.data);
      setTotalPages(response.meta.last_page);
      setTotalItems(response.meta.total);
      setFromItem(response.meta.from);
      setToItem(response.meta.to);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'published_at' | '-published_at');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner />
      
      <main className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="text-gray-600">
              Showing {fromItem}-{toItem} of {totalItems}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="text-sm font-medium text-gray-700">
                  Show per page:
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sortBy" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                >
                  <option value="-published_at">Newest</option>
                  <option value="published_at">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
            </div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {ideas.map((idea) => (
                  <Card key={idea.id} idea={idea} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;