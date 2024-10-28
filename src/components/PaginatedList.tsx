import React, { useMemo, useState } from "react";
import useFetch, { IData } from "../hooks/useFetch";

const PaginatedList: React.FC = () => {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems: IData[] = useMemo(() => data.slice(indexOfFirstItem, indexOfLastItem), [indexOfFirstItem, indexOfLastItem, data]); 

  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data, itemsPerPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      <ul>
        {currentItems ? currentItems.map(item => (
          <li key={item.id}>{item.title}</li>
        )) : <div>No records ound</div>
    
    }
      </ul>

      <div>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
