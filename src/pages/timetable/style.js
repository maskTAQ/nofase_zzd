const color = "#1b9ee7";
export default {
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2"
  },
  c: {
    //height:'50%'
  },
  selectTime: {
    fontSize: 12,
    color: "#1a97df"
  },
  input: {
    flex: 1,
    color: "#1a97df"
  },
  deleteButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteText: {
    color: "red"
  },
  addButton: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    //width: "90%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: color
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },


  modalContainer: {
    width:'100%',
    backgroundColor: '#fff',
    alignItems: "center",
      paddingBottom:20,
   },
  modalTitle:{
    fontSize:16,
    paddingTop:25,
  },
  inputGroup: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent:"center",
    marginTop:20,
  },
  startTimeButton: {
    flex:1,
    justifyContent:"center",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    
    borderWidth: 1,
    borderColor: "#019af5",
    marginRight:10,
  },
  endTimeButton:{
    justifyContent:"center",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    paddingLeft: 70,
    paddingRight: 70,
    borderWidth: 1,
    borderColor: "#019af5",
    marginLeft:10,
  },
  buttonGroup:{
    flexDirection: "row",
    height:45,
    width:"75%",
    borderWidth:1,
    borderColor:'#019af5',
    borderRadius:5,
    overflow:"hidden",
    marginTop:15,
  },
  cancel:{
    width:"35%",
    height:"100%",
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',  
    
  },
  cancelText:{
    color:'#019af5'
  },
  completelText:{
    color:"#fff"
  },
  complete:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#019af5',
    
  }
};
