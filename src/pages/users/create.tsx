import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import * as yup from 'yup';

import { Header, Input, Sidebar } from '../../components';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type createUserFormData = {
  name: string;
  email: string;
  password: string;
  passord_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().required('E-mail is required').email('Invalid e-mail'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Minimum 6 characters '),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'Passoword confirmation is invalid'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: createUserFormData) => {
      const response = api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['users']);
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<createUserFormData> = async values => {
    await createUser.mutateAsync(values);
    router.push('/users');
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} px="6">
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
          as="form">
          <Heading size="lg" fontWeight="normal">
            Register new user
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="name"
                label="FullName"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="password"
                type="password"
                label="Password"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirm Password"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
                Save
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
