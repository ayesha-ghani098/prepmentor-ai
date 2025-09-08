// src/styles/tailwindStyles.ts

// Existing classes kept as-is...
export const centerScreen = "min-h-screen flex items-center justify-center px-4";
export const cardContainer = "w-full max-w-md bg-white shadow-xl rounded-3xl p-6 sm:p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl";
export const cardHeading = "text-center mb-6 font-semibold text-gray-800 text-2xl";
export const formLayout = "flex flex-col gap-4";
export const fullWidth = "w-full";
export const inputClass = "bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
export const primaryButton = "bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all";
export const errorText = "text-red-600 text-sm text-center mt-2";

// ✅ New landing page classes only

// Headings
export const landingHeading = "text-white font-extrabold mb-3 !text-3xl sm:!text-5xl";
export const landingSubHeading = "text-white/80 mb-6 text-center !text-sm sm:!text-base";

// Landing Page Button (rounded gradient)
export const landingGradientButton = 
  "w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all";

export const landingFeaturesGrid = 
  "px-4 py-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-16 sm:pb-20 place-items-stretch";

export const featureCard = 
  "w-full flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl border border-white/30 backdrop-blur-md bg-white/10 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer";

export const featureIcon = "text-3xl sm:text-4xl mb-3 sm:mb-4";
export const featureTitle = "text-white font-semibold mb-1 sm:mb-2 text-base sm:text-lg";
export const featureDesc = "text-white/80 text-sm sm:text-base";

// Navbar
export const landingNavbar = "bg-white/10 backdrop-blur-md rounded-b-xl shadow-none p-2";
export const landingNavbarButton = "text-white capitalize font-semibold";

export const mobileMenuBase = 
  "text-left flex flex-col sm:hidden gap-2 p-4 transform transition-all duration-300 ease-in-out origin-left w-full";

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
export const questionSetsPage = "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6";
export const questionSetsContainer = "max-w-7xl mx-auto";
export const questionSetsHeader = "mb-8";
export const questionSetsTitle = "font-bold text-gray-800 mb-2";
export const questionSetsSubtitle = "text-gray-600";
export const questionSetsGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8";
export const questionSetCard = "h-full hover:shadow-lg transition-shadow cursor-pointer rounded-lg";
export const questionSetCardContent = "h-full flex flex-col";
export const questionSetCardHeader = "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3";
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
export const questionsPage = "min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6";
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
export const questionCardHeader = "flex flex-col sm:flex-row justify-between gap-3 sm:gap-2 items-start sm:items-center mb-3";
export const questionCardTitle = "font-semibold text-gray-800 flex-grow w-full";
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

// ✅ Enhanced Dashboard Page Styles
export const dashboardPage = "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-6";
export const dashboardContainer = "max-w-7xl mx-auto";
export const dashboardWelcomeCard = "mb-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20";
export const dashboardWelcomeContent = "flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-center";
export const dashboardWelcomeText = "font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent";
export const dashboardWelcomeSubtext = "text-gray-600";
export const dashboardMetricsGrid = "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8";
export const dashboardMetricCard = "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105";
export const dashboardMetricContent = "flex items-center justify-between";
export const dashboardMetricNumber = "font-bold mb-2 text-4xl";
export const dashboardMetricLabel = "opacity-90 text-lg";
export const dashboardMetricIcon = "text-5xl opacity-80";
export const dashboardLowScoreSection = "mb-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20";
export const dashboardLowScoreHeader = "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6";
export const dashboardLowScoreTitle = "font-bold text-gray-800 text-xl";
export const dashboardLowScoreList = "space-y-4";
export const dashboardLowScoreCard = "hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-purple-200";
export const dashboardLowScoreCardContent = "flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-start md:items-start";
export const dashboardLowScoreQuestionText = "font-semibold text-gray-800 mb-2 text-lg";
export const dashboardLowScoreMeta = "flex flex-wrap items-center gap-2 sm:gap-4 mb-3";
export const dashboardLowScoreDate = "text-gray-600";
export const dashboardLowScoreEmpty = "text-center py-12";
export const dashboardLowScoreEmptyIcon = "text-6xl text-green-400 mb-4";
export const dashboardLowScoreEmptyTitle = "text-gray-500 mb-2 text-xl";
export const dashboardLowScoreEmptySubtext = "text-gray-400";
export const dashboardQuickActions = "mb-4";
export const dashboardQuickActionsTitle = "font-bold text-gray-800 mb-4 text-xl";
export const dashboardQuickActionsGrid = "grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6";
export const dashboardQuickActionCard = "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 cursor-pointer transition-all duration-300 rounded-2xl border border-blue-200 hover:border-blue-300 hover:shadow-xl hover:scale-105";
export const dashboardQuickActionCardPurple = "bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 cursor-pointer transition-all duration-300 rounded-2xl border border-purple-200 hover:border-purple-300 hover:shadow-xl hover:scale-105";
export const dashboardQuickActionCardGreen = "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 cursor-pointer transition-all duration-300 rounded-2xl border border-green-200 hover:border-green-300 hover:shadow-xl hover:scale-105";
export const dashboardQuickActionContent = "text-center p-6";
export const dashboardQuickActionIcon = "text-4xl text-blue-600 mb-3";
export const dashboardQuickActionIconPurple = "text-4xl text-purple-600 mb-3";
export const dashboardQuickActionIconGreen = "text-4xl text-green-600 mb-3";
export const dashboardQuickActionTitle = "font-semibold text-blue-800 text-lg";
export const dashboardQuickActionTitlePurple = "font-semibold text-purple-800 text-lg";
export const dashboardQuickActionTitleGreen = "font-semibold text-green-800 text-lg";
export const dashboardQuickActionSubtext = "text-blue-600";
export const dashboardQuickActionSubtextPurple = "text-purple-600";
export const dashboardQuickActionSubtextGreen = "text-green-600";

// Performance Colors
export const performanceColorGreen = "text-emerald-600";
export const performanceColorYellow = "text-amber-600";
export const performanceColorRed = "text-rose-600";

// ✅ Enhanced Answer Page Styles
export const answerPage = "min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-6";
export const answerContainer = "max-w-7xl mx-auto";
export const answerHeader = "mb-8";
export const answerTitle = "font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-2xl sm:text-3xl";
export const answerGrid = "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8";
export const answerQuestionCard = "bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 p-4 sm:p-6";
export const answerQuestionTitle = "font-semibold text-gray-800 mb-3 text-lg";
export const answerQuestionText = "text-gray-700 mb-6 text-base leading-relaxed";
export const answerInputField = "mb-4";
export const answerSubmitButton = "mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300";
export const answerErrorText = "mt-3 text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200";
export const answerFeedbackCard = "bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-white/20 p-4 sm:p-6";
export const answerFeedbackTitle = "font-semibold text-gray-800 mb-4 text-lg";
export const answerScoreSection = "mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100";
export const answerScoreHeader = "flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center mb-3";
export const answerScoreLabel = "font-semibold text-gray-800";
export const answerScoreProgress = "height: 10, borderRadius: 6";
export const answerDivider = "my-4 border-gray-200";
export const answerBreakdownTitle = "font-semibold text-gray-800 mb-4 text-lg";
export const answerBreakdownItem = "mb-4 p-3 bg-white rounded-lg border border-gray-100";
export const answerBreakdownHeader = "flex justify-between mb-2";
export const answerBreakdownLabel = "font-medium text-gray-700";
export const answerBreakdownValue = "font-semibold text-gray-800";
export const answerBreakdownProgress = "height: 8, borderRadius: 4";
export const answerAiSection = "font-semibold text-gray-800 mb-3 text-lg";
export const answerAiFeedback = "p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 mb-4";
export const answerAiText = "text-gray-700 leading-relaxed";
export const answerReattemptButton = "w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300";

// Score Colors
export const scoreColorSuccess = "success";
export const scoreColorWarning = "warning";
export const scoreColorError = "error";

