// ** MUI Imports
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ** Constant Imports
import { strings } from "../../constants/strings";

// ** Styles Imports
import * as styles from "../../styles-page/products";

const ProductDetailsModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={700}>
            {strings.productDetails}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box display={"flex"} alignItems={"baseline"} gap={1} mt={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productNameLabel}
          </Typography>
          <Typography
            variant="body1"
            color={"textSecondary"}
            textTransform={"capitalize"}
            sx={styles.wordBreak}
          >
            {product.name || "-"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"baseline"} gap={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productCategoryLabel}
          </Typography>
          <Typography
            variant="body1"
            color={"textSecondary"}
            textTransform={"capitalize"}
          >
            {product.category || "-"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"baseline"} gap={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productPriceLabel}
          </Typography>
          <Typography variant="body1" color={"textSecondary"}>
            {product.price || "-"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"baseline"} gap={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productStockLabel}
          </Typography>
          <Typography variant="body1" color={"textSecondary"}>
            {product.stockQuantity || "-"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"baseline"} gap={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productCreatedByLabel}
          </Typography>
          <Typography
            variant="body1"
            color={"textSecondary"}
            textTransform={"capitalize"}
          >
            {product.createdBy.username || "-"}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems={"baseline"} gap={1}>
          <Typography variant="subtitle1" fontWeight={600} sx={styles.title}>
            {strings.productDescriptionLabel}
          </Typography>
          <Typography
            variant="body1"
            color={"textSecondary"}
            sx={styles.wordBreak}
          >
            {product.description || "No description available"}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
