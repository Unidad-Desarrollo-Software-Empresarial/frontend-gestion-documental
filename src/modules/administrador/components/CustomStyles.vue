<template>
    <div>
      <!-- Aquí no es necesario colocar HTML, ya que solo se manejarán estilos -->
    </div>
  </template>
  
  <style scoped>
  .header-container {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb; /* bg-gray-200 */
  }
  
  .header-title {
      font-size: 2rem;
      font-weight: 600;
  }
  
  .form-container {
    padding: 20px;
    background-color: #f9fafb; /* bg-gray-100 */
    border-radius: 0.5rem;
  }
  
  .form-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
  }
  
  .form-grid {
    display: grid;
    gap: 1rem;
  }
  
  .user-selection-container {
    display: flex;
    gap: 1rem;
  }
  
  .select-user-container, .search-container {
    flex: 1;
  }
  
  .label {
      font-weight: 500;
  }
  
  .select-input, .search-input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db; /* border-gray-300 */
  }
  
  .no-matches, .matches {
    font-size: 0.875rem;
  }
  
  .roles-container, .rol-menu-container, .menu-container {
    padding: 1rem;
    background-color: #ffffff; /* bg-white */
    border: 1px solid #d1d5db; /* border-gray-300 */
    border-radius: 0.375rem;
  }
  
  .toggle-button {
    background-color: #4f46e5; /* bg-indigo-600 */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .role-item, .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .role-checkbox, .menu-checkbox, .rol-menu-radio {
    margin-right: 0.5rem;
  }
  
  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .submit-button, .reset-button {
    background-color: #4f46e5; /* bg-indigo-600 */
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .reset-button {
    background-color: #ef4444; /* bg-red-600 */
  }
  
  .note {
    font-size: 0.875rem;
    color: #f87171; /* text-red-500 */
  }

  </style>
  