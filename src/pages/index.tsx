import React, { useState, useEffect, useMemo } from "react";
import Search from "~/components/Search";
import ArticleDetail from "~/components/ArticleDetail";
import ArticleList, { Article } from "./moderator/ArticleList";
import { api } from "~/utils/api";
import styles from "~/styles/User.module.css";
import { Button } from "~/components/ui/button";


const User: React.FC = () => {
  const articlesQuery = api.articles.getAll.useQuery();
  const articleMutation = api.articles.update.useMutation({ onSuccess: () => articlesQuery.refetch() });
  const createArticleMutation = api.articles.create.useMutation({ onSuccess: () => articlesQuery.refetch() });



  useEffect(() => {
    if (articlesQuery.data) {
      setAllArticles(articlesQuery.data);
      setArticles(articlesQuery.data);
    }
  }, [articlesQuery.data]);

  const handleApprove = (articleId: string) => {
    articleMutation.mutate({ id: articleId, approved: true, checked: true });
  };

  const handleDeny = (articleId: string) => {
    articleMutation.mutate({ id: articleId, approved: false, checked: true });
  };

  const [showNotification, setShowNotification] = useState(false);


  const addNewArticle = () => {
    const newArticle = {
      title: "Sample Article Title",
      author: "John Doe",
      date: new Date(),
      journal_name: "Journal of Sample Articles",
      se_practice: "TDD",
      claim: "Sample Claim",
      result_of_evidence: "Sample Result of Evidence",
      type_of_research: "Sample Type of Research",
      type_of_participant: "Sample Type of Participant",
      approved: false,
      checked: false
    };

    createArticleMutation.mutate(newArticle);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
  }, 3000);
  };


  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Article | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [openDetails, setOpenDetails] = useState<string[]>([]);

  const toggleDetails = (articleId: string) => {
    setOpenDetails((prevState) => {
      if (prevState.includes(articleId)) {
        return prevState.filter((id) => id !== articleId);
      }
      return [...prevState, articleId];
    });
  };

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

  const handleSort = (field: keyof Article) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
  <div className={styles.container}>
    {showNotification && 
      <div className={styles.notification}>
        New article has been added!
      </div>
        
      }
    <div className={styles.searchWrapper}>
      <Search onUpdate={setQuery} />
      <Button onClick={addNewArticle} className={`${styles.buttonFullWidth} ${styles.addButton}`}>Add New Article</Button>
    </div>

    <table className={styles.articlesTable}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Journal Name</th>
          <th>SE Practice</th>
          <th>Claim</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <React.Fragment key={article.id}>
            <tr>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{new Date(article.date).toLocaleDateString()}</td>
              <td>{article.journal_name}</td>
              <td>{article.se_practice}</td>
              <td>{article.claim}</td>
              <td>
              <Button onClick={() => toggleDetails(article.id!)} className={styles.detailsButton}>Details</Button>
              <Button onClick={() => handleApprove(article.id!)} className={styles.approveButton}>Approve</Button>
              <Button onClick={() => handleDeny(article.id!)} className={styles.denyButton}>Deny</Button>
              </td>
            </tr>
            {openDetails.includes(article.id!) && (
              <tr>
                <td colSpan={7} className={styles.articleDetails}>
                  <ArticleDetail article={article} />
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default User;
