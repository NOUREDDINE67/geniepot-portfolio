import React, { useState, useEffect } from 'react';
import "../App.css"; 

function CreatorPage() {
  const [creator, setCreator] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch('/mock/creators.creator_001.json'),
          fetch('/mock/submissions.creator_001.json'),
          fetch('/mock/campaigns.creator_001.json')
        ]);

        setCreator(await res1.json());
        setSubmissions(await res2.json());
        setCampaigns(await res3.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    
    fetchData();
  }, []);

  if (loading) return <div className="loading">Chargement en cours...</div>;
  if (!creator) return <div>Aucun créateur trouvé.</div>;

  const totalSubmissions = submissions.length;
  const totalViews = submissions.reduce((sum, s) => sum + (s.views || 0), 0);
  const totalEarnings = submissions.reduce((sum, s) => sum + (s.earnings || 0), 0);
  const avgViews = totalSubmissions > 0 ? (totalViews / totalSubmissions).toFixed(0) : 0;

  return (
    <div className="portfolio-container">
      {/* 1. Header */}
      <header className="header">
        <h1>{creator.name}</h1>
        <p className="bio">{creator.bio}</p>
      </header>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <h2>Performance Stats</h2>
        <div className="stats-grid">
          <div className="stat-card"><h3>Total Submissions</h3><p>{totalSubmissions}</p></div>
          <div className="stat-card"><h3>Total Views</h3><p>{totalViews.toLocaleString()}</p></div>
          <div className="stat-card"><h3>Total Earnings</h3><p>${totalEarnings}</p></div>
          <div className="stat-card"><h3>Avg. Views</h3><p>{avgViews}</p></div>
        </div>
      </section>

      {/* 3. Past Campaigns Section - التعديل اللي طلبتي هنا */}
      <section className="list-section">
        <h2>Past Campaigns</h2>
        <div className="campaign-list">
          {campaigns.map(camp => (
            <div key={camp.id} className="item-row">
              <span>{camp.name}</span>
              <span className="status">{camp.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CreatorPage;