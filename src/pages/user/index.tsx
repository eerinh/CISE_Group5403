import React, { useState, useEffect, useMemo } from "react";
import Search from "../../components/Search";
import styles from "../../styles/User.module.css";
import { api } from "~/utils/api";

const User: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof ArticleType | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const articlesQuery = api.articles.getAll.useQuery();
  
  useEffect(() => {
    if (articlesQuery.data) {
      setAllArticles(articlesQuery?.data);
    }
  }, [articlesQuery.data]);

  const allAvailableYears = useMemo(() => {
    return Array.from(
      new Set(allArticles.map((a) => new Date(a.date).getFullYear())),
    ).sort((a, b) => b - a);
  }, [allArticles]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value || null);
  };

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    let filteredData = allArticles.filter((article) => {
      return article.se_practice.toLowerCase().includes(lowercasedQuery);
    });
    if (selectedYear) {
      filteredData = filteredData.filter((article) => {
        return new Date(article.date).getFullYear() === parseInt(selectedYear);
      });
    }
    setArticles(filteredData);
  }, [query, selectedYear, allArticles]);

  const sortedArticles = useMemo(() => {
    const sorted = [...articles];
    if (sortField) {
      sorted.sort((a, b) => {
        if (a[sortField] && b[sortField]) {
          if (a[sortField]! < b[sortField]!)
            return sortDirection === "asc" ? -1 : 1;
          if (a[sortField]! > b[sortField]!)
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [articles, sortField, sortDirection]);

  const handleSort = (field: keyof ArticleType) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <Search onUpdate={setQuery} />
        <select
          className={styles.inputElement}
          onChange={handleYearChange}
          value={selectedYear ?? ""}
        >
          <option value="">All Years</option>
          {allAvailableYears.map((year) => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.articlesTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("author")}>Author</th>
            <th onClick={() => handleSort("date")}>Date</th>
            <th onClick={() => handleSort("journal_name")}>Journal Name</th>
            <th onClick={() => handleSort("se_practice")}>SE Practice</th>
          </tr>
        </thead>
        <tbody>
          {sortedArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.date.toDateString()}</td>
              <td>{article.journal_name}</td>
              <td>{article.se_practice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
