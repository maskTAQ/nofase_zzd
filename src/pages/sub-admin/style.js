export default {
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        height: 60,
        paddingBottom: 10,
        backgroundColor: '#1a9cf2',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    headerBox: {
        width: '100%',
        height: 26,

        flexDirection: 'row',
    },
    headerLeftButton: {
        width: 80,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarWrapper: {
        flex: 1,
    },
    searchBarBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: .6,
        borderColor: '#ccc',
    },
    searchInput: {
        flex: 1,
        fontSize: 12,
        paddingLeft: 10,
        color: '#333',
    },
    searchBarBorder: {
        width: 1,
        height: '80%',
        backgroundColor: '#ccc',
    },
    searchButton: {
        paddingLeft: 4,
        paddingRight: 4,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRightButton: {
        width: 40,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex:1,
        padding: 6,
    },
    item: {
        height: 66,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    itemLeft:{
        flex:1
    },
    itemLeftTop: {
        flex: 1,
        alignItems:'center',
        flexDirection:'row',
    },
    itemName:{
        color:'rgb(51, 51, 51)',
    },
    itemAddr:{
        color:'rgb(51, 51, 51)',
    },
    itemLeftBottom: {
        flex: 1,
       justifyContent:'center',
    },
    itemMobile:{
        color:'rgb(51, 51, 51)',
    },
    itemRight:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingRight:10,
    },
    itemEdit:{
        marginLeft:10,
        padding:6,
        borderRadius:6,
        backgroundColor:'#1a9bf8',
    }
}