import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CollegesByLocation.css';
// import PremiumPopup from '../components/PremiumPlans';
import { staticColleges } from '../../data/staticColleges';
import PageLoader from '../../../components/PageLoader/PageLoader'; // ✅ New reusable page loader

const TopColleges = () => {
  const [course, setCourse] = useState('');
  const [location, setLocation] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [percentile, setPercentile] = useState('');
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); 
  const [error, setError] = useState('');
  const [, setUser] = useState(null);
  // const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.email) {
      fetch(`${API}/api/user/${storedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        })
        .catch((err) => console.error('Failed to fetch user:', err));
    }

    const timer = setTimeout(() => setPageLoading(false), 1200); 
    return () => clearTimeout(timer);
  }, [API]);

const handleSearch = async () => {
  if ((!percentile || !course) && !collegeName) {
    return alert('Please enter Percentile & Course OR College Name');
  }

  setLoading(true);
  setError('');
  setColleges([]);

  // 🔹 Always start with static colleges
  let filteredColleges = [...staticColleges];

  const inputCourse = course.trim().toLowerCase();
  const inputCollegeName = collegeName.trim().toLowerCase();
  const inputLocation = location.trim().toLowerCase();

  if (inputCollegeName) {
    filteredColleges = filteredColleges.filter((clg) =>
      clg.name.toLowerCase().includes(inputCollegeName)
    );
  } else {
    if (inputCourse) {
      filteredColleges = filteredColleges.filter((clg) =>
        clg.course.toLowerCase().includes(inputCourse)
      );
    }
    if (inputLocation) {
      filteredColleges = filteredColleges.filter((clg) =>
        clg.location.toLowerCase().includes(inputLocation)
      );
    }
    if (percentile) {
      filteredColleges = filteredColleges.filter((clg) => {
        if (clg.cutOffs) {
          return Object.values(clg.cutOffs).some((cutoff) => {
            const numericCutoff = parseFloat(cutoff.toString().replace('%', ''));
            return parseFloat(percentile) >= numericCutoff;
          });
        }
        return false;
      });
    }
  }

  // ✅ If static matches exist, show them immediately
  if (filteredColleges.length > 0) {
    setColleges(filteredColleges);
  }

  try {
    // 🔹 Try API call
    const res = await axios.post(`${API}/api/colleges`, {
      percentile,
      course,
      location,
      collegeName,
    });

    const dynamicColleges = res.data.colleges || [];

    const combined = [
      ...filteredColleges,
      ...dynamicColleges.filter(
        (dyn) => !filteredColleges.some((stat) => stat.name === dyn.name)
      ),
    ];

    if (combined.length > 0) {
      setColleges(combined);
    } else if (filteredColleges.length === 0) {
      setError('❌ No results found for your criteria.');
    }
  } catch (err) {
    console.error("API failed:", err);

    // ✅ Only show error if static also empty
    if (filteredColleges.length === 0) {
      setError('⚠️ Error retrieving college list. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};



  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="college-page-wrapper">
      <div className="hero-section">
        <h1>🎓</h1>
        <h1>Explore Premier Colleges in India</h1>
        <p>Search for the best institutions by your percentile, course, or college name.</p>

        <div className="search-box">
          <input
            type="number"
            placeholder="Enter your percentile (e.g. 92.5)"
            value={percentile}
            onChange={(e) => setPercentile(e.target.value)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          />
          <input
            type="text"
            placeholder="Enter course (e.g. MBA, B.Tech, B.E)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          />
          <input
            type="text"
            placeholder="Enter location (e.g. Mumbai)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          />

          <div className="or-separator">— OR —</div>

          <input
            type="text"
            placeholder="Enter college name or location"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          />

          <button
            className={`search-btn ${loading ? 'searching' : ''}`}
            onClick={handleSearch}
            disabled={loading}
          >
            <span className="icon-container" />
            {loading ? 'Searching...' : 'Find Colleges'}
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}
        {loading && (
          <div className="loading-strip-wrapper">
            <div className="loading-strip">
              <div className="dot dot1" />
              <div className="dot dot2" />
              <div className="dot dot3" />
            </div>
          </div>
        )}
      </div>

      {colleges.length > 0 && (
        <div className="results-section">
          <h2>
            🏆{' '}
            {collegeName
              ? `Results for "${collegeName}"`
              : `Top Colleges matching ${percentile}% in ${course}`}
          </h2>
          <div className="college-list">
            {colleges.map((clg, i) => (
              <div className="college-card" key={i}>
                <div className="college-card-left">
                  <div className="college-badge">#{i + 1}</div>
                  <h3 className="college-name">{clg.name}</h3>
                  <p className="college-ranking">{clg.ranking || 'Top College'}</p>
                  <p>📍 <strong>Location:</strong> {clg.location}</p>
                  <p>🎓 <strong>Course:</strong> {clg.course}</p>
                  <p>🏫 <strong>Type:</strong> {clg.type}</p>
                  <p>📘 <strong>Affiliation:</strong> {clg.affiliation}</p>
                </div>

                <div className="dash"></div>

                <div className="college-card-right">
                  <ul>
                    <li><strong>💸 Fees:</strong> {clg.fees}</li>
                    <li><strong>📈 Placement Rate:</strong> {clg.placementRate}</li>
                    <li><strong>💼 Recruiters:</strong> {clg.topRecruiters?.join(', ')}</li>
                    <li><strong>🧑‍🏫 Faculty:</strong> {clg.faculty}</li>
                    <li><strong>🏕️ Campus Life:</strong> {clg.campusLife}</li>
                    <li><strong>📝 Entrance Exam:</strong> {clg.entranceExam}</li>
                    <li><strong>📅 Admission Deadline:</strong> {clg.admissionDeadline}</li>

                    {clg.cutOffs && (
                      <>
                        <li><strong>📊 Branch-wise Cutoffs:</strong></li>
                        <ul className="branch-cutoffs">
                          {Object.entries(clg.cutOffs).map(([branch, cutoff], idx) => (
                            <li key={idx}>🔹 <strong>{branch}:</strong> {cutoff}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <li>
                      <strong>🌐 Website:</strong>{' '}
                      <a href={clg.website} target="_blank" rel="noreferrer">
                        {clg.website}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopColleges;
