export const appBar = {
  width: '100%',
  transition: 'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
  background: 'primary',
  zIndex: 1201,
  boxShadow: '0 4px 8px -4px black',
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  overflow: 'hidden',
};

export const toolBar = (isMdOrSmaller) => ({
  display: 'flex',
  justifyContent: isMdOrSmaller ? 'space-between' : 'end',
});

export const menuIcon = {
  color: 'white',
  mr: 2,
};

export const avatar = {
  textTransform: 'capitalize',
  fontWeight: 700,
  backgroundColor: '#9a9090',
};
