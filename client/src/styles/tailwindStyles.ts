// src/styles/tailwindStyles.ts

// Existing classes kept as-is...
export const centerScreen = "min-h-screen flex items-center justify-center";
export const cardContainer = "w-[90%] lg:max-w-md bg-white shadow-xl rounded-3xl p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl";
export const cardHeading = "text-center mb-6 font-semibold text-gray-800 text-2xl";
export const formLayout = "flex flex-col gap-4";
export const fullWidth = "w-full";
export const inputClass = "bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
export const primaryButton = "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all";
export const errorText = "text-red-600 text-sm text-center mt-2";

// ✅ New landing page classes only

// Headings
export const landingHeading = "text-white font-bold mb-4";
export const landingSubHeading = "text-white/80 mb-6 text-center";

// Landing Page Button (rounded gradient)
export const landingGradientButton = 
  "bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all";

  export const landingFeaturesGrid = 
  "p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 place-items-stretch";

export const featureCard = 
  "flex flex-col items-center text-center p-6 rounded-2xl border border-white/30 backdrop-blur-md bg-white/10 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer w-300";

export const featureIcon = "text-4xl mb-4";
export const featureTitle = "text-white font-semibold mb-2";
export const featureDesc = "text-white/80";

// Navbar
export const landingNavbar = "bg-white/10 backdrop-blur-md rounded-b-xl shadow-none p-2";
export const landingNavbarButton = "text-white capitalize font-semibold";

export const mobileMenuBase = 
  "text-left flex flex-col sm:hidden gap-2 p-4 transform transition-all duration-300 ease-in-out origin-left";

export const mobileMenuOpen = 
  "scale-x-100 opacity-100";

export const mobileMenuClosed = 
  "scale-x-0 opacity-0 pointer-events-none";

// Footer
  export const footerBase = 
  "w-full bg-gray-900 text-gray-300 py-6 mt-10";

export const footerContainer = 
  "max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4";

export const footerLink = 
  "hover:underline text-sm";

// ✅ Question Sets Page Styles
export const questionSetsPage = "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6";
export const questionSetsContainer = "max-w-7xl mx-auto";
export const questionSetsHeader = "mb-8";
export const questionSetsTitle = "font-bold text-gray-800 mb-2";
export const questionSetsSubtitle = "text-gray-600";
export const questionSetsGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8";
export const questionSetCard = "h-full hover:shadow-lg transition-shadow cursor-pointer rounded-lg";
export const questionSetCardContent = "h-full flex flex-col";
export const questionSetCardHeader = "flex justify-between items-start mb-3";
export const questionSetCardTitle = "font-semibold text-gray-800";
export const questionSetCardBody = "text-gray-600 mb-2 flex-grow";
export const questionSetCardButton = "mt-2";
export const questionSetsEmptyState = "text-center py-12";
export const questionSetsEmptyTitle = "text-gray-500 mb-4";
export const questionSetsDialogContent = "space-y-4 pt-2";
export const questionSetsFab = "fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600";

// Question Set Status Chips
export const statusChipDraft = "bg-yellow-100 text-yellow-800";
export const statusChipPublished = "bg-green-100 text-green-800";

// ✅ Questions Page Styles
export const questionsPage = "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6";
export const questionsContainer = "max-w-7xl mx-auto";
export const questionsHeader = "mb-8";
export const questionsTitle = "font-bold text-gray-800 mb-2";
export const questionsSubtitle = "text-gray-600";
export const questionsFiltersContainer = "mb-6 bg-white rounded-lg p-4 shadow-sm";
export const questionsFiltersGrid = "grid grid-cols-1 md:grid-cols-4 gap-4";
export const questionsFiltersCount = "flex items-center";
export const questionsFiltersCountText = "text-gray-600";
export const questionsList = "space-y-4 mb-8";
export const questionCard = "hover:shadow-md transition-shadow";
export const questionCardHeader = "flex justify-between items-start mb-3";
export const questionCardTitle = "font-semibold text-gray-800 flex-grow mr-4";
export const questionCardBody = "text-gray-600 mb-4";
export const questionCardTags = "flex flex-wrap gap-2";
export const questionsEmptyState = "text-center py-12";
export const questionsEmptyTitle = "text-gray-500 mb-4";
export const questionsPagination = "flex justify-center";

// Question Difficulty Colors
export const difficultyEasy = "bg-green-100 text-green-700";
export const difficultyMedium = "bg-yellow-100 text-yellow-700";
export const difficultyHard = "bg-red-100 text-red-700";
export const difficultyDefault = "bg-gray-100 text-gray-700";

// Question Tags
export const tagCategory = "bg-blue-100 text-blue-700";
export const tagDefault = "bg-gray-100 text-gray-700";
export const tagMore = "bg-gray-100 text-gray-500";

// Common Button Styles
export const gradientButton = "bg-gradient-to-r from-purple-600 to-blue-600";
export const gradientButtonHover = "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700";

// Loading States
export const loadingContainer = "flex justify-center items-center min-h-screen";

