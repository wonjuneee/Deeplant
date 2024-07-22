import React, { useState } from 'react';
import { apiIP } from '../../config';
import { HiOutlineSearch } from "react-icons/hi";
import { TextField, IconButton, Box } from '@mui/material';

function SearchById({ onDataFetch, onValueChange }) {
  const [id, setId] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://${apiIP}/meat/get/by-meat-id?meatId=${id}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      onDataFetch(data);
      onValueChange('single');
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
      onDataFetch(null); // 에러 발생 시 데이터 초기화
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, // 간격을 추가하여 인풋과 버튼 사이에 여유 공간을 둡니다.
        backgroundColor: '#f0f0f0', // 배경색을 설정합니다.
        borderRadius: '4px', // 모서리를 둥글게 설정합니다.
        padding: '5px', // 안쪽 여백을 설정합니다.
      }}
    >
      <TextField 
        type="number" 
        value={id} 
        onChange={handleChange} 
        placeholder="ID"
        variant="outlined" 
        size="small" 
        sx={{ 
          flex: 1, // 인풋이 가능한 한 넓게 차지하도록 설정합니다.
          backgroundColor: 'white', // 인풋의 배경색을 설정합니다.
          borderRadius: '4px', // 인풋의 모서리를 둥글게 설정합니다.
        }} 
      />
      <IconButton 
        onClick={handleSearch} 
        color="primary" 
        sx={{ 
          backgroundColor: '#115293', // 버튼의 배경색을 설정합니다.
          color: 'white', // 버튼 아이콘의 색상을 설정합니다.
          '&:hover': {
            backgroundColor: 'Navy', // 호버 시 버튼의 배경색을 설정합니다.
          }
        }}
      >
        <HiOutlineSearch />
      </IconButton>
    </Box>
  );
}

export default SearchById;