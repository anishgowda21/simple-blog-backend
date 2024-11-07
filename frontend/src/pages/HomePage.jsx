import { Container } from "react-bootstrap";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BlogList from "../components/BlogList";
import { Pagination } from "react-bootstrap";
import NavBar from "../components/NavBar";

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <NavBar />
            <Container>
                <h1 className="my-4">Welcome to Our Blog</h1>
                <BlogList searchTerm={searchTerm} currentPage={currentPage} />
            </Container>
        </>
    );
}
export default HomePage