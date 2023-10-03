// SearchResults.tsx
import React, { useState, useEffect } from "react";

type Article = {
  id: string;
  title: string;
  author: string;
  journal_name: string;
  date: Date;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  articles: Article[];
}

const Users: React.FC<Props> = ({ articles = [] }) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [sortField, setSortField] = useState<string>("");

  useEffect(() => {
    let filtered = articles;

    if (searchTerm) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterYear) {
      filtered = filtered.filter(
        (article) => new Date(article.date).getFullYear() === filterYear,
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
    }

    setFilteredArticles(filtered);
  }, [searchTerm, filterYear, sortField, articles]);

	return (
    <div className="container">
      <div className="search-bar">
        <Search className="search-input" onUpdate={findMatchingArticle} />
      
        <select 
          onChange={handleYearChange} 
          value={selectedYear || ''}
          className="year-dropdown"
        >
          <option value=''>All Years</option>
          {/* Example years, you might generate these dynamically from your data or an API */}
          <option value='2021'>2021</option>
          <option value='2022'>2022</option>
        </select>
      </div>

      {articles.map(article => (
        <Article key={article.id} article={article} />
      ))}
    </div>
);
};

export default Users;
