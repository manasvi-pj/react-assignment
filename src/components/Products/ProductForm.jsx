/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

// ** MUI Imports
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  CircularProgress,
  FormControl,
} from '@mui/material';

// ** Styles Imports
import * as styles from '../../styles-page/products';

const defaultValues = {
  name: '',
  price: '',
  category: '',
  description: '',
  stockQuantity: '',
  createdBy: '',
  lastModified: '',
};

const ProductForm = ({ open, editData, onClose, onSave }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const body = {
      ...data,
      createdBy: user,
      lastModified: new Date().toISOString(),
    };

    if (body.id) {
      onSave(body.id, body);
    } else {
      onSave(null, body);
      reset();
    }
  };

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset(defaultValues);
    }
  }, [editData, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogTitle sx={styles.dialogTitle}>
        {editData ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Product Name */}
          <FormControl fullWidth>
            <Controller
              name='name'
              control={control}
              rules={{
                required: 'Please enter product name',
                minLength: {
                  value: 2,
                  message: 'Product Name must be at least 2 characters',
                },
                maxLength: {
                  value: 100,
                  message: "Product Name can't be more than 100 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Product Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
          </FormControl>

          {/* Price */}
          <FormControl fullWidth>
            <Controller
              name='price'
              control={control}
              rules={{
                required: 'Please enter price',
                min: { value: 1, message: 'Price must be at least 1' },
                maxLength: {
                  value: 10,
                  message: "Price can't be more than 10 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  sx={styles.textField}
                  {...field}
                  label='Price'
                  type='number'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </FormControl>

          {/* Category */}
          <FormControl fullWidth>
            <Controller
              name='category'
              control={control}
              rules={{
                required: 'Please enter category',
                maxLength: {
                  value: 100,
                  message: "Category can't be more than 100 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  sx={styles.textField}
                  {...field}
                  label='Category'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
          </FormControl>

          {/* Stock */}
          <FormControl fullWidth>
            <Controller
              name='stockQuantity'
              control={control}
              rules={{
                required: 'Please enter stock',
                min: { value: 1, message: 'Stock must be at least 1' },
                maxLength: {
                  value: 10,
                  message: "Stock can't be more than 10 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  sx={styles.textField}
                  {...field}
                  type='number'
                  label='Stock Quantity'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  error={!!errors.stockQuantity}
                  helperText={errors.stockQuantity?.message}
                />
              )}
            />
          </FormControl>

          {/* Description */}
          <FormControl fullWidth>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextField
                  sx={styles.textField}
                  {...field}
                  label='Description'
                  variant='outlined'
                  multiline
                  rows={3}
                  fullWidth
                  margin='normal'
                  onInput={(e) =>
                    (e.target.value = e.target.value.slice(0, 250))
                  }
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button
          onClick={handleSubmit(onSubmit)}
          color='primary'
          variant='contained'
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={25} color='inherit' />
          ) : editData ? (
            'Update'
          ) : (
            'Add'
          )}
        </Button>
        <Button
          onClick={() => {
            onClose();
            reset();
            setPreview(null);
          }}
          color='primary'
          variant='outlined'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
