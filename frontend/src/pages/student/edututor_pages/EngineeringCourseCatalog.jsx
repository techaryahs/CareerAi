import { useState } from 'react';
import { universityData } from './../../../data/universityData';
import { calculateYearTotalWithDiscount, calculateFinalAmount } from './../../../utils/cartUtils';
import BranchSelection from './BranchSelection';
import UniversitySelector from './UniversitySelector';
import ShoppingCartComponent from './ShoppingCart';
import YearSemesterView from './YearSemesterView';

const EngineeringCourseCatalog = () => {

    // State management
    const [selectedUniversity, setSelectedUniversity] = useState(Object.keys(universityData)[0]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [cart, setCart] = useState({});
    const [yearlyPurchases, setYearlyPurchases] = useState({});

    // Derived data
    const courseData = universityData[selectedUniversity];
    const universities = Object.keys(universityData);

    // Event handlers
    const handleUniversityChange = (e) => {
        setSelectedUniversity(e.target.value);
        setSelectedBranch(null);
        setSelectedYear(null);
        setSelectedSemester(null);
        setCart({});
        setYearlyPurchases({});
    };

    const handleBranchSelect = (branchKey) => {
        setSelectedBranch(selectedBranch === branchKey ? null : branchKey);
        setSelectedYear(null);
        setSelectedSemester(null);
    };

    const handleYearSelect = (yearKey) => {
        setSelectedYear(selectedYear === yearKey ? null : yearKey);
    };

    const handleSemesterSelect = (semesterKey) => {
        setSelectedSemester(selectedSemester === semesterKey ? null : semesterKey);
    };

    const toggleSubject = (branchKey, yearKey, semesterKey, subjectCode) => {
        const key = `${selectedUniversity}-${branchKey}-${yearKey}-${semesterKey}-${subjectCode}`;
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[key]) {
                delete newCart[key];
            } else {
                const subject = courseData.branches[branchKey].years[yearKey].semesters[semesterKey].subjects.find(s => s.code === subjectCode);
                newCart[key] = {
                    ...subject,
                    university: selectedUniversity,
                    branch: branchKey,
                    year: yearKey,
                    semester: semesterKey
                };
            }
            return newCart;
        });
    };

    const purchaseYearlyPackage = (branchKey, yearKey) => {
        const yearPackageKey = `${selectedUniversity}-${branchKey}-${yearKey}`;
        const isCurrentlyPurchased = yearlyPurchases[yearPackageKey];

        setYearlyPurchases(prev => ({ ...prev, [yearPackageKey]: !isCurrentlyPurchased }));

        const year = courseData.branches[branchKey].years[yearKey];
        setCart(prevCart => {
            let newCart = { ...prevCart };
            Object.entries(year.semesters).forEach(([semesterKey, semester]) => {
                semester.subjects.forEach(subject => {
                    const subjectKey = `${selectedUniversity}-${branchKey}-${yearKey}-${semesterKey}-${subject.code}`;
                    if (!isCurrentlyPurchased) {
                        newCart[subjectKey] = { 
                            ...subject, 
                            university: selectedUniversity, 
                            branch: branchKey, 
                            year: yearKey, 
                            semester: semesterKey 
                        };
                    } else {
                        if (newCart[subjectKey]) {
                            delete newCart[subjectKey];
                        }
                    }
                });
            });
            return newCart;
        });
    };

    const calculateFinalAmountWrapper = () => {
        return calculateFinalAmount(
            cart, 
            yearlyPurchases, 
            calculateYearTotalWithDiscount,
            { [selectedUniversity]: courseData }
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            {/* <button 
                onClick={() => navigate('/')} // ✅ replaced navigateTo with navigate
                className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Courses
            </button> */}

            {/* Hero Section */}
            <div className="text-center bg-white rounded-2xl shadow-lg p-8 mb-8 overflow-hidden">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Engineering Curriculum
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Select your university, then explore branches and subjects tailored to the latest NEP 2020 scheme.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <BranchSelection 
                        courseData={courseData}
                        selectedBranch={selectedBranch}
                        onBranchSelect={handleBranchSelect}
                    />

                    {selectedBranch && (
                        <YearSemesterView
                            courseData={courseData}
                            selectedBranch={selectedBranch}
                            selectedYear={selectedYear}
                            selectedSemester={selectedSemester}
                            selectedUniversity={selectedUniversity}
                            cart={cart}
                            yearlyPurchases={yearlyPurchases}
                            onYearSelect={handleYearSelect}
                            onSemesterSelect={handleSemesterSelect}
                            onSubjectToggle={toggleSubject}
                            onYearlyPackagePurchase={purchaseYearlyPackage}
                        />
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <UniversitySelector 
                        selectedUniversity={selectedUniversity}
                        universities={universities}
                        onUniversityChange={handleUniversityChange}
                    />
                    <ShoppingCartComponent 
                        cart={cart}
                        yearlyPurchases={yearlyPurchases}
                        calculateFinalAmount={calculateFinalAmountWrapper}
                        courseData={courseData}
                    />
                </div>
            </div>
        </div>
    );
};

export default EngineeringCourseCatalog;
