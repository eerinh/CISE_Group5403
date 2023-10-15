import { NavigationMenuDemo } from "~/components/Navigation";
import ArticleForm from "../administrator/edit";

const ArticleCreate = () => {
    return (
        <div className="bg-accent">
            <NavigationMenuDemo />
            <ArticleForm article={undefined} />
        </div>
    );
}

export default ArticleCreate;