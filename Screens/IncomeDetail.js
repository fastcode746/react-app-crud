import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
  Button,
  Alert,
  Platform,
  StatusBar,
  ScrollAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IncomeDetail({ route, navigation }) {
  let name2 = "not defined";
  if (route.params !== undefined) {
    const { name } = route.params;
    name2 = name;
  }
  const [total, setTotal] = useState(0);
  const [brr, setBrr] = useState([{}]);
  const deleteHandler = async (debt) => {};
  useEffect(() => {
    const getAllDebts = async () => {
      const data = JSON.parse(await AsyncStorage.getItem("@incomes"));
      const marr = data;
      let arr = [];
      let tot = 0;
      marr.map((item) => {
        if (item.name == name2) {
          arr.push(item);
          tot += item.amount;
        }
      });
      setTotal(tot);
      setBrr(arr);
    };
    getAllDebts();
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require(`../assets/back_w.png`)}></Image>
        {/* <Text style={{ color: "#fff" }}>Back</Text> */}
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>{`${name2}'s`} Debts</Text>
      <View style={styles.spentCard}>
        <Text style={styles.subheading}>Total Amount {name2} owes you</Text>
        <View>
          <Text style={styles.paisa}>MYR  {total}</Text>
        </View>
      </View>
      <ScrollView>
        {brr.map((item) => (
          <View key={Math.random()} style={styles.amts}>
            <View style={{ flex: 0.8 }}>
              <Text style={{ fontWeight: "600", fontSize: 30 }}>
                MYR  {item.amount}
              </Text>
              <View style={{ marginTop: "auto" }}>
                <Text style={styles.subheading2}>Description: </Text>
                <Text numberOfLines={1} style={{ fontWeight: "600" }}>
                  {item.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                paddingRight: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => deleteHandler(item)}>
                <Image source={require(`../assets/delete.png`)}></Image>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 25 }}>
                <Image source={require(`../assets/edit.png`)}></Image>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    backgroundColor: "#000000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  spentCard: {
    marginTop: 30,
    height: 200,
    width: "95%",
    backgroundColor: "#5C2E7E",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  subheading: {
    color: "#EEEEEE",
    textAlign: "center",
    opacity: 0.5,
  },
  subheading2: {
    color: "#000000",
    opacity: 0.5,
  },
  paisa: {
    fontSize: 60,
    textAlign: "center",
    color: "#fff",
  },
  sectionTitle: {
    color: "#E6DDC4",
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 30,
    textAlign: "center",
  },
  amts: {
    height: 100,
    width: "95%",
    backgroundColor: "#8BBCCC",
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
