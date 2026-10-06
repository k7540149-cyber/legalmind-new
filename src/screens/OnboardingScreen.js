import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import {
  completeSetup
} from "../services/profileService";

import {
  COLORS
} from "../constants/app";

export default function OnboardingScreen({
  onComplete
}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await completeSetup({
        name,
        surname,
        email
      });

      if (!result.success) {
        const firstError =
          Object.values(result.errors || {})[0];

        Alert.alert(
          "LegalMind",
          firstError ||
            "مهرباني وکړئ معلومات بشپړ کړئ."
        );

        return;
      }

      if (typeof onComplete === "function") {
        onComplete(result.profile);
      }
    } catch (error) {
      Alert.alert(
        "LegalMind",
        "د معلوماتو د ثبت پر مهال ستونزه رامنځته شوه."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.logo}>⚖️</Text>

            <Text style={styles.title}>
              LegalMind
            </Text>

            <Text style={styles.tagline}>
              Learn • Analyze • Decide
            </Text>

            <Text style={styles.welcome}>
              خپل پروفایل جوړ کړئ
            </Text>

            <Text style={styles.description}>
              د پیل لپاره لاندې درې معلومات ولیکئ.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>
              نوم
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="خپل نوم ولیکئ"
              placeholderTextColor="#7F8C98"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>
              تخلص
            </Text>

            <TextInput
              value={surname}
              onChangeText={setSurname}
              placeholder="خپل تخلص ولیکئ"
              placeholderTextColor="#7F8C98"
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>
              ایمیل
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@email.com"
              placeholderTextColor="#7F8C98"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.button,
                loading && styles.buttonDisabled
              ]}
              onPress={handleContinue}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading
                  ? "ثبتېږي..."
                  : "دوام →"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            ستاسې معلومات به په وسیله کې خوندي شي.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy
  },

  flex: {
    flex: 1
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center"
  },

  header: {
    alignItems: "center",
    marginBottom: 30
  },

  logo: {
    fontSize: 54,
    marginBottom: 10
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "800"
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6
  },

  welcome: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 30
  },

  description: {
    color: COLORS.lightGray,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8
  },

  form: {
    width: "100%"
  },

  label: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 14
  },

  input: {
    width: "100%",
    minHeight: 52,
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: COLORS.white,
    fontSize: 16
  },

  button: {
    minHeight: 54,
    backgroundColor: COLORS.gold,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28
  },

  buttonDisabled: {
    opacity: 0.6
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: "800"
  },

  footer: {
    color: "#7F8C98",
    fontSize: 12,
    textAlign: "center",
    marginTop: 22
  }
});