import { ChevronDown, ChevronRight, Check, Plus } from 'lucide-react';
import { calculateSemesterTotal, calculateYearTotal} from './../../../utils/cartUtils';

const YearSemesterView = ({
    courseData,
    selectedBranch,
    selectedYear,
    selectedSemester,
    selectedUniversity,
    cart,
    yearlyPurchases,
    onYearSelect,
    onSemesterSelect,
    onSubjectToggle,
    onYearlyPackagePurchase
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Select Year</h2>
            {Object.entries(courseData.branches[selectedBranch].years).map(([yearKey, year]) => (
                <div key={yearKey} className="mb-4">
                    <div
                        onClick={() => onYearSelect(yearKey)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ease-in-out ${
                            selectedYear === yearKey ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-green-100 text-green-800 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                                    {yearKey.charAt(0)}Y
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{yearKey}</h3>
                                    <p className="text-sm text-gray-500">Total: ₹{calculateYearTotal(courseData, selectedBranch, yearKey).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        onYearlyPackagePurchase(selectedBranch, yearKey); 
                                    }}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                                        yearlyPurchases[`${selectedUniversity}-${selectedBranch}-${yearKey}`] ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                >
                                    <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">15% OFF</span>
                                    {yearlyPurchases[`${selectedUniversity}-${selectedBranch}-${yearKey}`] ? 'Package Added' : 'Buy Full Year'}
                                </button>
                                {selectedYear === yearKey ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
                            </div>
                        </div>
                    </div>

                    {/* Semesters */}
                    {selectedYear === yearKey && (
                        <div className="mt-4 pl-4 md:pl-8 space-y-4 animate-fade-in-down">
                            {Object.entries(year.semesters).map(([semesterKey, semester]) => (
                                <div key={semesterKey} className="border rounded-2xl bg-slate-50 overflow-hidden">
                                    <div 
                                        onClick={() => onSemesterSelect(semesterKey)} 
                                        className="p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-700">{semesterKey}</h4>
                                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                                                <span>{semester.subjects.length} subjects</span>
                                                <span>Total: ₹{calculateSemesterTotal(courseData, selectedBranch, yearKey, semesterKey).toLocaleString()}</span>
                                                {selectedSemester === semesterKey ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subjects */}
                                    {selectedSemester === semesterKey && (
                                        <div className="border-t bg-white p-4">
                                            <div className="space-y-3">
                                                {semester.subjects.map((subject) => {
                                                    const subjectKey = `${selectedUniversity}-${selectedBranch}-${yearKey}-${semesterKey}-${subject.code}`;
                                                    const isSelected = cart[subjectKey];
                                                    const yearPackageKey = `${selectedUniversity}-${selectedBranch}-${yearKey}`;
                                                    return (
                                                        <div key={subject.code} className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-200 ${
                                                            isSelected ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'
                                                        }`}>
                                                            <div>
                                                                <h5 className="font-medium text-gray-800">{subject.name}</h5>
                                                                <p className="text-sm text-gray-500">{subject.code} | {subject.credits} Credits</p>
                                                            </div>
                                                            <div className="flex items-center space-x-4">
                                                                <span className="font-semibold text-lg text-gray-700">₹{subject.price.toLocaleString()}</span>
                                                                <button 
                                                                    onClick={() => onSubjectToggle(selectedBranch, yearKey, semesterKey, subject.code)} 
                                                                    disabled={yearlyPurchases[yearPackageKey]}
                                                                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors duration-200 ${
                                                                        isSelected ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                                                                    } ${yearlyPurchases[yearPackageKey] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default YearSemesterView;