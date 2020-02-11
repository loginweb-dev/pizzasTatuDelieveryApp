import { verticalScale } from '../../utils/scaling';
import { fontStyles } from '../../utils/fontStyles';
import { colors } from '../../utils/colors';

export default {
    mainContainer: {
        borderBottomWidth: verticalScale(1),
        flex: 1,
        borderBottomColor: colors.fontGreyColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: '90%',
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '30%',
        height: '70%',
        backgroundColor: 'green',
    },
    imageRes: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    contentContainer: {
        width: '35%',
        height: 20,
        marginLeft: verticalScale(10),
    },
    titleContainer: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        fontFamily: fontStyles.PoppinsBold,
        color: 'black',
    },
    actionContainerBtns: {
        width: '33%',
        height: '100%',
        backgroundColor: colors.primaryOrangeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionContainerBtnsText: {
        color: 'white',
        fontFamily: fontStyles.PoppinsBold,
        fontSize: verticalScale(14),
    },
    actionContainerViewText: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(14),
        color: 'black',
    },
    actionContainerView: {
        width: '33%',
        height: '100%',
        backgroundColor: colors.lightGrayColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        width: '20%',
        height: '20%',
        marginLeft: verticalScale(5),
    },
    priceText: {
        fontFamily: fontStyles.PoppinsBold,
        color: colors.primaryOrangeColor,
        fontSize: verticalScale(15),
    },
    trashContainer: {
        width: '10%',
        height: '20%',
        marginLeft: verticalScale(5),
    },
};
