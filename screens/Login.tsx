import React from 'react';
import { View, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput } from 'react-native-paper';
import { login, useAppDispatch, setUser } from '../store';
import HelperMessage from '../components/HelperMessage';
import { postData } from '../utils/fetch';
import LoginPNG from '../assets/login.png';

type FormData = {
  email: string;
  password: string;
};

const styles = StyleSheet.create({
  container: { flex: 1, height: '100%' },
  inner: {
    padding: 24,
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  input: { marginVertical: 5 },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginTop: 15,
  },
});

export default function Login() {
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
  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: { email: string; password: string }) => {
    const loginData = await postData('users/login', data);

    if (loginData instanceof Error) {
      return Alert.alert(loginData.message);
    }

    if (loginData.errors) {
      return Alert.alert(loginData.errors[0].message);
    }

    dispatch(setUser({ email: data.email, token: loginData.token }));
    dispatch(login());
  };
  const [secure, setSecure] = React.useState(true);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <ImageBackground source={LoginPNG} style={styles.backgroundImage}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  error={!!errors.email}
                  style={styles.input}
                  mode="outlined"
                  placeholder="E-mail"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoComplete="off"
                />
              )}
              name="email"
            />
            {errors.email && <HelperMessage type="error" message="Ce champ est requis" />}

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
                  error={!!errors.password}
                />
              )}
              name="password"
            />
            {errors.password && <HelperMessage type="error" message="Ce champ est requis." />}
            <View style={styles.btnContainer}>
              <Button
                mode="contained-tonal"
                compact
                disabled={errors.email !== undefined || errors.password !== undefined}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={handleSubmit(onSubmit)}
              >
                Se connecter
              </Button>
              <Button
                mode="contained-tonal"
                compact
                disabled={errors.email !== undefined || errors.password !== undefined}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onPress={() => {
                  console.log('Register');
                }}
              >
                S&apos;inscrire
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
