import React, { useEffect, useState } from 'react';
import { HiOutlineTrash, HiOutlinePencilAlt } from 'react-icons/hi';
import { Link } from 'react-router-dom'; // Import Link for navigation

function UpdateMenu() {
  const [menuData, setMenuData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [updatedMenu, setUpdatedMenu] = useState({});

  const get_menu = async () => {
    try {
      const response = await fetch("http://localhost:3000/admin_menu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      setMenuData(data.msg);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    get_menu();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/admin_menu/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      get_menu();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };
  
  const handleEdit = (menuId) => {
    setEditMode(menuId);
    // Find the menu item by ID and populate updatedMenu state with its data
    const menuToUpdate = menuData.find(menu => menu._id === menuId);
    setUpdatedMenu({ ...menuToUpdate });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMenu(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/admin_menu/${editMode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMenu)
      });
      const data = await response.json();
      console.log(data.message); // Output success message or handle error
      // After successful update, you may want to exit edit mode and update the menu list
      setEditMode(null);
      get_menu();
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Menu List</h1>
      {/* Add Link component for adding menu */}
      <div className="mb-4 flex justify-end">
        <Link to="/admin/addmenu" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
          Add Menu
        </Link>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gradient-to-r from-yellow-300 to-orange-500 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map(menu => (
            <tr key={menu._id} className="bg-gray-100 border-b border-gray-200">
              <td className="px-4 py-2">{editMode === menu._id ? <input type="text" name="name" value={updatedMenu.name} onChange={handleInputChange} /> : menu.name}</td>
              <td className="px-4 py-2">{editMode === menu._id ? <input type="text" name="price" value={updatedMenu.price} onChange={handleInputChange} /> : menu.price}</td>
              <td className="px-4 py-2">{editMode === menu._id ? <input type="text" name="category" value={updatedMenu.category} onChange={handleInputChange} /> : menu.category}</td>
              <td className="px-4 py-2">
                {menu.image && <img src={menu.image} alt="Menu Item" className="w-20 h-20 object-cover" />}
              </td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                {editMode === menu._id ? (
                  <button onClick={handleUpdate} className="text-green-500 hover:text-green-700 focus:outline-none">
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleDelete(menu._id)} className="text-red-500 hover:text-red-700 focus:outline-none">
                      <HiOutlineTrash className="inline-block mr-1" /> Delete
                    </button>
                    <button onClick={() => handleEdit(menu._id)} className="text-blue-500 hover:text-blue-700 focus:outline-none">
                      <HiOutlinePencilAlt className="inline-block mr-1" /> Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateMenu;
