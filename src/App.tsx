import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Card from './components/Card';
import Pagination from './components/Pagination';
import { fetchIdeas } from './services/api';
import { Idea, ApiResponse } from './types';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = parseInt(searchParams.get('size') || '10');
  const sortBy = (searchParams.get('sort') || '-published_at') as 'published_at' | '-published_at';

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [fromItem, setFromItem] = useState(0);
  const [toItem, setToItem] = useState(0);

  useEffect(() => {
    loadIdeas();
  }, [currentPage, itemsPerPage, sortBy]);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      const response: ApiResponse = await fetchIdeas({
        page: currentPage,
        size: itemsPerPage,
        sort: sortBy,
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

  const updateParams = (page: number, size: number, sort: string) => {
    setSearchParams({ page: page.toString(), size: size.toString(), sort });
  };

  const handlePageChange = (page: number) => updateParams(page, itemsPerPage, sortBy);
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => updateParams(1, parseInt(e.target.value), sortBy);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => updateParams(1, itemsPerPage, e.target.value);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner />

      <main className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
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
                  className="px-3 py-2 border border-gray-300 rounded-full pr-6 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
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
                  className="px-3 py-2 border border-gray-300 rounded-full pr-6 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                >
                  <option value="-published_at">Newest</option>
                  <option value="published_at">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange"></div>
            </div>
          ) : (
            <>
              <div className="px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {ideas.map((idea) => (
                  <Card key={idea.id} idea={idea} />
                ))}
              </div>

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
