import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { FormHeader } from '@/components/form-header';
import { LinkedInImportCard } from '@/components/linkedin-import-card';
import { SelectChip } from '@/components/select-chip';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Radius, Spacing } from '@/constants/theme';
import { LinkedInImportData } from '@/data/linkedin-mock';
import { useTheme } from '@/hooks/use-theme';
import { useAppState } from '@/state/app-context';

const SKILL_OPTIONS = [
  'Figma',
  'Design Systems',
  'User Research',
  'Prototyping',
  'React',
  'Accessibility',
  'Motion Design',
];

export default function EditProfileScreen() {
  const theme = useTheme();
  const { role, myProfile, updateMyProfile, updatePromptAnswer, linkedinVerified, setLinkedinVerified } =
    useAppState();
  const [name, setName] = useState(myProfile.name);
  const [title, setTitle] = useState(myProfile.title);
  const [company, setCompany] = useState(myProfile.company ?? '');
  const [location, setLocation] = useState(myProfile.location);
  const [bio, setBio] = useState(myProfile.bio);
  const [skills, setSkills] = useState<string[]>(myProfile.skills);

  function toggleSkill(skill: string) {
    setSkills((current) =>
      current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill],
    );
  }

  function handleLinkedInUse(data: LinkedInImportData) {
    setTitle(data.title);
    if (data.company) setCompany(data.company);
    setBio(data.bio);
    setSkills(data.skills);
    setLinkedinVerified(true);
  }

  function handleSave() {
    updateMyProfile({
      name,
      title,
      company: role === 'recruiter' ? company : undefined,
      location,
      bio,
      skills,
    });
    router.back();
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <FormHeader title="Edit Profile" onAction={handleSave} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarRow}>
          <View>
            <Avatar name={name} colors={myProfile.avatarColor} photoUrl={myProfile.photoUrl} size={96} />
            <View style={[styles.cameraBadge, { backgroundColor: theme.primary, borderColor: theme.background }]}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <Field label="Name" value={name} onChangeText={setName} />
        <Field label={role === 'seeker' ? 'Title' : 'Your title'} value={title} onChangeText={setTitle} />
        {role === 'recruiter' && <Field label="Company" value={company} onChangeText={setCompany} />}
        <Field label="Location" value={location} onChangeText={setLocation} />
        <Field label="About" value={bio} onChangeText={setBio} multiline />

        <View style={styles.section}>
          <ThemedText type="label" themeColor="textTertiary" style={styles.sectionTitle}>
            Experience
          </ThemedText>
          {linkedinVerified ? (
            <View style={[styles.verifiedRow, { backgroundColor: theme.success + '1F' }]}>
              <Ionicons name="checkmark-circle" size={18} color={theme.success} />
              <ThemedText type="smallBold" style={{ color: theme.success }}>
                Verified via LinkedIn
              </ThemedText>
            </View>
          ) : (
            <LinkedInImportCard onUse={handleLinkedInUse} />
          )}
        </View>

        {role === 'seeker' && (
          <View style={styles.section}>
            <ThemedText type="label" themeColor="textTertiary" style={styles.sectionTitle}>
              Skills
            </ThemedText>
            <View style={styles.chipRow}>
              {SKILL_OPTIONS.map((skill) => (
                <SelectChip key={skill} label={skill} selected={skills.includes(skill)} onPress={() => toggleSkill(skill)} />
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <ThemedText type="label" themeColor="textTertiary" style={styles.sectionTitle}>
            Prompts
          </ThemedText>
          {myProfile.prompts.map((prompt, index) => (
            <View key={prompt.question} style={[styles.promptCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                {prompt.question}
              </ThemedText>
              <TextInput
                value={prompt.answer}
                onChangeText={(text) => updatePromptAnswer(index, text)}
                multiline
                style={[styles.promptInput, { color: theme.text }]}
                placeholderTextColor={theme.textTertiary}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
};

function Field({ label, value, onChangeText, multiline }: FieldProps) {
  const theme = useTheme();

  return (
    <View style={styles.field}>
      <ThemedText type="label" themeColor="textTertiary" style={styles.sectionTitle}>
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          { backgroundColor: theme.backgroundElement, color: theme.text },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    gap: Spacing.four,
    paddingBottom: Spacing.six,
  },
  avatarRow: {
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  field: {
    gap: Spacing.two,
  },
  sectionTitle: {
    marginLeft: 2,
  },
  input: {
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    fontSize: 16,
  },
  inputMultiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  section: {
    gap: Spacing.two,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  promptCard: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  promptInput: {
    fontSize: 15,
    lineHeight: 21,
  },
});
