import React from 'react';
import styles from './PaginationStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ bookedList, setCurrentPage, currentPage }) => {

    const moviesPerPage = 12;
    const totalPages = Math.ceil(bookedList.length / moviesPerPage);
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

    return (
        <div className={styles["pagination-section"]}>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faChevronLeft} className={`${currentPage === 1 ? styles["inactive-arrow"] : styles["active-arrow"]}`} />
            </button>
            {startPage > 1 && <div className={`${styles["pagination-btn"]}`} onClick={() => setCurrentPage(1)}>1</div>}
            {startPage > 2 && <div className={styles["pagination-btn"]}>...</div>}
            {pageNumbers.map((number) => (
                <div className={`${styles["pagination-btn"]} ${currentPage === number ? styles["pagin-active-btn"] : ''}`}
                    key={number} onClick={() => setCurrentPage(number)}
                >
                    {number}
                </div>
            ))}
            {endPage < totalPages - 1 && <div className={styles["pagination-btn"]}>...</div>}
            {endPage < totalPages && <div className={`${styles["pagination-btn"]}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</div>}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                <FontAwesomeIcon icon={faChevronRight} className={`${currentPage === totalPages ? styles["inactive-arrow"] : styles["active-arrow"]}`} />
            </button>
        </div>
    );
}

export default Pagination;
