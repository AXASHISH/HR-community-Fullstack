import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AwardCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Icon mapping with better visual icons
  const getCategoryIcon = (categoryName, nominationType) => {
    const name = categoryName.toLowerCase();
    
    if (name.includes('innovator') || name.includes('innovation')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      );
    } else if (name.includes('internship')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      );
    } else if (name.includes('excellence')) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (nominationType === 'organization') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  const fetchCategories = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API_URL}/nomination-categories`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer pljBfWYUHU9Sl3xxFvlabIEMQh8jUcUmTqdHOuuHfoyOmD4jWIc3bSS9zQmY8ULe",
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(config);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleVote = (category) => {
    navigate(`/category/${category.category_id}`, { 
      state: { category } 
    });
  };

  // Separate categories by type
  const individualCategories = categories.filter(cat => cat.nomination_type === 'individual');
  const organizationCategories = categories.filter(cat => cat.nomination_type === 'organization');

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 text-sm">Loading award categories...</p>
        </div>
      </div>
    );
  };

  const CategoryCard = ({ category }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-3 border border-gray-100 hover:border-blue-200">
      {/* Icon, Category Name and Button in same row */}
      <div className="flex items-center justify-between gap-3">
        {/* Left side: Icon and Name */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${
            category.is_open 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-500'
          } flex-shrink-0`}>
            {getCategoryIcon(category.category_name, category.nomination_type)}
          </div>
          
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1 min-w-0">
            {category.category_name}
          </h3>
        </div>
        
        {/* Right side: Vote Button */}
        <button 
          onClick={() => handleVote(category)}
          disabled={!category.is_open}
          className={`py-2 px-4 rounded-md font-medium text-xs transition-all duration-300 flex-shrink-0 ${
            category.is_open
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {category.is_open ? 'Vote' : 'Closed'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-blue-50">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Award Categories
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Vote for outstanding individuals and organizations
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          {/* Individual Categories - Left Side */}
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500 rounded-lg mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Individual Awards</h2>
            </div>
            
            <div className="space-y-3">
              {individualCategories.map((category) => (
                <CategoryCard key={category.category_id} category={category} />
              ))}
            </div>
            
            {individualCategories.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">No individual categories available</p>
              </div>
            )}
          </div>
          
          {/* Organization Categories - Right Side */}
          <div>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-700 rounded-lg mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Organization Awards</h2>
            </div>
            
            <div className="space-y-3">
              {organizationCategories.map((category) => (
                <CategoryCard key={category.category_id} category={category} />
              ))}
            </div>
            
            {organizationCategories.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm">No organization categories available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Empty State - when no categories at all */}
        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Available</h3>
            <p className="text-gray-500 text-sm">Check back later for new award categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwardCategories;
