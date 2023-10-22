import React, { useState, useEffect, useMemo } from "react";
import Search from "~/components/Search";
import ArticleDetail from "~/components/ArticleDetail";
import styles from "~/styles/User.module.css";
import { api } from "~/utils/api";
import { Article } from "~/types";
import { Button } from "~/components/ui/button";
import { NavigationMenuDemo } from "~/components/Navigation";

const AnalysisDropdown: React.FC<{
  article: Article;
  onSave: (updatedArticle: Article) => void;
  onClose: () => void;
}> = ({ article, onSave, onClose }) => {
  const [editedArticle, setEditedArticle] = useState(article);

  const updateArticleProperty = <T extends keyof Article>(
    property: T,
    value: Article[T],
  ) => {
    setEditedArticle((prev) => ({
      ...prev,
      [property]: value,
      updatedAt: new Date(),
    }));
  };
  ``;
  return (
    <div className={styles.analysisDropdown}>
      <label htmlFor="titleInput">Title:</label>
      <input
        id="titleInput"
        type="text"
        value={editedArticle.title}
        onChange={(e) => updateArticleProperty("title", e.target.value)}
        placeholder="Title"
      />
      <label htmlFor="authorInput">Author:</label>
      <input
        type="text"
        value={editedArticle.author}
        onChange={(e) => updateArticleProperty("author", e.target.value)}
        placeholder="Author"
      />
      <label htmlFor="dateInput">Date:</label>
      <input
        type="date"
        value={editedArticle.date.toISOString().split("T")[0]}
        onChange={(e) =>
          updateArticleProperty("date", new Date(e.target.value))
        }
      />
      <label htmlFor="journalInput">Journal:</label>
      <input
        type="text"
        value={editedArticle.journal_name}
        onChange={(e) => updateArticleProperty("journal_name", e.target.value)}
        placeholder="Journal Name"
      />
      <label htmlFor="volumeInput">SE Practice:</label>
      <input
        type="text"
        value={editedArticle.se_practice}
        onChange={(e) => updateArticleProperty("se_practice", e.target.value)}
        placeholder="SE Practice"
      />
      <label htmlFor="issueInput">Claim:</label>
      <input
        type="text"
        value={editedArticle.claim}
        onChange={(e) => updateArticleProperty("claim", e.target.value)}
        placeholder="Claim"
      />
      <label htmlFor="doiInput">Result of Evidence:</label>
      <input
        type="text"
        value={editedArticle.result_of_evidence}
        onChange={(e) =>
          updateArticleProperty("result_of_evidence", e.target.value)
        }
        placeholder="Result of Evidence"
      />
      <label htmlFor="doiInput">Type of Research:</label>
      <input
        type="text"
        value={editedArticle.type_of_research}
        onChange={(e) =>
          updateArticleProperty("type_of_research", e.target.value)
        }
        placeholder="Type of Research"
      />
      <label htmlFor="doiInput">Type of Participant:</label>
      <input
        type="text"
        value={editedArticle.type_of_participant}
        onChange={(e) =>
          updateArticleProperty("type_of_participant", e.target.value)
        }
        placeholder="Type of Participant"
      />
      <label>
        Approved:
        <input
          type="checkbox"
          checked={editedArticle.approved}
          onChange={(e) => updateArticleProperty("approved", e.target.checked)}
        />
      </label>
      <label>
        Checked:
        <input
          type="checkbox"
          checked={editedArticle.checked ?? false}
          onChange={(e) => updateArticleProperty("checked", e.target.checked)}
        />
      </label>
      <Button onClick={() => onSave(editedArticle)}>Save</Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};


const User: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Article | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);
  const articlesQuery = api.articles.getUncheckedArticles.useQuery();
  const updateArticleMutation = api.articles.update.useMutation();
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

  const saveArticleChanges = (updatedArticle: Article) => {
    // Ensure the article has an ID before updating
    if (updatedArticle.id) {
      updateArticleMutation.mutate(
        {
          id: updatedArticle.id,
          ...updatedArticle,
          updatedAt: new Date(), // Setting the current date & time
        },
        {
          onSuccess: () => {
            // Handle any success actions, e.g., close the modal and refetch data
            setOpenArticleId(null);

            // Update the local state to reflect the change
            setArticles((prevArticles) => {
              return prevArticles.map((article) =>
                article.id === updatedArticle.id ? updatedArticle : article,
              );
            });
          },
          onError: (error) => {
            // Handle the error
            console.error("Failed to update article:", error);
          },
        },
      );
    } else {
      console.error("Attempted to update an article without an ID.");
    }
  };

  return (
    <div className={styles.container}>
      {articles.length === 0 ? (
        <div className={styles.noArticlesMessage}>No articles</div>
      ) : (
        <>
          <h2 className={styles.newArticlesHeader}>
            New Articles ({articles.length})
          </h2>
          <table className={styles.articlesTable}>
            {/* ... (table headers) */}
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  {/* ... (other table data) */}
                  <td className={styles.detailsColumn}>
                    <span className={styles.articleTitle}>{article.title}</span>
                    <Button
                      onClick={() =>
                        article.id && setOpenArticleId(article.id)
                      }
                    >
                      Analyze
                    </Button>
                    {openArticleId === article.id && (
                      <AnalysisDropdown
                        article={article}
                        onSave={saveArticleChanges}
                        onClose={() => { setOpenArticleId(null) }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default User;