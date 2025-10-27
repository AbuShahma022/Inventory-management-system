import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { BrandList, DeleteBrand } from "../../APIRequest/BrandAPIRequest.js";
import dayjs from "dayjs";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import {confirmDelete} from "../../Helper/DeleteAlert.js"
import { Link } from "react-router-dom";

function BrandListComponent() {
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("0"); // use string for backend consistency

  const { List, ListTotal } = useSelector((state) => state.brand);

  useEffect(() => {
    BrandList(pageNo, perPage, searchKeyword);
  }, [pageNo, perPage, searchKeyword]);

  useEffect(() => {
  if (searchInput.trim() === "") {
    setSearchKeyword(0);
  }
}, [searchInput]);

  // ✅ Pagination
  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  // ✅ Fixed Search
  const handleSearch = () => {
    setPageNo(1);
    setSearchKeyword(searchInput.trim() === "" ? "0" : searchInput.trim());
  };

  // ✅ Per page change
  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setPageNo(1);
  };



const handleDelete = async (id) => {
  const result = await confirmDelete();
  if (result.isConfirmed) {
    let success = await DeleteBrand(id);
    if (success === true) {
      await BrandList(pageNo, perPage, searchKeyword);
    }
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ===== Header + Search ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">Brand List</h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search brand..."
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            <FiSearch />
            Search
          </button>

          {/* ✅ Per Page Dropdown */}
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
          </select>
        </div>
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Brand Name</th>
              <th className="p-3 border-b">Created Date</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {List.length > 0 ? (
              List.map((brand, index) => (
                <tr
                  key={brand._id}
                  className="hover:bg-gray-50 transition-colors text-gray-800"
                >
                  <td className="p-3 border-b">
                    {index + 1 + (pageNo - 1) * perPage}
                  </td>
                  <td className="p-3 border-b font-medium">{brand.Name}</td>
                  <td className="p-3 border-b">
                    {dayjs(brand.CreatedDate).format("DD MMM YYYY")}
                  </td>
                  <td className="p-3 border-b">{brand.UserEmail}</td>
                  <td className="p-3 border-b text-center">
                    <div className="flex justify-center gap-3 text-lg">
                      <Link
                        to={`/brand/create_update/${brand._id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(brand._id)}
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
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Pagination ===== */}
      {ListTotal > perPage && (
        <div className="flex justify-center mt-6">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={Math.ceil(ListTotal / perPage)}
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
        </div>
      )}
    </div>
  );
}

export default BrandListComponent;
