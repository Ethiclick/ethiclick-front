import React, { useState } from 'react';
import { StyleSheet, View, Alert, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Portal, Text, Provider as PaperProvider } from 'react-native-paper';

export default function AddProfessionalForm({
  visible,
  onDismiss,
  onAddProfessional,
}: {
  visible: boolean | undefined;
  onDismiss: () => void;
  onAddProfessional: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !phone || !description) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // onAddProfessional({ name, email, phone, description });
    onDismiss(); // Ferme le modal
    // Réinitialiser le formulaire
    setName('');
    setEmail('');
    setPhone('');
    setDescription('');
    Alert.alert('Succès', 'Le professionnel a été ajouté avec succès !');
  };

  return (
    <Portal>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Title>Ajouter un Professionnel</Title>
            <TextInput label="Nom" value={name} onChangeText={setName} style={styles.input} />
            <TextInput label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
            <TextInput label="Numéro de téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.input}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Ajouter
            </Button>
            <TouchableOpacity onPress={onDismiss} style={styles.cancelButton}>
              <Text>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
});
