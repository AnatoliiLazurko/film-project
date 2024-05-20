import React from 'react';
import styles from './PaginationStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {

    const maxPageNumbers = 3;

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers) {
        endPage = Math.min(totalPages, currentPage + 1);
        startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles["pagination-section"]}>
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faChevronLeft} className={`${currentPage === 1 ? styles["inactive-arrow"] : styles["active-arrow"]}`} />
            </button>
            {startPage > 1 && <div className={`${styles["pagination-btn"]}`} onClick={() => handlePageClick(1)}>1</div>}
            {startPage > 2 && <div className={styles["pagination-btn"]}>...</div>}
            {pageNumbers.map((number) => (
                <div className={`${styles["pagination-btn"]} ${currentPage === number ? styles["pagin-active-btn"] : ''}`}
                    key={number} onClick={() => handlePageClick(number)}
                >
                    {number}
                </div>
            ))}
            {endPage < totalPages - 1 && <div className={styles["pagination-btn"]}>...</div>}
            {endPage < totalPages && <div className={`${styles["pagination-btn"]}`} onClick={() => handlePageClick(totalPages)}>{totalPages}</div>}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} className={`${currentPage === totalPages ? styles["inactive-arrow"] : styles["active-arrow"]}`} />
            </button>
        </div>
    );
}

export default Pagination;
