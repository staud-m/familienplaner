import { useEffect, useMemo, useState } from "react";
import {
  createShoppingItem,
  deleteShoppingItem,
  getShoppingCategories,
  getShoppingItems,
  updateShoppingItem,
} from "../../api/shoppingApi";

function ShoppingList({ onActiveCountChange }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Groceries");
  const [filterCategory, setFilterCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [itemsData, categoriesData] = await Promise.all([
        getShoppingItems(),
        getShoppingCategories(),
      ]);

      setItems(itemsData);
      setCategories(categoriesData);

      if (categoriesData.length > 0) {
        setNewItemCategory(categoriesData[0]);
      }
    } catch (err) {
      setError(err.message || "Could not load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const activeItemsCount = useMemo(() => {
    return items.filter((item) => !item.is_done).length;
  }, [items]);

  useEffect(() => {
    onActiveCountChange(activeItemsCount);
  }, [activeItemsCount, onActiveCountChange]);

  const filteredItems = useMemo(() => {
    if (filterCategory === "All") return items;
    return items.filter((item) => item.category === filterCategory);
  }, [items, filterCategory]);

  async function handleCreateItem(event) {
    event.preventDefault();

    const name = newItemName.trim();

    if (!name) {
      setError("Bitte einen Artikelnamen eingeben.");
      return;
    }

    try {
      setError("");

      const createdItem = await createShoppingItem({
        name,
        category: newItemCategory,
      });

      setItems((currentItems) => [createdItem, ...currentItems]);
      setNewItemName("");
    } catch (err) {
      setError(err.message || "Could not create item");
    }
  }

  async function handleToggleItem(item) {
    try {
      setError("");

      const updatedItem = await updateShoppingItem(item.id, {
        is_done: !item.is_done,
      });

      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === item.id ? updatedItem : currentItem
        )
      );
    } catch (err) {
      setError(err.message || "Could not update item");
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      setError("");

      await deleteShoppingItem(itemId);

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );
    } catch (err) {
      setError(err.message || "Could not delete item");
    }
  }

  return (
    <section className="content-panel">
      <header className="module-title">
        <h1>Einkaufsliste</h1>
        <p>Artikel verwalten und nach Kategorie sortieren</p>
      </header>

      <form className="add-row" onSubmit={handleCreateItem}>
        <input
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          placeholder="Artikel hinzufügen..."
        />

        <select
          value={newItemCategory}
          onChange={(event) => setNewItemCategory(event.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button type="submit">+</button>
      </form>

      <div className="filter-row">
        <select
          value={filterCategory}
          onChange={(event) => setFilterCategory(event.target.value)}
        >
          <option value="All">Alle Kategorien</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <span>{filteredItems.length} Artikel</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      {loading ? (
        <p className="empty-state">Lade Einkaufsliste...</p>
      ) : (
        <ul className="shopping-list">
          {filteredItems.map((item) => (
            <li key={item.id} className="shopping-item">
              <label className="item-left">
                <input
                  type="checkbox"
                  checked={item.is_done}
                  onChange={() => handleToggleItem(item)}
                />
                <span className={item.is_done ? "done" : ""}>{item.name}</span>
              </label>

              <span className={`pill ${item.category.toLowerCase()}`}>
                {item.category}
              </span>

              <button
                className="delete-button"
                type="button"
                onClick={() => handleDeleteItem(item.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShoppingList;
