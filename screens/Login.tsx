/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import type { NavigationProp } from '@react-navigation/native';
import { login, useAppDispatch } from '../store';
import HelperMessage from '../components/HelperMessage';
// import ToastMessage from '../components/ToastMessage';
// import { ToastColorEnum } from '../@types/toast.d';

type FormData = {
  username: string;
  password: string;
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
  input: { marginVertical: 5 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  login: {
    marginTop: 10,
  },
});

export default function Login({ navigation }: { navigation: NavigationProp<ReactNavigation.RootParamList> }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: unknown) => {
    console.log(data);
    dispatch(login());
    navigation.navigate('Accueil' as never);
  };
  const [secure, setSecure] = React.useState(true);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        {/* <ToastMessage msg="test" duration={0} type={ToastColorEnum.Error} /> */}
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Nom d'utilisateur / e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && <HelperMessage type="error" message="Ce champ est requis." />}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                mode="outlined"
                placeholder="Mot de passe"
                secureTextEntry={secure}
                textContentType="password"
                right={<TextInput.Icon icon="eye" onPress={() => setSecure(!secure)} />}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {errors.password && <HelperMessage type="error" message="Ce champ est requis." />}
          <Button
            mode="contained-tonal"
            compact
            disabled={errors.username !== undefined || errors.password !== undefined}
            style={styles.login}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onPress={handleSubmit(onSubmit)}
          >
            Se connecter
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
