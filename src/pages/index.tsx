import { Flex, Button, Stack } from '@chakra-ui/react';
import { Input } from '../components';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SingInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail is required').email('Invalid e-mail'),
  password: yup.string().required('Password is required'),
})

export default function Home() {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SingInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            name="email" 
            label="E-mail" 
            type="email" 
            error={errors.email}
            {...register('email', { 
              required: 'E-mail is required'
            })}
          />
          <Input 
            name="password" 
            label="Password" 
            type="password" 
            error={errors.password}
            {...register('password',{
              required: 'Password is required'
            })}
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={isSubmitting}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}
