const newCategoryBtn = document.getElementById('newCategoryBtn');
const newCategoryDiv = document.getElementById('newCategoryDiv');

const showForm = () => {
  newCategoryDiv.innerHTML = `
    <form method="post" action="/categories/newCategory">
      <div class="category-form">
        <input type="text" id="categoryName" name="categoryName" class="main-input" required>
        <button type="submit" class="category-btn">Create</button>
      </div>
    </form>
  `
};

newCategoryBtn.addEventListener('click', showForm);
