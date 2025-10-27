// src/data/sidebarItems.js
import { 
  RiDashboardLine 
} from "react-icons/ri";
import { 
  BsPeople, BsCircle, BsBox, BsBagPlus, BsCartPlus, BsBagX, BsGraphUp 
} from "react-icons/bs";
import { 
  TbTruckDelivery 
} from "react-icons/tb";
import { 
  AiOutlineBank 
} from "react-icons/ai";
import { 
  IoCreateOutline 
} from "react-icons/io5";
import { 
  AiOutlineUnorderedList 
} from "react-icons/ai";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: <RiDashboardLine className="side-bar-item-icon" />,
    url: "/dashboard",
    subMenu: [],
  },
  {
    title: "Customer",
    icon: <BsPeople className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Customer", icon: <BsCircle size={16} />, url: "/customer/create_update" },
      { title: "Customer List", icon: <BsCircle size={16} />, url: "/customer/list" },
    ],
  },
  {
    title: "Supplier",
    icon: <TbTruckDelivery className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Supplier", icon: <BsCircle size={16} />, url: "/supplier/create_update" },
      { title: "Supplier List", icon: <BsCircle size={16} />, url: "/supplier/list" },
    ],
  },
  {
    title: "Expense",
    icon: <AiOutlineBank className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Expense Type", icon: <BsCircle size={16} />, url: "/expense/type/create_update" },
      { title: "Expense Type List", icon: <BsCircle size={16} />, url: "/expense/type/list" },
      { title: "New Expense", icon: <IoCreateOutline size={16} />, url: "/expense/create_update" },
      { title: "Expense List", icon: <AiOutlineUnorderedList size={16} />, url: "/expense/list" },
    ],
  },
  {
    title: "Product",
    icon: <BsBox className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Brand", icon: <BsCircle size={16} />, url: "/brand/create_update" },
      { title: "Brand List", icon: <BsCircle size={16} />, url: "/brand/list" },
      { title: "New Category", icon: <BsCircle size={16} />, url: "/category/create_update" },
      { title: "Category List", icon: <BsCircle size={16} />, url: "/category/list" },
      { title: "New Product", icon: <BsCircle size={16} />, url: "/product/create_update" },
      { title: "Product List", icon: <BsCircle size={16} />, url: "/product/list" },
    ],
  },
  {
    title: "Purchase",
    icon: <BsBagPlus className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Purchase", icon: <BsCircle size={16} />, url: "/purchase/create_update" },
      { title: "Purchase List", icon: <BsCircle size={16} />, url: "/purchase/list" },
    ],
  },
  {
    title: "Sale",
    icon: <BsCartPlus className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Sale", icon: <BsCircle size={16} />, url: "/sale/create_update" },
      { title: "Sale List", icon: <BsCircle size={16} />, url: "/sale/list" },
    ],
  },
  {
    title: "Return",
    icon: <BsBagX className="side-bar-item-icon" />,
    subMenu: [
      { title: "New Return", icon: <BsCircle size={16} />, url: "/return/create_update" },
      { title: "Return List", icon: <BsCircle size={16} />, url: "/return/list" },
    ],
  },
  {
    title: "Report",
    icon: <BsGraphUp className="side-bar-item-icon" />,
    subMenu: [
      { title: "Sale Report", icon: <BsCircle size={16} />, url: "/report/sale" },
      { title: "Return Report", icon: <BsCircle size={16} />, url: "/report/return" },
      { title: "Purchase Report", icon: <BsCircle size={16} />, url: "/report/purchase" },
      { title: "Expense Report", icon: <BsCircle size={16} />, url: "/report/expense" },
    ],
  },
];
