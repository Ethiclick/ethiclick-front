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
  const [step, setStep] = useState(1);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [siret, setSiret] = useState('');
  const [adresse, setAdresse] = useState('');
  const [urlSite, seturlSite] = useState('');

  // Gestion de l'étape du formulaire d'ajout
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !phone || !siret) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    // onAddProfessional({ name, email, phone, description });
    onDismiss(); // Ferme le modal
    // Réinitialiser le formulaire
    setName('');
    setEmail('');
    setPhone('');
    setSiret('');
    setAdresse('');
    seturlSite('');
    Alert.alert('Succès', 'Le professionnel a été ajouté avec succès !');
  };

  // TODO: récupérer les infos pour crée un user
  // Obligatoire:  email, username (nom - Raison sociale - de l'entreprise), numéro de telephone
    //! A ajouter avant l'envoi du formualire => idRole = 2
    //! mot de passe (à créer à la volée pour l'enregistrement puis à modifié par le user)
  // TODO: puis les infos pour créer le pro
    //! Site web, accèpte la cb, photos, catégories finale
  return (
    <Portal>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Title style={{textAlign:'center', marginBottom: 16}}>Trouver le Professionnel</Title>
                  {/* //! Obligatoire: siret (à vérifier avec l'API sirene ?), adresse complète (adresse + ville + cp - API ban), nom (sera le username) */}
                  {/* //! https://api.gouv.fr/documentation/sirene_v3 */}
                  <TextInput label="Nom - Raison sociale" value={name} onChangeText={setName} style={styles.input}/>
                  <TextInput label="Numéro siret" value={siret} onChangeText={setSiret} keyboardType="phone-pad" style={styles.input} maxLength={14}/>
                  <TextInput label="Adresse" value={adresse} onChangeText={setAdresse} keyboardType="default" style={styles.input}/>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <Title style={{textAlign:'center', marginBottom: 16}}>Information Entreprise</Title>
                <TextInput label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" style={styles.input} />
                <TextInput label="Numéro de téléphone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
                <TextInput label="Site internet" value={urlSite} onChangeText={seturlSite} keyboardType="url" style={styles.input}/>
              </>
            )}

            {/* TODO: faire l'étape 3 du formulaire */}

            <Button mode="contained" onPress={handleNextStep} style={styles.button}>
              {step < 3 ? 'Suivant' : 'Soumettre'}
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
