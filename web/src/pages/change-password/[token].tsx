import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import React from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorsMap";
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (value, { setErrors }) => {
          // const response = await login(value);
          // if (response.data?.login.errors) {
          //   setErrors(toErrorMap(response.data.login.errors));
          // } else if (response.data?.login.user) {
          //   // worked
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              autoComplete="off"
              type="password"
            />
            <Button
              type="submit"
              variantColor="blue"
              mt={4}
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  };
};

export default ChangePassword;
