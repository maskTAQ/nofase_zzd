const color = "#1b9ee7";

export default {
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  header: {
    height: 50,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  headerLabel: {
    fontSize: 16,
    color: "#666666"
  },
  center: {
    marginTop: 10,
    padding: 10,
    paddingTop: 0,
    backgroundColor: "#fff"
  },
  centerTitle: {
    fontSize: 16,
    lineHeight: 60,
    color: "#666666"
  },
  chooseDayWrapper: {
    height: 30,
    marginBottom: 15,
    flexDirection: "row"
  },
  chooseDayButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: color
  },
  chooseDayButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff"
  },
  zhi: {
    lineHeight: 30,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#333"
  },
  chooseTimeButton: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color,
    borderRadius: 6
  },
  chooseTimeButtonText: {
    fontSize: 12,
    color: color
  },
  timeZhi: {
    lineHeight: 30,
    textAlign: "center",
    fontSize: 12,
    color: "#333"
  },
  bottom: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  saveButton: {
    width: "70%",
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
  },
  info: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#999"
  },

  switchWrapper: {
    width: 60,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 6,
    backgroundColor: "#1b9ee7"
  },
  switchPoint: {
    width: 28,
    height: 24,
    borderRadius: 4,
    backgroundColor: "#fff"
  },
  switchLabel: {
    flex: 1,
    textAlign: "center",
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  }
};
