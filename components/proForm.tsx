import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Portal, Text, Provider as PaperProvider } from 'react-native-paper';

interface DataSiret {
  etablissement: Etablissement;
}
interface Etablissement {
  uniteLegale: UniteLegale;
  adresseEtablissement: AdresseEtablissement,
  siret: String,
}
interface AdresseEtablissement {
  numeroVoieEtablissement: String,
  typeVoieEtablissement: String,
  libelleVoieEtablissement: String,
  codePostalEtablissement: String,
  libelleCommuneEtablissement: String,
}
interface UniteLegale {
  denominationUniteLegale: string;
}
interface dataName {
  etablissements: Etablissement;
}

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

  // Récupération donnée via le Siret
  const [dataSiret, setDataSiret] = useState<DataSiret | null>(null);
  // Récupération des données via le Nom/Raison Sociale
  const [dataName, setDataName] = useState<dataName | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // URL de l'API que tu veux appeler
    const API_SIREN_URL = 'https://api.insee.fr/entreprises/sirene/V3.11/siret/81463818500037';
    // TODO: rendre dynamique le token => durée 1 semaine
    const TOKEN = '6a1ac16f-222f-3832-bc18-943c592dcd81';
    // Appel à l'API
    fetch(API_SIREN_URL,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`, // Ajout du Bearer Token dans l'en-tête Authorization
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((json: DataSiret) => {
      setDataSiret(json); // Enregistre les données récupéré
      setLoading(false); // Le chargement est terminé
    })
    .catch((err) => {
      setError(err); // Enregistre l'erreur en cas de problème
      setLoading(false); // Le chargement est terminé
    });

// TODO: on récupère également les siret des entreprise otsokop qui sont fermé !! à trié / voir si on peux filtrer par l'API
    // ! Requete qui filtre par nom + ville et exclu les établissement fermé!
    // https://api.insee.fr/entreprises/sirene/V3.11/siret?q=periode(etatAdministratifEtablissement:A) AND denominationUniteLegale:otsokop AND libelleCommuneEtablissement:bayonne
    fetch ("https://api.insee.fr/entreprises/sirene/V3.11/siret?q=periode(etatAdministratifEtablissement:A) AND denominationUniteLegale:otsokop AND libelleCommuneEtablissement:bayonne", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`, // Ajout du Bearer Token dans l'en-tête Authorization
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json()) // Convertir la réponse en JSON
    .then((json: dataName) => {
      setDataName(json); // Enregistre les données récupéré
      setLoading(false); // Le chargement est terminé
    })
    .catch((err) => {
      setError(err); // Enregistre l'erreur en cas de problème
      setLoading(false); // Le chargement est terminé
    });

  }, []);


  const findPro = () => {
    if (!siret && !adresse && !name) {
      Alert.alert('Erreur', 'Veuillez renseigner au moins un des champs');
      return;
    }

    // Si on à renseigné le siret
    if (siret) {
      if (loading) {
        // TODO: mettre un spinner
        // TODO: et le retirer une fois terminé
        return Alert.alert('Chargement en cours'); // Afficher un message de chargement
      }
      if (error) {
        return Alert.alert('Erreur lors de la récupération du professionnel', error.message); // Afficher un message d'erreur
      }
      // On récupère la dénomination légale (le nom de l'entreprise)
      const DENOMINATION = dataSiret?.etablissement?.uniteLegale.denominationUniteLegale || '';
      setName(DENOMINATION);

      // Et l'adresse
      const ADRESSE_ETABLISSEMENT = dataSiret?.etablissement?.adresseEtablissement;
      const ADRESSE = `${ADRESSE_ETABLISSEMENT?.numeroVoieEtablissement} ${ADRESSE_ETABLISSEMENT?.typeVoieEtablissement} ${ADRESSE_ETABLISSEMENT?.libelleVoieEtablissement}, ${ADRESSE_ETABLISSEMENT?.codePostalEtablissement} ${ADRESSE_ETABLISSEMENT?.libelleCommuneEtablissement}`;
      setAdresse(ADRESSE);
    }
    if (name) {
      console.log(name);

      console.log(dataName);
      // TODO: ici on récupère pas le siret !!!!!
      console.log(dataName?.etablissements.siret);
    }
    // console.log(adresse);
  }
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

  // Infos pour crée un user
  // Obligatoire:  email, username (nom - Raison sociale - de l'entreprise), numéro de telephone
    //! A ajouter avant l'envoi du formualire => idRole = 2
    //! mot de passe (à créer à la volée pour l'enregistrement puis à modifié par le user)
  // Infos pour créer le pro
    //  Obligatoire: siret ou raison social, adresse
    //! Site web, accèpte la cb, photos, catégories finale, siret
  return (
    <Portal>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <Title style={{ textAlign: 'center', marginBottom: 5 }}>Trouver un Professionnel</Title>
                <Text style={{ fontSize: 16, color: 'gray', marginBottom: 15, margin:'auto' }}>Veuillez saisir au moins une de ces informations pour lancer la recherche</Text>
                  {/* //! Obligatoire: siret (à vérifier avec l'API sirene ?), adresse complète (adresse + ville + cp - API ban), nom (sera le username) */}
                  {/* //! https://api.gouv.fr/documentation/sirene_v3 */}
                  <TextInput label="Nom - Raison sociale" value={name} onChangeText={setName} style={styles.input}/>
                  <TextInput label="Numéro siret" value={siret} onChangeText={setSiret} keyboardType="phone-pad" style={styles.input} maxLength={14}/>
                  <TextInput label="Adresse" value={adresse} onChangeText={setAdresse} keyboardType="default" style={styles.input}/>

                  <Button mode="contained" onPress={findPro} style={styles.button}>
                    Rechercher
                  </Button>
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
