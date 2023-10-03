// Article.tsx
import React from "react";
import styles from "../../styles/Article.module.css"; // Assuming you have a CSS module for styling

type ArticleProps = {
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

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <div className={styles.articleContainer}>
      <h2>{props.title}</h2>
      <p><strong>Author:</strong> {props.author}</p>
      <p><strong>Date:</strong> {props.date.toDateString()}</p>
      <p><strong>Journal Name:</strong> {props.journal_name}</p>
      <p><strong>SE Practice:</strong> {props.se_practice}</p>
      <p><strong>Claim:</strong> {props.claim}</p>
      <p><strong>Result of Evidence:</strong> {props.result_of_evidence}</p>
      <p><strong>Type of Research:</strong> {props.type_of_research}</p>
      <p><strong>Type of Participant:</strong> {props.type_of_participant}</p>
      <p><strong>Approved:</strong> {props.approved ? "Yes" : "No"}</p>
      <p><strong>Checked:</strong> {props.checked ? "Yes" : "No"}</p>
      <p><strong>Created At:</strong> {props.createdAt.toDateString()}</p>
      <p><strong>Updated At:</strong> {props.updatedAt.toDateString()}</p>
    </div>
  );
};

export default Article;
