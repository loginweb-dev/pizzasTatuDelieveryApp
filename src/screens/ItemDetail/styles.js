import { Dimensions } from 'react-native';
import { verticalScale } from '../../utils/scaling';
import { colors } from '../../utils/colors';
import { fontStyles } from '../../utils/fontStyles';

const {width, height} = Dimensions.get('window');

export default {
    flex: {
        flex: 1
    },
    container: {
        height: '90%',
        width: '90%',
        alignSelf: 'center',
    },
    container_top: {
        height: '8%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
    },
    map: {
        width: width,
        height: 300,
    },
    container_content_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        height: '15%',
        alignItems: 'center',
    },
    container_content_view_action: {
        width: '25%',
        alignItems: 'center',
    },
    width1_view: {
        borderLeftWidth: 1.5,
        borderLeftColor: colors.fontGreyColor,
        height: '30%',
    },
    itemContainer: {
        width: '100%',
        height: verticalScale(120),
    },
    reciptContainer: {
        width: '100%',
        height: verticalScale(100),
        alignItems: 'center',
        borderBottomWidth: verticalScale(1),
        borderBoborderBottomColor: colors.fontGreyColor,
    },
    contentContainer: {
        width: '95%',
        height: '100%',
        justifyContent: 'space-around',
    },
    itemTotalContainer: {
        width: '100%',
        flexDirection: 'row',
    },
    itemTotalTitle: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
    },
    itemTotalTitleText: {
        fontFamily: fontStyles.PoppinsRegular,
        color: colors.fontBlackColor,
        fontSize: verticalScale(14),
    },
    itemTotalValue: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTotalValueText: {
        fontFamily: fontStyles.PoppinsBold,
        color: 'black',
        fontSize: verticalScale(14),
    },
    totalContainer: {
        width: '95%',
        height: verticalScale(50),
        flexDirection: 'row',
        alignSelf: 'center',
    },
    TotalText: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(20),
        color: colors.fontBlackColor,
    },
    TotalTextAmount: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(20),
        color: colors.primaryOrangeColor,
    },
    checkoutContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom:verticalScale(150)
    },
};
