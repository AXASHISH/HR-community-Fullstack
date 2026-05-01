import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AppFooter from '../../pages/Footer';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Get the root domain (without /hr-community path)
const getRootDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}`;
  } catch {
    return url.split('/hr-community')[0] || url;
  }
};

const STATIC_BASE_URL = getRootDomain(API_BASE_URL);

// Helper function to construct full image URL
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${STATIC_BASE_URL}${cleanPath}`;
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: 'easeOut',
    }
  })
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand_orange"></div>
  </div>
);

// Image component that checks if image exists before displaying
const MemberImage = ({ member }) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (!member.profile_image) return null;
    return getFullImageUrl(member.profile_image);
  };

  const imageUrl = getImageUrl();

  const handleImageError = () => {
    setImageError(true);
  };

  if (!imageUrl || imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-brand_orange to-orange-600 flex items-center justify-center">
        <span className="text-white text-4xl font-bold">
          {member.name?.charAt(0)?.toUpperCase() || '?'}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={imageUrl}
      alt={member.name} 
      className="w-full h-full object-cover object-center"
      onError={handleImageError}
    />
  );
};

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [hasNext, setHasNext] = useState(true);
  const [total, setTotal] = useState(0);

  // Ref for intersection observer
  const observerTarget = useRef(null);

  const fetchMembers = async (currentSkip = 0, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await axios.get(`${API_BASE_URL}/hr_community_members`, {
        params: {
          skip: currentSkip,
          limit: limit
        }
      });
      
      console.log('API Response:', response.data);
      
      // Sort by sequence
      const sortedData = response.data.items.sort((a, b) => 
        (a.sequence_no || 0) - (b.sequence_no || 0)
      );
      
      // Append new items if loading more, otherwise replace
      if (isLoadMore) {
        setMembers(prev => [...prev, ...sortedData]);
      } else {
        setMembers(sortedData);
      }

      setTotal(response.data.total);
      setHasNext(response.data.has_next);
      setError(null);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to load members';
      setError(errorMsg);
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMembers(0, false);
  }, []);

  // Load more function
  const loadMore = useCallback(() => {
    if (!loadingMore && hasNext) {
      const nextSkip = skip + limit;
      setSkip(nextSkip);
      fetchMembers(nextSkip, true);
    }
  }, [skip, limit, hasNext, loadingMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNext, loadingMore, loadMore]);

  return (
    <>
      <div className="min-h-screen py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Badge */}
          <div className="flex justify-center mb-12">
            <span className="bg-brand_orange px-8 py-3 rounded-full text-white text-2xl font-semibold tracking-wider shadow-lg">
              Our Members
            </span>
          </div>

          

          {/* Initial Loading State */}
          {loading && members.length === 0 && <LoadingSpinner />}

          {/* Error State */}
          {error && (
            <div className="text-center p-8">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 inline-block">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
              <br />
              <button 
                onClick={() => {
                  setSkip(0);
                  fetchMembers(0, false);
                }}
                className="mt-4 px-6 py-2 bg-brand_orange text-white rounded-lg hover:bg-opacity-90 transition-all"
              >
                Retry
              </button>
            </div>
          )}

          {/* Members Grid */}
          {!error && members.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {members.map((member, idx) => (
                  <motion.div
                    key={member.member_id || idx}
                    className="flex flex-col items-center p-6"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx % 10}
                  >
                    {/* Circular Image Container */}
                    <div className="w-[180px] h-[180px] rounded-full overflow-hidden bg-gray-200 mb-4 border-4 border-white shadow-lg">
                      <MemberImage member={member} />
                    </div>

                    {/* Info Container */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-md text-gray-600 font-medium mb-1">
                        {member.role || 'Member'}
                      </p>
                      {member.company && (
                        <p className="text-md text-gray-500">
                          {member.company}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Intersection Observer Target */}
              <div ref={observerTarget} className="h-10" />

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand_orange"></div>
                  <span className="ml-3 text-gray-600">Loading more members...</span>
                </div>
              )}

            </>
          )}

          {/* Empty State */}
          {!loading && !error && members.length === 0 && (
            <div className="text-center p-8">
              <p className="text-gray-600 text-lg">Coming Soon</p>
            </div>
          )}
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default Members;
