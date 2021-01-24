import Color from './Colors';
import Fonts from './Fonts';
import Constant from './Constants';

const Constants = {
  headerIconSize: Constant.smallDevice ? 25 : 30,
  IconSize: Constant.smallDevice ? 20 : 25,
  smallIconSize: 20,
  iconType: {
    material: 'material',
    materialCom: 'material-community',
    ionIcons: 'ionicon',
  },
};

const style = {
  flex1: {
    flex: 1,
  },
  borderRadius: {
    borderRadius: 5,
  },
};

export default {
  style,
  Constants,
};
