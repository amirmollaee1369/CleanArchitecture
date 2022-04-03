import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize,currentPage,onPageChange }) => {
  const rangeFn = (start, end) => {
    return [...Array(end + 1).keys()].filter(
      (value) => end >= value && start <= value
    );
  };

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = rangeFn(1, pageCount);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li className={page===currentPage ? "page-item active" : "page-item"} key={page}>
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes={
    itemsCount:PropTypes.number.isRequired,
     pageSize:PropTypes.number.isRequired,
     currentPage:PropTypes.number.isRequired,
     onPageChange:PropTypes.func.isRequired
};

export default Pagination;
