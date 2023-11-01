import React, { useEffect, useState } from 'react';

const TableRow = ({ item, HandleDelete, HandleEdit, cat }) => {
  // State to manage product data
  const [product, setProduct] = useState(item);
  // State to manage categories data
  const [categories, setCategories] = useState(cat);
  // State to toggle edit mode
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Update product and categories when item or cat prop changes
    setProduct(item);
    setCategories(cat);
  }, [item, cat]);

  return (
    <tr>
      <td>
        {/* Title */}
        {!editMode ? (
          product?.title
        ) : (
          <input
            className='form-control'
            type="text"
            value={product?.title}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, 'title': e.target.value }))
            }
          />
        )}
      </td>
      <td>
        {/* Type */}
        {!editMode ? (
          product?.type
        ) : (
          <input
            className='form-control'
            type="text"
            value={product?.type}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, 'type': e.target.value }))
            }
          />
        )}
      </td>
      <td>
        {/* Category */}
        {!editMode ? (
          product?.category?.name
        ) : (
          <select className="form-select" onChange={(e) => {
            e.preventDefault();
            setProduct((prev) => ({ ...prev, 'category': e.target.value }));
          }}>
            {categories?.map((element) => {
              if (element._id === product?.category?._id)
                return <option selected value={element._id}>{element?.name}</option>;
              return <option value={element._id}>{element?.name}</option>;
            })}
          </select>
        )}
      </td>
      <td style={{ wordWrap: 'break-word' }}>
        {/* Description */}
        {!editMode ? (
          <p style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: "ellipsis",
            maxWidth: "200px"
          }}>{product?.desc}</p>
        ) : (
          <textarea value={product?.desc} className='form-control' col={10}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, 'desc': e.target.value }))
            }
          />
        )}
      </td>
      <td>
        {/* Price */}
        {!editMode ? (
          product?.price
        ) : (
          <input type="number" className='form-control' value={product?.price}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, 'price': e.target.value }))
            }
          />
        )}
      </td>
      <td>
        {/* Edit and Save buttons */}
        {!editMode ? (
          <button className="btn btn-warning btn-sm me-2"
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </button>
        ) : (
          <button className="btn btn-warning btn-sm me-2"
            onClick={() => {
              HandleEdit(product?._id, product);
              setEditMode(false);
            }}
          >
            Save
          </button>
        )}
        {/* Delete button */}
        <button className="btn btn-danger btn-sm" onClick={() => HandleDelete(product?._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
