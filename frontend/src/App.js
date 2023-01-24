import NavBar from "./NavBar/NavBar";
import HomePage from "./HomePage/HomePage";
import BlogMusic from "./Blogs/BlogMusic";
import BlogTech from "./Blogs/BlogTech";
import BlogReading from "./Blogs/BlogReading";
import BlogView from "./Blogs/BlogView";
import Compose from "./Compose/Compose";
import ComposeDefault from "./Compose/ComposeDefault";
import { Route, Routes } from "react-router-dom";
import Protected from "./Compose/Protected";
import ComposeDrafts from "./Compose/ComposeDrafts";
import ComposePublished from "./Compose/ComposePublished";
import ComposeDraftsEdit from "./Compose/ComposeDraftsEdit";
import ComposePublishedEdit from "./Compose/ComposePublishedEdit";

const App = () => {

    return (
        <div className="App">
            <NavBar />
            <Routes>

                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/compose" element={<Compose />} />
                <Route exact path="/blog/reading" element={<BlogReading />} />
                <Route exact path="/blog/music" element={<BlogMusic />} />
                <Route exact path="/blog/tech" element={<BlogTech />} />
                <Route exact path="/blog/view" element={<BlogView />} />
                <Route
                    path="/compose/default"
                    element={
                        <Protected>
                            <ComposeDefault />
                        </Protected>
                    } />
                <Route
                    path="/compose/drafts"
                    element={
                        <Protected>
                            <ComposeDrafts />
                        </Protected>
                    } />
                <Route
                    path="/compose/drafts/edit"
                    element={
                        <Protected>
                            <ComposeDraftsEdit />
                        </Protected>
                    } />
                <Route
                    path="/compose/published"
                    element={
                        <Protected>
                            <ComposePublished />
                        </Protected>
                    } />
                <Route
                    path="/compose/published/edit"
                    element={
                        <Protected>
                            <ComposePublishedEdit />
                        </Protected>
                    } />

            </Routes>
        </div>
    );
}

export default App;