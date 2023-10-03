import React, {useState, useEffect} from "react";
import ArticleList from "./ArticleList";

interface Article {
    id: number;
  title: string;
  content: string;
  yearOfPublication: number;
  author: string;
  journalName: string;
  SEPractice: string;
  claim: string;
  resultOfEvidence: string;
  typeOfResearch: string;
  typeOfParticipant: string;
}

const ModeratorPage : React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([
  {
    id: 1,
    title: 'Article 1',
    content: 'Content 1',
    yearOfPublication: 2021,
    author: 'Author 1',
    journalName: 'Journal 1',
    SEPractice: 'Practice 1',
    claim: 'Claim 1',
    resultOfEvidence: 'Agree',
    typeOfResearch: 'Experiment',
    typeOfParticipant: 'Student',
  },
  {
    id: 2,
    title: 'Article 2',
    content: 'Content 2',
    yearOfPublication: 2022,
    author: 'Author 2',
    journalName: 'Journal 2',
    SEPractice: 'Practice 2',
    claim: 'Claim 2',
    resultOfEvidence: 'Disagree',
    typeOfResearch: 'Case Study',
    typeOfParticipant: 'Practitioner',
  },
]);

    const [newArticleIds, setNewArticleIds] = useState<number[]>([]);
    const [nextArticleId, setNextArticleId] = useState(3);

    const handleApprove = (articleId: number) => {
        setNewArticleIds((prevIds) => prevIds.filter((id) => id !== articleId));
    };

    const handleDeny = (articleId: number) => {
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));


        setNewArticleIds((prevIds) => prevIds.filter((id) => id !== articleId));    
    };



    const addNewArticle =() =>{
        const newArticle = {
            id: nextArticleId,
            title: `New Article ${nextArticleId}`,
            content: `New Content ${nextArticleId}`,
            yearOfPublication: 0, // Provide a default value for yearOfPublication (replace with actual value)
            author: '', // Provide a default value for author (replace with actual value)
            journalName: '', // Provide a default value for journalName (replace with actual value)
            SEPractice: '', // Provide a default value for SEPractice (replace with actual value)
            claim: '', // Provide a default value for claim (replace with actual value)
            resultOfEvidence: '', // Provide a default value for resultOfEvidence (replace with actual value)
            typeOfResearch: '', // Provide a default value for typeOfResearch (replace with actual value)
            typeOfParticipant: '', // Provide a default value for typeOfParticipant (replace with actual value)

        };


        setArticles((prevArticles) =>[...prevArticles, newArticle]);
        setNewArticleIds((prevIds) => [...prevIds, nextArticleId]);
        setNextArticleId((prevId) => prevId + 1);
    };

    const addButtonStyle = {
        backgroundColor: '#008CBA',
        color: 'white',
        padding: '10px 20px',
        margin: '10px 0',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
      };

    return(
        <div>
            <h1>Modertor Dashboard</h1>
            <ArticleList 
            articles={articles} 
            newArticleIds={newArticleIds} 
            onApprove={handleApprove}
            onDeny={handleDeny}
            />
            <button onClick={addNewArticle} style={addButtonStyle}>Add New Article</button>
        </div>
    );
};

export default ModeratorPage;