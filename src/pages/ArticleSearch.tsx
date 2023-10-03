// ArticleSearch.tsx
import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Article from "../components/Article";
import styles from "../styles/ArticleSearch.module.css";

type ArticleType = {
  id: string;
  title: string;
  author: string;
  journal_name: string;
  date: Date;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ArticleSearch: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const findMatchingArticle = (query: string) => {
    // Simulated API call using setTimeout
    setTimeout(() => {
      const dummyData: ArticleType[] = [
        {
          id: "1",
          title: "Sample Article 1",
          author: "John Doe",
          journal_name: "Journal 1",
          date: new Date("2021-01-01"),
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          title: "Sample Article 2",
          author: "Jane Smith",
          journal_name: "Journal 2",
          date: new Date("2021-02-15"),
          approved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          title: "Sample Article 3",
          author: "Robert Brown",
          journal_name: "Journal 1",
          date: new Date("2020-11-10"),
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          title: "Sample Article 4",
          author: "Emily White",
          journal_name: "Journal 3",
          date: new Date("2019-08-24"),
          approved: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5",
          title: "Sample Article 5",
          author: "Chris Black",
          journal_name: "Journal 2",
          date: new Date("2021-05-19"),
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const filteredData = dummyData.filter(
        (article) =>
          !selectedYear ||
          new Date(article.date).getFullYear().toString() === selectedYear,
      );

      setArticles(filteredData);
    }, 1000);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value || null);
  };

  useEffect(() => {
    findMatchingArticle("");
  }, [selectedYear]); // re-run the search when selectedYear changes

  return (
    <div className={styles.container}>
        <Search className={styles.inputElement} onUpdate={findMatchingArticle} />
        <select 
            className={styles.inputElement} 
            onChange={handleYearChange} 
            value={selectedYear || ''}
        >
            <option value=''>All Years</option>
            {/* Example years, you might generate these dynamically from your data or an API */}
            {Array.from(new Set(articles.map(a => new Date(a.date).getFullYear())))
                .sort((a, b) => b - a)
                .map(year => (
                <option key={year} value={year.toString()}>{year}</option>
            ))}
        </select>

        <div>
            {articles.map(article => (
                <Article key={article.id} article={article} />
            ))}
        </div>
    </div>
  );
};

export default ArticleSearch;