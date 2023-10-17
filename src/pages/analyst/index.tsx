import React, { useState, useEffect } from "react";
import styles from "~/styles/analyst.module.css";
import { api } from "~/utils/api";
import { Article } from "~/types";
import ArticleDetail from "~/components/ArticleDetail";
import { Button } from "~/components/ui/button";

const AnalysisDropdown: React.FC<{
  article: Article;
  onSave: (updatedArticle: Article) => void;
  onClose: () => void;
}> = ({ article, onSave, onClose }) => {
  const [editedArticle, setEditedArticle] = useState(article);

  const updateArticleProperty = (property: keyof Article, value: any) => {
    setEditedArticle((prev) => ({ ...prev, [property]: value }));
  };

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
      <label htmlFor="doiInput">DOI:</label>
      <input
        type="text"
        value={editedArticle.result_of_evidence}
        onChange={(e) =>
          updateArticleProperty("result_of_evidence", e.target.value)
        }
        placeholder="Result of Evidence"
      />
      <label htmlFor="doiInput">DOI:</label>
      <input
        type="text"
        value={editedArticle.type_of_research}
        onChange={(e) =>
          updateArticleProperty("type_of_research", e.target.value)
        }
        placeholder="Type of Research"
      />
      <label htmlFor="doiInput">DOI:</label>
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
          checked={editedArticle.checked || false}
          onChange={(e) => updateArticleProperty("checked", e.target.checked)}
        />
      </label>
      <Button onClick={() => onSave(editedArticle)}>Save</Button>
      <Button onClick={onClose}>Cancel</Button>
    </div>
  );
};

const AnalystView: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const notChecked = api.articles.getUncheckedArticles.useQuery();
  const [openArticleId, setOpenArticleId] = useState<string | null>(null);

  useEffect(() => {
    if (notChecked.data) {
      setArticles(notChecked.data);
    }
  }, [notChecked.data]);

  const saveArticleChanges = async (updatedArticle: Article) => {
    try {
      // Assuming your API has an 'updateArticle' function. You can replace this with the actual function.
      const response = await api.articles.updateArticle(updatedArticle);
      if (response) {
        // Update the local state or refetch the articles if necessary.
        // For now, I'm just closing the dropdown.
        setOpenArticleId(null);
      }
    } catch (error) {
      console.error("Failed to update article:", error);
    }
  };
  const handleAnalysisOpen = (articleId: string) => {
    setOpenArticleId(articleId);
  };

  const handleAnalysisClose = () => {
    setOpenArticleId(null);
  };

  return (
    <div className={styles.container}>
      <table className={styles.articlesTable}>
        {/* ... (table headers) */}
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              {/* ... (other table data) */}
              <td className={styles.detailsColumn}>
                <span className={styles.articleTitle}>{article.title}</span>
                <Button onClick={() => handleAnalysisOpen(article.id)}>
                  Analyze
                </Button>
                {openArticleId === article.id && (
                  <AnalysisDropdown
                    article={article}
                    onSave={saveArticleChanges}
                    onClose={handleAnalysisClose}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalystView;
