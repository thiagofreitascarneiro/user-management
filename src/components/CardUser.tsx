// src/components/CardUser.tsx
import React from 'react';
import { User } from '../@types/userTypes';
import { PencilSimple, Trash } from 'phosphor-react';

interface CardUserProps {
  user: User;
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

const CardUser: React.FC<CardUserProps> = ({ user, onDelete, onEdit }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white font-semibold text-center rounded-3xl border dark:border-none shadow-lg p-10 max-w-xs transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer dark:bg-gray-800 dark:text-white">
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <h1 className="text-lg">
          {user.first_name} {user.last_name}
        </h1>
        <h3 className="text-sm text-gray-400">{user.email}</h3>
        <p className="text-xs text-gray-400 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => onEdit(user)}
            className="bg-indigo-600 p-2 rounded-full text-white font-semibold transition-colors duration-300 hover:bg-indigo-500"
          >
            <PencilSimple size={20} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="bg-indigo-600 p-2 rounded-full text-white font-semibold transition-colors duration-300 hover:bg-indigo-500"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
