const color = "#1b9ee7";
export default {
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff"
  },
  item: {
    flexDirection: "row",
    height: 46,
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemLabel: {
    fontSize: 14,
    color: "#666666"
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemValue: {
    width: 50,
    fontSize: 13,
    color: "#333333"
  },
  itemBorder: {
    height: 1,
    backgroundColor: "#d7d7d7"
  },
  saveButton: {
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
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
};
