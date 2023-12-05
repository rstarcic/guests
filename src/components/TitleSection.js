import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function TitleSection() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const { language, queryParam, changeLanguage, updateQueryParam } = useLanguage();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('q', queryParam);
    
        window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);
      }, [queryParam]);
    
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