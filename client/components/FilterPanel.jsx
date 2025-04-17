import React from "react";

const FilterPanel = ({ dateFilter, setDateFilter, posterFilter, setPosterFilter, applyFilters }) => {
    return (
        <div className="position-relative mt-5">
      <div
        className="position-absolute end-0 p-3 border rounded bg-dark shadow-sm"
        style={{ width: "200px", zIndex: 1050 }}
      >
        <label className="form-label text-light">Date:</label>
        <input
          type="date"
          className="form-control mb-2"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <label className="form-label text-light">User:</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          value={posterFilter}
          onChange={(e) => setPosterFilter(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
    );
};

export default FilterPanel;