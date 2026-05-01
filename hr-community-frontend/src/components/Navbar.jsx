import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SignUp from "../pages/SignUp";
import {
    Menu,
    X,
    ChevronDown,
    Award,
    Users,
    Calendar,
    Home,
    Info,
    Activity,
    Grid,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import JoinCommunity from "../pages/joincommunity";

// Custom hook to handle clicking outside of an element
const useClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

const Navbar = () => {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isJoinCommunityOpen, setIsJoinCommunityOpen] = useState(false); // Add this state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const aboutDropdownRef = useRef(null);
    useClickOutside(aboutDropdownRef, () => setIsAboutDropdownOpen(false));
    
    const eventsDropdownRef = useRef(null);
    const location = useLocation();
    
    useClickOutside(eventsDropdownRef, () => setIsEventsDropdownOpen(false));
    
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsEventsDropdownOpen(false);
        setIsAboutDropdownOpen(false);
    };
    const navigate = useNavigate();
    
    // Define nav links for root path ("/")
    const navLinks = [
        {
            to: "/#About",
            text: "About",
            hasDropdown: true,
            dropdownLinks: [
                { to: "/advisory-board", text: "Advisory Board" },
                { to: "/#mission-vision", text: "Mission & Vision" },
            ],
        },
        { to: "/members", text: "Members" },
        { to: "/#Activity", text: "Initiatives" },
        { to: "/#TARoundtable", text: "Talent Forum" },
    ];

    // Define nav links for /hr-summit
    const hrSummitLinks = [
        {
            to: "/#About",
            text: "About",
            hasDropdown: true,
            dropdownLinks: [
                { to: "/advisory-board", text: "Advisory Board" },
                { to: "/#mission-vision", text: "Mission & Vision" },
            ],
        },
        { to: "/members", text: "Members" },
        { to: "/#Activity", text: "Initiatives" },
        { to: "/#TARoundtable", text: "Talent Forum" },
        { to: "/hr-awards", text: "Award" },
    ];

    // Define nav links for /hr-awards
    const hrAwardsLinks = [
        { to: "/hr-summit", text: "Home", exact: true },
    ];

    // Define nav links for /login page - NEW
    const loginPageLinks = [
        { to: "/hr-summit", text: "Home", exact: true },
    ];

    // Define event dropdown links
    const eventLinks = [
        { to: "/hr-summit", text: "2025" },
        { to: "/hr-summit/past-events", text: "2024" },
    ];

    // Determine which links to show based on the current path
    const currentLinks = location.pathname === "/login"
        ? loginPageLinks
        : location.pathname.startsWith("/hr-summit")
        ? hrSummitLinks
        : location.pathname.startsWith("/hr-awards")
        ? hrAwardsLinks
        : navLinks;

    // Check if we're on the login page
    const isLoginPage = location.pathname === "/login";

    // Style for the active NavLink
    const activeLinkClass = "text-brand_blue font-semibold";

    return (
        <>
            {/* SignUp Dialog */}
            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
                <DialogContent className="sm:max-w-2xl p-0 overflow-y-auto max-h-[90vh]">
                    <SignUp onSuccessfulRegister={() => setIsSignUpOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Join Community Dialog */}
           {/* Join Community Dialog */}
<Dialog open={isJoinCommunityOpen} onOpenChange={setIsJoinCommunityOpen}>
    <DialogContent className="sm:max-w-3xl p-0 overflow-y-auto max-h-[90vh]">
        <JoinCommunity onSuccessfulRegister={() => setIsJoinCommunityOpen(false)} />
    </DialogContent>
</Dialog>


            <nav className="w-full bg-white/95 shadow-md border-b border-gray-200/80 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Left Side - Logo */}
                        <Link
                            to="/"
                            onClick={closeAllMenus}
                            className="flex items-center space-x-2 flex-shrink-0"
                        >
                            <img
                                src="/favicon.png"
                                alt="community logo"
                                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                            />
                        </Link>

                        {/* Center Nav Items - Desktop */}
                        {!isLoginPage && (
                            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-gray-600">
                                {currentLinks.map((link) => {
                                    const isHashLink = link.to.includes("#");
                                    const [basePath, hash] = link.to.split("#");

                                    const isActive = isHashLink
                                        ? location.pathname === basePath &&
                                        location.hash === (hash ? `#${hash}` : "")
                                        : location.pathname === link.to ||
                                        (link.text === "Activity" &&
                                            location.pathname.startsWith("/activity"));

                                    const linkClass = `relative text-sm font-medium transition-colors duration-300 hover:text-brand_blue ${
                                        isActive ? activeLinkClass : ""
                                    }`;

                                    const content = (
                                        <div className="flex items-center space-x-1">
                                            {link.icon}
                                            <span>{link.text}</span>
                                            {link.hasDropdown && (
                                                <ChevronDown size={16} className="transition-transform" />
                                            )}
                                        </div>
                                    );

                                    if (link.hasDropdown) {
                                        return (
                                            <div
                                                key={link.text}
                                                className="relative"
                                                ref={aboutDropdownRef}
                                                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                                                onMouseLeave={() => setIsAboutDropdownOpen(false)}
                                            >
                                                <button
                                                    className={linkClass}
                                                    aria-haspopup="true"
                                                    aria-expanded={isAboutDropdownOpen}
                                                >
                                                    {content}
                                                </button>

                                                <AnimatePresence>
                                                    {isAboutDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            transition={{ duration: 0.2, ease: "easeInOut" }}
                                                            className="absolute top-full mt-2 bg-white border border-gray-200/80 rounded-lg shadow-xl z-20 min-w-[200px]"
                                                        >
                                                            {link.dropdownLinks.map((subLink) => (
                                                                <Link
                                                                    key={subLink.to}
                                                                    to={subLink.to}
                                                                    onClick={closeAllMenus}
                                                                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors duration-200 ${
                                                                        location.hash === subLink.to
                                                                            ? "text-brand_blue font-medium"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    {subLink.text}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    }

                                    return isHashLink ? (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={closeAllMenus}
                                            className={linkClass}
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            end={link.exact}
                                            onClick={closeAllMenus}
                                            className={linkClass}
                                        >
                                            {content}
                                        </NavLink>
                                    );
                                })}

                                {/* Events Dropdown (Only show if not on /hr-awards) */}
                                {!location.pathname.startsWith("/hr-awards") && (
                                    <div
                                        className="relative"
                                        ref={eventsDropdownRef}
                                        onMouseEnter={() => setIsEventsDropdownOpen(true)}
                                        onMouseLeave={() => setIsEventsDropdownOpen(false)}
                                    >
                                        <div
                                            className={`flex items-center space-x-1 cursor-pointer text-sm font-medium transition-colors duration-300 hover:text-brand_blue ${
                                                isEventsDropdownOpen ||
                                                eventLinks.some((link) => location.pathname === link.to)
                                                    ? "text-brand_blue"
                                                    : ""
                                            }`}
                                        >
                                            <span className="hidden sm:block">HR Summit</span>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-300 ${
                                                    isEventsDropdownOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {isEventsDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    className="absolute top-full mt-2 bg-white border border-gray-200/80 rounded-lg shadow-xl z-20 min-w-[200px] sm:min-w-[220px] overflow-hidden"
                                                >
                                                    {eventLinks.map((link) => (
                                                        <Link
                                                            key={link.to}
                                                            to={link.to}
                                                            onClick={closeAllMenus}
                                                            className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors duration-200 ${
                                                                location.pathname === link.to
                                                                    ? "bg-gray-100 text-brand_blue font-medium"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <span className="font-medium">{link.text}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                                {location.pathname.startsWith("/hr-award") && (
                                    <Button
                                        onClick={() => navigate("/login")}
                                        className="bg-brand_blue text-white font-semibold px-4 py-1 text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue hover:shadow-md animate-pulse-glow"
                                    >
                                        Nominate Now
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Login Page Navigation - Desktop */}
                        {isLoginPage && (
                            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-gray-600">
                                {currentLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        end={link.exact}
                                        onClick={closeAllMenus}
                                        className={`relative text-sm font-medium transition-colors duration-300 hover:text-brand_blue ${
                                            location.pathname === link.to ? activeLinkClass : ""
                                        }`}
                                    >
                                        <Home size={16} className="inline mr-2" />
                                        {link.text}
                                    </NavLink>
                                ))}
                            </div>
                        )}

                        {/* Right Side - Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                            {isLoginPage ? (
                                <Button
                                    onClick={() => setIsSignUpOpen(true)}
                                    className="bg-brand_blue text-white font-semibold px-4 py-2 text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue/90 hover:shadow-md"
                                >
                                    Register
                                </Button>
                            ) : location.pathname.startsWith("/hr-award") ? (
                                <Link to="/login">
                                    <Button
                                        variant="ghost"
                                        className="font-semibold text-brand_blue px-3 py-1 text-sm transition-colors duration-300 hover:bg-brand_blue/10 hover:text-brand_blue"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Button
                                        className="bg-brand_blue text-white font-semibold px-3 py-1 text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue hover:shadow-md ml-10"
                                        onClick={() => navigate("/hr-awards")}
                                    >
                                        HR Excellence Award
                                    </Button>
                                    <Button
                                        onClick={() => setIsJoinCommunityOpen(true)} // Updated to open popup
                                        className="bg-orange-500 text-white font-semibold px-3 py-1 text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md"
                                    >
                                        Join Community
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle mobile menu"
                                className="p-2"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden fixed inset-0 z-30 bg-black/50"
                            onClick={closeAllMenus}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu Panel */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden fixed top-0 right-0 w-4/5 sm:w-3/5 max-w-xs h-full bg-white z-40 flex flex-col p-4 sm:p-6"
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={closeAllMenus}
                                    aria-label="Close mobile menu"
                                    className="p-2"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex flex-col items-start space-y-4 p-4 rounded-lg w-full">
                                {/* Main Navigation Links */}
                                {currentLinks.map((link) => {
                                    const isHashLink = link.to.includes("#");
                                    const [basePath, hash] = link.to.split("#");
                                    const isActive = isHashLink
                                        ? location.pathname === basePath &&
                                        location.hash === (hash ? `#${hash}` : "")
                                        : location.pathname === link.to ||
                                        (link.text === "Activity" &&
                                            location.pathname.startsWith("/activity"));

                                    // Handle dropdown links in mobile
                                    if (link.hasDropdown) {
                                        return (
                                            <div key={link.text} className="w-full">
                                                <div className={`text-lg sm:text-xl font-medium text-gray-800 flex items-center space-x-2 mb-2 ${
                                                    isActive ? "text-brand_blue" : ""
                                                }`}>
                                                    {link.icon}
                                                    <span>{link.text}</span>
                                                </div>
                                                {/* Dropdown items */}
                                                <div className="ml-6 space-y-2">
                                                    {link.dropdownLinks.map((subLink) => (
                                                        <Link
                                                            key={subLink.to}
                                                            to={subLink.to}
                                                            onClick={closeAllMenus}
                                                            className={`block text-base text-gray-600 hover:text-brand_blue transition-colors duration-200 ${
                                                                location.hash === subLink.to || location.pathname === subLink.to
                                                                    ? "text-brand_blue font-medium"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {subLink.text}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }

                                    const content = (
                                        <>
                                            {isLoginPage && <Home size={20} />}
                                            {link.icon}
                                            <span>{link.text}</span>
                                        </>
                                    );

                                    return isHashLink ? (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={closeAllMenus}
                                            className={`text-lg sm:text-xl font-medium text-gray-800 flex items-center space-x-2 ${
                                                isActive ? "text-brand_blue" : ""
                                            }`}
                                        >
                                            {content}
                                        </Link>
                                    ) : (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            onClick={closeAllMenus}
                                            className={`text-lg sm:text-xl font-medium text-gray-800 flex items-center space-x-2 ${
                                                isActive ? "text-brand_blue" : ""
                                            }`}
                                            end={link.exact}
                                        >
                                            {content}
                                        </NavLink>
                                    );
                                })}

                                {/* HR Summit Dropdown - Only show if not on login page or hr-awards */}
                                {!isLoginPage && !location.pathname.startsWith("/hr-awards") && (
                                    <div className="w-full">
                                        <div className={`text-lg sm:text-xl font-medium text-gray-800 flex items-center space-x-2 mb-2 ${
                                            eventLinks.some((link) => location.pathname === link.to) ? "text-brand_blue" : ""
                                        }`}>
                                            <Calendar size={20} />
                                            <span>HR Summit</span>
                                        </div>
                                        {/* Event dropdown items */}
                                        <div className="ml-6 space-y-2">
                                            {eventLinks.map((link) => (
                                                <Link
                                                    key={link.to}
                                                    to={link.to}
                                                    onClick={closeAllMenus}
                                                    className={`block text-base text-gray-600 hover:text-brand_blue transition-colors duration-200 ${
                                                        location.pathname === link.to
                                                            ? "text-brand_blue font-medium"
                                                            : ""
                                                    }`}
                                                >
                                                    {link.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="border-t border-gray-200 w-full pt-4 mt-4 flex flex-col items-center space-y-3">
                                    {isLoginPage ? (
                                        <Button
                                            onClick={() => {
                                                closeAllMenus();
                                                setIsSignUpOpen(true);
                                            }}
                                            className="w-full bg-brand_blue text-white font-semibold py-2 text-base rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue/90 hover:shadow-md"
                                        >
                                            Register
                                        </Button>
                                    ) : location.pathname.startsWith("/hr-award") ? (
                                        <>
                                            <Link to="/login" className="w-full">
                                                <Button
                                                    variant="ghost"
                                                    onClick={closeAllMenus}
                                                    className="w-full font-semibold text-brand_blue py-2 text-base transition-colors duration-300 hover:bg-brand_blue/10"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => {
                                                    closeAllMenus();
                                                    setIsSignUpOpen(true);
                                                }}
                                                className="w-full bg-brand_blue text-white font-semibold py-2 text-base rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue/90 hover:shadow-md animate-pulse-glow"
                                            >
                                                Nominate Now
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                className="w-full bg-brand_blue text-white font-semibold py-2 text-base rounded-lg shadow-sm transition-all duration-300 hover:bg-brand_blue hover:shadow-md"
                                                onClick={() => {
                                                    closeAllMenus();
                                                    navigate("/hr-awards");
                                                }}
                                            >
                                                HR Excellence Award
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    closeAllMenus();
                                                    setIsJoinCommunityOpen(true); // Updated to open popup
                                                }}
                                                className="w-full bg-orange-500 text-white font-semibold py-2 text-base rounded-lg shadow-sm transition-all duration-300 hover:bg-orange-600 hover:shadow-md"
                                            >
                                                Join Community
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
