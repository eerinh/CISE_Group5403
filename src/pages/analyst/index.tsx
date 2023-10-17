import React, { useState, useEffect } from "react";
import styles from "~/styles/User.module.css";
import { api } from "~/utils/api";
import { Article } from "~/types";
import ArticleDetail from "~/components/ArticleDetail";
import { Button } from "~/components/ui/button";

const AnalystView: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const notChcked = api.articles.getUncheckedArticles.useQuery();

  useEffect(() => {
    if (notChcked.data) {
      setAllArticles(notChcked?.data);
    }
  }, [notChcked.data]);

  const handleAnalysis = (article: Article) => {
    setCurrentArticle(article);
    setModalOpen(true);
  };

  const saveArticleChanges = async (updatedArticle: Article) => {
    try {
      await api.articles.update(updatedArticle);
      setModalOpen(false);
      setCurrentArticle(null);

      // Update the local state or refetch articles
      const updatedArticles = articles.map((a) =>
        a.id === updatedArticle.id ? updatedArticle : a,
      );
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Failed to update the article.", error);
      alert("An error occurred while updating the article.");
    }
  };

  return (
    <div className="analyst-view">
      <h1>Analyst Dashboard</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.title} - {article.author}
            <button onClick={() => handleAnalysis(article)}>Analyze</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <AnalysisModal
          article={currentArticle}
          onClose={() => {
            setModalOpen(false);
            setCurrentArticle(null);
          }}
          onSave={saveArticleChanges}
        />
      )}
    </div>
  );
};

export default AnalystView;
