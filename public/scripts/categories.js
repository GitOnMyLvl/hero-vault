const newCategoryBtn = document.getElementById('newCategoryBtn');
const newCategoryDiv = document.getElementById('newCategoryDiv');

const showNewForm = () => {
  newCategoryDiv.innerHTML = `
    <form method="post" action="/categories/newCategory">
      <div class="category-form">
        <input type="text" id="categoryName" name="categoryName" class="main-input" required>
        <button type="submit" class="category-btn">Create</button>
      </div>
    </form>
  `
};

const showEditForm = (categoryId, name) => {
  const listItem = document.getElementById(`category-${categoryId}`);
  
  listItem.classList.remove('main-btn')

  listItem.innerHTML = `
    <form method="post" action="/categories/${categoryId}/editCategory">
      <div class="category-form">
        <input type="text" id="categoryName" name="categoryName" class="main-input" value="${name}" required>
        <button type="submit" class="category-btn">Save</button>
      </div>
    </form>
  `;
};

newCategoryBtn.addEventListener('click', showNewForm);
