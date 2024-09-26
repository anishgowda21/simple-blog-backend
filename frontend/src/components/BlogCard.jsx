import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>
                    {blog.title}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    By {blog.user.name} | {new Date(blog.createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>
                    {blog.content.substring(0, 100)}...
                </Card.Text>
                <Link to={`/blog/${blog.id}`}>
                    <Button variant="primary">Read More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}
export default BlogCard