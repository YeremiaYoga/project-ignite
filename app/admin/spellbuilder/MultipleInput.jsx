"use client";

export default function MultipleInput({
  labels = "Items",
  label = "Item",
  items,
  onChange,
}) {
  const addItem = () => {
    onChange([...items, ""]);
  };

  const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-medium">{labels}</label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            placeholder={`${label}`}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add {label}
      </button>
    </div>
  );
}
