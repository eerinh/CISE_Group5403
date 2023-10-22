import React, { useState, useEffect, useMemo, useContext } from "react";
import Search from "~/components/Search";
import ArticleDetail from "~/components/ArticleDetail";
import styles from "~/styles/User.module.css";
import { api } from "~/utils/api";
import { Article } from "~/types";
import { Button } from "~/components/ui/button";
import Rating from "~/components/ui/rating";
import UserDataContext from "~/providers/UserDataProvider";
import { NavigationMenuDemo } from "~/components/Navigation";

const User: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Article | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [openDetails, setOpenDetails] = useState<string[]>([]);

  const userDataContext = useContext(UserDataContext);
  const articlesQuery = api.articles.getAll.useQuery({ userId: userDataContext.id });
  const setRatingMutation = api.articles.setRating.useMutation({
    onSuccess: () => {
      void articlesQuery.refetch();
    }
  });
  const [displayType, setDisplayType] = useState<"list" | "grid" | "card">(
    "list",
  );

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
      <NavigationMenuDemo />
      <h3 className="text-2xl text-center font-bold pb-3">User View</h3>
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
      <div className={`justify-between flex space-x-4 pb-4`}>
        <Button className="w-full" onClick={() => setDisplayType("list")}>List</Button>
        <Button className="w-full" onClick={() => setDisplayType("grid")}>Grid</Button>
        <Button className="w-full" onClick={() => setDisplayType("card")}>Card</Button>
      </div>
      {displayType === "list" && (
        <table className={styles.articlesTable}>
          <thead>
            <tr>
              <th onClick={() => handleSort("title")}>Title</th>
              <th onClick={() => handleSort("author")}>Author</th>
              <th onClick={() => handleSort("date")}>Date</th>
              <th onClick={() => handleSort("journal_name")}>Journal Name</th>
              <th onClick={() => handleSort("se_practice")}>SE Practice</th>
              <th onClick={() => handleSort("averageRating")}>Avg Rating</th>
            <th onClick={() => handleSort("currentRating")}>Your Rating</th>
            <th className={styles.detailsColumn}>More Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedArticles.map((article) => (
              <React.Fragment key={article.id}>
                <tr>
                  <td>{article.title}</td> <td>{article.author}</td>
                  <td>{new Date(article.date).toLocaleDateString()}</td>
                  <td>{article.journal_name}</td>
                <td>{article.se_practice}</td>
                  <td className="text-center"><Rating currentRating={article.averageRating ?? 0} updateRating={(rating) => { console.log(rating) }} /> ({article.totalRatings} ratings)</td>
                <td><Rating currentRating={article.currentRating ?? 0} updateRating={(rating) => {
                  setRatingMutation.mutate({
                    userId: userDataContext.id, 
                    articleId: article.id!,
                    rating: rating
                  })
                }} /></td>
                <td className={`justify-center ${styles.detailsColumn}`}>
                    <Button
                      variant={openDetails.includes(article.id!) ? "destructive" : "default"}
                      className={styles.buttonFullWidth}
                      onClick={() => toggleDetails(article.id!)}
                    >
                      {openDetails.includes(article.id!) ? "Close" : "More"}
                    </Button>
                  </td>
                </tr>
                {openDetails.includes(article.id!) && (
                  <tr>
                    <td colSpan={8} className={styles.articleDetails}>
                      <ArticleDetail article={article} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {displayType === "grid" && (
        <div className={styles.gridWrapper}>
          {sortedArticles.map((article) => (
            <div key={article.id} className={styles.gridItem}>
              <h3>{article.title}</h3>
              <p>{article.author}</p>
              <p>{new Date(article.date).toLocaleDateString()}</p>
              <p>{article.journal_name}</p>
            </div>
          ))}
        </div>
      )}

      {displayType === "card" && (
        <div className={styles.cardWrapper}>
          {sortedArticles.map((article) => (
            <div key={article.id} className={styles.cardItem}>
              <h3>{article.title}</h3>
              <p>{article.author}</p>
              <p>{new Date(article.date).toLocaleDateString()}</p>
              <p>{article.journal_name}</p>
              <Button onClick={() => toggleDetails(article.id!)}>
                {openDetails.includes(article.id!) ? "Close" : "More Details"}
              </Button>
              {openDetails.includes(article.id!) && (
                <div className={styles.articleDetails}>
                  <ArticleDetail article={article} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
