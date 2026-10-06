import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { COLORS } from "../constants/app";
import { getCaseById } from "../data/cases";
import { evaluateCaseAnswer } from "../engine/evaluator";
import {
  getActiveCase,
  addAttempt,
  addHint,
  finishCase
} from "../services/caseService";

export default function CaseGameplayScreen({
  caseId,
  language = "pashto",
  onBack,
  onCompleted
}) {
  const [caseData, setCaseData] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [attempt, setAttempt] = useState(1);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCase();
  }, [caseId]);

  async function loadCase() {
    try {
      const data = getCaseById(caseId);
      setCaseData(data);

      const active = await getActiveCase();

      if (active?.caseId === caseId) {
        setAttempt(
          Math.max(1, active.attempt || 1)
        );
        setHintsUsed(
          active.hintsUsed || 0
        );
      }
    } finally {
      setLoading(false);
    }
  }

  function getLocalized(value) {
    if (!value) return "";

    return (
      value?.[language] ||
      value?.pashto ||
      value
    );
  }

  async function handleSubmit() {
    if (!caseData || submitting) return;

    const cleanAnswer = answer.trim();

    if (cleanAnswer.length < 10) {
      Alert.alert(
        language === "english"
          ? "Answer too short"
          : language === "dari"
          ? "پاسخ خیلی کوتاه است"
          : "ځواب ډېر لنډ دی",
        language === "english"
          ? "Write a little more legal reasoning."
          : language === "dari"
          ? "لږ نور حقوقي تحلیل ولیکئ."
          : "لږ نور حقوقي تحلیل ولیکه."
      );
      return;
    }

    setSubmitting(true);

    try {
      const result = evaluateCaseAnswer(
        caseData,
        cleanAnswer,
        attempt
      );

      if (result?.correct) {
        const completed = await finishCase({
          role: caseData.role,
          caseId: caseData.id,
          attempt,
          hintsUsed
        });

        setFeedback({
          type: "success",
          message:
            result.feedback ||
            getText("correct")
        });

        setTimeout(() => {
          onCompleted?.(completed);
        }, 700);

        return;
      }

      await addAttempt();

      setFeedback({
        type: "wrong",
        message:
          result?.feedback ||
          getText(
            attempt >= 3
              ? "fullHint"
              : "wrong"
          )
      });

      setAttempt((value) => value + 1);
    } catch (error) {
      Alert.alert(
        "LegalMind",
        getText("error")
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleHint() {
    if (!caseData) return;

    const nextHint =
      getHint(caseData, hintsUsed);

    await addHint();

    setHintsUsed(
      (value) => value + 1
    );

    setFeedback({
      type: "hint",
      message: nextHint
    });
  }

  function getHint(data, used) {
    const hints = data.hints || [];

    if (hints.length === 0) {
      return getText("noHint");
    }

    const selected =
      hints[Math.min(
        used,
        hints.length - 1
      )];

    return getLocalized(selected);
  }

  function getText(key) {
    const texts = {
      pashto: {
        correct:
          "سمه حقوقي پایله! قضیه بشپړه شوه.",
        wrong:
          "ځواب لا بشپړ نه دی. شواهد او حقوقي موضوع بیا وڅېړه.",
        fullHint:
          "د قضیې مهم حقایق، شواهد او حقوقي اصل یو له بل سره وتړه.",
        error:
          "د ځواب د ثبت پر مهال ستونزه رامنځته شوه.",
        noHint:
          "د دې قضیې لپاره نور اضافي لارښود نشته.",
        back: "بېرته",
        submit: "خپل نظر ثبت کړه",
        hint: "لارښود",
        analysis:
          "خپل حقوقي تحلیل ولیکه",
        story:
          "د قضیې معلومات",
        people: "اشخاص",
        evidence: "شواهد",
        issue: "حقوقي موضوع",
        task: "ستا دنده",
        attempt: "هڅه",
        hints: "لارښودونه"
      },

      dari: {
        correct:
          "نتیجه حقوقی درست است! قضیه تکمیل شد.",
        wrong:
          "پاسخ هنوز کامل نیست. شواهد و موضوع حقوقی را دوباره بررسی کنید.",
        fullHint:
          "حقایق مهم، شواهد و اصل حقوقی را با هم ارتباط دهید.",
        error:
          "هنگام ثبت پاسخ مشکل ایجاد شد.",
        noHint:
          "برای این قضیه راهنمای اضافی وجود ندارد.",
        back: "برگشت",
        submit: "ثبت نظر شما",
        hint: "راهنما",
        analysis:
          "تحلیل حقوقی خود را بنویسید",
        story:
          "معلومات قضیه",
        people: "اشخاص",
        evidence: "شواهد",
        issue: "موضوع حقوقی",
        task: "وظیفه شما",
        attempt: "تلاش",
        hints: "راهنماها"
      },

      english: {
        correct:
          "Correct legal conclusion! Case completed.",
        wrong:
          "The answer is not complete yet. Review the evidence and legal issue.",
        fullHint:
          "Connect the key facts, evidence, and legal principle.",
        error:
          "There was a problem submitting the answer.",
        noHint:
          "No additional hint is available.",
        back: "Back",
        submit: "Submit Your Opinion",
        hint: "Hint",
        analysis:
          "Write your legal analysis",
        story:
          "Case Information",
        people: "People",
        evidence: "Evidence",
        issue: "Legal Issue",
        task: "Your Task",
        attempt: "Attempt",
        hints: "Hints"
      }
    };

    return texts[language]?.[key] ||
      texts.pashto[key];
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.loading}>
            ...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!caseData) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.empty}>
            قضیه پیدا نه شوه.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const title =
    getLocalized(caseData.title) ||
    "—";

  const story =
    getLocalized(caseData.story);

  const issue =
    getLocalized(caseData.legalIssue);

  const task =
    getLocalized(caseData.roleTask);

  const people =
    caseData.people || [];

  const evidence =
    caseData.evidence || [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              Alert.alert(
                "⚠️",
                language === "english"
                  ? "Exit the case? Your current progress will be saved."
                  : language === "dari"
                  ? "از قضیه خارج شوید؟ پیشرفت فعلی شما ذخیره می‌شود."
                  : "له قضیې څخه وتل؟ ستاسې اوسنی پرمختګ به خوندي شي.",
                [
                  {
                    text:
                      language === "english"
                        ? "Stay"
                        : language === "dari"
                        ? "ماندن"
                        : "پاتې کېدل",
                    style: "cancel"
                  },
                  {
                    text:
                      language === "english"
                        ? "Exit"
                        : language === "dari"
                        ? "خروج"
                        : "وتل",
                    onPress: onBack
                  }
                ]
              );
            }}
          >
            <Text style={styles.backIcon}>
              ‹
            </Text>

            <Text style={styles.backText}>
              {getText("back")}
            </Text>
          </TouchableOpacity>

          <Text
            numberOfLines={1}
            style={styles.headerTitle}
          >
            ⚖️ {title}
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          <View style={styles.stats}>
            <Text style={styles.statText}>
              {getText("attempt")}: {attempt}
            </Text>

            <Text style={styles.statText}>
              {getText("hints")}: {hintsUsed}
            </Text>
          </View>

          <Section
            title={`📖 ${getText("story")}`}
            text={story}
          />

          {people.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👥 {getText("people")}
              </Text>

              {people.map((person, index) => (
                <InfoCard
                  key={person.id || index}
                  title={getLocalized(
                    person.name
                  )}
                  text={getLocalized(
                    person.statement
                  )}
                />
              ))}
            </View>
          )}

          {evidence.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                📄 {getText("evidence")}
              </Text>

              {evidence.map((item, index) => (
                <InfoCard
                  key={item.id || index}
                  title={getLocalized(
                    item.name
                  )}
                  text={getLocalized(
                    item.description
                  )}
                />
              ))}
            </View>
          )}

          <Section
            title={`⚖️ ${getText("issue")}`}
            text={issue}
          />

          <Section
            title={`🎯 ${getText("task")}`}
            text={task}
          />

          <View style={styles.answerSection}>
            <Text style={styles.sectionTitle}>
              ✍️ {getText("analysis")}
            </Text>

            <TextInput
              value={answer}
              onChangeText={setAnswer}
              multiline
              textAlignVertical="top"
              placeholder={
                language === "english"
                  ? "Write your legal reasoning here..."
                  : language === "dari"
                  ? "تحلیل حقوقی خود را اینجا بنویسید..."
                  : "خپل حقوقي استدلال دلته ولیکه..."
              }
              placeholderTextColor="#71808C"
              style={styles.input}
            />

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.hintButton}
                onPress={handleHint}
                disabled={submitting}
              >
                <Text style={styles.hintText}>
                  💡 {getText("hint")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  submitting &&
                    styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                <Text style={styles.submitText}>
                  {submitting
                    ? "..."
                    : `⚖️ ${getText("submit")}`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {feedback && (
            <View
              style={[
                styles.feedback,
                feedback.type === "success" &&
                  styles.successFeedback,
                feedback.type === "wrong" &&
                  styles.wrongFeedback,
                feedback.type === "hint" &&
                  styles.hintFeedback
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {feedback.type === "success"
                  ? "✅"
                  : feedback.type === "hint"
                  ? "💡"
                  : "⚠️"}
              </Text>

              <Text style={styles.feedbackText}>
                {feedback.message}
              </Text>
            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Section({ title, text }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <View style={styles.infoCard}>
        <Text style={styles.cardText}>
          {text || "—"}
        </Text>
      </View>
    </View>
  );
}

function InfoCard({ title, text }) {
  return (
    <View style={styles.infoCard}>
      {title ? (
        <Text style={styles.cardTitle}>
          {title}
        </Text>
      ) : null}

      {text ? (
        <Text style={styles.cardText}>
          {text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.navy
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10
  },

  header: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  backButton: {
    minWidth: 80,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center"
  },

  backIcon: {
    color: COLORS.gold,
    fontSize: 34,
    lineHeight: 36
  },

  backText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700"
  },

  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center"
  },

  headerSpace: {
    width: 80
  },

  content: {
    paddingTop: 10,
    paddingBottom: 35
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#102536",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 15
  },

  statText: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "800"
  },

  section: {
    marginBottom: 16
  },

  sectionTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 9
  },

  infoCard: {
    backgroundColor: "#102536",
    borderWidth: 1,
    borderColor: "#315044",
    borderRadius: 14,
    padding: 15,
    marginBottom: 9
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6
  },

  cardText: {
    color: COLORS.lightGray,
    fontSize: 14,
    lineHeight: 22
  },

  answerSection: {
    marginTop: 3,
    marginBottom: 15
  },

  input: {
    minHeight: 180,
    backgroundColor: "#0C2232",
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 14,
    padding: 15,
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 23
  },

  actions: {
    marginTop: 11,
    flexDirection: "row",
    gap: 10
  },

  hintButton: {
    flex: 0.35,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: "#6B4718",
    alignItems: "center",
    justifyContent: "center"
  },

  hintText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800"
  },

  submitButton: {
    flex: 0.65,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },

  submitText: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center"
  },

  disabledButton: {
    opacity: 0.55
  },

  feedback: {
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1
  },

  successFeedback: {
    backgroundColor: "#123D2B",
    borderColor: COLORS.success
  },

  wrongFeedback: {
    backgroundColor: "#3A1818",
    borderColor: COLORS.danger
  },

  hintFeedback: {
    backgroundColor: "#3D2C12",
    borderColor: COLORS.warning
  },

  feedbackTitle: {
    fontSize: 24,
    marginBottom: 7
  },

  feedbackText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 22
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  loading: {
    color: COLORS.gold,
    fontSize: 25
  },

  empty: {
    color: COLORS.lightGray,
    fontSize: 16
  }
});