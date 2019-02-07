import gql from 'graphql-tag';

export const FEED_STUDENTS = gql`{
  students{
    name
    email
    birthDate
  }
}`;

export const PERSON = gql`query GetPerson($id: ID!){
  packageInfo{
    name
    version
  }
  person(id: $id) {
    name
    height
    homeworld{
      name
      rotation_period
      orbital_period
    }
  }
}`;

export const INFO = gql`{
  info
}`;
