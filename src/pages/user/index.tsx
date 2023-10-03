import React, { useState, useEffect, useMemo } from "react";
import Search from "../../components/Search";
import styles from "../../styles/User.module.css";

type ArticleType = {
  id: string;
  title: string;
  author: string;
  date: Date;
  journal_name: string;
  se_practice: string;
  claim: string;
  result_of_evidence: string;
  type_of_research: string;
  type_of_participant: string;
  approved: boolean;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const User: React.FC = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof ArticleType | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // dummy data
  // remove later
  const dummyData: ArticleType[] = [
    {
      id: "1",
      title: "Effective SE Practices in Modern Web Development",
      author: "John Doe",
      date: new Date("2021-01-01"),
      journal_name: "Journal of Software Engineering",
      se_practice: "Continuous Integration",
      claim: "Improves Deployment Frequency",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "Professional Developers",
      approved: true,
      checked: true,
      createdAt: new Date("2021-01-02"),
      updatedAt: new Date("2021-01-03"),
    },
    {
      id: "2",
      title: "Agile vs Waterfall: A Comparative Analysis",
      author: "Alice Waters",
      date: new Date("2019-05-15"),
      journal_name: "Software Design Monthly",
      se_practice: "Agile Development",
      claim: "Enhances Collaboration",
      result_of_evidence: "Moderately Supportive",
      type_of_research: "Case Study",
      type_of_participant: "Software Engineers",
      approved: false,
      checked: false,
      createdAt: new Date("2019-05-20"),
      updatedAt: new Date("2019-05-22"),
    },
    {
      id: "3",
      title: "The Impact of Pair Programming on Software Quality",
      author: "Bob Ross",
      date: new Date("2020-10-01"),
      journal_name: "Journal of Software Engineering",
      se_practice: "Pair Programming",
      claim: "Improves Code Quality",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "Professional Developers",
      approved: true,
      checked: true,
      createdAt: new Date("2020-10-02"),
      updatedAt: new Date("2020-10-03"),
    },
    {
      id: "4",
      title: "Impact of TDD on Software Defect Rates",
      author: "Robert Smith",
      date: new Date("2020-12-10"),
      journal_name: "Testing Times Journal",
      se_practice: "Test-Driven Development",
      claim: "Reduces Bugs and Defects",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "QA Engineers",
      approved: true,
      checked: false,
      createdAt: new Date("2020-12-12"),
      updatedAt: new Date("2020-12-15"),
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
    let filteredData = dummyData.filter((article) => {
      return article.se_practice.toLowerCase().includes(lowercasedQuery);
    });
    if (selectedYear) {
      filteredData = filteredData.filter((article) => {
        return new Date(article.date).getFullYear() === parseInt(selectedYear);
      });
    }
    setArticles(filteredData);
  }, [query, selectedYear]);

  const sortedArticles = useMemo(() => {
    const sorted = [...articles];
    if (sortField) {
      sorted.sort((a, b) => {
        if (a[sortField] < b[sortField])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortField] > b[sortField])
          return sortDirection === "asc" ? 1 : -1;
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
