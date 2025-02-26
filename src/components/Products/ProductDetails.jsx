// ** MUI Imports
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// ** Constant Imports
import { strings } from '../../constants/strings';

const ProductDetailsModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'}>
      <DialogContent>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant='h6' fontWeight={700}>
            {strings.productDetails}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box display={'flex'} alignItems={'baseline'} gap={1} mt={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productNameLabel}
          </Typography>
          <Typography
            variant='body1'
            color={'textSecondary'}
            sx={{ wordBreak: 'break-all' }}
          >
            {product.name || '-'}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'baseline'} gap={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productCategoryLabel}
          </Typography>
          <Typography variant='body1' color={'textSecondary'}>
            {product.category || '-'}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'baseline'} gap={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productPriceLabel}
          </Typography>
          <Typography variant='body1' color={'textSecondary'}>
            {product.price || '-'}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'baseline'} gap={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productStockLabel}
          </Typography>
          <Typography variant='body1' color={'textSecondary'}>
            {product.stockQuantity || '-'}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'baseline'} gap={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productCreatedByLabel}
          </Typography>
          <Typography
            variant='body1'
            color={'textSecondary'}
            textTransform={'capitalize'}
          >
            {product.createdBy.username || '-'}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'baseline'} gap={1}>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            sx={{ minWidth: 95 }}
          >
            {strings.productDescriptionLabel}
          </Typography>
          <Typography
            variant='body1'
            color={'textSecondary'}
            sx={{ wordBreak: 'break-all' }}
          >
            {product.description || 'No description available'}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
