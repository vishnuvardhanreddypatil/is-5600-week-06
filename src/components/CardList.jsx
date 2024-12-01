import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search'; // Import the Search component

const CardList = ({ data }) => {
  const limit = 10; // Number of products per page
  const [offset, setOffset] = useState(0); // Current offset for pagination
  const [filteredData, setFilteredData] = useState(data); // Products after filtering by tags
  const [products, setProducts] = useState(data.slice(0, limit)); // Current products to display

  // Filter products by tags
  const filterTags = (searchTerm) => {
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm))
    );
    setFilteredData(filtered);
    setOffset(0); // Reset pagination
    setProducts(filtered.slice(0, limit)); // Update visible products
  };

  // Unified pagination handler
  const handlePagination = (step) => {
    const newOffset = offset + step;
    setOffset(newOffset);
    setProducts(filteredData.slice(newOffset, newOffset + limit));
  };

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />

      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-limit)}
          disabled={offset === 0} // Disable "Previous" if at the start
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(limit)}
          disabled={offset + limit >= filteredData.length} // Disable "Next" if at the end
        />
      </div>
    </div>
  );
};

export default CardList;
