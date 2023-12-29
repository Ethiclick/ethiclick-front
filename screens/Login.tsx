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
import { login, useAppDispatch, setUser } from '../store';
import HelperMessage from '../components/HelperMessage';
import { postData } from '../utils/fetch';
// import ToastMessage from '../components/ToastMessage';
// import { ToastColorEnum } from '../@types/toast.d';

type FormData = {
  email: string;
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
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = async (data: { email: string; password: string }) => {
    console.log(data);
    const loginData = await postData('login', data);
    console.log(loginData);
    if (loginData.errors) {
      return alert(loginData.errors[0].message);
    }

    dispatch(setUser({ email: data.email, token: loginData.token }));
    dispatch(login());
    navigation.navigate('Accueil' as never);
    return true;
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
              <TextInput style={styles.input} mode="outlined" placeholder="E-mail" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="email"
          />
          {errors.email && <HelperMessage type="error" message="Ce champ est requis." />}

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
            disabled={errors.email !== undefined || errors.password !== undefined}
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
