import { verticalScale } from '../../utils/scaling';
import { fontStyles } from '../../utils/fontStyles';
import { colors } from '../../utils/colors';

export default {
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: '20%',
        height: '80%',
    },
    imageItem: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    middleContainer: {
        width: '50%',
        height: '80%',
        flexDirection: 'column',
        marginLeft: verticalScale(10),
    },
    titleContainer: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
    },
    title: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(18),
    },
    descContainer: {
        width: '100%',
        height: '40%',
    },
    desc: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(12),
    },
    priceContainer: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
    },
    price: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(16),
        color: colors.orangeColor,
    },
    actionsContainer: {
        width: '20%',
        height: '80%',
        flexDirection: 'column',
    },
    btnContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionBtnContainer: {
        width: '90%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: verticalScale(2),
        borderRadius: verticalScale(3),
    },
    actionBtnText: {
        fontFamily: fontStyles.PoppinsRegular,
        fontSize: verticalScale(20),
    },
};
