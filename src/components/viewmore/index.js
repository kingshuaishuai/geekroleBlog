import React from 'react';
import { Link } from 'gatsby';
import './viewmore.css';

export default () => {
  return (
    <div className="viewmore">
      <Link to="/blog" className="viewmore__link">More Blog >></Link>
      <Link to="/blog" className="viewmore__link">More Series >></Link>
    </div>
  )
}