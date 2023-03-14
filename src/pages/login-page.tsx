import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage,
    useToast,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { LoginFormInput } from '../app-types/login-form-input.type';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch } from '../redux-toolkit/hooks';
import { loginThunk } from '../redux-toolkit/auth/auth-slice';
import { LoginErrorResponse } from '../app-types/login.type';
import { useNavigate } from 'react-router-dom';
  
  export default function LoginPage() {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // schema validation
    const schema = yup.object().shape({
        email: yup.string().required('ป้อนข้อมูลอีเมล์ด้วย').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
        password: yup.string().required('ป้อนข้อมูลรหัสผ่านด้วย').min(3, 'รหัสผ่านต้องอย่างน้อย 3 ตัวอักษรขึ้นไป'),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInput>({
      resolver: yupResolver(schema),
      mode: 'all'
    });

    const onSubmit = async (data: LoginFormInput) => {

       try {
         const result = await dispatch(loginThunk(data)).unwrap();
        //  console.log(result.access_token);
        if (result.access_token) {
          navigate('/dashboard');
        }

       } catch (error: any) {
         let err: LoginErrorResponse = error;
         toast({
          title: 'ผลการทำงาน',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        }); 
       } 

    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>ลงชื่อเข้าใช้งาน</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isInvalid={errors.email ? true : false}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email") } />
                <FormErrorMessage>
                  { errors.email && errors.email?.message }
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password ? true : false}>
                <FormLabel>Password</FormLabel>
                <Input type="password" {...register("password") } />
                <FormErrorMessage>
                  { errors.password && errors.password?.message }
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  isLoading={isSubmitting}
                  loadingText='กำลังเข้าระบบ...'
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Log In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
    );
  }