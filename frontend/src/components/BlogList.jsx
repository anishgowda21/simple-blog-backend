import { useGetBlogsQuery } from "../features/blog/blogApiSlice"
import BlogCard from "./BlogCard";

const BlogList = () => {
    const { data: blogs, isLoading, isError, error } = useGetBlogsQuery();

    if (isLoading) return <div>Loading Blogs.....</div>

    if (isError) return <div>Error loading blogs: {error.data.message}</div>;

    return (
        <Row>
            {blogs.map(blog => (
                <Col md={4} key={blog.id}>
                    <BlogCard blog={blog} />
                </Col>
            ))}
        </Row>
    );
}
export default BlogList