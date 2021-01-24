const type = {
  light: 'SourceSansPro-Light',
  extraLight: 'SourceSansPro-ExtraLight',
  regular: 'SourceSansPro-Regular',
  blackItalic: 'SourceSansPro-BlackIt',
  italic: 'SourceSansPro-It',
  extraLightItalic: 'SourceSansPro-ExtraLightIt',
  lightItalic: 'SourceSansPro-LightIt',
  boldItalic: 'SourceSansPro-BoldIt',
  black: 'SourceSansPro-Black',
  bold: 'SourceSansPro-Bold',
  semiBold: 'SourceSansPro-Semibold',
  semiBoldItalil: 'SourceSansPro-SemiboldIt',
};
const size = {
  xl: 30,
  large: 20,
  regular: 18,
  medium: 15,
  small: 12,
};
const style = {
  lightHeader: {
    fontFamily: type.light,
    fontSize: size.regular,
  },
};

export default {
  type,
  size,
  style,
};
