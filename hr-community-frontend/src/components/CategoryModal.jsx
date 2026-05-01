import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryModal = ({ isOpen, category, onClose }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = sessionStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    if (!isOpen || !category) return null;

    const handleNominate = () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }
        
        // Navigate to nomination form with category data
        navigate("/nomination-form", { state: { selectedCategory: category } });
        onClose();
    };

    const handleViewNominees = () => {
        navigate(`/nominees/${category.category_id}`, { state: { category } });
        onClose();
    };

    // Safe data extraction with defaults
    const categoryName = category?.category_name || "Award Category";
    const isOpen_status = category?.is_open !== false;
    const nominationType = category?.nomination_type || "individual";
    const description = category?.description || "No description available";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-300 ease-out max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="relative bg-white p-6 border-b border-gray-200 sticky top-0">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 group"
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5 text-gray-600 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Logo and Category Name */}
                    <div className="flex items-center gap-3 mb-4 pr-12">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#ffd75e] to-[#f39c12] rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 capitalize leading-tight truncate">
                            {categoryName}
                        </h2>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ${isOpen_status
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            {isOpen_status ? '✨ Open' : '🔒 Closed'}
                        </span>
                        <span className="px-3 py-1.5 bg-amber-100 text-amber-700 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                            {nominationType === 'individual' ? '👤 Individual' : '🏢 Organization'}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-white space-y-6">
                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#351744] rounded-full"></span>
                            About This Award
                        </h3>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                            {description}
                        </p>
                    </div>

                    {/* Additional Info */}
                    {category?.end_date && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                                <strong>Nomination Deadline:</strong>{" "}
                                {new Date(category.end_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <button
                            disabled={!isOpen_status}
                            className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all duration-300 transform ${isOpen_status
                                ? 'bg-gradient-to-r from-[#351744] via-[#4a1f5a] to-[#351744] text-white hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                } relative overflow-hidden group`}
                            onClick={handleNominate}
                        >
                            {isOpen_status && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            )}
                            <span className="relative flex items-center justify-center gap-2">
                                {isOpen_status ? (
                                    <>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        </svg>
                                        {isLoggedIn ? "Nominate Now" : "Login to Nominate"}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                                        </svg>
                                        Closed
                                    </>
                                )}
                            </span>
                        </button>

                        <button
                            className="flex-1 py-3 px-6 border-2 border-[#351744] rounded-xl font-bold text-sm uppercase tracking-wide text-[#351744] hover:bg-[#351744] hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 relative overflow-hidden group"
                            onClick={handleViewNominees}
                        >
                            <div className="absolute inset-0 bg-[#351744] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1zm4 0V8c0-.55-.45-1-1-1s-1 .45-1 1v2c0 .55.45 1 1 1s1-.45 1-1z" />
                                </svg>
                                View Nominees
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bottom Decorative Element */}
                <div className="h-1 bg-gradient-to-r from-[#351744] via-[#ffd75e] to-[#351744]"></div>
            </div>
        </div>
    );
};

export default CategoryModal;