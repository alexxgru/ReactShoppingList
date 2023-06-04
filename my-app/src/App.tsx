import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { type } from 'os';

function FilterableProductTable({ prods }: { prods: Product[] }) {

  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
  <div>
    <SearchBar></SearchBar>
    <ProductTable prods={prods}></ ProductTable>
  </div>
  );
}

function SearchBar() {
  return(
    <form>
      <input type="text" placeholder='Search'/>
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan= {2}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow( { product } :{product : Product} ) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ prods }: { prods: Product[] }) {
  let lastCategory: string = ""
  let rows:JSX.Element[] = []

  prods.forEach((prod: Product)=> {
    if (prod.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={prod.category} key={prod.category}></ProductCategoryRow>
        
        )
      }
      rows.push(
        <ProductRow product={prod} key={prod.name}></ProductRow>
        )
        
      lastCategory = prod.category;
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}




type Product = {
  category: string,
  price: string,
  stocked: boolean,
  name: string
};

const PRODUCTS: Product[] = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];


export default function App() {
  return (
    <FilterableProductTable prods={PRODUCTS}></FilterableProductTable>
  );
}