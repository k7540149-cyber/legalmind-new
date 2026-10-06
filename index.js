import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETUP_COMPLETE = "@legalmind/setup_complete";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    loadApp();
  }, []);

  async function loadApp() {
    try {
      const value = await AsyncStorage.getItem(SETUP_COMPLETE);
      setSetupComplete(value === "true");
    } catch (error) {
      Alert.alert(
        "LegalMind",
        "د اپلیکیشن د معلوماتو په لوستلو کې ستونزه رامنځته شوه."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.logo}>⚖️</Text>
        <Text style={styles.title}>LegalMind</Text>
        <Text style={styles.subtitle}>Learn • Analyze • Decide</Text>
        <ActivityIndicator
          size="large"
          color="#D4AF37"
          style={styles.loader}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.center}>
        <Text style={styles.logo}>⚖️</Text>

        <Text style={styles.title}>LegalMind</Text>

        <Text style={styles.subtitle}>
          Learn • Analyze • Decide
        </Text>

        <Text style={styles.status}>
          {setupComplete
            ? "ستاسې پروفایل چمتو دی."
            : "د LegalMind د جوړولو لومړی پړاو"}
        </Text>
      </View>

      <Text style={styles.version}>LegalMind • v1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071827",
  },

  loading: {
    flex: 1,
    backgroundColor: "#071827",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 64,
    marginBottom: 14,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  subtitle: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },

  status: {
    color: "#B8C2CC",
    fontSize: 15,
    textAlign: "center",
    marginTop: 30,
  },

  loader: {
    marginTop: 28,
  },

  version: {
    color: "#7F8C98",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
});
