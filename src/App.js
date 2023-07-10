import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 300px;
  height: 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
`;

export default function App() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, []);

  const onChange = (searchText) => {
    const sanitizedSearchText = searchText.trim().toLowerCase();
    if (sanitizedSearchText.length < 2) {
      setResult([]);
      return;
    }
    const filteredData = data.filter((e) =>
      e.title.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setResult(filteredData);
  };

  return (
    <Container>
      <h1>Search!</h1>
      <Input onChange={(e) => onChange(e.target.value)} />
      {result.map((e) => {
        return <p>{e.title}</p>;
      })}
    </Container>
  );
}
