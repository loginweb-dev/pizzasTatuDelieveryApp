import { verticalScale } from '../../utils/scaling'


export default {
    flex: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    profile_body_container: {
        alignItems: 'center',
        height: '100%',
        width: '100%'

    },
    marginTop20: {
        marginTop: verticalScale(20)
    },
    inputContainer: {
        alignItems: 'center',
        marginBottom: verticalScale(20),
        width: '90%'
    },
    backicon_container: {
        width: '85%'
    },
    back_icon: {
        fontSize: verticalScale(20)
    },

    lower_form: {
        width: '80%',
        alignItems: 'center'
    },
    social_btns_container: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    marginBtm20: {
        marginBottom: verticalScale(10)
    },
    marginBtm30: {
        marginBottom: verticalScale(30)
    },
    loginWithContainer: {
        width: '90%',
        marginTop: verticalScale(15)
    },
    avatar_image: {
        width: verticalScale(100),
        height: verticalScale(100),
    },
    avatar_image_container: {
        alignItems: 'center',
        marginBottom: verticalScale(25),
    }

}