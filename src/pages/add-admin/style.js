export default {
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 5,
    },
    content: {
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    item: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,

    },
    itemContent: {
        height: 40,
        borderBottomWidth: 0.4,
        borderColor: '#000',
    },
    pickerContent: { 
        flexDirection: 'row', 
        height: 60 ,
        alignItems:'flex-end',
    },
    itemInput: {
        flex: 1,
    },
    itemButton:{
        paddingLeft:6,
        paddingRight:6,
        height:26,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#ccc',
    },
    itemMargin:{
        width:12
    },
    itemText: {
        color: '#1a9cf3',
    },
    button: {
        marginTop: 20,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#1a9cf3',
    },
    buttonText: {
        color: '#fff',
    }
}