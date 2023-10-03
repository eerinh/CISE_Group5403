// ArticleSearch.tsx
import React, { useState, useEffect, useMemo } from "react";
import Search from "../../components/Search";
import Article from "../../components/Article";
import styles from "../../styles/ArticleSearch.module.css";


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
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
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

  const allAvailableYears = useMemo(() => {
    return Array.from(
      new Set(dummyData.map((a) => new Date(a.date).getFullYear())),
    ).sort((a, b) => b - a);
  }, [dummyData]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value || null);
  };

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    const filteredData = dummyData.filter((article) => {
      const matchesQuery =
        article.title.toLowerCase().includes(lowercasedQuery) ||
        article.author.toLowerCase().includes(lowercasedQuery);

      const matchesYear =
        !selectedYear ||
        new Date(article.date).getFullYear().toString() === selectedYear;
      return matchesQuery && matchesYear;
    });
    setArticles(filteredData);
  }, [query, selectedYear]);

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search onUpdate={setQuery} />
        <select
          className={styles.inputElement}
          onChange={handleYearChange}
          value={selectedYear || ""}
        >
          <option value="">All Years</option>
          {allAvailableYears.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleSearch;
