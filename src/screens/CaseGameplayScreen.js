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

import {
  getCaseById
} from "../data/cases";

import {
  evaluateCaseAnswer,
  getFeedback
} from "../engine/evaluator";

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
  const [caseData, setCaseData] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState(null);

  const [attempt, setAttempt] =
    useState(1);

  const [hintsUsed, setHintsUsed] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [hintLoading, setHintLoading] =
    useState(false);

  useEffect(() => {
    loadCase();
  }, [caseId]);

  async function loadCase() {
    setLoading(true);

    try {
      const data =
        getCaseById(caseId);

      setCaseData(data);

      const active =
        await getActiveCase();

      if (
        active?.id === caseId ||
        active?.caseId === caseId
      ) {
        const savedState =
          await getActiveCaseState();

        if (savedState) {
          setAttempt(
            Math.max(
              1,
              Number(savedState.attempt) || 1
            )
          );

          setHintsUsed(
            Math.max(
              0,
              Number(savedState.hintsUsed) || 0
            )
          );
        }
      }
    } catch (error) {
      console.error(
        "LegalMind case loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function getActiveCaseState() {
    try {
      const {
        getCaseState
      } = await import(
        "../services/caseService"
      );

      return await getCaseState();
    } catch {
      return null;
    }
  }

  function getLocalized(value) {
    if (!value) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    return (
      value?.[language] ||
      value?.pashto ||
      value?.dari ||
      value?.english ||
      ""
    );
  }

  async function handleSubmit() {
    if (
      !caseData ||
      submitting ||
      hintLoading
    ) {
      return;
    }

    const cleanAnswer =
      answer.trim();

    if (cleanAnswer.length < 10) {
      Alert.alert(
        getText("shortAnswerTitle"),
        getText("shortAnswer")
      );

      return;
    }

    setSubmitting(true);

    try {
      const result =
        evaluateCaseAnswer(
          caseData,
          cleanAnswer
        );

      if (
        result?.completed === true
      ) {
        const completed =
          await finishCase({
            role: caseData.role,
            caseId: caseData.id,
            completed: true
          });

        if (
          completed?.success === true
        ) {
          setFeedback({
            type: "success",
            message:
              getText("correct")
          });

          setTimeout(() => {
            onCompleted?.(
              completed
            );
          }, 700);

          return;
        }

        setFeedback({
          type: "hint",
          message:
            getText("saveError")
        });

        return;
      }

      await addAttempt();

      const nextAttempt =
        Math.min(
          attempt + 1,
          100
        );

      const feedbackResult =
        getFeedback(
          caseData,
          result,
          attempt
        );

      setFeedback({
        type:
          feedbackResult?.type ||
          "hint",
        message:
          feedbackResult?.message ||
          getText("wrong")
      });

      setAttempt(
        nextAttempt
      );
    } catch (error) {
      console.error(
        "LegalMind submit error:",
        error
      );

      Alert.alert(
        "LegalMind",
        getText("error")
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleHint() {
    if (
      !caseData ||
      submitting ||
      hintLoading
    ) {
      return;
    }

    setHintLoading(true);

    try {
      const hints =
        caseData.hints || {};

      const orderedHints = [
        hints.first,
        hints.second,
        hints.third
      ].filter(Boolean);

      if (
        orderedHints.length === 0
      ) {
        setFeedback({
          type: "hint",
          message:
            getText("noHint")
        });

        return;
      }

      const index =
        Math.min(
          hintsUsed,
          orderedHints.length - 1
        );

      const selected =
        orderedHints[index];

      const message =
        getLocalized(
          selected
        ) || getText("noHint");

      await addHint();

      setHintsUsed(
        (value) =>
          Math.min(
            value + 1,
            100
          )
      );

      setFeedback({
        type: "hint",
        message
      });
    } catch (error) {
      console.error(
        "LegalMind hint error:",
        error
      );

      setFeedback({
        type: "hint",
        message:
          getText("error")
      });
    } finally {
      setHintLoading(false);
    }
  }

  function getText(key) {
    const texts = {
      pashto: {
        correct:
          "سمه حقوقي پایله! قضیه بشپړه شوه.",
        wrong:
          "ځواب لا بشپړ نه دی. شواهد او حقوقي موضوع بیا وڅېړه.",
        error:
          "د ځواب د ثبت پر مهال ستونزه رامنځته شوه.",
        saveError:
          "قضیه بشپړه شوه، خو د پرمختګ د خوندي کولو پر مهال ستونزه رامنځته شوه.",
        noHint:
          "د دې قضیې لپاره نور اضافي لارښود نشته.",
        shortAnswerTitle:
          "ځواب ډېر لنډ دی",
        shortAnswer:
          "لږ نور حقوقي تحلیل ولیکه.",
        back:
          "بېرته",
        submit:
          "خپل نظر ثبت کړه",
        hint:
          "لارښود",
        analysis:
          "خپل حقوقي تحلیل ولیکه",
        story:
          "د قضیې معلومات",
        people:
          "اشخاص",
        evidence:
          "شواهد",
        issue:
          "حقوقي موضوع",
        task:
          "ستا دنده",
        attempt:
          "هڅه",
        hints:
          "لارښودونه",
        exitTitle:
          "⚠️ له قضیې څخه وتل؟",
        exitMessage:
          "ستاسې اوسنی پرمختګ به خوندي شي.",
        stay:
          "پاتې کېدل",
        exit:
          "وتل"
      },

      dari: {
        correct:
          "نتیجه حقوقی درست است! قضیه تکمیل شد.",
        wrong:
          "پاسخ هنوز کامل نیست. شواهد و موضوع حقوقی را دوباره بررسی کنید.",
        error:
          "هنگام ثبت پاسخ مشکل ایجاد شد.",
        saveError:
          "قضیه تکمیل شد، اما هنگام ذخیره پیشرفت مشکل ایجاد شد.",
        noHint:
          "برای این قضیه راهنمای اضافی وجود ندارد.",
        shortAnswerTitle:
          "پاسخ خیلی کوتاه است",
        shortAnswer:
          "لطفاً کمی تحلیل حقوقی بیشتر بنویسید.",
        back:
          "برگشت",
        submit:
          "ثبت نظر",
        hint:
          "راهنما",
        analysis:
          "تحلیل حقوقی خود را بنویسید",
        story:
          "معلومات قضیه",
        people:
          "اشخاص",
        evidence:
          "شواهد",
        issue:
          "موضوع حقوقی",
        task:
          "وظیفه شما",
        attempt:
          "تلاش",
        hints:
          "راهنماها",
        exitTitle:
          "⚠️ از قضیه خارج شوید؟",
        exitMessage:
          "پیشرفت فعلی شما ذخیره می‌شود.",
        stay:
          "ماندن",
        exit:
          "خروج"
      },

      english: {
        correct:
          "Correct legal conclusion! Case completed.",
        wrong:
          "The answer is not complete yet. Review the evidence and legal issue.",
        error:
          "There was a problem submitting the answer.",
        saveError:
          "The case was completed, but there was a problem saving progress.",
        noHint:
          "No additional hint is available.",
        shortAnswerTitle:
          "Answer too short",
        shortAnswer:
          "Write a little more legal reasoning.",
        back:
          "Back",
        submit:
          "Submit Your Opinion",
        hint:
          "Hint",
        analysis:
          "Write your legal analysis",
        story:
          "Case Information",
        people:
          "People",
        evidence:
          "Evidence",
        issue:
          "Legal Issue",
        task:
          "Your Task",
        attempt:
          "Attempt",
        hints:
          "Hints",
        exitTitle:
          "⚠️ Exit the case?",
        exitMessage:
          "Your current progress will be saved.",
        stay:
          "Stay",
        exit:
          "Exit"
      }
    };

    return (
      texts?.[language]?.[key] ||
      texts.pashto[key] ||
      ""
    );
  }

  function handleBack() {
    Alert.alert(
      getText("exitTitle"),
      getText("exitMessage"),
      [
        {
          text: getText("stay"),
          style: "cancel"
        },
        {
          text: getText("exit"),
          onPress: () => {
            onBack?.();
          }
        }
      ]
    );
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
    getLocalized(
      caseData.title
    ) || "—";

  const story =
    getLocalized(
      caseData.story
    );

  const issue =
    getLocalized(
      caseData.legalIssue
    );

  const task =
    getLocalized(
      caseData.tasks?.[
        caseData.role
      ]
    );

  const people =
    Array.isArray(
      caseData.people
    )
      ? caseData.people
      : [];

  const evidence =
    Array.isArray(
      caseData.evidence
    )
      ? caseData.evidence
      : [];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            disabled={
              submitting ||
              hintLoading
            }
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
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
        >

          <View style={styles.stats}>
            <Text style={styles.statText}>
              {getText("attempt")}:{" "}
              {attempt}
            </Text>

            <Text style={styles.statText}>
              {getText("hints")}:{" "}
              {hintsUsed}
            </Text>
          </View>

          <Section
            title={`📖 ${getText(
              "story"
            )}`}
            text={story}
          />

          {people.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                👥 {getText("people")}
              </Text>

              {people.map(
                (person, index) => (
                  <InfoCard
                    key={
                      person.id ||
                      `person-${index}`
                    }
                    title={getLocalized(
                      person.name
                    )}
                    subtitle={getLocalized(
                      person.role
                    )}
                    text={getLocalized(
                      person.statement
                    )}
                  />
                )
              )}
            </View>
          )}

          {evidence.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                📄 {getText("evidence")}
              </Text>

              {evidence.map(
                (item, index) => (
                  <InfoCard
                    key={
                      item.id ||
                      `evidence-${index}`
                    }
                    title={getLocalized(
                      item.title
                    )}
                    text={getLocalized(
                      item.content
                    )}
                  />
                )
              )}
            </View>
          )}

          <Section
            title={`⚖️ ${getText(
              "issue"
            )}`}
            text={issue}
          />

          <Section
            title={`🎯 ${getText(
              "task"
            )}`}
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
              editable={
                !submitting &&
                !hintLoading
              }
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
                style={[
                  styles.hintButton,
                  hintLoading &&
                    styles.disabledButton
                ]}
                onPress={handleHint}
                disabled={
                  submitting ||
                  hintLoading
                }
              >
                <Text style={styles.hintText}>
                  {hintLoading
                    ? "..."
                    : `💡 ${getText(
                        "hint"
                      )}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  submitting &&
                    styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={
                  submitting ||
                  hintLoading
                }
              >
                <Text style={styles.submitText}>
                  {submitting
                    ? "..."
                    : `⚖️ ${getText(
                        "submit"
                      )}`}
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {feedback && (
            <View
              style={[
                styles.feedback,
                feedback.type ===
                  "success" &&
                  styles.successFeedback,
                feedback.type ===
                  "wrong" &&
                  styles.wrongFeedback,
                feedback.type ===
                  "hint" &&
                  styles.hintFeedback,
                feedback.type ===
                  "guidance" &&
                  styles.guidanceFeedback
              ]}
            >
              <Text style={styles.feedbackTitle}>
                {feedback.type ===
                "success"
                  ? "✅"
                  : feedback.type ===
                    "guidance"
                  ? "🧭"
                  : "💡"}
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

function Section({
  title,
  text
}) {
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

function InfoCard({
  title,
  subtitle,
  text
}) {
  return (
    <View style={styles.infoCard}>

      {title ? (
        <Text style={styles.cardTitle}>
          {title}
        </Text>
      ) : null}

      {subtitle ? (
        <Text style={styles.cardSubtitle}>
          {subtitle}
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
    backgroundColor:
      COLORS.navy
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
    justifyContent:
      "space-between"
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
    justifyContent:
      "space-between",
    backgroundColor:
      "#102536",
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
    backgroundColor:
      "#102536",
    borderWidth: 1,
    borderColor:
      "#315044",
    borderRadius: 14,
    padding: 15,
    marginBottom: 9
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 5
  },

  cardSubtitle: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "700",
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
    backgroundColor:
      "#0C2232",
    borderWidth: 1,
    borderColor:
      COLORS.gold,
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
    backgroundColor:
      "#6B4718",
    alignItems: "center",
    justifyContent:
      "center"
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
    backgroundColor:
      COLORS.gold,
    alignItems: "center",
    justifyContent:
      "center",
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
    backgroundColor:
      "#123D2B",
    borderColor:
      COLORS.success
  },

  wrongFeedback: {
    backgroundColor:
      "#3A1818",
    borderColor:
      COLORS.danger
  },

  hintFeedback: {
    backgroundColor:
      "#3D2C12",
    borderColor:
      COLORS.warning
  },

  guidanceFeedback: {
    backgroundColor:
      "#163047",
    borderColor:
      COLORS.info
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
    justifyContent:
      "center"
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