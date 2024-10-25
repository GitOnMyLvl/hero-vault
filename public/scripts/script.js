const newCategoryBtn = document.getElementById('newCategoryBtn');
const newCategoryDiv = document.getElementById('newCategoryDiv');

const showForm = () => {
  newCategoryDiv.innerHTML = `
    <form method="post" action="/categories/newCategory">
      <div class="newCategoryForm">
        <input type="text" id="categoryName" name="categoryName" required>
        <button type="submit">Create</button>
      </div>
    </form>
  `
};

newCategoryBtn.addEventListener('click', showForm);
