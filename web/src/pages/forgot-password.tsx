import React, { useState } from "react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC = () => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (value) => {
          await forgotPassword(value);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>Check your e-mail for reset link</Box>
          ) : (
            <Form>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                autoComplete="on"
                type="email"
              />
              <Box textAlign="right">
                <Button
                  bg="#2D3748"
                  color="#F7FAFC"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Reset
                </Button>
              </Box>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
