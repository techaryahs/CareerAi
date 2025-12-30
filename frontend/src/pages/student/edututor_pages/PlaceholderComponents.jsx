const PlaceholderPage = ({ title }) => {

    return (
        <div className="max-w-5xl mx-auto text-center">
            {/* <button 
                onClick={() => navigate('/edututor')} // ✅ fixed
                className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Courses
            </button> */}
            <div className="bg-white rounded-2xl shadow-lg p-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{title} Course Catalog</h1>
                <p className="text-gray-600">This section is under construction. Please check back later!</p>
            </div>
        </div>
    );
};

export const MbbsCourseCatalog = () => <PlaceholderPage title="MBBS" />;
export const MbaCourseCatalog = () => <PlaceholderPage title="MBA" />;
