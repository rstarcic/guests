import React from 'react';
import { useLocation } from 'react-router-dom';

function TitleSection() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    return (
    < div className = "section-head" >
        <div className="section-container">
            <div className="section-titles">
                <h1 className="section-title">{q || 'Forest Hill'}</h1>
                <h1 className="section-title">CHECK-IN</h1>
            </div>
        </div>
      </div >
    )
}

export default TitleSection;