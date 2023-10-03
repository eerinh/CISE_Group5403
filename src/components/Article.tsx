import React from "react";
import styles from "../styles/Article.module.css";

type ArticleProps = {
  article: {
    id: string;
    title: string;
    author: string;
    journal_name: string;
    date: Date;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

const Article: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div className={styles.article}>
      <h2 className={styles.articleTitle}>{article.title}</h2>
      <p className={styles.articleMeta}>
        Author: {article.author} | Journal: {article.journal_name} | Date:{" "}
        {article.date.toDateString()}
      </p>
    </div>
  );
};

export default Article;
