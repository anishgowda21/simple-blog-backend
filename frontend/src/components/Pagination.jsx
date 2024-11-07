import { Pagination as BSPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, onPageChange, totalPages = 5 }) => {
    return (
        <BSPagination>
            <BSPagination.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
                <BSPagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </BSPagination.Item>
            ))}
            <BSPagination.Next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </BSPagination>
    );
};
