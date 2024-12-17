import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUsers } from '../services/api';
import { User, PaginatedUsersResponse } from '../@types/userTypes';
import CardUser from '../components/CardUser';
import avatar from '../assets/avatar.jpg';
import LoadingWithMessage from '../components/Modal-loading';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: avatar,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const USERS_PER_PAGE = 6;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response: PaginatedUsersResponse = await fetchUsers(currentPage);
        setUsers(response.data);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCreateUser = (newUser: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = [newUser, ...prevUsers];
      const newTotalPages = Math.ceil(updatedUsers.length / USERS_PER_PAGE);
      setTotalPages(newTotalPages);
      return updatedUsers;
    });
  };

  const handleSubmitCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserData = { ...newUser, id: Date.now() };
    handleCreateUser(newUserData);
    setNewUser({
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: avatar,
    });
  };

  const handleUpdateUser = (user: User) => {
    setEditUser(user);
    setNewUser({ ...user });
  };

  const handleSubmitUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUser.id ? { ...user, ...newUser } : user
        )
      );
      setEditUser(null);
      setNewUser({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        avatar: avatar,
      });
    }
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete)
      );
      setModalOpen(false);
      setUserToDelete(null);
    }
  };

  const openDeleteModal = (id: number) => {
    setUserToDelete(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setUserToDelete(null);
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <LoadingWithMessage
          message="Loading users, please wait..."
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-6 ">
      <h2 className="text-2xl text-center mx-9 font-bold text-gray-800 dark:text-white mb-6">
        User Management Dashboard
      </h2>

      <form
        onSubmit={editUser ? handleSubmitUpdateUser : handleSubmitCreateUser}
        className="max-w-lg mx-auto"
      >
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newUser.first_name}
              onChange={(e) =>
                setNewUser({ ...newUser, first_name: e.target.value })
              }
              placeholder="First Name"
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              value={newUser.last_name}
              onChange={(e) =>
                setNewUser({ ...newUser, last_name: e.target.value })
              }
              required
              placeholder="Last Name"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <input
            required
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-32 py-2 mt-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors mx-auto block"
          >
            {editUser ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {users.slice(0, USERS_PER_PAGE).map((user: User) => (
          <CardUser
            key={user.id}
            user={user}
            onDelete={() => openDeleteModal(user.id)}
            onEdit={handleUpdateUser}
          />
        ))}
      </div>

      <nav
        aria-label="Page navigation example"
        className="mt-6 flex justify-center items-center"
      >
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === index + 1
                    ? 'text-blue-600 border-blue-300 bg-blue-50 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : ''
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {modalOpen && (
        <LoadingWithMessage
          message="Are you sure you want to delete this user?"
          onConfirm={handleDeleteUser}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
