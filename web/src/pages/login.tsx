import React from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";

// urql
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

// utils
import { toErrorMap } from "../utils/toErrorsMap";

// components
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

// graphql-codegen
import { useLoginMutation } from "../generated/graphql";

type registerProps = {};

const Login: React.FC<registerProps> = () => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (value, { setErrors }) => {
          const response = await login(value);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
              autoComplete="on"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                autoComplete="off"
              />
            </Box>
            <Button
              type="submit"
              variantColor="blue"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
