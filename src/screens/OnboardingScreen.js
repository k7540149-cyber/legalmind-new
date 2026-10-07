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
  View,
} from "react-native";

import { COLORS } from "../constants/app";
import { completeSetup } from "../services/profileService";

export default function OnboardingScreen({
  language = "pashto",
  onComplete,
}) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const text =
    language === "english"
      ? {
          welcome: "Create your profile",
          description:
            "Enter the three details below to get started.",
          name: "Name",
          namePlaceholder: "Enter your name",
          surname: "Surname",
          surnamePlaceholder: "Enter your surname",
          email: "Email",
          emailPlaceholder: "example@email.com",
          continue: "Continue →",
          saving: "Saving...",
          footer:
            "Your information will be stored on this device.",
          error:
            "Please complete the required information.",
          saveError:
            "There was a problem saving your information.",
        }
      : language === "dari"
      ? {
          welcome: "پروفایل خود را بسازید",
          description:
            "برای شروع، سه معلومات زیر را وارد کنید.",
          name: "نام",
          namePlaceholder: "نام خود را وارد کنید",
          surname: "تخلص",
          surnamePlaceholder: "تخلص خود را وارد کنید",
          email: "ایمیل",
          emailPlaceholder: "example@email.com",
          continue: "ادامه →",
          saving: "در حال ثبت...",
          footer:
            "معلومات شما در دستگاه ذخیره می‌شود.",
          error:
            "لطفاً معلومات لازم را کامل کنید.",
          saveError:
            "هنگام ذخیره معلومات مشکلی ایجاد شد.",
        }
      : {
          welcome: "خپل پروفایل جوړ کړئ",
          description:
            "د پیل لپاره لاندې درې معلومات ولیکئ.",
          name: "نوم",
          namePlaceholder: "خپل نوم ولیکئ",
          surname: "تخلص",
          surnamePlaceholder: "خپل تخلص ولیکئ",
          email: "ایمیل",
          emailPlaceholder: "example@email.com",
          continue: "دوام →",
          saving: "ثبتېږي...",
          footer:
            "ستاسې معلومات به په وسیله کې خوندي شي.",
          error:
            "مهرباني وکړئ اړین معلومات بشپړ کړئ.",
          saveError:
            "د معلوماتو د ثبت پر مهال ستونزه رامنځته شوه.",
        };

  async function handleContinue() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await completeSetup({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
      });

      if (!result?.success) {
        const errors =
          result?.errors &&
          typeof result.errors === "object"
            ? result.errors
            : {};

        const firstError =
          Object.values(errors).find(
            (value) =>
              typeof value === "string" &&
              value.trim()
          );

        Alert.alert(
          "LegalMind",
          firstError || text.error
        );

        return;
      }

      if (typeof onComplete === "function") {
        onComplete(result.profile);
      }
    } catch (error) {
      console.error(
        "LegalMind onboarding error:",
        error
      );

      Alert.alert(
        "LegalMind",
        text.saveError
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
          showsVerticalScrollIndicator={false}
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
              {text.welcome}
            </Text>

            <Text style={styles.description}>
              {text.description}
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>
              {text.name}
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={text.namePlaceholder}
              placeholderTextColor="#7F8C98"
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              editable={!loading}
            />

            <Text style={styles.label}>
              {text.surname}
            </Text>

            <TextInput
              value={surname}
              onChangeText={setSurname}
              placeholder={text.surnamePlaceholder}
              placeholderTextColor="#7F8C98"
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              editable={!loading}
            />

            <Text style={styles.label}>
              {text.email}
            </Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder={text.emailPlaceholder}
              placeholderTextColor="#7F8C98"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              editable={!loading}
              onSubmitEditing={handleContinue}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleContinue}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading
                  ? text.saving
                  : text.continue}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            {text.footer}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  flex: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    fontSize: 54,
    marginBottom: 10,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
  },

  tagline: {
    color: COLORS.gold,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 6,
  },

  welcome: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 30,
    textAlign: "center",
  },

  description: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },

  form: {
    width: "100%",
  },

  label: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 8,
    marginTop: 14,
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
    fontSize: 16,
  },

  button: {
    minHeight: 54,
    backgroundColor: COLORS.gold,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: "900",
  },

  footer: {
    color: "#7F8C98",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 22,
  },
});