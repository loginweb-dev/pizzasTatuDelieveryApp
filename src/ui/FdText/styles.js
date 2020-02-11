import { verticalScale } from '../../utils/scaling';
import { fontStyles } from '../../utils/fontStyles';
import { colors } from '../../utils/colors';

export default {
    fdParagraph: {
        color: colors.primaryBlackColor,
        marginTop: verticalScale(20),
        fontSize: verticalScale(16),
        fontFamily: fontStyles.PoppinsRegular,
        textAlign: 'center',
    },
};
