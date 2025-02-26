/* eslint-disable react-hooks/rules-of-hooks */
// ** React Imports
import React, { useState } from 'react';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  updateProduct,
  viewProduct,
} from '../features/productsSlice';

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, TextField, IconButton } from '@mui/material';

// ** Constant Imports
import { strings } from '../constants/strings';

// ** Component Imports
import ProductModal from '../components/Products/ProductForm';
import ProductDetailsModal from '../components/Products/ProductDetails';
import { useDebouncedValue } from '../hooks/useDebounce';

// ** Icon Imports
import { Icon } from '@iconify/react';

// ** Styles Imports
import * as styles from '../styles-page/styles';

const Products = () => {
  // ** States
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetailsOpen, setProductDetails] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const searchTasks = (products, searchQuery) => {
    // ** If search query is empty, return all products
    if (!searchQuery) return products;

    return products.filter((product) =>
      Object.values(product)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  // ** Vars
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user || null);
  const rows = useSelector((state) => state.products || []);
  const debouncedSearchQuery = useDebouncedValue(searchText, 500);
  const filteredProducts = searchTasks(rows, debouncedSearchQuery);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditData(null);
  };

  const handleSave = (id, data) => {
    if (id) {
      dispatch(updateProduct({ id: id, updatedProduct: data }));
    } else {
      dispatch(addProduct(data));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = async (id) => {
    setOpen(true);
    await dispatch(viewProduct(id)).then((result) => {
      const task = result.payload;
      setEditData(task);
    });
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setProductDetails(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setProductDetails(false);
  };

  const columns = [
    {
      field: 'no',
      headerName: 'Sr No.',
      minWidth: 70,
      width: 70,
      sortable: false,
      flex: 0.3,
    },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 200,
      sortable: false,
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 170,
      sortable: false,
      flex: 0.7,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'stockQuantity',
      headerName: 'Stock',
      minWidth: 100,
      sortable: false,
      flex: 0.6,
      renderCell: (params) => {
        const stock = params.value;
        let color = 'black'; // ** Default color

        if (stock <= 5) {
          color = 'red'; // ** Low stock warning
        } else if (stock > 5 && stock <= 10) {
          color = 'orange'; // ** Medium stock
        } else {
          color = 'green'; // ** Sufficient stock
        }

        return <span style={{ color, fontWeight: 'bold' }}>{stock}</span>;
      },
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      minWidth: 130,
      sortable: false,
      flex: 0.7,
      valueGetter: (params) =>
        params?.username.charAt(0).toUpperCase() + params?.username.slice(1) ||
        'N/A',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 170,
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Box>
          <IconButton
            sx={styles.paddingOfIcon}
            onMouseUp={() => {
              handleOpenModal(params?.row);
            }}
          >
            <Icon icon='mdi:eye-outline' fontSize='1.25rem' />
          </IconButton>
          {user.role === 'admin' && (
            <>
              <IconButton
                sx={styles.paddingOfIcon}
                onMouseUp={() => {
                  handleEdit(params.row.id);
                }}
              >
                <Icon icon='mdi:pencil-outline' fontSize='1.25rem' />
              </IconButton>
              <IconButton
                sx={styles.paddingOfIcon}
                onMouseUp={() => {
                  handleDelete(params.row.id);
                }}
              >
                <Icon
                  icon='mdi:delete-outline'
                  fontSize='1.25rem'
                  color='red'
                />
              </IconButton>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'end'}
        flexWrap={'wrap'}
        py={3}
        gap={1}
      >
        <TextField
          variant='outlined'
          placeholder='Search...'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size='small'
          sx={{ width: 300 }}
        />
        {user.role === 'admin' && (
          <Button variant='contained' color='primary' onClick={handleOpen}>
            {strings.add}
          </Button>
        )}
      </Box>
      <DataGrid
        sx={styles.dataGrid}
        disableColumnMenu
        getRowId={(row) => row?.name}
        rows={filteredProducts || []}
        columns={columns}
        rowCount={filteredProducts?.length}
        initialState={{
          pagination: {
            paginationModel: {
              page: page,
              pageSize: pageSize,
            },
          },
        }}
        onPaginationModelChange={(newPageSize) => {
          setPageSize(newPageSize.pageSize);
          setPage(newPageSize.page);
        }}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        disableRowSelectionOnClick
      />
      {/* Product Form */}
      <ProductModal
        open={open}
        editData={editData}
        onClose={handleCloseDialog}
        onSave={handleSave}
      />
      {/* Product Details Modal */}
      <ProductDetailsModal
        open={productDetailsOpen}
        handleClose={handleCloseModal}
        product={selectedProduct}
      />
    </Box>
  );
};

export default Products;
