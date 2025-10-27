import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { ProductList, ProductDelete } from "../../APIRequest/ProductAPI";
import dayjs from "dayjs";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import {confirmDelete} from "../../Helper/DeleteAlert"
import { Link } from "react-router-dom";

function ProductListComponent() {
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(0);

  const { list, listTotal } = useSelector((state) => state.product);

  // Fetch product list
  useEffect(() => {
    ProductList(pageNo, perPage, searchKeyword);
  }, [pageNo, perPage, searchKeyword]);

  // Reset search when cleared
  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchKeyword(0);
    }
  }, [searchInput]);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  const handleSearch = () => {
    setPageNo(1);
    setSearchKeyword(searchInput.trim() ? searchInput.trim() : 0);
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPageNo(1);
  };

  

  const handleDelete =async(id) => {
    const result = await confirmDelete();
    if(result.isConfirmed){
     let success = await ProductDelete(id);
      if(success === true){
        await ProductList(pageNo, perPage, searchKeyword);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search product..."
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <FiSearch />
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Product Name</th>
              <th className="p-3 border-b">Brand</th>
              <th className="p-3 border-b">Category</th>
              <th className="p-3 border-b">Unit</th>
              <th className="p-3 border-b">Created Date</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors text-gray-800"
                >
                  <td className="p-3 border-b">
                    {index + 1 + (pageNo - 1) * perPage}
                  </td>
                  <td className="p-3 border-b font-medium">{product.Name}</td>
                  <td className="p-3 border-b">
                    {product.Brands?.[0]?.Name || "—"}
                  </td>
                  <td className="p-3 border-b">
                    {product.Category?.[0]?.Name || "—"}
                  </td>
                  <td className="p-3 border-b">
                    {product.Unit || "—"}
                  </td>
                  <td className="p-3 border-b">
                    {dayjs(product.CreatedDate).format("DD MMM YYYY")}
                  </td>
                  <td className="p-3 border-b text-center">
                    <div className="flex justify-center gap-3 text-lg">
                      <Link
                        to={`/product/create_update/${product._id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Per Page + Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700">Per Page:</label>
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {listTotal > perPage && (
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={Math.ceil(listTotal / perPage)}
            onPageChange={handlePageClick}
            containerClassName={"flex gap-2"}
            pageClassName={
              "px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-100 text-gray-700"
            }
            activeClassName={"bg-blue-600 text-white cursor-default"}
            previousClassName={
              "px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-100 text-gray-700"
            }
            nextClassName={
              "px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-100 text-gray-700"
            }
          />
        )}
      </div>
    </div>
  );
}

export default ProductListComponent;
