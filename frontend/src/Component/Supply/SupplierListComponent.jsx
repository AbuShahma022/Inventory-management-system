import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { SupplyList, SupplyDelete } from "../../APIRequest/SupplyAPI.js";
import dayjs from "dayjs";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import {confirmDelete} from "../../Helper/DeleteAlert.js"
import { Link } from "react-router-dom";

function SupplierListComponent() {
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(0);

  const { List, ListTotal } = useSelector((state) => state.supply);

  useEffect(() => {
    SupplyList(pageNo, perPage, searchKeyword);
  }, [pageNo, perPage, searchKeyword]);

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



  const handleDelete = async(id) => {
    const result = await confirmDelete();
        if (result.isConfirmed) {
          let success = await SupplyDelete(id);
          if (success === true) {
            await  SupplyList(pageNo, perPage, searchKeyword);
          }
        }
    
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Supplier List
        </h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search supplier..."
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
              <th className="p-3 border-b">Supplier Name</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Created Date</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {List.length > 0 ? (
              List.map((supplier, index) => (
                <tr
                  key={supplier._id}
                  className="hover:bg-gray-50 transition-colors text-gray-800"
                >
                  <td className="p-3 border-b">
                    {index + 1 + (pageNo - 1) * perPage}
                  </td>
                  <td className="p-3 border-b font-medium">
                    {supplier.Name}
                  </td>
                  <td className="p-3 border-b">{supplier.Phone}</td>
                  <td className="p-3 border-b">{supplier.email}</td>
                  <td className="p-3 border-b">
                    {dayjs(supplier.CreatedDate).format("DD MMM YYYY")}
                  </td>
                  <td className="p-3 border-b text-center">
                    <div className="flex justify-center gap-3 text-lg">
                      <Link
                        to={`/supplier/create_update/${supplier._id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(supplier._id)}
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
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No suppliers found
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

        {ListTotal > perPage && (
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
        )}
      </div>
    </div>
  );
}

export default SupplierListComponent;
