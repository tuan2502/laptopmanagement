import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Axios from "axios";
function App() {
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const [categoryName, setCategoryName] = useState("");
  const [categoryImg, setCategoryImg] = useState("");

  const [newProductName, setNewProductName] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newCategoryId, setNewCategoryId] = useState(0);

  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:3001/createproduct", {
      productName: productName,
      productImg: productImg,
      quantity: quantity,
      price: price,
      categoryId: categoryId,
    }).then(() => {
      setProductList([
        ...productList,
        {
          productName: productName,
          productImg: productImg,
          quantity: quantity,
          price: price,
          categoryId: categoryId,
        },
      ]);
    });
  };

  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductList(response.data);
    });
  };

  const updateProduct = (id) => {
    Axios.put("http://localhost:3001/updateproduct", {
      productName: newProductName,
      productImg: newProductImg,
      quantity: newQuantity,
      price: newPrice,
      categoryId: newCategoryId,
      id: id,
    }).then((response) => {
      setProductList(
        productList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                productName: newProductName,
                productImg: newProductImg,
                quantity: newQuantity,
                price: newPrice,
                categoryId: newCategoryId,
              }
            : val;
        })
      );
    });
  };

  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/deleteproduct/${id}`).then(
      (response) => {
        setProductList(
          productList.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  const getCategory = () => {
    Axios.get("http://localhost:3001/categories").then((response) => {
      setCategoryList(response.data);
    });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          ASG Laptop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#addProduct">
                Add Product <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#productsList">
                Products List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#categoryList">
                Category List
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div id="categoryList" className="category container">
        <h2 className="py-3 text-center">Category List</h2>
        <div className="text-center pb-3">
          <button className="btn btn-info" onClick={getCategory}>
            Show Category
          </button>
        </div>
        {categoryList.map((val, key) => {
          return (
            <div className="product d-flex">
              <div>
                <h5>Category Name: {val.categoryName}</h5>
                <img className="img-fluid" src={val.categoryImg}></img>
              </div>
            </div>
          );
        })}
      </div>

      <div id="addProduct" className="form container">
        <h2 className="text-center">Add Product</h2>
        <div className="row">
          <div className="offset-2 col-3">
            <label className="d-block">Product Name: </label>
            <input
              type="text"
              onChange={(event) => {
                setProductName(event.target.value);
              }}
            ></input>
            <label className="d-block">Product Image: </label>
            <input
              type="text"
              onChange={(event) => {
                setProductImg(event.target.value);
              }}
            ></input>
            <label className="d-block">Quantity: </label>
            <input
              type="number"
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            ></input>
          </div>
          <div className="offset-2 col-3">
            <label className="d-block">Price: </label>
            <input
              type="number"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            ></input>
            <label className="d-block">Category Id: </label>
            <div>
              <input
                type="number"
                onChange={(event) => {
                  setCategoryId(event.target.value);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="offset-5 col-2 mt-3">
          <button className="btn btn-success" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>

      <div id="productsList" className="products container">
        <h2 className="py-3 text-center">Products List</h2>
        <div className="text-center pb-3">
          <button className="btn btn-info" onClick={getProducts}>
            Show Products
          </button>
        </div>
        {productList.map((val, key) => {
          return (
            <div className="product d-flex">
              <div>
                <h5>Product Name: {val.productName}</h5>
                <img className="img-fluid" src={val.productImg}></img>
                <p>Quantity: {val.quantity}</p>
                <p>Position: {val.price}</p>
                <p>Category Id: {val.categoryId}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  onChange={(event) => {
                    setNewProductName(event.target.value);
                  }}
                ></input>
                <input
                  type="text"
                  placeholder="URL Image"
                  onChange={(event) => {
                    setNewProductImg(event.target.value);
                  }}
                ></input>
                <input
                  type="number"
                  placeholder="Quantity"
                  onChange={(event) => {
                    setNewQuantity(event.target.value);
                  }}
                ></input>
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                ></input>
                <input
                  type="number"
                  placeholder="Category ID"
                  onChange={(event) => {
                    setNewCategoryId(event.target.value);
                  }}
                ></input>
                <button
                  className="btn btn-primary mr-3"
                  onClick={() => {
                    updateProduct(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteProduct(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
