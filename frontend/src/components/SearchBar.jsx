import { useState } from "react"
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="d-flex">
                <Form.Control
                    type="text"
                    placeholder="Search blogs..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
                <Button type="submit" variant="primary" className="ml-2">
                    Search
                </Button>
            </Form.Group>
        </Form>
    );
};

export default SearchBar;