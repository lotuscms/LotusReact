import gql from 'graphql-tag';

export async function register(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  client: any
) {
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  } else {
   return client.mutate({
      mutation: gql`
        mutation Register(
          $email: String!
          $username: String!
          $password: String!
        ) {
          accountRegister(
            email: $email
            username: $username
            password: $password
          ) {
            email
          }
        }
      `,
      variables: {
        email,
        username,
        password
      }
    });
  }
}
